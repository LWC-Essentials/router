module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "plugins": ["@lwc/eslint-plugin-lwc"],
    "rules": {
        "@lwc/lwc/no-deprecated": "error",
        "@lwc/lwc/valid-api": "error",
    }
};
