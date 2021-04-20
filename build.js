"use strict"

// Pull in our modules
const chalk = require("chalk")
const boxen = require("boxen")
const fs = require("fs")
const path = require("path")

// Define options for Boxen
const boxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
}

// NOTE:  the order of these define the order they are printed in the card...
const tags = [
  "field",
  "roles",
  "work",
  "company",
  "oss",
  "gmail",
  "twitter",
  "npm",
  "github",
  "linkedin",
  "code",
  "domains",
  "quote",
  "patterns",
  "tech",
  "web",
  "apps",
]

// NOTE:  initialize the socialData arrays...
const socialData = tags.reduce((obj, tag) => {
  obj[tag] = []
  return obj
}, {})

// Text + chalk definitions
//   oss: chalk.white('Node.js Community Committee ') + chalk.green('⬢'),
//   web: chalk.cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.field.push(chalk.white("UI & UX"))

socialData.roles.push(chalk.green("Advocate"))
socialData.roles.push(chalk.green("Architect"))
socialData.roles.push(chalk.green("Engineer"))
socialData.roles.push(chalk.green("Evangelist"))
socialData.roles.push(chalk.green("Explorer"))
socialData.roles.push(chalk.green("Mentor"))
socialData.roles.push(chalk.green("Programmer"))

socialData.company.push(chalk.white.italic("deepImpact..."))
socialData.github.push(chalk.gray("https://github.com/") + chalk.cyan("eswat42"))

socialData.domains.push(chalk.green("eswat42.dev"))

socialData.quote.push(chalk.yellow.italic("It depends on the appetite of the whale..."))

socialData.patterns.push(chalk.green("Micro-Frontends"))

socialData.tech.push(chalk.green("Web Components"))
socialData.tech.push(chalk.green("Stencil"))
socialData.tech.push(chalk.green("Svelte"))
socialData.tech.push(chalk.green("Vue"))
socialData.tech.push(chalk.green("React"))
socialData.tech.push(chalk.green("SVG"))
socialData.tech.push(chalk.green("GraphQL"))
socialData.tech.push(chalk.green("Node"))

const data = {
  name: chalk.white.bold("Richard Hess"),
  handle: chalk.cyan("eswat42"),
  npx: chalk.gray("npx") + " " + chalk.cyan("eswat42"),
  social: socialData,
  labels: {
    apps: chalk.white.bold("        apps:"),
    card: chalk.white.bold("        Card:"),
    code: chalk.white.bold("      Coding:"),
    company: chalk.white.bold("     Company:"),
    field: chalk.white.bold("       Field:"),
    quote: chalk.white.bold("       Quote:"),
    domains: chalk.white.bold("     Domains:"),
    github: chalk.white.bold("      GitHub:"),
    gmail: chalk.white.bold("       Gmail:"),
    linkedin: chalk.white.bold("    LinkedIn:"),
    npm: chalk.white.bold("         npm:"),
    oss: chalk.white.bold(" Open Source:"),
    pad: chalk.white.bold("             "),
    patterns: chalk.white.bold("    Patterns:"),
    roles: chalk.white.bold("       Roles:"),
    tech: chalk.white.bold("  Technology:"),
    twitter: chalk.white.bold("     Twitter:"),
    web: chalk.white.bold("         Web:"),
    work: chalk.white.bold("        Work:"),
  },
}

const { name, handle, npx } = data
const { card, pad } = data.labels

// Actual strings we're going to output
const newline = "\n"
const heading = `${name} - ${handle}`
const carding = `${card}  ${npx}`

const notEmpty = (array) => {
  return array && array.length > 0
}

const reducer = (label, pad, newline) => {
  return (prev, current, indx) => {
    return prev + (indx == 0 ? label : pad) + "  " + current + newline
  }
}

const items = tags.map((tag) => {
  const list = data.social[tag]
  const label = data.labels[tag]
  return notEmpty(list) ? list.reduce(reducer(label, pad, newline), "") : ""
})

// Put all our output together into a single variable so we can use boxen effectively
const output =
  heading + // data.name + data.handle
  newline +
  newline + // Add one whole blank line
  items.reduce((prev, item) => {
    return prev + item
  }, "") +
  newline +
  carding

fs.writeFileSync(
  path.join(__dirname, "bin/output"),
  chalk.green(boxen(output, boxOptions))
)
