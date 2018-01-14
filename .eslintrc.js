module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "browser": true,
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        'no-unused-vars': ["error"],
        'no-cond-assign': 0,
    		'no-console': 0,
    }
};
