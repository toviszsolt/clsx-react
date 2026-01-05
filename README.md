[![GitHub License](https://img.shields.io/github/license/toviszsolt/react-clsx?style=flat)](https://github.com/toviszsolt/react-clsx/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/react-clsx?style=flat&color=red)](https://www.npmjs.com/package/react-clsx) [![GitHub Repo stars](https://img.shields.io/github/stars/toviszsolt/react-clsx?color=DAAA3F)](https://github.com/toviszsolt/react-clsx/stargazers) [![Run tests](https://github.com/toviszsolt/react-clsx/actions/workflows/main.yml/badge.svg)](https://github.com/toviszsolt/react-clsx/actions/workflows/main.yml) [![codecov](https://codecov.io/gh/toviszsolt/react-clsx/branch/main/graph/badge.svg?token=IONV9YMZXG)](https://codecov.io/gh/toviszsolt/react-clsx) [![Sponsor](https://img.shields.io/static/v1?label=sponsor&message=❤&color=ff69b4)](https://github.com/sponsors/toviszsolt)

# `react-clsx`

**Stop importing `clsx` manually.**

A custom React JSX runtime that natively supports **arrays** and **objects** in the `className` prop. It automatically applies `clsx` logic at the runtime level, keeping your code clean and your imports empty.

## The Problem

```jsx
// ❌ Old way: Boilerplate everywhere
import clsx from 'clsx'; // or classnames

export const Button = ({ active, disabled }) => (
  <button className={clsx('btn', { 'btn-active': active, 'btn-disabled': disabled })}>Click me</button>
);
```

## The Solution

```jsx
// ✅ New way: Zero imports, native syntax
export const Button = ({ active, disabled }) => (
  <button className={['btn', { 'btn-active': active, 'btn-disabled': disabled }]}>Click me</button>
);
```

---

## Installation

```bash
npm install react-clsx
# or
yarn add react-clsx
# or
pnpm add react-clsx
```

> **Note:** Requires `react` >= 17.0.0.

---

## Configuration

To make this work, you need to tell your compiler to use this package as the JSX Import Source instead of the default `react`.

### 1. TypeScript (`tsconfig.json`) - **Recommended**

This handles both the compilation and the type definitions (so TS won't complain about arrays in `className`).

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react-clsx"
  }
}
```

### 2. Vite (`vite.config.ts`)

If you are using Vite, you can set it explicitly in the config:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxImportSource: 'react-clsx',
  },
});
```

### 3. Next.js / SWC

Next.js usually respects `tsconfig.json`. Ensure your `compilerOptions` are set as shown in step 1.

---

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

---

## How it works

This package wraps the standard `react/jsx-runtime` and `react/jsx-dev-runtime`. It intercepts the creation of every JSX element:

1. Checks if `className` prop exists.
2. Checks if `className` is **not** a string (array or object).
3. If so, it processes it with a bundled, lightweight version of `clsx`.
4. Passes the processed props to the original React runtime.

It adds negligible overhead (bytes) and eliminates the need to manually import and call class utilities in every single component file.

---

## TypeScript Support

This package includes a global augmentation for `React.HTMLAttributes`. Once you set `"jsxImportSource": "react-clsx"` in your `tsconfig.json`, TypeScript will automatically understand that `className` accepts arrays and objects. No extra `.d.ts` configuration needed!

---

## Guidelines

See [Code of Conduct](./CODE_OF_CONDUCT.md), [Contributing](./CONTRIBUTING.md), and [Security Policy](./SECURITY.md).

## License

MIT License © 2022–2024 [Zsolt Tövis](https://github.com/toviszsolt)

If you find this project useful, please consider [sponsoring me on GitHub](https://github.com/sponsors/toviszsolt), [PayPal](https://www.paypal.com/paypalme/toviszsolt), or [give the repo a star](https://github.com/toviszsolt/react-clsx).
