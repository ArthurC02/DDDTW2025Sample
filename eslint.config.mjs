import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import next from 'eslint-config-next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

const config = [
  // Next.js recommended (Core Web Vitals)
  ...(typeof next === 'function' ? next() : Array.isArray(next) ? next : [next]),
  // TypeScript recommended rules
  // Base JS recommended first, then TS to allow TS to override conflicting core rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', '.next', 'playwright-report', 'test-results', 'dist', 'coverage'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: false,
      },
    },
    rules: {
      // Prefer TS rule and avoid duplicate reports
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      // React 19: relax purity rule to avoid hard failures on harmless usages
      'react-hooks/purity': 'warn',
    },
  },
]

export default config
