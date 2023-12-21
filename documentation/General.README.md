# Frontend React/Next Third-Party Boilerplate

## General Configs

### Contents

- [Typescript](#typescript)
- [ESLint](#eslint)
- [StyleLint](#stylelint)
- [Prettier](#prettier)

### Typescript

In this section we will discuss about the [Typescript](https://www.typescriptlang.org/) configuration.

Under Maintenance.

### ESLint

In this section we will discuss about the [ESLint](https://eslint.org/) configuration.

Under Maintenance.

### StyleLint

In this section we will discuss about the [StyleLint](https://stylelint.io/) configuration.

Under Maintenance.

### Prettier

In this section we will discuss about the [Prettier](https://prettier.io/) configuration.

We used prettier to unify the coding UI style, things like syntaxes and indentation. You can customize its configuration via `.prettierrc` file. For more information about the Prettier, see [here](https://prettier.io/docs/en/).

`Prettier` has been used in 3 different places:

- `ESLint` plugin inside the ESLint config file, E.g. `.eslintrc.js`. This plugin checks the codes style based on the Prettier config whenever ESLint has been run on a file.
- `StyleLint` plugin inside the Stylelint config file, E.g. `.stylelintrc.js`. This plugin, like the ESLint one, checks the codes style based on the Prettier config whenever StyleLint has been run on a file.
- And `Lint-Staged` config file, E.g. `.lintstagedrc.js`. In this file we used `prettier` command to unify the code styles for the `git` staged files. We will discuss when this command will run on the [Lint-Staged section](Git.README.md#lint-staged).
