import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "scopes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "portfolio_rels" ADD COLUMN "scopes_id" integer;
  ALTER TABLE "_portfolio_v_rels" ADD COLUMN "scopes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "scopes_id" integer;
  CREATE UNIQUE INDEX "scopes_slug_idx" ON "scopes" USING btree ("slug");
  CREATE INDEX "scopes_updated_at_idx" ON "scopes" USING btree ("updated_at");
  CREATE INDEX "scopes_created_at_idx" ON "scopes" USING btree ("created_at");
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_scopes_fk" FOREIGN KEY ("scopes_id") REFERENCES "public"."scopes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_scopes_fk" FOREIGN KEY ("scopes_id") REFERENCES "public"."scopes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_scopes_fk" FOREIGN KEY ("scopes_id") REFERENCES "public"."scopes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_rels_scopes_id_idx" ON "portfolio_rels" USING btree ("scopes_id");
  CREATE INDEX "_portfolio_v_rels_scopes_id_idx" ON "_portfolio_v_rels" USING btree ("scopes_id");
  CREATE INDEX "payload_locked_documents_rels_scopes_id_idx" ON "payload_locked_documents_rels" USING btree ("scopes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "scopes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "scopes" CASCADE;
  ALTER TABLE "portfolio_rels" DROP CONSTRAINT "portfolio_rels_scopes_fk";
  
  ALTER TABLE "_portfolio_v_rels" DROP CONSTRAINT "_portfolio_v_rels_scopes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_scopes_fk";
  
  DROP INDEX "portfolio_rels_scopes_id_idx";
  DROP INDEX "_portfolio_v_rels_scopes_id_idx";
  DROP INDEX "payload_locked_documents_rels_scopes_id_idx";
  ALTER TABLE "portfolio_rels" DROP COLUMN "scopes_id";
  ALTER TABLE "_portfolio_v_rels" DROP COLUMN "scopes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "scopes_id";`)
}
