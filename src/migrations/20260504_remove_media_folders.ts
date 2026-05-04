import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Drop FK and index from media.folder_id
    ALTER TABLE "media" DROP CONSTRAINT IF EXISTS "media_folder_id_payload_folders_id_fk";
    DROP INDEX IF EXISTS "media_folder_idx";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "folder_id";

    -- 2. Drop FK and index from payload_locked_documents_rels.payload_folders_id
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_payload_folders_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_folders_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "payload_folders_id";

    -- 3. Drop payload_folders_folder_type table (has FK to payload_folders)
    DROP TABLE IF EXISTS "payload_folders_folder_type";

    -- 4. Drop self-referential FK on payload_folders before dropping the table
    ALTER TABLE "payload_folders" DROP CONSTRAINT IF EXISTS "payload_folders_folder_id_payload_folders_id_fk";

    -- 5. Drop payload_folders table
    DROP TABLE IF EXISTS "payload_folders";

    -- 6. Drop the enum type
    DROP TYPE IF EXISTS "public"."enum_payload_folders_folder_type";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Recreate enum
    CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');

    -- Recreate payload_folders table
    CREATE TABLE IF NOT EXISTS "payload_folders" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "folder_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
    CREATE INDEX IF NOT EXISTS "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
    CREATE INDEX IF NOT EXISTS "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
    ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;

    -- Recreate payload_folders_folder_type table
    CREATE TABLE IF NOT EXISTS "payload_folders_folder_type" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_payload_folders_folder_type",
      "id" serial PRIMARY KEY NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
    ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;

    -- Restore payload_locked_documents_rels column
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "payload_folders_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");

    -- Restore media.folder_id column
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "folder_id" integer;
    ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "media_folder_idx" ON "media" USING btree ("folder_id");
  `)
}
