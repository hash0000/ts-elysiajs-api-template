import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'uuid', (col) =>
      col
        .primaryKey()
        .notNull()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('login', 'varchar(6)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('loan')
    .addColumn('id', 'uuid', (col) =>
      col
        .primaryKey()
        .notNull()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('numberOfContract', 'varchar(63)', (col) => col.notNull())
    .addColumn('totalAmount', 'decimal(13, 2)', (col) => col.notNull())
    .addColumn('percentOfLoan', 'decimal(5, 2)', (col) => col.notNull())
    .addColumn('gettingLoanDate', 'timestamp', (col) => col.notNull())
    .addColumn('paymentDay', 'smallint', (col) => col.notNull())
    .addColumn('loanExpirationDate', 'timestamp', (col) => col.notNull())
    .addColumn('payment', 'decimal(13, 2)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('userId', 'uuid', (col) => col.references('user.id').onDelete('cascade').notNull())
    .execute();

  await db.schema
    .createTable('project')
    .addColumn('id', 'uuid', (col) =>
      col
        .primaryKey()
        .notNull()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('projectName', 'varchar(255)', (col) => col.notNull())
    .addColumn('priceOfProject', 'decimal(13, 2)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('forwardContract')
    .addColumn('id', 'uuid', (col) =>
      col
        .primaryKey()
        .notNull()
        .defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('numberOfContract', 'varchar(63)', (col) => col.notNull())
    .addColumn('projectName', 'varchar(255)', (col) => col.notNull())
    .addColumn('percentOfContractShare', 'decimal(5, 2)', (col) => col.notNull())
    .addColumn('priceOfPurchase', 'decimal(15, 6)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('userId', 'uuid', (col) => col.references('user.id').onDelete('cascade').notNull())
    .addColumn('projectId', 'uuid', (col) => col.references('project.id').onDelete('cascade').notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').cascade().execute();
  await db.schema.dropTable('loan').cascade().execute();
  await db.schema.dropTable('project').cascade().execute();
  await db.schema.dropTable('forwardContract').cascade().execute();
}
