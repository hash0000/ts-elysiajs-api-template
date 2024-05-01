import { Elysia, t } from 'elysia';

export function UserRouter(app: Elysia) {
  return app.group('/user', function (router) {
    router.post(
      '/login',
      async function ({ set }) {
        set.status = 323;
        return {
          data: 'hello',
        };
      },
      {
        body: t.Object({
          login: t.String(),
          password: t.String(),
        }),
      },
    );

    return router;
  });
}
