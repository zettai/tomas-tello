module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['eslint-plugin-prettier'],
  extends: ['plugin:prettier/recommended', 'eslint:recommended', 'plugin:vue/essential', 'plugin:import/warnings'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'],
    'linebreak-style': 'off',
    'import/no-unresolved': 0,
    'import/no-unassigned-import': 0,
    semi: ['error', 'never'],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
}
