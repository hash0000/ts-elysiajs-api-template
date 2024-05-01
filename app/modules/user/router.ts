import jwt from '@elysiajs/jwt';
import Elysia, { t } from 'elysia';
import { HttpStatusCode } from '../../common/enums/httpStatusCode.enum';
import * as service from './service';

export function UserRouter(app: Elysia) {
  return app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.ACCESS_TOKEN_SECRET!,
        exp: process.env.ACCESS_TOKEN_EXPIRATION!,
      }),
    )
    .group('/user', function (router) {
      router.post(
        '/login',
        async function (app) {
          const serviceResponse = await service.login(app, app.body);
          app.set.status = serviceResponse.statusCode;

          if (serviceResponse.statusCode === HttpStatusCode.OK && serviceResponse?.data !== undefined) {
            const tokenPayload = { userId: serviceResponse.data.user.id, login: serviceResponse?.data.user.login };

            const accessToken = await app.jwt.sign(tokenPayload);

            return {
              ...serviceResponse,
              data: {
                ...serviceResponse.data,
                accessToken,
              },
            };
          }

          return serviceResponse;
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
