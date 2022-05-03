import boxen from "boxen"
import pico from "picocolors"

import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();

const { white, green, gray, yellow, cyan, bold, italic } = pico.createColors()

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
//   oss: white('Node.js Community Committee ') + green('⬢'),
//   web: cyan('https://bnb.im'),
//
// NOTE:  you push your specific data into the socialData arrays...
//
socialData.field.push(white("UI & UX"))

socialData.roles.push(green("Advocate"))
socialData.roles.push(green("Architect"))
socialData.roles.push(green("Engineer"))
socialData.roles.push(green("Evangelist"))
socialData.roles.push(green("Explorer"))
socialData.roles.push(green("Mentor"))
socialData.roles.push(green("Programmer"))

socialData.company.push(white(italic("deepImpact...")))
socialData.github.push(gray("https://github.com/") + cyan("eswat42"))

socialData.domains.push(green("eswat42.dev"))

socialData.quote.push(yellow(italic("It depends on the appetite of the whale...")))

socialData.patterns.push(green("Micro-Frontends"))

socialData.lang.push(green("JavaScript, es6"))
socialData.lang.push(green("TypeScript"))

socialData.tech.push(green("Web Components"))
socialData.tech.push(green("Stencil"))
socialData.tech.push(green("Svelte"))
socialData.tech.push(green("Solid"))
socialData.tech.push(green("Vue"))
socialData.tech.push(green("React"))
socialData.tech.push(green("SVG"))
socialData.tech.push(green("GraphQL"))
socialData.tech.push(green("Node"))

const data = {
  name: white(bold("Richard Hess")),
  handle: cyan("eswat42"),
  npx: gray("npx") + " " + cyan("eswat42"),
  social: socialData,
  labels: {
    apps: white(bold("        apps:")),
    card: white(bold("        Card:")),
    code: white(bold("      Coding:")),
    company: white(bold("     Company:")),
    field: white(bold("       Field:")),
    domains: white(bold("     Domains:")),
    github: white(bold("      GitHub:")),
    gmail: white(bold("       Gmail:")),
    lang: white(bold("   Languages:")),
    linkedin: white(bold("    LinkedIn:")),
    npm: white(bold("         npm:")),
    oss: white(bold(" Open Source:")),
    pad: white(bold("             ")),
    patterns: white(bold("    Patterns:")),
    quote: white(bold("       Quote:")),
    roles: white(bold("       Roles:")),
    tech: white(bold("  Technology:")),
    twitter: white(bold("     Twitter:")),
    web: white(bold("         Web:")),
    work: white(bold("        Work:")),
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
  green(boxen(output, boxOptions))
)
