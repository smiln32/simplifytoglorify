import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', 'node_modules', 'public']),

  // Browser-side React application code
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Classic, battle-tested hook rules. The newer React Compiler rules in
      // react-hooks v7's "recommended-latest" preset are intentionally omitted —
      // they flag valid existing patterns (setState in effects, etc.).
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Node-side code: serverless functions, build scripts, and config files
  {
    files: [
      'netlify/functions/**/*.{ts,mts}',
      'scripts/**/*.{js,mjs,cjs}',
      '*.{js,mjs,cjs,ts}',
    ],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },

  // Config files (e.g. tailwind.config.js) legitimately use CommonJS require().
  {
    files: ['*.config.{js,cjs,ts}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
])
