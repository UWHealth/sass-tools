# sass-tools
Central location for framework sass tools

[→ View API docs](https://uwhealth.github.io/sass-tools/)

## Installation

```cli
# Yarn (preferred)
yarn add @uwhealth/sass-tools
```

## Usage

Before using sass-tools, you need to import the main entry point (`index.scss`) and initialize the tools. Initializing will take your configuration variables and move them to private variables used by functions and mixins elsewhere.

```scss
@import 'path/to/node_modules/@uwhealth/sass-tools/index';

// Set configuration variables
// Docs here: https://uwhealth.github.io/sass-tools/#config
// ...

// Initialize (populates configuration)
@include init;

```

## Deployment (publishing to npm)

Since these tools are relied on by other UW Health projects, they are available on [npm](https://www.npmjs.com/package/@uwhealth/sass-tools).
To make new versions available to npm, your new changes must be pushed to the master branch and then published. Once your changes are pushed, use one of the following commands:

** Maintenance updates (patches) **

```cli
npm run patch
```

** Minor updates (new functionality) **

```cli
npm run minor
```

** Major updates (breaking changes) **

```cli
npm version major && npm publish
```

All commands will tag the most recent changes, update the version in `package.json`, and push that tag to git.
The changes will then be packaged and added to npm.
