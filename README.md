<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: pocketbase-nuxt
- Description: My new Nuxt module
-->

# Pocketbase Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module that provides seamless integration with PocketBase, offering composables for authentication, real-time data, and simplified API interactions.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/fayazara/pocketbase-nuxt?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🔥 **Full TypeScript Support**
- 🔒 **Authentication Utilities**
  - Email/Password authentication
  - OAuth providers support
  - Auto-refresh tokens
  - Persistent auth state
- 🎯 **Simple Setup** - Just install and configure
- ⚡️ **Composables** - Intuitive composables for PocketBase operations
- 🛠 **Dev Tools Integration** - Access PocketBase Admin directly from Nuxt DevTools
- 📦 **Zero Configuration** - Works out of the box with sensible defaults

## Quick Setup

1. Install the module:

```bash
# npm
npm install pocketbase-nuxt

# yarn
yarn add pocketbase-nuxt

# pnpm
pnpm add pocketbase-nuxt
```

2. Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['pocketbase-nuxt'],
  pocketbase: {
    url: 'http://127.0.0.1:8090' // Your PocketBase URL
  }
})
```

## Usage

### Authentication

```vue
<script setup lang="ts">
const { user, login, signup, signOut } = usePocketbaseAuth()

// Login
await login({
  email: 'user@example.com',
  password: 'password123'
})

// Sign up
await signup({
  email: 'newuser@example.com',
  password: 'password123',
  passwordConfirm: 'password123',
  name: 'New User'
})

// OAuth Authentication
await handleOAuth('google', {
  redirectPath: '/dashboard',
  onSuccess: () => {
    // Handle successful authentication
  }
})
</script>

<template>
  <div>
    <div v-if="user">
      Welcome, {{ user.name }}!
      <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>
```

### Direct PocketBase Access

```vue
<script setup lang="ts">
const { pb } = usePocketbase()

// Use any PocketBase client method
const records = await pb.collection('posts').getList(1, 20)
</script>
```


## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch
```

## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pocketbase-nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/pocketbase-nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/pocketbase-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/pocketbase-nuxt
[license-src]: https://img.shields.io/npm/l/pocketbase-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/pocketbase-nuxt
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
