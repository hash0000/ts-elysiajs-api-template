import { Kysely } from 'kysely';
import { DB } from '../../common/types/kysely/db.type';
import { UserRowType } from '../../common/types/kysely/user.type';

export async function selectOneByLogin(db: Kysely<DB>, login: string): Promise<UserRowType | undefined> {
  return await db.selectFrom('user').where('login', '=', login).selectAll().executeTakeFirst();
}

export async function selectOneById(db: Kysely<DB>, id: string): Promise<Omit<UserRowType, 'password'> | undefined> {
  return await db.selectFrom('user').where('id', '=', id).select(['user.id', 'user.login', 'user.createdAt']).executeTakeFirst();
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
