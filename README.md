# The Broker

A minimalist UI for the stock market info

## Inspiration

This app was made out of a code challenge, a home assignment, and I liked enough to make it OSS and use it as a demo for my personal portfolio.

This Web app is made with [NextJs](https://nextjs.org/), and uses the API of (Marketstack)[https://marketstack.com/].

## Getting Started

First, create an `.env` file in your project directory, and add the following variables:

```
# .env file
# Marketstack API keys
MARKETSTACK_API_URL="http://api.marketstack.com/v1"
MARKETSTACK_API_KEY="<your-marketstack-api-keys>"
TEST_API=true
```

the `env` variable `TEST_API` determines wether the app will use a fake API (fake data), or the real marketstack API.

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screens

### Index

Here you can view all stock items with some pagination, you can filter also by name or symbol

![index](./docs/assets/index.png)

### Symbol detail

Here you can view the End of the day data, and some historical data in a chart. You can view data from a date range.

![index](./docs/assets/detail.png)
