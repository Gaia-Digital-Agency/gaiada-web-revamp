import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- pages_blocks_career_form_block
    CREATE TABLE IF NOT EXISTS "pages_blocks_career_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "form_id" integer,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "pages_blocks_career_form_block_order_idx" ON "pages_blocks_career_form_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_career_form_block_parent_id_idx" ON "pages_blocks_career_form_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_career_form_block_path_idx" ON "pages_blocks_career_form_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_career_form_block_form_idx" ON "pages_blocks_career_form_block" USING btree ("form_id");
    ALTER TABLE "pages_blocks_career_form_block"
      ADD CONSTRAINT "pages_blocks_career_form_block_form_id_forms_id_fk"
      FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE SET NULL;
    ALTER TABLE "pages_blocks_career_form_block"
      ADD CONSTRAINT "pages_blocks_career_form_block_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;

    -- _pages_v_blocks_career_form_block
    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_career_form_block_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_career_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_career_form_block_id_seq') PRIMARY KEY NOT NULL,
      "title" varchar,
      "form_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_form_block_order_idx" ON "_pages_v_blocks_career_form_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_form_block_parent_id_idx" ON "_pages_v_blocks_career_form_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_form_block_path_idx" ON "_pages_v_blocks_career_form_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_career_form_block_form_idx" ON "_pages_v_blocks_career_form_block" USING btree ("form_id");
    ALTER TABLE "_pages_v_blocks_career_form_block"
      ADD CONSTRAINT "_pages_v_blocks_career_form_block_form_id_forms_id_fk"
      FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE SET NULL;
    ALTER TABLE "_pages_v_blocks_career_form_block"
      ADD CONSTRAINT "_pages_v_blocks_career_form_block_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;

    -- pages_blocks_map
    CREATE TABLE IF NOT EXISTS "pages_blocks_map" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "location" varchar,
      "embed_html" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
    ALTER TABLE "pages_blocks_map"
      ADD CONSTRAINT "pages_blocks_map_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;

    -- _pages_v_blocks_map
    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_map_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_map" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_map_id_seq') PRIMARY KEY NOT NULL,
      "location" varchar,
      "embed_html" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
    ALTER TABLE "_pages_v_blocks_map"
      ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;

    -- pages_blocks_visit_our_office
    CREATE TABLE IF NOT EXISTS "pages_blocks_visit_our_office" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "rich_text" jsonb,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "pages_blocks_visit_our_office_order_idx" ON "pages_blocks_visit_our_office" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_visit_our_office_parent_id_idx" ON "pages_blocks_visit_our_office" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_visit_our_office_path_idx" ON "pages_blocks_visit_our_office" USING btree ("_path");
    ALTER TABLE "pages_blocks_visit_our_office"
      ADD CONSTRAINT "pages_blocks_visit_our_office_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;

    -- _pages_v_blocks_visit_our_office
    CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_visit_our_office_id_seq";
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_visit_our_office" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_pages_v_blocks_visit_our_office_id_seq') PRIMARY KEY NOT NULL,
      "title" varchar,
      "rich_text" jsonb,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_visit_our_office_order_idx" ON "_pages_v_blocks_visit_our_office" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_visit_our_office_parent_id_idx" ON "_pages_v_blocks_visit_our_office" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_visit_our_office_path_idx" ON "_pages_v_blocks_visit_our_office" USING btree ("_path");
    ALTER TABLE "_pages_v_blocks_visit_our_office"
      ADD CONSTRAINT "_pages_v_blocks_visit_our_office_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_career_form_block" DROP CONSTRAINT IF EXISTS "pages_blocks_career_form_block_parent_id_fk";
    ALTER TABLE "pages_blocks_career_form_block" DROP CONSTRAINT IF EXISTS "pages_blocks_career_form_block_form_id_forms_id_fk";
    ALTER TABLE "_pages_v_blocks_career_form_block" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_career_form_block_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_career_form_block" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_career_form_block_form_id_forms_id_fk";
    ALTER TABLE "pages_blocks_map" DROP CONSTRAINT IF EXISTS "pages_blocks_map_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_map" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_map_parent_id_fk";
    ALTER TABLE "pages_blocks_visit_our_office" DROP CONSTRAINT IF EXISTS "pages_blocks_visit_our_office_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_visit_our_office" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_visit_our_office_parent_id_fk";
    DROP TABLE IF EXISTS "_pages_v_blocks_career_form_block";
    DROP TABLE IF EXISTS "pages_blocks_career_form_block";
    DROP TABLE IF EXISTS "_pages_v_blocks_map";
    DROP TABLE IF EXISTS "pages_blocks_map";
    DROP TABLE IF EXISTS "_pages_v_blocks_visit_our_office";
    DROP TABLE IF EXISTS "pages_blocks_visit_our_office";
    DROP SEQUENCE IF EXISTS "_pages_v_blocks_career_form_block_id_seq";
    DROP SEQUENCE IF EXISTS "_pages_v_blocks_map_id_seq";
    DROP SEQUENCE IF EXISTS "_pages_v_blocks_visit_our_office_id_seq";
  `)
}
