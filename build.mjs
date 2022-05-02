import boxen from "boxen"
import pico from "picocolors"

import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();

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
  "lang",
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

// Text + pico definitions
//   oss: pico.white('Node.js Community Committee ') + pico.green('⬢'),
//   web: pico.cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.field.push(pico.white("UI & UX"))

socialData.roles.push(pico.green("Advocate"))
socialData.roles.push(pico.green("Architect"))
socialData.roles.push(pico.green("Engineer"))
socialData.roles.push(pico.green("Evangelist"))
socialData.roles.push(pico.green("Explorer"))
socialData.roles.push(pico.green("Mentor"))
socialData.roles.push(pico.green("Programmer"))

socialData.company.push(pico.white(pico.italic("deepImpact...")))
socialData.github.push(pico.gray("https://github.com/") + pico.cyan("eswat42"))

socialData.domains.push(pico.green("eswat42.dev"))

socialData.quote.push(pico.yellow(pico.italic("It depends on the appetite of the whale...")))

socialData.patterns.push(pico.green("Micro-Frontends"))

socialData.lang.push(pico.green("JavaScript, es6"))
socialData.lang.push(pico.green("TypeScript"))

socialData.tech.push(pico.green("Web Components"))
socialData.tech.push(pico.green("Stencil"))
socialData.tech.push(pico.green("Svelte"))
socialData.tech.push(pico.green("Solid"))
socialData.tech.push(pico.green("Vue"))
socialData.tech.push(pico.green("React"))
socialData.tech.push(pico.green("SVG"))
socialData.tech.push(pico.green("GraphQL"))
socialData.tech.push(pico.green("Node"))

const data = {
  name: pico.white(pico.bold("Richard Hess")),
  handle: pico.cyan("eswat42"),
  npx: pico.gray("npx") + " " + pico.cyan("eswat42"),
  social: socialData,
  labels: {
    apps: pico.white(pico.bold("        apps:")),
    card: pico.white(pico.bold("        Card:")),
    code: pico.white(pico.bold("      Coding:")),
    company: pico.white(pico.bold("     Company:")),
    field: pico.white(pico.bold("       Field:")),
    domains: pico.white(pico.bold("     Domains:")),
    github: pico.white(pico.bold("      GitHub:")),
    gmail: pico.white(pico.bold("       Gmail:")),
    lang: pico.white(pico.bold("   Languages:")),
    linkedin: pico.white(pico.bold("    LinkedIn:")),
    npm: pico.white(pico.bold("         npm:")),
    oss: pico.white(pico.bold(" Open Source:")),
    pad: pico.white(pico.bold("             ")),
    patterns: pico.white(pico.bold("    Patterns:")),
    quote: pico.white(pico.bold("       Quote:")),
    roles: pico.white(pico.bold("       Roles:")),
    tech: pico.white(pico.bold("  Technology:")),
    twitter: pico.white(pico.bold("     Twitter:")),
    web: pico.white(pico.bold("         Web:")),
    work: pico.white(pico.bold("        Work:")),
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
  pico.green(boxen(output, boxOptions))
)
