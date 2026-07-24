import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const registryPath = path.join(rootDir, "catalog/repositories.json")
const outputDir = path.join(rootDir, "catalog/generated")
const reportPath = path.join(outputDir, "report.json")
const markdownPath = path.join(outputDir, "report.md")
const apiVersion = "2022-11-28"
const generatorVersion = "1.0.0"

const technologySignals = [
  ["next", "Next.js"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["astro", "Astro"],
  ["tailwindcss", "Tailwind CSS"],
  ["@supabase/supabase-js", "Supabase"],
  ["drizzle-orm", "Drizzle ORM"],
  ["@playwright/test", "Playwright"],
  ["leaflet", "Leaflet"],
  ["next-intl", "next-intl"],
  ["three", "Three.js"],
  ["@react-three/fiber", "React Three Fiber"],
]

function githubHeaders(accept = "application/vnd.github+json") {
  const headers = {
    Accept: accept,
    "X-GitHub-Api-Version": apiVersion,
    "User-Agent": "pascal-engineering-catalog",
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

async function fetchGithubJson(url) {
  const response = await fetch(url, {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(20_000),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub returned ${response.status} for ${url}: ${body.slice(0, 240)}`)
  }

  return response.json()
}

async function fetchRepositoryFile(owner, repository, filePath, revision) {
  const url = new URL(`https://api.github.com/repos/${owner}/${repository}/contents/${filePath}`)
  url.searchParams.set("ref", revision)

  const response = await fetch(url, {
    headers: githubHeaders("application/vnd.github.raw+json"),
    signal: AbortSignal.timeout(20_000),
  })

  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} while reading ${owner}/${repository}/${filePath}.`)
  }

  return response.text()
}

function findPath(paths, candidate) {
  const normalizedCandidate = candidate.toLowerCase()
  return paths.find((filePath) => filePath.toLowerCase() === normalizedCandidate) ?? null
}

function discoverTechnologies(repositoryMetadata, packageManifest) {
  const technologies = new Set()

  if (repositoryMetadata.language) technologies.add(repositoryMetadata.language)

  if (packageManifest) {
    const dependencies = new Set([
      ...Object.keys(packageManifest.dependencies ?? {}),
      ...Object.keys(packageManifest.devDependencies ?? {}),
    ])

    for (const [dependency, technology] of technologySignals) {
      if (dependencies.has(dependency)) technologies.add(technology)
    }
  }

  return [...technologies]
}

function fileSource(owner, repository, revision, kind, filePath) {
  return {
    kind,
    ref: filePath,
    revision,
    url: `https://github.com/${owner}/${repository}/blob/${revision}/${filePath}`,
  }
}

function addFinding(findings, present, code, severity, message, sourceRef = null) {
  if (!present) findings.push({ code, severity, message, sourceRef })
}

async function inspectRepository(registeredRepository, observedAt) {
  const { owner, repository, defaultBranch } = registeredRepository.source
  const apiBase = `https://api.github.com/repos/${owner}/${repository}`
  const repositoryMetadata = await fetchGithubJson(apiBase)
  const commit = await fetchGithubJson(`${apiBase}/commits/${encodeURIComponent(defaultBranch)}`)
  const revision = commit.sha
  const tree = await fetchGithubJson(`${apiBase}/git/trees/${revision}?recursive=1`)
  if (tree.truncated) {
    throw new Error(`GitHub returned a truncated tree for ${owner}/${repository}.`)
  }
  const paths = tree.tree
    .filter((entry) => entry.type === "blob")
    .map((entry) => entry.path)

  const readmePath = findPath(paths, "README.md")
  const agentsPath = findPath(paths, "AGENTS.md")
  const packagePath = findPath(paths, "package.json")
  const architecturePaths = paths.filter((filePath) =>
    /(^|\/)docs\/architecture\/.+\.md$/i.test(filePath),
  )
  const workflowPaths = paths.filter((filePath) =>
    /^\.github\/workflows\/.+\.ya?ml$/i.test(filePath),
  )
  const testPaths = paths.filter((filePath) =>
    /(^|\/)(tests?|__tests__)(\/|$)|\.(test|spec)\.[cm]?[jt]sx?$/i.test(filePath),
  )

  let packageManifest = null
  if (packagePath) {
    const packageText = await fetchRepositoryFile(owner, repository, packagePath, revision)
    if (packageText) packageManifest = JSON.parse(packageText)
  }

  const testScripts = Object.entries(packageManifest?.scripts ?? {})
    .filter(([name]) => name === "test" || name.startsWith("test:"))
    .map(([name, command]) => `${name}: ${command}`)
  const hasTests = testPaths.length > 0 || testScripts.length > 0
  const findings = []

  addFinding(findings, Boolean(readmePath), "missing-readme", "error", "No se encontró README.md.")
  addFinding(findings, Boolean(agentsPath), "missing-agents", "warning", "No se encontró AGENTS.md.")
  addFinding(
    findings,
    architecturePaths.length > 0,
    "missing-architecture-docs",
    "info",
    "No se encontró documentación dentro de docs/architecture.",
  )
  addFinding(findings, workflowPaths.length > 0, "missing-ci", "warning", "No se encontraron workflows de GitHub Actions.")
  addFinding(findings, hasTests, "missing-tests", "warning", "No se encontraron pruebas ni scripts de pruebas.")

  const sources = [
    {
      kind: "repository",
      ref: `${owner}/${repository}`,
      revision,
      url: repositoryMetadata.html_url,
    },
  ]

  if (readmePath) sources.push(fileSource(owner, repository, revision, "file", readmePath))
  if (agentsPath) sources.push(fileSource(owner, repository, revision, "file", agentsPath))
  if (packagePath) sources.push(fileSource(owner, repository, revision, "manifest", packagePath))
  workflowPaths.forEach((filePath) =>
    sources.push(fileSource(owner, repository, revision, "workflow", filePath)),
  )

  return {
    id: registeredRepository.id,
    displayName: registeredRepository.displayName,
    repositoryUrl: repositoryMetadata.html_url,
    sourceRevision: revision,
    observedAt,
    facts: {
      lifecycle: repositoryMetadata.archived ? "archived" : registeredRepository.lifecycle,
      description: repositoryMetadata.description ?? null,
      technologies: discoverTechnologies(repositoryMetadata, packageManifest),
      demoUrl: registeredRepository.demoUrl ?? repositoryMetadata.homepage ?? null,
    },
    documents: {
      readme: { present: Boolean(readmePath), path: readmePath },
      agents: { present: Boolean(agentsPath), path: agentsPath },
      architecture: architecturePaths.map((filePath) => ({ present: true, path: filePath })),
    },
    quality: {
      ci: { present: workflowPaths.length > 0, evidence: workflowPaths },
      tests: {
        present: hasTests,
        evidence: [...testScripts, ...testPaths].slice(0, 20),
      },
    },
    activity: {
      lastCommitAt: commit.commit?.committer?.date ?? commit.commit?.author?.date ?? null,
    },
    findings,
    sources,
  }
}

function statusLabel(present) {
  return present ? "Sí" : "No"
}

function lifecycleLabel(lifecycle) {
  return {
    experimental: "experimental",
    active: "activo",
    maintenance: "mantenimiento",
    archived: "archivado",
    unknown: "desconocido",
  }[lifecycle]
}

function renderMarkdown(report) {
  const sections = report.repositories.map((repository) => {
    const findings = repository.findings.length
      ? repository.findings.map((finding) => `- **${finding.severity}:** ${finding.message}`).join("\n")
      : "- Sin hallazgos."

    return `## ${repository.displayName}

- Repositorio: ${repository.repositoryUrl}
- Revisión: \`${repository.sourceRevision.slice(0, 12)}\`
- Estado declarado: ${lifecycleLabel(repository.facts.lifecycle)}
- Último commit: ${repository.activity.lastCommitAt ?? "No disponible"}
- Tecnologías detectadas: ${repository.facts.technologies.join(", ") || "No detectadas"}
- README: ${statusLabel(repository.documents.readme.present)}
- AGENTS: ${statusLabel(repository.documents.agents.present)}
- Documentación arquitectónica: ${statusLabel(repository.documents.architecture.length > 0)}
- CI: ${statusLabel(repository.quality.ci.present)}
- Pruebas: ${statusLabel(repository.quality.tests.present)}

### Hallazgos

${findings}`
  })

  return `# Reporte del catálogo de ingeniería de Pascal

Generado: ${report.generatedAt}

Este artefacto es de solo lectura. Los hallazgos son deterministas y no se publican automáticamente.

${sections.join("\n\n")}
`
}

async function main() {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
  const observedAt = new Date().toISOString()
  const repositories = []

  for (const registeredRepository of registry.repositories) {
    console.log(`Inspecting ${registeredRepository.source.owner}/${registeredRepository.source.repository}...`)
    repositories.push(await inspectRepository(registeredRepository, observedAt))
  }

  const report = {
    schemaVersion: 1,
    generatedAt: observedAt,
    generator: {
      name: "pascal-engineering-catalog",
      version: generatorVersion,
    },
    repositories,
  }

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(markdownPath, renderMarkdown(report))

  console.log(`✓ Catalog report generated for ${repositories.length} repositories.`)
  console.log(`  JSON: ${path.relative(rootDir, reportPath)}`)
  console.log(`  Markdown: ${path.relative(rootDir, markdownPath)}`)
}

main().catch((error) => {
  console.error(`Catalog report generation failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
