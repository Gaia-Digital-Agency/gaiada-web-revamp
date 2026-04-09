import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  CREATE TYPE "public"."enum__pages_v_version_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  CREATE TYPE "public"."enum_services_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  CREATE TYPE "public"."enum__services_v_version_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum_services_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum__services_v_version_hero_type" ADD VALUE 'nonHomepageHero';
  CREATE TABLE "pages_blocks_about_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_about_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_about_block" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_giant_title_color" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_gradient_color" "enum_pages_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "_pages_v_blocks_about_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_about_block" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_giant_title_color" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_gradient_color" "enum__pages_v_version_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "services" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "services" ADD COLUMN "hero_giant_title_color" varchar;
  ALTER TABLE "services" ADD COLUMN "hero_gradient_color" "enum_services_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "_services_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_hero_giant_title_color" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_hero_gradient_color" "enum__services_v_version_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "pages_blocks_about_block_items" ADD CONSTRAINT "pages_blocks_about_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block_items" ADD CONSTRAINT "_pages_v_blocks_about_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_block_items_order_idx" ON "pages_blocks_about_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_block_items_parent_id_idx" ON "pages_blocks_about_block_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_block_items_order_idx" ON "_pages_v_blocks_about_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_block_items_parent_id_idx" ON "_pages_v_blocks_about_block_items" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_about_block" ADD CONSTRAINT "pages_blocks_about_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_block" ADD CONSTRAINT "_pages_v_blocks_about_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_block_image_idx" ON "pages_blocks_about_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_block_image_idx" ON "_pages_v_blocks_about_block" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_block_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_about_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_about_block_items" CASCADE;
  ALTER TABLE "pages_blocks_about_block" DROP CONSTRAINT "pages_blocks_about_block_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_about_block" DROP CONSTRAINT "_pages_v_blocks_about_block_image_id_media_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_services_hero_type";
  CREATE TYPE "public"."enum_services_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_services_hero_type";
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_services_hero_type" USING "hero_type"::"public"."enum_services_hero_type";
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__services_v_version_hero_type";
  CREATE TYPE "public"."enum__services_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__services_v_version_hero_type";
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__services_v_version_hero_type" USING "version_hero_type"::"public"."enum__services_v_version_hero_type";
  DROP INDEX "pages_blocks_about_block_image_idx";
  DROP INDEX "_pages_v_blocks_about_block_image_idx";
  ALTER TABLE "pages_blocks_about_block" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_about_block" DROP COLUMN "description";
  ALTER TABLE "pages" DROP COLUMN "hero_title";
  ALTER TABLE "pages" DROP COLUMN "hero_giant_title_color";
  ALTER TABLE "pages" DROP COLUMN "hero_gradient_color";
  ALTER TABLE "_pages_v_blocks_about_block" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_about_block" DROP COLUMN "description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_giant_title_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_gradient_color";
  ALTER TABLE "services" DROP COLUMN "hero_title";
  ALTER TABLE "services" DROP COLUMN "hero_giant_title_color";
  ALTER TABLE "services" DROP COLUMN "hero_gradient_color";
  ALTER TABLE "_services_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_services_v" DROP COLUMN "version_hero_giant_title_color";
  ALTER TABLE "_services_v" DROP COLUMN "version_hero_gradient_color";
  DROP TYPE "public"."enum_pages_hero_gradient_color";
  DROP TYPE "public"."enum__pages_v_version_hero_gradient_color";
  DROP TYPE "public"."enum_services_hero_gradient_color";
  DROP TYPE "public"."enum__services_v_version_hero_gradient_color";`)
}
