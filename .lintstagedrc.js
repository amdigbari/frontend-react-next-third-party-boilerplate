/**
 * NOTE: Any of the commands below can be removed in case due to their usage in the project.
 * NOTE: Keep in mind that this boilerplate has configurations for all of them.
 */
module.exports = {
  '!(dist|.vscode)**/*.{md,mdx,json}': 'prettier --write',
  '!(dist|.vscode)**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --color'],
  '!(dist|.vscode)**/*.{css,scss}': ['prettier --write', 'stylelint --color'],
}
