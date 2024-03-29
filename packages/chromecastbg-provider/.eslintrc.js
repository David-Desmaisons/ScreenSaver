module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ["jest"],
  rules: {
  },
  overrides: [
		{
			env: {
				jest: true
			}
		}
	]
}
