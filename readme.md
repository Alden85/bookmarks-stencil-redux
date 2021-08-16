# Stencil App Starter Toolkit

## Getting Started

To start building, clone this repo:

1. Open a terminal window and navigate to project directory.Navigate to `src/db`,run the json-server, use `npx` command if json-server is not installed globally. This will start the database json-server.

```bash
npx json-server --watch db.json
```

2. Open another terminal window and navigate to the projects directory and run `npm start` to start the development server.

```bash
npm start
```

## Production

To build for production, run:

```bash
npm run build
```

A production build includes:

- Minified code bundles
- Generated Service workers
- App manifest

## Unit Tests

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Hosting

Apps should be hosted on through HTTPS, and if possible, through a provider that supports HTTP2.
One provider that does support this is [Firebase Hosting](https://firebase.google.com/docs/hosting/).
