# oneco-ui

For all tasks:

```
# ONLY run this step if you are setting up development
cp .env.template web/.env
# ONLY run this step if you are setting up production
cp .env.production web/.env
cd web
npm install
```

## Development server

To start the development server run

```
npm start
```

The development server will be available at http://localhost:9000

## Production build

```
npm run build
```

The production files to deploy will be available in the `dist` folder.
Note that for routing to work, all unknown paths (404s) should point to `index.html`.
