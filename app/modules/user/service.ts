import { verify } from 'argon2';
import { Kysely } from 'kysely';
import { HttpStatusCode } from '../../common/enum/httpStatusCode.enum';
import { DB } from '../../common/type/kysely/db.type';
import { UserRowType } from '../../common/type/kysely/user.type';
import { MainResponseType } from '../../common/type/mainResponse.type';
import * as repository from './auth.repository';
import { ILoginSchema } from './schemas/login.schema';

export async function login(
  db: Kysely<DB>,
  schema: ILoginSchema,
): Promise<{
  statusCode: HttpStatusCode;
  data?: {
    sessionId: string;
    user: Omit<UserRowType, 'password'>;
  };
}> {
  const userEntity = await repository.selectOneByLogin(db, schema.login);

  if (userEntity === undefined || (await verify(userEntity.password, schema.password)) === false) {
    return {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
  }

  const sessionEntity = await repository.insertWhitelistToken(db, userEntity.id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...strippedUserEntity } = userEntity;

  return {
    statusCode: HttpStatusCode.OK,
    data: {
      sessionId: sessionEntity.id,
      user: strippedUserEntity,
    },
  };
}

export async function getMe(db: Kysely<DB>, id: string): Promise<MainResponseType> {
  const userEntity = await repository.selectOneById(db, id);

  if (userEntity === undefined) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
  }

  return {
    statusCode: HttpStatusCode.OK,
    data: userEntity,
  };
}
