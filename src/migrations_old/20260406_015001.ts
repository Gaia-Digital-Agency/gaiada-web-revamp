import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" ADD COLUMN "logo_id" integer;
  ALTER TABLE "settings" ADD COLUMN "smtp_host" varchar;
  ALTER TABLE "settings" ADD COLUMN "smtp_port" numeric;
  ALTER TABLE "settings" ADD COLUMN "smtp_user" varchar;
  ALTER TABLE "settings" ADD COLUMN "smtp_pass" varchar;
  ALTER TABLE "settings" ADD COLUMN "smtp_secure" boolean DEFAULT true;
  ALTER TABLE "settings" ADD COLUMN "from_name" varchar;
  ALTER TABLE "settings" ADD COLUMN "from_email" varchar;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_logo_idx" ON "settings" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" DROP CONSTRAINT "settings_logo_id_media_id_fk";
  
  DROP INDEX "settings_logo_idx";
  ALTER TABLE "settings" DROP COLUMN "logo_id";
  ALTER TABLE "settings" DROP COLUMN "smtp_host";
  ALTER TABLE "settings" DROP COLUMN "smtp_port";
  ALTER TABLE "settings" DROP COLUMN "smtp_user";
  ALTER TABLE "settings" DROP COLUMN "smtp_pass";
  ALTER TABLE "settings" DROP COLUMN "smtp_secure";
  ALTER TABLE "settings" DROP COLUMN "from_name";
  ALTER TABLE "settings" DROP COLUMN "from_email";`)
}
