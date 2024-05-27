import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: { globals: globals.browser }
    },
    pluginJs.configs.recommended,
    pluginReactConfig,
    {
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    {
        ignores:[
            "node_modules/",
            "dist/"
        ]
    },
    {
        rules:{
            "react/react-in-jsx-scope": "off",
            "react/jsx-indent": ["error", 4],
            "indent": ["error", 4],
            "no-duplicate-imports": "error",
            "no-use-before-define": "error",
            "camelcase": "error",
            "default-case": "error",
            "default-case-last": "error",
            "max-params": ["error", 4],
            "no-var": "error",
            "prefer-const": "error",
            "prefer-spread": "error",
            "prefer-template": "error"
        },
    }
];