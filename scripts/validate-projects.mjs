import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"
import * as ts from "typescript"

const rootDir = process.cwd()
const dataFile = path.join(rootDir, "src/data/projects.ts")
const publicDir = path.join(rootDir, "public")

const errors = []

function addError(message) {
  errors.push(message)
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
}

function validateString(project, field, label) {
  if (!isNonEmptyString(project[field])) {
    addError(`${label}: "${field}" must be a non-empty string.`)
  }
}

function validateStringArray(project, field, label, minimumItems = 1) {
  const value = project[field]

  if (!Array.isArray(value) || value.length < minimumItems) {
    addError(`${label}: "${field}" must contain at least ${minimumItems} item(s).`)
    return
  }

  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      addError(`${label}: "${field}" item ${index + 1} must be a non-empty string.`)
    }
  })
}

function validateUrl(value, field, label) {
  if (value === undefined || value === null || value === "") {
    return
  }

  if (!isNonEmptyString(value)) {
    addError(`${label}: "${field}" must be a valid URL string when provided.`)
    return
  }

  try {
    const url = new URL(value)
    if (!["http:", "https:"].includes(url.protocol)) {
      addError(`${label}: "${field}" must use http or https.`)
    }
  } catch {
    addError(`${label}: "${field}" must be a valid URL.`)
  }
}

function loadProjects() {
  const source = fs.readFileSync(dataFile, "utf8")
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: dataFile,
  })

  const sandbox = {
    exports: {},
    module: { exports: {} },
  }

  sandbox.module.exports = sandbox.exports

  vm.runInNewContext(transpiled.outputText, sandbox, {
    filename: dataFile,
    timeout: 1000,
  })

  return sandbox.module.exports.projects ?? sandbox.exports.projects
}

const projects = loadProjects()

if (!Array.isArray(projects) || projects.length === 0) {
  addError("projects must be a non-empty array.")
} else {
  const slugs = new Set()
  const titles = new Set()

  projects.forEach((project, index) => {
    const label = project?.title ? `Project "${project.title}"` : `Project ${index + 1}`

    validateString(project, "title", label)
    validateString(project, "slug", label)
    validateString(project, "description", label)
    validateString(project, "longDescription", label)
    validateString(project, "results", label)
    validateString(project, "role", label)
    validateString(project, "status", label)
    validateString(project, "category", label)

    validateStringArray(project, "technologies", label, 3)
    validateStringArray(project, "challenges", label, 3)
    validateStringArray(project, "solutions", label, 3)
    validateStringArray(project, "evidence", label, 3)

    if (isNonEmptyString(project.slug)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
        addError(`${label}: "slug" must use kebab-case lowercase characters.`)
      }

      if (slugs.has(project.slug)) {
        addError(`${label}: duplicate slug "${project.slug}".`)
      }

      slugs.add(project.slug)
    }

    if (isNonEmptyString(project.title)) {
      const normalizedTitle = project.title.trim().toLowerCase()

      if (titles.has(normalizedTitle)) {
        addError(`${label}: duplicate title "${project.title}".`)
      }

      titles.add(normalizedTitle)
    }

    if (!isNonEmptyString(project.image) || !project.image.startsWith("/")) {
      addError(`${label}: "image" must be an absolute public path.`)
    } else {
      const imagePath = path.join(publicDir, project.image)

      if (!fs.existsSync(imagePath)) {
        addError(`${label}: image file does not exist at public${project.image}.`)
      }
    }

    if (typeof project.featured !== "boolean") {
      addError(`${label}: "featured" must be a boolean.`)
    }

    validateUrl(project.github, "github", label)
    validateUrl(project.demo, "demo", label)
  })
}

if (errors.length > 0) {
  console.error("Project data validation failed:\n")
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`✓ Project data validated (${projects.length} projects).`)
