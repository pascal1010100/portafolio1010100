import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const EXPECTED = 'pascal1010100/portafolio1010100'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OPTIONS = { encoding: 'utf8', timeout: 20000, maxBuffer: 4 * 1024 * 1024,
  env: { ...process.env, GIT_OPTIONAL_LOCKS: '0', GIT_TERMINAL_PROMPT: '0', GH_PROMPT_DISABLED: '1', GH_DEBUG: '' } }

export function collectLocal(root = ROOT, run = spawnSync) {
  const errors = []
  const query = (args, absentCode = null) => {
    const r = run('git', ['-c', 'core.fsmonitor=false', '-c', 'core.hooksPath=/dev/null', '-C', root, ...args], OPTIONS)
    if (r.status === 0) return String(r.stdout)
    if (absentCode !== null && r.status === absentCode) return null
    throw new Error('git_read_failed') // Never expose raw output or exception messages.
  }
  if (path.resolve(query(['rev-parse', '--show-toplevel']).trim()) !== path.resolve(root)) throw new Error('repository_root_mismatch')
  const remotes = query(['remote']).trim().split('\n').filter(Boolean).map(name => {
    const url = sanitizeRemote(query(['config', '--get', `remote.${name}.url`]).trim())
    if (!url) errors.push({ stage: 'remote', code: 'unsupported_remote_redacted' })
    return { name, url }
  })
  const identity_verified = remotes.some(r => r.url === `https://github.com/${EXPECTED}`)
  if (!identity_verified) throw new Error('repository_identity_mismatch')
  const branch = query(['symbolic-ref', '--quiet', '--short', 'HEAD'], 1)?.trim() ?? null
  const head_sha = query(['rev-parse', 'HEAD']).trim()
  const upstream = branch ? query(['for-each-ref', '--format=%(upstream:short)', `refs/heads/${branch}`]).trim() || null : null
  const tokens = query(['status', '--porcelain=v1', '-z', '--untracked-files=all']).split('\0')
  const counts = Object.fromEntries(['entries', 'staged', 'unstaged', 'untracked', 'unmerged', 'added', 'modified', 'deleted', 'renamed', 'copied', 'type_changed'].map(k => [k, 0]))
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i]) continue
    const xy = tokens[i].slice(0, 2)
    counts.entries++
    if (xy === '??') { counts.untracked++; continue }
    if (['DD', 'AU', 'UD', 'UA', 'DU', 'AA', 'UU'].includes(xy)) counts.unmerged++
    else { if (xy[0] !== ' ') counts.staged++; if (xy[1] !== ' ') counts.unstaged++ }
    for (const [code, key] of [['A', 'added'], ['M', 'modified'], ['D', 'deleted'], ['R', 'renamed'], ['C', 'copied'], ['T', 'type_changed']]) if (xy.includes(code)) counts[key]++
    if (xy.includes('R') || xy.includes('C')) i++
  }
  return { repository: { expected: EXPECTED, identity_verified, remotes },
    local_git: { branch, head_sha, upstream, clean: counts.entries === 0, changes: counts }, errors }
}

export function collect(root = ROOT, run = spawnSync) {
  const report = { schema_version: 1, observed_at: new Date().toISOString(), timezone: 'UTC',
    method: 'readonly_collector', project_path: root,
    repository: { expected: EXPECTED, identity_verified: false, remotes: [] }, local_git: null,
    github: { accessible: false, repository_id: null, default_branch: null, default_head_sha: null,
      head_matches_default: null, comparison: { verified: false, status: null, local_ahead: null, local_behind: null }, error: null },
    historical: null, not_checked: ['ignored_files', 'backups', 'build', 'tests', 'deployment', 'other_checkouts'], errors: [] }
  try { Object.assign(report, collectLocal(root, run)) }
  catch (error) {
    const code = ['repository_root_mismatch', 'repository_identity_mismatch'].includes(error.message) ? error.message : 'git_read_failed'
    report.errors.push({ stage: 'local_git', code })
    report.not_checked.push('github_comparison')
    return report
  }
  const api = (endpoint, stage) => {
    try {
      const r = run('gh', ['api', '--method', 'GET', endpoint], OPTIONS)
      if (r.status !== 0) {
        let http_status = null
        try { const value = Number(JSON.parse(r.stdout).status); if (value >= 400 && value <= 599) http_status = value } catch { /* discard raw output */ }
        throw Object.assign(new Error(), { http_status })
      }
      const payload = JSON.parse(r.stdout)
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid_payload')
      return payload
    } catch (error) {
      const safe = { stage, code: 'github_read_failed', http_status: error.http_status ?? null }
      report.errors.push(safe)
      report.github.error = safe
      return null
    }
  }
  const invalid = stage => {
    const error = { stage, code: 'github_response_invalid' }
    report.errors.push(error); report.github.error = error
  }
  const repo = api(`repos/${EXPECTED}`, 'github_repository')
  if (!repo) { report.not_checked.push('github_comparison'); return report }
  if (repo.full_name !== EXPECTED || !Number.isSafeInteger(repo.id) || typeof repo.default_branch !== 'string' || !/^[A-Za-z0-9._/-]+$/.test(repo.default_branch)) {
    invalid('github_repository'); return report
  }
  Object.assign(report.github, { accessible: true, repository_id: repo.id, default_branch: repo.default_branch })
  const revision = api(`repos/${EXPECTED}/commits/${encodeURIComponent(repo.default_branch)}`, 'github_default_head')
  if (!revision) { report.not_checked.push('github_comparison'); return report }
  if (typeof revision.sha !== 'string' || !/^[a-f0-9]{40}$/.test(revision.sha)) { invalid('github_default_head'); return report }
  report.github.default_head_sha = revision.sha
  const local = report.local_git.head_sha
  if (!local) { report.not_checked.push('github_comparison'); return report }
  report.github.head_matches_default = local === revision.sha
  const comparison = api(`repos/${EXPECTED}/compare/${revision.sha}...${local}`, 'github_comparison')
  if (!comparison) { report.not_checked.push('github_comparison'); return report }
  if (!['identical', 'ahead', 'behind', 'diverged'].includes(comparison.status) ||
      !Number.isSafeInteger(comparison.ahead_by) || comparison.ahead_by < 0 ||
      !Number.isSafeInteger(comparison.behind_by) || comparison.behind_by < 0) {
    invalid('github_comparison'); return report
  }
  report.github.comparison = { verified: true, base_sha: revision.sha, head_sha: local,
    status: comparison.status, local_ahead: comparison.ahead_by, local_behind: comparison.behind_by }
  return report
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = collect()
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
  for (const error of report.errors) process.stderr.write(`${error.stage}: ${error.code}\n`)
  // 2: local failure; 1: incomplete snapshot; 0: successful snapshot.
  process.exitCode = !report.local_git ? 2 : report.errors.length ? 1 : 0
}

export function sanitizeRemote(raw) {
  try {
    const input = raw.includes('://') ? raw : raw.replace(/^(?:[^@/:]+@)?([^/:]+):(.+)$/, 'ssh://$1/$2')
    const url = new URL(input)
    // Only canonical owner/repo paths; never echo unknown URLs or path-carried credentials.
    if (url.hostname !== 'github.com') return null
    const match = url.pathname.match(/^\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/?$/)
    if (!match) return null
    return `https://github.com/${match[1]}/${match[2].replace(/\.git$/, '')}`
  } catch { return null }
}
