import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_featured_blog_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "featured_post_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_listing_post_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_our_works_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_featured_blog_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "featured_post_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_listing_post_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_our_works_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "pages_blocks_featured_blog_block" ADD CONSTRAINT "pages_blocks_featured_blog_block_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_featured_blog_block" ADD CONSTRAINT "pages_blocks_featured_blog_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "pages_blocks_listing_post_block"  ADD CONSTRAINT "pages_blocks_listing_post_block_parent_id_fk"  FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "pages_blocks_our_works_block"     ADD CONSTRAINT "pages_blocks_our_works_block_parent_id_fk"     FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_featured_blog_block" ADD CONSTRAINT "_pages_v_blocks_featured_blog_block_featured_post_id_posts_id_f" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_featured_blog_block" ADD CONSTRAINT "_pages_v_blocks_featured_blog_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_listing_post_block"  ADD CONSTRAINT "_pages_v_blocks_listing_post_block_parent_id_fk"  FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_our_works_block"     ADD CONSTRAINT "_pages_v_blocks_our_works_block_parent_id_fk"     FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_block_featured_post_idx" ON "pages_blocks_featured_blog_block" USING btree ("featured_post_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_block_order_idx"         ON "pages_blocks_featured_blog_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_block_parent_id_idx"     ON "pages_blocks_featured_blog_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_block_path_idx"          ON "pages_blocks_featured_blog_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_listing_post_block_order_idx"          ON "pages_blocks_listing_post_block"  USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_listing_post_block_parent_id_idx"      ON "pages_blocks_listing_post_block"  USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_listing_post_block_path_idx"           ON "pages_blocks_listing_post_block"  USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_our_works_block_order_idx"             ON "pages_blocks_our_works_block"     USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_our_works_block_parent_id_idx"         ON "pages_blocks_our_works_block"     USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_our_works_block_path_idx"              ON "pages_blocks_our_works_block"     USING btree ("_path");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_blog_block_featured_post_idx" ON "_pages_v_blocks_featured_blog_block" USING btree ("featured_post_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_blog_block_order_idx"         ON "_pages_v_blocks_featured_blog_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_blog_block_parent_id_idx"     ON "_pages_v_blocks_featured_blog_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_blog_block_path_idx"          ON "_pages_v_blocks_featured_blog_block" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_listing_post_block_order_idx"          ON "_pages_v_blocks_listing_post_block"  USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_listing_post_block_parent_id_idx"      ON "_pages_v_blocks_listing_post_block"  USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_listing_post_block_path_idx"           ON "_pages_v_blocks_listing_post_block"  USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_works_block_order_idx"             ON "_pages_v_blocks_our_works_block"     USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_works_block_parent_id_idx"         ON "_pages_v_blocks_our_works_block"     USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_our_works_block_path_idx"              ON "_pages_v_blocks_our_works_block"     USING btree ("_path");

    ALTER TABLE "pages_blocks_our_process_block_steps"    ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "_pages_v_blocks_our_process_block_steps" ADD COLUMN IF NOT EXISTS "description" varchar;

    ALTER TABLE "portfolio"    ADD COLUMN IF NOT EXISTS "featured_image_id"         integer;
    ALTER TABLE "_portfolio_v" ADD COLUMN IF NOT EXISTS "version_featured_image_id" integer;
    ALTER TABLE "portfolio"    ADD CONSTRAINT "portfolio_featured_image_id_media_id_fk"              FOREIGN KEY ("featured_image_id")         REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_featured_image_id_media_id_fk"   FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "portfolio_featured_image_idx"                 ON "portfolio"    USING btree ("featured_image_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_v_version_version_featured_image_idx" ON "_portfolio_v" USING btree ("version_featured_image_id");

    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "site_title"     varchar NOT NULL DEFAULT 'Gaiada Digital Agency';
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "tagline"        varchar;
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "favicon_id"     integer;
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "gtm_id"         varchar;
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "ga_id"          varchar;
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "header_scripts" varchar;
    ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "footer_scripts" varchar;
    ALTER TABLE "settings" ADD CONSTRAINT "settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "settings_favicon_idx" ON "settings" USING btree ("favicon_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "settings_favicon_idx";
    ALTER TABLE "settings" DROP CONSTRAINT IF EXISTS "settings_favicon_id_media_id_fk";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "footer_scripts";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "header_scripts";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "ga_id";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "gtm_id";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "favicon_id";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "tagline";
    ALTER TABLE "settings" DROP COLUMN IF EXISTS "site_title";

    DROP INDEX IF EXISTS "_portfolio_v_version_version_featured_image_idx";
    DROP INDEX IF EXISTS "portfolio_featured_image_idx";
    ALTER TABLE "_portfolio_v" DROP CONSTRAINT IF EXISTS "_portfolio_v_version_featured_image_id_media_id_fk";
    ALTER TABLE "portfolio"    DROP CONSTRAINT IF EXISTS "portfolio_featured_image_id_media_id_fk";
    ALTER TABLE "_portfolio_v" DROP COLUMN IF EXISTS "version_featured_image_id";
    ALTER TABLE "portfolio"    DROP COLUMN IF EXISTS "featured_image_id";

    ALTER TABLE "_pages_v_blocks_our_process_block_steps" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "pages_blocks_our_process_block_steps"    DROP COLUMN IF EXISTS "description";

    DROP TABLE IF EXISTS "_pages_v_blocks_our_works_block" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_listing_post_block" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_featured_blog_block" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_our_works_block" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_listing_post_block" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_featured_blog_block" CASCADE;
  `)
}
