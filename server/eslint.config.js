import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    {
        rules:{
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
            "prefer-template": "error",
            "semi": ["error", "always"],
            "no-multi-spaces": "error",
            "quotes": ["error", "double"]
        }
    }
];