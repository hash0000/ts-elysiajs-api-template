import { Kysely } from 'kysely';
import { DB } from '../../common/type/kysely/db.type';
import { UserRowType } from '../../common/type/kysely/user.type';

export async function selectOneByLogin(db: Kysely<DB>, login: string): Promise<UserRowType | undefined> {
  return await db.selectFrom('user').where('login', '=', login).selectAll().executeTakeFirst();
}

export async function selectOneById(db: Kysely<DB>, id: string): Promise<Omit<UserRowType, 'password'> | undefined> {
  return await db.selectFrom('user').where('id', '=', id).select(['user.id', 'user.login', 'user.createdAt']).executeTakeFirst();
}

export async function insertWhitelistToken(trx: Kysely<DB>, userId: string): Promise<{ id: string }> {
  return await trx.insertInto('whitelistToken').values({ userId }).returning('whitelistToken.id').executeTakeFirstOrThrow();
}

export async function deleteWhitelistTokenByUser(db: Kysely<DB>, userId: string): Promise<void> {
  await db.deleteFrom('whitelistToken').where('whitelistToken.userId', '=', userId).execute();
  return;
}

export async function countUniversal(db: Kysely<DB>, column: keyof UserRowType, value: string, notId?: string, notIdArr?: string[]): Promise<number> {
  if (notId !== undefined) {
    const result = await db
      .selectFrom('user')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', '!=', notId)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  if (notIdArr !== undefined) {
    const result = await db
      .selectFrom('user')
      .select(({ fn }) => [fn.count<bigint>('id').as('count')])
      .where((eb) => eb.and([eb(column, '=', value), eb('id', 'not in', notIdArr)]))
      .executeTakeFirstOrThrow();

    return Number(result.count);
  }

  const result = await db
    .selectFrom('user')
    .select(({ fn }) => [fn.count<bigint>('id').as('count')])
    .where(column, '=', value)
    .executeTakeFirstOrThrow();

  return Number(result.count);
}
