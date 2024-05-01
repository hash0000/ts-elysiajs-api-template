import { Kysely, PostgresDialect } from 'kysely';
//@ts-ignore
import { Pool } from 'pg';
import { consoleColor } from '../constant/consoleColor.constant';
import { seedUserSeed } from '../seeds/seedUser.seed';
import { DB } from '../types/kysely/db.type';

async function seedDb() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_NAME,
      }),
    }),
  });

  try {
    await db.executeQuery(await seedUserSeed(db));
  } catch (e) {
    console.error(e);
  }

  console.info(consoleColor.FG.GREEN, '[APP] Postgres: seeded');

  await db.destroy();
}

seedDb();
