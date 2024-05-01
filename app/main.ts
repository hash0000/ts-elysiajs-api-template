import Elysia from 'elysia';
import { KyselyHelper } from './common/helper/kysely.helper';
import { UserRouter } from './modules/user/router';

async function app(): Promise<void> {
  const app = new Elysia();
  const port: number = Number(process.env.APP_PORT);

  await KyselyHelper(app);

  app.use(UserRouter);

  app.listen(port, (server) => {
    console.info(`[APP] Server listening on ${server.hostname}:${server.port}`);
  });
}

void app();
