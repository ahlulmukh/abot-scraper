import js from '@eslint/js';
import typescript from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
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
