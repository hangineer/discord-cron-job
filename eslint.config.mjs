// @ts-nocheck
import { defineConfig } from "eslint/config";
import configPrettier from "eslint-config-prettier";
import config from "eslint-config-xo";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  config,
  {
    files: ["**/*.{js,mjs,ts,tsx,vue}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      semi: "off",
      quotes: ["error", "double"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    }
  },
  configPrettier,
]);
