module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true // <--- added here since we want to take in the consideration
                     // of we are using node, for correct linting results
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};