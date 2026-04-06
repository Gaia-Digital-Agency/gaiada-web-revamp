import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_size" AS ENUM('full', 'half', 'oneThird', 'twoThirds');
  CREATE TYPE "public"."enum_pages_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_size" AS ENUM('full', 'half', 'oneThird', 'twoThirds');
  CREATE TYPE "public"."enum__pages_v_version_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue');
  CREATE TYPE "public"."enum_services_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue');
  CREATE TYPE "public"."enum__services_v_version_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum_services_hero_type" ADD VALUE 'nonHomepageHero';
  ALTER TYPE "public"."enum__services_v_version_hero_type" ADD VALUE 'nonHomepageHero';
  CREATE TABLE "pages_blocks_button_block_columns_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum_pages_blocks_button_block_columns_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum_pages_blocks_button_block_columns_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum_pages_blocks_button_block_columns_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_button_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_button_block_columns_size" DEFAULT 'full'
  );
  
  CREATE TABLE "pages_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block_columns_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum__pages_v_blocks_button_block_columns_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum__pages_v_blocks_button_block_columns_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum__pages_v_blocks_button_block_columns_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_button_block_columns_size" DEFAULT 'full',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_gradient_color" "enum_pages_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_gradient_color" "enum__pages_v_version_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "services" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "services" ADD COLUMN "hero_gradient_color" "enum_services_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "_services_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_hero_gradient_color" "enum__services_v_version_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "pages_blocks_button_block_columns_buttons" ADD CONSTRAINT "pages_blocks_button_block_columns_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block_columns" ADD CONSTRAINT "pages_blocks_button_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block" ADD CONSTRAINT "pages_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_columns_buttons" ADD CONSTRAINT "_pages_v_blocks_button_block_columns_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_columns" ADD CONSTRAINT "_pages_v_blocks_button_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block" ADD CONSTRAINT "_pages_v_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_block_columns_buttons_order_idx" ON "pages_blocks_button_block_columns_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_columns_buttons_parent_id_idx" ON "pages_blocks_button_block_columns_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_columns_order_idx" ON "pages_blocks_button_block_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_columns_parent_id_idx" ON "pages_blocks_button_block_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_order_idx" ON "pages_blocks_button_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_parent_id_idx" ON "pages_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_path_idx" ON "pages_blocks_button_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_block_columns_buttons_order_idx" ON "_pages_v_blocks_button_block_columns_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_columns_buttons_parent_id_idx" ON "_pages_v_blocks_button_block_columns_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_columns_order_idx" ON "_pages_v_blocks_button_block_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_columns_parent_id_idx" ON "_pages_v_blocks_button_block_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_order_idx" ON "_pages_v_blocks_button_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_parent_id_idx" ON "_pages_v_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_path_idx" ON "_pages_v_blocks_button_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_button_block_columns_buttons" CASCADE;
  DROP TABLE "pages_blocks_button_block_columns" CASCADE;
  DROP TABLE "pages_blocks_button_block" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_columns_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block" CASCADE;
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
  ALTER TABLE "pages" DROP COLUMN "hero_title";
  ALTER TABLE "pages" DROP COLUMN "hero_gradient_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_gradient_color";
  ALTER TABLE "services" DROP COLUMN "hero_title";
  ALTER TABLE "services" DROP COLUMN "hero_gradient_color";
  ALTER TABLE "_services_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_services_v" DROP COLUMN "version_hero_gradient_color";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_size";
  DROP TYPE "public"."enum_pages_hero_gradient_color";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_size";
  DROP TYPE "public"."enum__pages_v_version_hero_gradient_color";
  DROP TYPE "public"."enum_services_hero_gradient_color";
  DROP TYPE "public"."enum__services_v_version_hero_gradient_color";`)
}
