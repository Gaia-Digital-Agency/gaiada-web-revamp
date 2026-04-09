import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_team_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Team',
  	"intro_text" varchar DEFAULT 'Hover a department · Drag to explore',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Team',
  	"intro_text" varchar DEFAULT 'Hover a department · Drag to explore',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "departments" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_team_block" ADD CONSTRAINT "pages_blocks_team_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_block" ADD CONSTRAINT "_pages_v_blocks_team_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_block_order_idx" ON "pages_blocks_team_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_block_parent_id_idx" ON "pages_blocks_team_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_block_path_idx" ON "pages_blocks_team_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_block_order_idx" ON "_pages_v_blocks_team_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_block_parent_id_idx" ON "_pages_v_blocks_team_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_block_path_idx" ON "_pages_v_blocks_team_block" USING btree ("_path");
  ALTER TABLE "departments" ADD CONSTRAINT "departments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "departments_image_idx" ON "departments" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_team_block" CASCADE;
  DROP TABLE "_pages_v_blocks_team_block" CASCADE;
  ALTER TABLE "departments" DROP CONSTRAINT "departments_image_id_media_id_fk";
  
  DROP INDEX "departments_image_idx";
  ALTER TABLE "departments" DROP COLUMN "image_id";`)
}
