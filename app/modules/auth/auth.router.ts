import { Elysia, t } from 'elysia';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { UseToken } from '../../common/middleware/auth.middleware';
import { JwtPayloadType } from '../../common/type/jwtPayload.type';
import { ElysiaApp } from '../../common/types/elysia.type';
import * as service from './auth.service';
import { ILoginSchema, LoginSchema } from './schemas/login.schema';

export function UserRouter(app: ElysiaApp): Elysia<any, any, any, any, any, any, any, any> {
  return app.post(
    '/login',
    async function (app) {
      const serviceResponse = await service.login(this.kysely, request.body);

      if (serviceResponse.statusCode === HttpStatusCode.OK) {
        const newT = await app..sign(params);

        const accessToken = await reply.jwtSign(
          { userId: serviceResponse.data?.user.id, login: serviceResponse.data?.user.login, sessionId: serviceResponse.data?.sessionId },
          { expiresIn: undefined },
        );

        app.set.status = serviceResponse.statusCode;

        return {
          ...serviceResponse,
          data: {
            ...serviceResponse.data,
            sessionId: undefined,
            accessToken,
          },
        };
      }
    },
    {
      body: t.Object({
        login: t.String(),
        password: t.String(),
      }),
    },
  );
}
