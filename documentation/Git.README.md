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

We've talked about ESLint, StyleLint, and Prettier in the [General Config section](General.README.md). Now, its time to use those configs.

One of the good places to use those helper tools is when we're committing the changes to the git. To do so, we can use Lint-Staged which will create the `lint-staged` cmd command. This command will run some commands, based on the configuration in the its config file, E.g. `.lintstagedrc.js`, on the [git staged files](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository). We will discuss about running this command in the [Husky section](#husky).

In this repository, we added below configurations:

- Running `Prettier` to almost every files to unify the coding styles.
- Running `ESLint` on the files with one of `js,jsx,ts,tsx` formats to check for possible vulnerabilities in the scripts.
- Running `StyleLint` on the files with one of `css,scss` formats to check for possible vulnerabilities in the styles.

For more information about the `Lint-Staged`, see the [documentation](https://github.com/lint-staged/lint-staged).

### Husky

In this section we will discuss about the [Husky](https://github.com/typicode/husky) configuration.

Now that we prepared the Commitlint, Typescript, ESLint, StyleLint, Prettier, and the Lint-Staged, its time to talk about using them in appropriate time.

We've already added the usage of the ESLint, StyleLint, and the Prettier inside the Lint-Staged, and also we talked that the Lint-Staged will run the configured commands on the git staged files. We also said that Commitlint will make sure the commit message will follow the right structure.

With those in mind, we can result that:

- `type-check` and `Lint-Staged` should run `before committing changes` the git and prevent the committing flow in case of any error.
- `Commitlint` should also run `before committing changes` to make sure commit message follows the structure and prevent committing in case of any issue.

To do so, we used `Husky`. Husky is tool that can run different commands in different steps of git flow. For more information about the Husky, see the [documentation](https://github.com/typicode/husky).

In order to apply above configuration via husky, follow these two steps:

1. You Should add commands to the `.git/hooks` directory for every user. This directory is gitignored and its not a good idea to add them separately for any user. To solve this, a good place to do this is via `prepare` step in the `package.json` file. For more information about this step, see [here](https://docs.npmjs.com/cli/v10/using-npm/scripts).

   ```json
   // package.json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

2. You have to add husky commands in the `husky` directory. Husky will use this directory to find commands that should be added to the `.git/hooks` directory. We added two different commands, One for the linting and one for the commit message.

   // pre-commit file

   ```sh
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    yarn type-check && yarn lint-staged
   ```

   // commit-msg file

   ```sh
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    yarn commitlint --edit $1
   ```

   <sub>The first line in these files is based on the [husky documentation](https://github.com/typicode/husky).</sub>
