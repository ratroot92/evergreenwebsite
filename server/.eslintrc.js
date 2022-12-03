module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
    env: {
        es2021: true,
        node: true,
    },
    rules: {
        'no-console': 'warn',
    },
}
