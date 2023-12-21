# Frontend React/Next Third-Party Boilerplate

## Git Configs

### Contents

- [CommitLint](#commitlint)
- [Commitizen](#commitizen)
- [Lint-Staged](#lint-staged)
- [Husky](#husky)

### Commitlint

In this section we will discuss about the [Commitlint](https://commitlint.js.org) configuration.

`CommitLint`, as its name is shouting, is a linter for our commit messages. With this tool, we can make sure that all of our commit messages are following a same structure. This structure is very important because we will discuss that the release versions will be automatically calculated based on these commit messages the the [Semantic-Release section](SemanticRelease.README.md).

The structure we used in this template is [Conventional Commit Format](https://www.conventionalcommits.org/en/v1.0.0/). This happened by adding the `extends: ['@commitlint/config-conventional'],` to its config file, E.g. `.commitlintrc.js`. For more information about the commitlint, see its [documentation](https://commitlint.js.org).

Keep in mind that `Commitlint` won't run on its own and it should be called from `cmd` by using the `commitlint` command. We will discuss about when we are going to call it in the [Husky section](#husky).

### Commitizen

In this section we will discuss about the [Commitizen](https://github.com/commitizen/cz-cli) configuration.

Now that we've talked about `Commitlint` and shared that its important to unify the commit messages, its nice to add a helper tool to generate this kind of commit messages. `Commitizen` is the tool for this matter. You can configure the structure you want to follow in its config file, E.g. `.czrc`.

In this template, we used `"path": "cz-conventional-changelog"` which is the `conventional-commit` structure set-up for the `Commitizen` to configure the structure. To use this helper tool while committing git changes, use `yarn commit` instead of `git commit` and it will help you writing structured commit messages. For more information about the Commitizen or the cz-conventional-commit, see these link. [Commitizen](https://github.com/commitizen/cz-cli), [cz-conventional-commit](https://github.com/commitizen/cz-conventional-changelog).

Keep in mind to use the same structure for both `Commitlint` and `Commitizen`.

### Lint-Staged

In this section we will discuss about the [Lint-Staged](https://github.com/lint-staged/lint-staged) configuration.

Under Maintenance.

### Husky

In this section we will discuss about the [Husky](https://github.com/typicode/husky) configuration.

Under Maintenance.
