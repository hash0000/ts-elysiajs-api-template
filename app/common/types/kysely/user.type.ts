import { Insertable, Selectable, Updateable } from 'kysely';
import { User } from './db.type';

export type UserRowType = Selectable<User>;
export type InsertableUserRowType = Insertable<User>;
export type UpdateableUserRowType = Updateable<User>;
