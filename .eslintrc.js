module.exports = {
  "extends": "xo-space",
  "env": {
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "guard-for-in": [0],
    "react/jsx-uses-vars": "error",
    "no-multiple-empty-lines": 1,
    'prefer-arrow-callback': 1,
    'no-extra-parens': 1,
    'arrow-parens': [1, "as-needed"],
    'arrow-body-style': ["error", "as-needed"],
    'no-var': 2,
    'prefer-const': 2
    }
}