import { Elysia } from 'elysia';

export function UserRouter(app): Elysia<any, any, any, any, any, any, any, any> {
  return app.post('/login', function (test) {
    test.set.status = 201;
    return 'connect';
  });
}
