import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "post_ordering" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "post_ordering_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "posts_id" integer
    );

    CREATE INDEX IF NOT EXISTS "post_ordering_updated_at_idx" ON "post_ordering" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "post_ordering_created_at_idx" ON "post_ordering" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "post_ordering_rels_order_idx" ON "post_ordering_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "post_ordering_rels_parent_idx" ON "post_ordering_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "post_ordering_rels_path_idx" ON "post_ordering_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "post_ordering_rels_posts_id_idx" ON "post_ordering_rels" USING btree ("posts_id");

    ALTER TABLE "post_ordering_rels"
      ADD CONSTRAINT "post_ordering_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "post_ordering"("id") ON DELETE CASCADE;

    ALTER TABLE "post_ordering_rels"
      ADD CONSTRAINT "post_ordering_rels_posts_fk"
      FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "post_ordering_rels" DROP CONSTRAINT IF EXISTS "post_ordering_rels_parent_fk";
    ALTER TABLE "post_ordering_rels" DROP CONSTRAINT IF EXISTS "post_ordering_rels_posts_fk";
    DROP TABLE IF EXISTS "post_ordering_rels";
    DROP TABLE IF EXISTS "post_ordering";
  `)
}
