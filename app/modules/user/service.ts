import { verify } from 'argon2';
import { Kysely } from 'kysely';
import { HttpStatusCode } from '../../common/enums/httpStatusCode.enum';
import { DB } from '../../common/types/kysely/db.type';
import { UserRowType } from '../../common/types/kysely/user.type';
import { MainResponseType } from '../../common/types/mainResponse.type';
import * as repository from './repository';
import { ILoginSchema } from './schemas/login.schema';

export async function login(
  db: Kysely<DB>,
  schema: ILoginSchema,
): Promise<{
  statusCode: HttpStatusCode;
  data?: {
    user: Omit<UserRowType, 'password'>;
  };
}> {
  const userEntity = await repository.selectOneByLogin(db, schema.login);

  if (userEntity === undefined || (await verify(userEntity.password, schema.password)) === false) {
    return {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...strippedUserEntity } = userEntity;

  return {
    statusCode: HttpStatusCode.OK,
    data: {
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
