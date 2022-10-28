# @fortis/api

This is the API client using [Feathers](https://docs.feathersjs.com/) to handle authentication and data

## Installation

In the monorepo, declare the package in your package.json with

```json
{
  "dependencies": {
    "@fortis/api": "file:../api"
  }
}
```

and run `npm install`

## Usage

### Browser

You can initialize the API client (e.g. in a file called `api.ts`) as follows:

```ts
import { init } from '@fortis/api'

export * from '@fortis/api'

export const api = init({
  fetch: window.fetch.bind(window),
  root: 'https://api.sandbox.fortis.tech/v1', // process.env.API_ROOT as string,
  apiDomain: 'bitfaceincbqox1k.sandbox.zeamster.com', // process.env.API_DOMAIN as string,
  developerId: 'ZUGvBqAk', // process.env.API_DEVELOPER_ID as string,
})
```

With the common environment variables (see `.env.template`) and a fallback to `node-fetch` for testing like this:

```ts
export const api = init({
  fetch:
    typeof window !== 'undefined' && window.fetch
      ? window.fetch.bind(window)
      : require('node-fetch'),
  root: process.env.API_ROOT as string,
  apiDomain: process.env.API_DOMAIN as string,
  developerId: process.env.API_DEVELOPER_ID as string,
})
```

### React Native

In React Native, the global `fetch` and async storage should be added:

```ts
import { init } from '@fortis/api'
import { AsyncStorage } from 'react-native'

export * from '@fortis/api'

export const api = init({
  fetch,
  storage: AsyncStorage,
  root: process.env.API_ROOT as string,
  apiDomain: process.env.API_DOMAIN as string,
  developerId: process.env.API_DEVELOPER_ID as string,
})
```

### Common client use

After initialization the client can be used like this:

```ts
import { api } from './api'

async function doSomething() {
  // Log in with username and password
  const { accessToken } = await api.authenticate({ email, password })

  // Then we can make authenticated requests, e.g. getting the current user information
  const user = await api.service('users').get('me')

  // Log out
  await api.logout()
}
```

### Pagination

Services that user pagination can be used by setting `paginate: true` and adding the `query.page` property (if not set, default pagination will be used)

```ts
// Get the page object with default pagination
const page = await api.service('transactions').find({
  paginate: true,
})

page.list // -> data
page.pagination // -> page information
page.links // -> First, next and last page links

// Get the second page at a page size of 5
const page = await api.service('transactions').find({
  paginate: true,
  query: {
    page: {
      number: 3,
      size: 5,
    },
  },
})
```

## OpenAPI spec

To generate the latest types, update `scripts/oas.json` with the OpenAPI specification.
The types can be generated running

```sh
npm run oas
```

> **Important:** Do not modify `scripts/oas.json` and `src/oas.ts` manually since changes will get lost.
