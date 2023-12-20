module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    /**
     * NOTE: This means that the body of the commit message must not exceed 200 characters,
     * Otherwise an error will be thrown.
     */
    'body-max-line-length': [2, 'always', 200],
  },
  ignores: [
    /**
     * NOTE: This message is the release message format and will be pushed to branches automatically.
     */
    (message) => /chore\(release\):.*\[skip release ci\]/.test(message),
  ],
}
