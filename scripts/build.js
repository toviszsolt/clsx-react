#!/usr/bin/env node
import { build } from 'esbuild';
import { copyFileSync, mkdirSync, readdirSync, rmSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
const src = resolve(root, 'src');
const dist = resolve(root, 'dist');

const entries = [
  { in: 'src/jsx-runtime.js', name: 'jsx-runtime' },
  { in: 'src/jsx-dev-runtime.js', name: 'jsx-dev-runtime' },
];

async function buildAll() {
  try {
    rmSync(dist, { recursive: true, force: true });
  } catch (err) {
    // ignore
  }

  mkdirSync(dist, { recursive: true });

  for (const e of entries) {
    // ESM build
    await build({
      entryPoints: [e.in],
      outfile: `${dist}/${e.name}.js`,
      bundle: true,
      minify: true,
      format: 'esm',
      target: ['es2019'],
      external: ['react'],
    });

    // CJS build
    await build({
      entryPoints: [e.in],
      outfile: `${dist}/${e.name}.cjs`,
      bundle: true,
      minify: true,
      format: 'cjs',
      target: ['node14'],
      external: ['react'],
    });
  }

  // copy types file to dist if present
  try {
    copyFileSync(resolve(src, 'clsx-react.d.ts'), resolve(dist, 'clsx-react.d.ts'));
    console.log('Copied types to dist/clsx-react.d.ts');
  } catch (err) {
    console.warn('No types file copied (clsx-react.d.ts not found at project root)');
  }

  console.log('Build complete.');
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
