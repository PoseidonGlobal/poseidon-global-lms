import { defineConfig } from 'vitest/config';

export default {
  test: { environment: 'node', coverage: { reporter: ['text', 'lcov'] } },
};
