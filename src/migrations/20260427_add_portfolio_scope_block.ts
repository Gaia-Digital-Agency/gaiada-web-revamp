import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- portfolio_blocks_portfolio_scope
    CREATE TABLE IF NOT EXISTS "portfolio_blocks_portfolio_scope" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "rich_text" jsonb NOT NULL,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "portfolio_blocks_portfolio_scope_order_idx" ON "portfolio_blocks_portfolio_scope" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "portfolio_blocks_portfolio_scope_parent_id_idx" ON "portfolio_blocks_portfolio_scope" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "portfolio_blocks_portfolio_scope_path_idx" ON "portfolio_blocks_portfolio_scope" USING btree ("_path");
    ALTER TABLE "portfolio_blocks_portfolio_scope"
      ADD CONSTRAINT "portfolio_blocks_portfolio_scope_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "portfolio"("id") ON DELETE CASCADE;

    -- _portfolio_v_blocks_portfolio_scope
    CREATE SEQUENCE IF NOT EXISTS "_portfolio_v_blocks_portfolio_scope_id_seq";
    CREATE TABLE IF NOT EXISTS "_portfolio_v_blocks_portfolio_scope" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" integer DEFAULT nextval('_portfolio_v_blocks_portfolio_scope_id_seq') PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "rich_text" jsonb NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_portfolio_v_blocks_portfolio_scope_order_idx" ON "_portfolio_v_blocks_portfolio_scope" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_portfolio_v_blocks_portfolio_scope_parent_id_idx" ON "_portfolio_v_blocks_portfolio_scope" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_portfolio_v_blocks_portfolio_scope_path_idx" ON "_portfolio_v_blocks_portfolio_scope" USING btree ("_path");
    ALTER TABLE "_portfolio_v_blocks_portfolio_scope"
      ADD CONSTRAINT "_portfolio_v_blocks_portfolio_scope_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_portfolio_v"("id") ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "portfolio_blocks_portfolio_scope" DROP CONSTRAINT IF EXISTS "portfolio_blocks_portfolio_scope_parent_id_fk";
    ALTER TABLE "_portfolio_v_blocks_portfolio_scope" DROP CONSTRAINT IF EXISTS "_portfolio_v_blocks_portfolio_scope_parent_id_fk";
    DROP TABLE IF EXISTS "_portfolio_v_blocks_portfolio_scope";
    DROP TABLE IF EXISTS "portfolio_blocks_portfolio_scope";
    DROP SEQUENCE IF EXISTS "_portfolio_v_blocks_portfolio_scope_id_seq";
  `)
}
