![Cover Image](cover.png)

[![GitHub License](https://img.shields.io/github/license/toviszsolt/clsx-react)](https://github.com/toviszsolt/clsx-react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/clsx-react?style=flat&color=red)](https://www.npmjs.com/package/clsx-react) [![GitHub Repo stars](https://img.shields.io/github/stars/toviszsolt/clsx-react?color=DAAA3F)](https://github.com/toviszsolt/clsx-react/stargazers) [![Run tests](https://github.com/toviszsolt/clsx-react/actions/workflows/test.yml/badge.svg)](https://github.com/toviszsolt/clsx-react/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/toviszsolt/clsx-react/branch/main/graph/badge.svg?token=IJWL1A7SXQ)](https://codecov.io/gh/toviszsolt/clsx-react) [![Sponsor](https://img.shields.io/static/v1?label=sponsor&message=❤&color=ff69b4)](https://github.com/sponsors/toviszsolt)

# `clsx-react` - JSX Super Power for `className`

**Stop importing `clsx` or `classnames` manually.**

`clsx-react` is a zero dependency, super tiny, custom React JSX runtime that natively supports **arrays** and **objects** in the `className` prop. It automatically applies `clsx` logic at the runtime level, keeping your code clean and your imports empty.

## The Problem

You need conditional class names in your React components, but importing and using `clsx` or `classnames` everywhere leads to repetitive boilerplate code.

```jsx
// ❌ Old way: Boilerplate everywhere
import clsx from 'clsx'; // or classnames

export const Button = ({ active, disabled }) => (
  <button className={clsx('btn', { 'btn-active': active, 'btn-disabled': disabled })}>Click me</button>
);
```

## The Solution

No more imports or boilerplate. Just use arrays and objects directly in `className`. Strings still work as usual.

```jsx
// ✅ New way: Zero imports, native syntax
export const Button = ({ active, disabled }) => (
  <button className={['btn', { 'btn-active': active, 'btn-disabled': disabled }]}>Click me</button>
);
```

## Installation

```bash
npm install clsx-react
# or
yarn add clsx-react
# or
pnpm add clsx-react
```

> **Note:** Requires `react` >= 17.0.0.

## Configuration

To make this work, you need to tell your compiler to use this package as the JSX Import Source instead of the default `react`. Let me guide you through the setup for various environments.

### 1. TypeScript (`tsconfig.json`) / JavaScript (`jsconfig.json`) - **Recommended**

This handles both the compilation and the type definitions (so TS won't complain about arrays in `className`).

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "clsx-react"
  }
}
```

---

### 2. Vite (`vite.config.ts`) / Esbuild

If you are using Vite, you can set it explicitly in the config:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxImportSource: 'clsx-react',
  },
});
```

---

### 3. Next.js / SWC / Turbopack

Next.js usually respects `tsconfig.json` or `jsconfig.json`. Ensure your `compilerOptions` are set as shown in step 1.

---

### 4. Babel / Webpack

If you are using Babel, you can set the `jsxImportSource` in your Babel config:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "clsx-react"
      }
    ]
  ]
}
```

## Usage Examples

Once configured, you can use `className` just like you would use the `clsx` function arguments.

### Conditional Classes (Object)

```jsx
<div className={{ hidden: isHidden, flex: isFlex }}>...</div>
```

### Arrays

```jsx
<div className={['text-lg', 'font-bold', isError && 'text-red-500']}>...</div>
```

### Mixed & Nested

```jsx
<div className={['p-4', { 'bg-gray-100': !dark }, ['shadow-md', 'rounded']]}>...</div>
```

### Standard String (Still works)

```jsx
<div className="just-a-string">...</div>
```

## How it works

This package wraps the standard `react/jsx-runtime` and `react/jsx-dev-runtime`. It intercepts the creation of every JSX element:

1. Checks if `className` prop exists.
2. Checks if `className` is **not** a string (array or object).
3. If so, it processes it with a bundled, lightweight version of `clsx`.
4. Passes the processed props to the original React runtime.

It adds negligible overhead (bytes) and eliminates the need to manually import and call class utilities in every single component file.

## TypeScript Support

This package includes a global augmentation for `React.HTMLAttributes`. Once you set `"jsxImportSource": "clsx-react"` in your `tsconfig.json`, TypeScript will automatically understand that `className` accepts arrays and objects. No extra `.d.ts` configuration needed!

## Guidelines

See [Code of Conduct](./CODE_OF_CONDUCT.md), [Contributing](./CONTRIBUTING.md), and [Security Policy](./SECURITY.md).

## License

MIT License © 2026 [Zsolt Tövis](https://github.com/toviszsolt)

If you find this project useful, please consider [sponsoring me on GitHub](https://github.com/sponsors/toviszsolt), [PayPal](https://www.paypal.com/paypalme/toviszsolt), or [give the repo a star](https://github.com/toviszsolt/clsx-react).
