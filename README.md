# Raul Alejandro Gomez Arceo

# The Broker

## About

This web app is made with the following stack

- [Remix](https://remix.run/docs).
- [Material UI/Joy](https://mui.com/joy-ui/getting-started/).
- [Tailwind](https://tailwindcss.com/).
- [Recharts](https://recharts.org/en-US/).

## How to run

1.- Create a `.env` file with the following content

```
MARKETSTACK_API_URL="http://api.marketstack.com/v1"
MARKETSTACK_API_KEY=" your API from marketstack "
TEST_API=false
```

If you want to save on API requests and prefer to fetch fake data set `TEST_API=true` in `.env` file

2.- Install dependancies (works with `Node > v18`)

```sh
npm run install
```

3.- Run in Development run from your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Tests

For runing tests, run from your terminal:

```sh
npm run test
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
