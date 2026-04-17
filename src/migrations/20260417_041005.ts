import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"        ADD COLUMN "hero_background_hero_homepage_id"         integer;
    ALTER TABLE "_pages_v"     ADD COLUMN "version_hero_background_hero_homepage_id" integer;
    ALTER TABLE "services"     ADD COLUMN "hero_background_hero_homepage_id"         integer;
    ALTER TABLE "_services_v"  ADD COLUMN "version_hero_background_hero_homepage_id" integer;
    ALTER TABLE "portfolio"    ADD COLUMN "hero_background_hero_homepage_id"         integer;
    ALTER TABLE "_portfolio_v" ADD COLUMN "version_hero_background_hero_homepage_id" integer;
    ALTER TABLE "footer"       ADD COLUMN "background_image_mobile_id"               integer;

    ALTER TABLE "pages"        ADD CONSTRAINT "pages_hero_background_hero_homepage_id_media_id_fk"          FOREIGN KEY ("hero_background_hero_homepage_id")         REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v"     ADD CONSTRAINT "_pages_v_version_hero_background_hero_homepage_id_media_id_fk" FOREIGN KEY ("version_hero_background_hero_homepage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "services"     ADD CONSTRAINT "services_hero_background_hero_homepage_id_media_id_fk"       FOREIGN KEY ("hero_background_hero_homepage_id")         REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_services_v"  ADD CONSTRAINT "_services_v_version_hero_background_hero_homepage_id_media_id_fk" FOREIGN KEY ("version_hero_background_hero_homepage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "portfolio"    ADD CONSTRAINT "portfolio_hero_background_hero_homepage_id_media_id_fk"      FOREIGN KEY ("hero_background_hero_homepage_id")         REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_hero_background_hero_homepage_id_media_id_fk" FOREIGN KEY ("version_hero_background_hero_homepage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "footer"       ADD CONSTRAINT "footer_background_image_mobile_id_media_id_fk"               FOREIGN KEY ("background_image_mobile_id")               REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "pages_hero_hero_background_hero_homepage_idx"                ON "pages"        USING btree ("hero_background_hero_homepage_id");
    CREATE INDEX "_pages_v_version_hero_hero_background_hero_homepage_idx"     ON "_pages_v"     USING btree ("version_hero_background_hero_homepage_id");
    CREATE INDEX "services_hero_hero_background_hero_homepage_idx"             ON "services"     USING btree ("hero_background_hero_homepage_id");
    CREATE INDEX "_services_v_version_hero_hero_background_hero_homepage_idx"  ON "_services_v"  USING btree ("version_hero_background_hero_homepage_id");
    CREATE INDEX "portfolio_hero_hero_background_hero_homepage_idx"            ON "portfolio"    USING btree ("hero_background_hero_homepage_id");
    CREATE INDEX "_portfolio_v_version_hero_hero_background_hero_homepage_idx" ON "_portfolio_v" USING btree ("version_hero_background_hero_homepage_id");
    CREATE INDEX "footer_background_image_mobile_idx"                          ON "footer"       USING btree ("background_image_mobile_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "footer_background_image_mobile_idx";
    DROP INDEX IF EXISTS "_portfolio_v_version_hero_hero_background_hero_homepage_idx";
    DROP INDEX IF EXISTS "portfolio_hero_hero_background_hero_homepage_idx";
    DROP INDEX IF EXISTS "_services_v_version_hero_hero_background_hero_homepage_idx";
    DROP INDEX IF EXISTS "services_hero_hero_background_hero_homepage_idx";
    DROP INDEX IF EXISTS "_pages_v_version_hero_hero_background_hero_homepage_idx";
    DROP INDEX IF EXISTS "pages_hero_hero_background_hero_homepage_idx";

    ALTER TABLE "footer"       DROP COLUMN IF EXISTS "background_image_mobile_id";
    ALTER TABLE "_portfolio_v" DROP COLUMN IF EXISTS "version_hero_background_hero_homepage_id";
    ALTER TABLE "portfolio"    DROP COLUMN IF EXISTS "hero_background_hero_homepage_id";
    ALTER TABLE "_services_v"  DROP COLUMN IF EXISTS "version_hero_background_hero_homepage_id";
    ALTER TABLE "services"     DROP COLUMN IF EXISTS "hero_background_hero_homepage_id";
    ALTER TABLE "_pages_v"     DROP COLUMN IF EXISTS "version_hero_background_hero_homepage_id";
    ALTER TABLE "pages"        DROP COLUMN IF EXISTS "hero_background_hero_homepage_id";
  `)
}
