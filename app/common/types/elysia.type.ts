import Elysia from 'elysia';
import { Kysely } from 'kysely';
import { DB } from './kysely/db.type';

export interface ElysiaApp extends Elysia {
  decorator: {
    decorator: {
      kysely: Kysely<DB>;
    };
  };
}
