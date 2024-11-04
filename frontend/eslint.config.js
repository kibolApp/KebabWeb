import blumilkDefault from '@blumilksoftware/eslint-config'

export default [
  ...blumilkDefault,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        localStorage: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      'no-unsupported-features/node-builtins': 'off',
    },
  },
]
