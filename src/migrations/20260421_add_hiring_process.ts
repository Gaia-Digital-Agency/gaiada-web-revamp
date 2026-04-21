import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_hiring_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hiring_process_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "number" varchar,
      "title" varchar,
      "description" varchar
    );

    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_hiring_process_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hiring_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_hiring_process_id_seq') PRIMARY KEY NOT NULL,
      "title" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_hiring_process_items_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hiring_process_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_hiring_process_items_id_seq') PRIMARY KEY NOT NULL,
      "number" varchar,
      "title" varchar,
      "_uuid" varchar,
      "description" varchar
    );

    CREATE INDEX IF NOT EXISTS "pages_blocks_hiring_process_order_idx" ON "pages_blocks_hiring_process" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hiring_process_parent_id_idx" ON "pages_blocks_hiring_process" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hiring_process_path_idx" ON "pages_blocks_hiring_process" USING btree ("_path");

    CREATE INDEX IF NOT EXISTS "pages_blocks_hiring_process_items_order_idx" ON "pages_blocks_hiring_process_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hiring_process_items_parent_id_idx" ON "pages_blocks_hiring_process_items" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiring_process_order_idx" ON "_pages_v_blocks_hiring_process" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiring_process_parent_id_idx" ON "_pages_v_blocks_hiring_process" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiring_process_path_idx" ON "_pages_v_blocks_hiring_process" USING btree ("_path");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiring_process_items_order_idx" ON "_pages_v_blocks_hiring_process_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiring_process_items_parent_id_idx" ON "_pages_v_blocks_hiring_process_items" USING btree ("_parent_id");

    ALTER TABLE "pages_blocks_hiring_process"
      ADD CONSTRAINT "pages_blocks_hiring_process_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;

    ALTER TABLE "pages_blocks_hiring_process_items"
      ADD CONSTRAINT "pages_blocks_hiring_process_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_hiring_process"("id") ON DELETE CASCADE;

    ALTER TABLE "_pages_v_blocks_hiring_process"
      ADD CONSTRAINT "_pages_v_blocks_hiring_process_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;

    ALTER TABLE "_pages_v_blocks_hiring_process_items"
      ADD CONSTRAINT "_pages_v_blocks_hiring_process_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_hiring_process"("id") ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hiring_process_items" DROP CONSTRAINT IF EXISTS "pages_blocks_hiring_process_items_parent_id_fk";
    ALTER TABLE "pages_blocks_hiring_process" DROP CONSTRAINT IF EXISTS "pages_blocks_hiring_process_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_hiring_process_items" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hiring_process_items_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_hiring_process" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hiring_process_parent_id_fk";
    DROP TABLE IF EXISTS "_pages_v_blocks_hiring_process_items";
    DROP TABLE IF EXISTS "_pages_v_blocks_hiring_process";
    DROP TABLE IF EXISTS "pages_blocks_hiring_process_items";
    DROP TABLE IF EXISTS "pages_blocks_hiring_process";
    DROP SEQUENCE IF EXISTS "_pages_v_blocks_hiring_process_id_seq";
    DROP SEQUENCE IF EXISTS "_pages_v_blocks_hiring_process_items_id_seq";
  `)
}
