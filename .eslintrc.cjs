module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off'
  },

  overrides: [
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true
      },
      extends: ['plugin:cypress/recommended']
    }
  ]
}
