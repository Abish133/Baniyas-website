import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

// Unit tests (npm test). Browser tests live in tests/e2e (npm run test:e2e).
export default defineConfig({
  resolve: {
    alias: {
      '@': here('./src'),
      // Next.js' "server-only" guard throws outside a server build; tests run in plain Node.
      'server-only': here('./tests/unit/server-only-stub.js'),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.js'],
    environment: 'node',
  },
});
