import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';
import { UserRouter } from './modules/user/router';

async function app(): Promise<void> {
  const app = new Elysia();
  const port: number = Number(process.env.APP_PORT);

  app.use(
    jwt({
      name: 'jwt',
      secret: 'tesssst',
    }),
  );

  app.use(UserRouter);

  app.listen(port, (server) => {
    console.info(`[APP] Server listening on ${server.hostname}:${server.port}`);
  });
}

void app();
