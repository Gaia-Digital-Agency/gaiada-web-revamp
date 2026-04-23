import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_services_block" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_block" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_services_block_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_services_block_id_seq') PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)
}
