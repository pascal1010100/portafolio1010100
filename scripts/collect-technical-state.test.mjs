import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

const moduleUrl = new URL('./collect-technical-state.mjs', import.meta.url)
const sha = 'a'.repeat(40)
function fakeGit(status = '') {
  return (_command, args) => {
    let stdout = ''
    let statusCode = 0
    if (args.includes('--show-toplevel')) stdout = '/fixture'
    else if (args.includes('symbolic-ref')) stdout = 'main'
    else if (args.includes('@{upstream}')) statusCode = 128
    else if (args.includes('rev-parse')) stdout = sha
    else if (args.includes('remote')) stdout = 'origin'
    else if (args.includes('config')) stdout = 'https://git:FAKE_SECRET@github.com/pascal1010100/portafolio1010100.git'
    else if (args.includes('--porcelain=v1')) stdout = status
    return { status: statusCode, stdout, stderr: 'never expose FAKE_SECRET' }
  }
}

test('recoge Git limpio sin upstream usando solo consultas', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.collectLocal, 'function', 'falta recogida local')
  const result = module.collectLocal('/fixture', fakeGit())
  assert.equal(result.local_git.head_sha, sha)
  assert.equal(result.local_git.upstream, null)
  assert.equal(result.local_git.clean, true)
  assert.equal(result.local_git.changes.entries, 0)
  assert.equal(result.repository.identity_verified, true)
  assert.ok(!JSON.stringify(result).includes('FAKE_SECRET'))
})

test('cuenta preparados, sin preparar, nuevos y renombres con rutas NUL', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.collectLocal, 'function', 'falta recogida local')
  const result = module.collectLocal('/fixture', fakeGit('M  staged\0 M unstaged\0?? new\0R  renamed\0original\0'))
  assert.equal(result.local_git.clean, false)
  assert.deepEqual(result.local_git.changes, {
    entries: 4, staged: 2, unstaged: 1, untracked: 1, unmerged: 0,
    added: 0, modified: 2, deleted: 0, renamed: 1, copied: 0, type_changed: 0,
  })
})
test('conserva local y comparación desconocida si GitHub falla', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.collect, 'function', 'falta informe completo')
  const run = (command, args, options) => command === 'git' ? fakeGit()(command, args, options)
    : { status: 1, stdout: 'FAKE_SECRET', stderr: 'FAKE_SECRET' }
  const report = module.collect('/fixture', run)
  assert.equal(report.local_git.head_sha, sha)
  assert.equal(report.github.accessible, false)
  assert.equal(report.github.head_matches_default, null)
  assert.equal(report.github.comparison.local_ahead, null)
  assert.equal(report.github.comparison.verified, false)
  assert.ok(report.errors.length > 0)
  assert.ok(!JSON.stringify(report).includes('FAKE_SECRET'))
})

test('comparación de SHAs confirmada, dirección local ahead/behind explícita', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.collect, 'function', 'falta informe completo')
  const run = (command, args, options) => {
    if (command === 'git') return fakeGit()(command, args, options)
    const endpoint = args.at(-1)
    const response = endpoint.includes('/compare/')
      ? { status: 'identical', ahead_by: 0, behind_by: 0 }
      : endpoint.includes('/commits/') ? { sha }
      : { id: 1027335001, full_name: 'pascal1010100/portafolio1010100', default_branch: 'main' }
    return { status: 0, stdout: JSON.stringify(response) }
  }
  const report = module.collect('/fixture', run)
  assert.equal(report.github.head_matches_default, true)
  assert.equal(report.github.comparison.verified, true)
  assert.equal(report.github.comparison.local_behind, 0)
  assert.equal(report.github.comparison.base_sha, sha)
})

test('404 de comparación no implica coincidencia ni pérdida de commits', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.collect, 'function', 'falta informe completo')
  const run = (command, args, options) => {
    if (command === 'git') return fakeGit()(command, args, options)
    const endpoint = args.at(-1)
    if (endpoint.includes('/compare/')) return { status: 1, stdout: '{"status":"404","message":"FAKE_SECRET"}' }
    return { status: 0, stdout: JSON.stringify(endpoint.includes('/commits/')
      ? { sha: 'b'.repeat(40) } : { id: 1027335001, full_name: 'pascal1010100/portafolio1010100', default_branch: 'main' }) }
  }
  const report = module.collect('/fixture', run)
  assert.equal(report.github.head_matches_default, false)
  assert.equal(report.github.comparison.verified, false)
  assert.equal(report.github.comparison.local_behind, null)
  assert.ok(!JSON.stringify(report).includes('FAKE_SECRET'))
})

test('HEAD separado mantiene SHA y rama/upstream null, sin error', async () => {
  const { collect } = await import(moduleUrl)
  const run = (command, args, options) => {
    if (command !== 'git') return { status: 1, stdout: '' }
    if (args.includes('symbolic-ref')) return { status: 1, stdout: '' }
    return fakeGit()(command, args, options)
  }
  const report = collect('/fixture', run)
  assert.ok(report.local_git)
  assert.equal(report.local_git.head_sha, sha)
  assert.equal(report.local_git.branch, null)
  assert.equal(report.local_git.upstream, null)
  assert.equal(report.errors.some(e => e.stage === 'local_git'), false)
})

test('fallo real de upstream no se confunde con upstream ausente', async () => {
  const { collect } = await import(moduleUrl)
  const run = (command, args, options) => {
    if (args.includes('@{upstream}') || args.includes('for-each-ref')) return { status: 128, stderr: 'FAKE_SECRET' }
    return fakeGit()(command, args, options)
  }
  const report = collect('/fixture', run)
  assert.ok(report.errors.some(e => e.stage === 'local_git'))
  assert.ok(!JSON.stringify(report).includes('FAKE_SECRET'))
})

test('respuestas JSON primitivas/null nunca aparentan éxito ni rompen el informe', async () => {
  const { collect } = await import(moduleUrl)
  for (const stage of ['repo', 'commit', 'compare']) {
    for (const payload of ['null', 'false', '0', '[]', '"FAKE_SECRET"']) {
      const run = (command, args, options) => {
        if (command === 'git') return fakeGit()(command, args, options)
        const endpoint = args.at(-1)
        const current = endpoint.includes('/compare/') ? 'compare' : endpoint.includes('/commits/') ? 'commit' : 'repo'
        if (current === stage) return { status: 0, stdout: payload }
        return { status: 0, stdout: JSON.stringify(current === 'compare'
          ? { status: 'identical', ahead_by: 0, behind_by: 0 } : current === 'commit' ? { sha }
          : { id: 1027335001, full_name: 'pascal1010100/portafolio1010100', default_branch: 'main' }) }
      }
      const report = collect('/fixture', run)
      assert.ok(report.local_git)
      assert.ok(report.errors.length > 0, `${stage}: ${payload}`)
      assert.equal(report.github.comparison.verified, false)
      assert.ok(!JSON.stringify(report).includes('FAKE_SECRET'))
    }
  }
})

test('SHA GitHub debe ser string, no array con coerción implícita', async () => {
  const { collect } = await import(moduleUrl)
  const run = (command, args, options) => {
    if (command === 'git') return fakeGit()(command, args, options)
    return { status: 0, stdout: JSON.stringify(args.at(-1).includes('/commits/') ? { sha: [sha] }
      : { id: 1027335001, full_name: 'pascal1010100/portafolio1010100', default_branch: 'main' }) }
  }
  const report = collect('/fixture', run)
  assert.equal(report.github.default_head_sha, null)
  assert.ok(report.errors.length > 0)
})

test('sanitiza remotos HTTPS y SSH sin exponer credenciales', async () => {
  assert.ok(existsSync(moduleUrl), 'falta implementar el recolector')
  const { sanitizeRemote } = await import(moduleUrl)
  for (const raw of [
    'https://user:FAKE_SECRET@github.com/pascal1010100/portafolio1010100.git?token=FAKE_SECRET#FAKE_SECRET',
    'git@github.com:pascal1010100/portafolio1010100.git',
    'ssh://git:FAKE_SECRET@github.com/pascal1010100/portafolio1010100.git',
  ]) assert.equal(sanitizeRemote(raw), 'https://github.com/pascal1010100/portafolio1010100')
  assert.equal(sanitizeRemote('not-a-safe-url-FAKE_SECRET'), null)
})
