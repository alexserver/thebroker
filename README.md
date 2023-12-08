# The Broker

**Show me the money!**

![Show me the money!](./public/shmthm1.gif)

**SHOW MEEEE THE MOOOOOONEEEEEEY**

![SHOW     ME     THE     MOOOOONEEEEEEEEY!](./public/shmthm2.gif)

## About

This is a marketstack API visor.
It fetches real data from [marketstack.com](https://marketstack.com/) API and exposes a short list of many stock market tickers.

You can use this web app and host in your server with your own marketstack API keys.

## Tech Stack

This web app is made with the following stack

- [Remix](https://remix.run/docs).
- [Material UI/Joy](https://mui.com/joy-ui/getting-started/).
- [Tailwind](https://tailwindcss.com/).
- [Recharts](https://recharts.org/en-US/).

## How to run

1.- Create a `.env` file with the following content

```
MARKETSTACK_API_URL="http://api.marketstack.com/v1"
MARKETSTACK_API_KEY="[your API from marketstack]"
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

### Collaborate

Any issue you find, make an issue through github, send a PR, or send me a mail to [alejandro@gomezarceo.mx](mailto:alejandro@gomezarceo.mx)
