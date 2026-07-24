import fs from "node:fs"
import path from "node:path"

const rootDir = process.cwd()
const registryPath = path.join(rootDir, "catalog/repositories.json")
const reportSchemaPath = path.join(rootDir, "catalog/report.schema.json")
const generatedReportPath = path.join(rootDir, "catalog/generated/report.json")
const errors = []

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (error) {
    errors.push(`${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
}

function validateHttpsUrl(value, label) {
  if (!isNonEmptyString(value)) {
    errors.push(`${label} must be a non-empty URL.`)
    return
  }

  try {
    const url = new URL(value)
    if (url.protocol !== "https:") {
      errors.push(`${label} must use HTTPS.`)
    }
  } catch {
    errors.push(`${label} must be a valid URL.`)
  }
}

function validateRegistry(registry) {
  if (!registry || registry.schemaVersion !== 1) {
    errors.push("Catalog registry must use schemaVersion 1.")
    return
  }

  if (!Array.isArray(registry.repositories) || registry.repositories.length === 0) {
    errors.push("Catalog registry must contain at least one repository.")
    return
  }

  const ids = new Set()
  const repositoryRefs = new Set()

  registry.repositories.forEach((repository, index) => {
    const label = `Repository ${index + 1}`

    if (!isNonEmptyString(repository.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(repository.id)) {
      errors.push(`${label} must have a kebab-case id.`)
    } else if (ids.has(repository.id)) {
      errors.push(`${label} has duplicate id "${repository.id}".`)
    } else {
      ids.add(repository.id)
    }

    if (!isNonEmptyString(repository.displayName)) {
      errors.push(`${label} must have a displayName.`)
    }

    if (repository.source?.provider !== "github") {
      errors.push(`${label} must use the github provider.`)
    }

    const owner = repository.source?.owner
    const name = repository.source?.repository
    const defaultBranch = repository.source?.defaultBranch

    if (
      !isNonEmptyString(owner) ||
      !isNonEmptyString(name) ||
      !isNonEmptyString(defaultBranch) ||
      !/^[a-zA-Z0-9_.-]+$/.test(owner) ||
      !/^[a-zA-Z0-9_.-]+$/.test(name) ||
      !/^[a-zA-Z0-9._/-]+$/.test(defaultBranch)
    ) {
      errors.push(`${label} must define source owner, repository, and defaultBranch.`)
    } else {
      const repositoryRef = `${owner}/${name}`.toLowerCase()
      if (repositoryRefs.has(repositoryRef)) {
        errors.push(`${label} duplicates source "${repositoryRef}".`)
      }
      repositoryRefs.add(repositoryRef)
    }

    if (!new Set(["public", "private"]).has(repository.visibility)) {
      errors.push(`${label} must declare public or private visibility.`)
    }

    if (!new Set(["experimental", "active", "maintenance", "archived"]).has(repository.lifecycle)) {
      errors.push(`${label} must declare a supported lifecycle.`)
    }

    validateHttpsUrl(repository.demoUrl, `${label} demoUrl`)

    if (
      typeof repository.publication?.allowed !== "boolean" ||
      repository.publication?.requiresApproval !== true
    ) {
      errors.push(`${label} publication must declare allowed and require human approval.`)
    }
  })
}

function validateGeneratedReport(report, registry) {
  if (!report) return

  if (report.schemaVersion !== 1 || !Array.isArray(report.repositories)) {
    errors.push("Generated report must use schemaVersion 1 and contain repositories.")
    return
  }

  if (Number.isNaN(Date.parse(report.generatedAt))) {
    errors.push("Generated report must include a valid generatedAt timestamp.")
  }

  const expectedIds = new Set(registry.repositories.map((repository) => repository.id))
  const reportIds = new Set()

  report.repositories.forEach((repository, index) => {
    const label = `Generated repository ${index + 1}`

    if (!expectedIds.has(repository.id)) {
      errors.push(`${label} references unauthorized id "${repository.id}".`)
    }
    if (reportIds.has(repository.id)) {
      errors.push(`${label} duplicates id "${repository.id}".`)
    }
    reportIds.add(repository.id)

    if (!isNonEmptyString(repository.displayName) || !isNonEmptyString(repository.sourceRevision)) {
      errors.push(`${label} must include displayName and sourceRevision.`)
    }
    if (!repository.documents || !repository.quality || !repository.activity) {
      errors.push(`${label} must include documents, quality, and activity.`)
    }
    if (!Array.isArray(repository.findings) || !Array.isArray(repository.sources) || repository.sources.length === 0) {
      errors.push(`${label} must include findings and at least one source.`)
    }
  })

  for (const id of expectedIds) {
    if (!reportIds.has(id)) {
      errors.push(`Generated report is missing authorized repository "${id}".`)
    }
  }
}

function validateReportSchema(schema) {
  if (!schema) return

  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") {
    errors.push("Report contract must use JSON Schema draft 2020-12.")
  }

  if (schema.properties?.schemaVersion?.const !== 1) {
    errors.push("Report contract must define schemaVersion 1.")
  }

  const requiredFields = new Set(schema.required)
  for (const field of ["schemaVersion", "generatedAt", "generator", "repositories"]) {
    if (!requiredFields.has(field)) {
      errors.push(`Report contract must require "${field}".`)
    }
  }

  if (!schema.$defs?.repositoryReport || !schema.$defs?.source || !schema.$defs?.finding) {
    errors.push("Report contract must define repositoryReport, source, and finding entities.")
  }
}

const registry = readJson(registryPath, "Catalog registry")
const reportSchema = readJson(reportSchemaPath, "Report contract")
const generatedReport = fs.existsSync(generatedReportPath)
  ? readJson(generatedReportPath, "Generated report")
  : null

validateRegistry(registry)
validateReportSchema(reportSchema)
validateGeneratedReport(generatedReport, registry)

if (errors.length > 0) {
  console.error("Engineering catalog validation failed:\n")
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(
  `✓ Engineering catalog validated (${registry.repositories.length} repositories, report schema v${reportSchema.properties.schemaVersion.const}).`,
)
