import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';
import { UserRouter } from './modules/user/router';


async function app(): Promise<void> {
  const app = new Elysia().use(
    jwt({
      name: 'jwt',
      secret: 'tesssst',
    }),
  );

  const port: number = Number(process.env.APP_PORT);

  // elysiaApp.get('/hello', (test) => {
  //   test.
  // }).group('/user', UserRouter);

  //   app.setValidatorCompiler(validatorCompiler);
  //   app.setErrorHandler(errorHandler);
  //   await app.register(KyselyPlugin);

  app.group('/user', UserRouter);

  app.listen(port, (server) => {
    console.info(`[APP] Server listening on ${server.hostname}:${server.port}`);
  });
}

void app();
