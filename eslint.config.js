import js from '@eslint/js';
import typescript from 'typescript-eslint';

export default [
  // Global ignores first
  {
    ignores: [
      'example/**/*',
      'dist/**/*',
      'node_modules/**/*',
      '*.js.map',
      '*.d.ts.map',
    ],
  },

  // Base configs
  js.configs.recommended,
  ...typescript.configs.recommended,

  // TypeScript specific rules
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },
];
