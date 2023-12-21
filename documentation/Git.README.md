# Frontend React/Next Third-Party Boilerplate

## Git Configs

### Contents

- [CommitLint](#commitlint)
- [Commitizen](#commitizen)
- [Lint-Staged](#lint-staged)
- [Husky](#husky)

### Commitlint

In this section we will discuss about the [Commitlint](https://commitlint.js.org) configuration.

`CommitLint`, as its name is shouting, is a linter for our commit messages. With this tool, we can make sure that all of our commit messages are following a same structure.

The structure we used in this template is [Conventional Commit Format](https://www.conventionalcommits.org/en/v1.0.0/). This happened by adding the `extends: ['@commitlint/config-conventional'],` to its config file, E.g. `.commitlintrc.js`. For more information about the commitlint, see its [documentation](https://commitlint.js.org).

Keep in mind that `Commitlint` won't run on its own and it should be called from `cmd` by using the `commitlint` command. We will discuss about when we are going to call it in the [Husky section](#husky).

### Commitizen

In this section we will discuss about the [Commitizen](https://github.com/commitizen/cz-cli) configuration.

Under Maintenance.

### Lint-Staged

In this section we will discuss about the [Lint-Staged](https://github.com/lint-staged/lint-staged) configuration.

Under Maintenance.

### Husky

In this section we will discuss about the [Husky](https://github.com/typicode/husky) configuration.

Under Maintenance.
