import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
//@ts-ignore
import { Elysia } from 'elysia';
import { Pool, types } from 'pg';
import { consoleColor } from '../constants/consoleColor.constant';
import { DB } from '../types/kysely/db.type';

export let kysely: Kysely<DB>;

export async function KyselyHelper(elysia: Elysia): Promise<void> {
  try {
    types.setTypeParser(types.builtins.NUMERIC, function (val: string) {
      if (val !== undefined && val !== null) {
        return Number(val);
      }
      return val;
    });

    const pgDialect = new PostgresDialect({
      pool: new Pool({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_NAME,
      }),
    });

    const db = new Kysely<DB>({
      dialect: pgDialect,
      plugins: [new ParseJSONResultsPlugin()],
      log(event) {
        if (process.env.DB_LOGGING === '1' && event.level === 'query') {
          console.log(event.query.sql);
          console.log(event.query.parameters);
        }
      },
    });
    console.info(consoleColor.FG.GREEN, '[APP] Postgres: connection established');

    kysely = db;

    elysia.onStop(async () => {
      await db.destroy();
    });
  } catch (e) {
    console.info(consoleColor.FG.RED, '[APP] Postgres: failed to establish database connection. See details:');
    console.error(e);
    process.exit(1);
  }
}
