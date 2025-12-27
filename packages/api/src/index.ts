import { createApp } from './app';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${port}`);
});
