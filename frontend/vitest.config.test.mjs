import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from './vitest.config.mjs';

// frontend/vitest.config.mjs

const projectRoot = fileURLToPath(new URL('./', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': projectRoot,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx,mjs}'],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'coverage',
      '**/e2e/**',
    ],
    reporters: 'default',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
});

// frontend/vitest.config.test.mjs

describe('vitest.config.mjs', () => {
  const expectedRoot = fileURLToPath(new URL('./', import.meta.url));

  it('exports a config object with test settings', () => {
    expect(config).toBeTypeOf('object');
    expect(config).toHaveProperty('test');
    expect(config.test).toBeTypeOf('object');
  });

  it('sets jsdom environment and enables globals', () => {
    expect(config.test.environment).toBe('jsdom');
    expect(config.test.globals).toBe(true);
  });

  it('includes standard test file patterns (including .mjs) and excludes common folders', () => {
    const include = config.test.include ?? [];
    const exclude = config.test.exclude ?? [];
    const includeStr = JSON.stringify(include);

    expect(includeStr).toMatch(/mjs/);
    expect(includeStr).toMatch(/test/);
    expect(includeStr).toMatch(/spec/);

    expect(exclude).toContain('node_modules');
    expect(exclude).toContain('.next');
  });

  it('configures coverage with v8 and common reporters', () => {
    const coverage = config.test.coverage;
    expect(coverage.provider).toBe('v8');
    const reporters = coverage.reporter ?? [];
    expect(reporters).toEqual(expect.arrayContaining(['text', 'html', 'lcov']));
  });

  it("aliases '@' to the project root (frontend directory)", () => {
    const alias = config.resolve?.alias ?? {};
    const actual = alias['@'];
    // Normalize to avoid platform differences
    const normActual = path.normalize(actual);
    const normExpected = path.normalize(expectedRoot);
    expect(typeof actual).toBe('string');
    expect(normActual).toBe(normExpected);
  });

  it('uses the default reporter for test output', () => {
    const reporters = config.test.reporters;
    if (Array.isArray(reporters)) {
      expect(reporters).toContain('default');
    } else {
      expect(reporters).toBe('default');
    }
  });
});
