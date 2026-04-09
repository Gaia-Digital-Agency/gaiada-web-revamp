import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum_pages_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum_pages_blocks_button_block_columns_size" AS ENUM('full', 'half', 'oneThird', 'twoThirds');
  CREATE TYPE "public"."enum__pages_v_version_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum__pages_v_version_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_columns_size" AS ENUM('full', 'half', 'oneThird', 'twoThirds');
  CREATE TYPE "public"."enum_services_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum_services_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_services_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum__services_v_version_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum__services_v_version_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__services_v_version_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum_portfolio_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum_portfolio_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_portfolio_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum_portfolio_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_portfolio_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_portfolio_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_portfolio_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_portfolio_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_portfolio_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_portfolio_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_portfolio_blocks_content_media_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_portfolio_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero', 'homepageHero');
  CREATE TYPE "public"."enum_portfolio_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  CREATE TYPE "public"."enum_portfolio_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_buttons_icon" AS ENUM('none', 'arrow', 'search');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_buttons_icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_buttons_variant" AS ENUM('default', 'link');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__portfolio_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__portfolio_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__portfolio_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__portfolio_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__portfolio_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__portfolio_v_blocks_content_media_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero', 'homepageHero');
  CREATE TYPE "public"."enum__portfolio_v_version_hero_gradient_color" AS ENUM('yellow', 'orange', 'blue', 'white');
  CREATE TYPE "public"."enum__portfolio_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_nav_items_with_icon_link_icon" AS ENUM('none', 'email', 'map');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'homepageHero';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'homepageHero';
  ALTER TYPE "public"."enum_services_hero_type" ADD VALUE 'homepageHero';
  ALTER TYPE "public"."enum__services_v_version_hero_type" ADD VALUE 'homepageHero';
  CREATE TABLE "pages_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum_pages_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum_pages_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum_pages_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false
  );
  
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
  
  CREATE TABLE "pages_blocks_our_process_block_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_our_process_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum__pages_v_version_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum__pages_v_version_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum__pages_v_version_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
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
  
  CREATE TABLE "_pages_v_blocks_our_process_block_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_process_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum_services_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum_services_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum_services_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "services_blocks_services_detail_sub_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "services_blocks_services_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_title" varchar,
  	"intro_description" varchar,
  	"intro_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "services_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum__services_v_version_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum__services_v_version_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum__services_v_version_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services_detail_sub_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_services_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_title" varchar,
  	"intro_description" varchar,
  	"intro_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum_portfolio_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum_portfolio_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum_portfolio_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "portfolio_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_portfolio_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_portfolio_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "portfolio_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_portfolio_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_portfolio_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "portfolio_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_portfolio_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_portfolio_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_portfolio_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "portfolio_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_content_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_portfolio_blocks_content_media_media_position" DEFAULT 'right',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "portfolio_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "portfolio_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"portfolio_id" integer
  );
  
  CREATE TABLE "_portfolio_v_version_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon" "enum__portfolio_v_version_hero_buttons_icon" DEFAULT 'none',
  	"icon_position" "enum__portfolio_v_version_hero_buttons_icon_position" DEFAULT 'right',
  	"variant" "enum__portfolio_v_version_hero_buttons_variant" DEFAULT 'default',
  	"new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__portfolio_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__portfolio_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__portfolio_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__portfolio_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__portfolio_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__portfolio_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__portfolio_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_content_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum__portfolio_v_blocks_content_media_media_position" DEFAULT 'right',
  	"rich_text" jsonb,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_portfolio_insight_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_portfolio_insight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_portfolio_image_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_hero_type" "enum__portfolio_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_title" varchar,
  	"version_hero_rich_text" jsonb,
  	"version_hero_giant_title_color" varchar,
  	"version_hero_gradient_color" "enum__portfolio_v_version_hero_gradient_color" DEFAULT 'yellow',
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolio_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_portfolio_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"portfolio_id" integer
  );
  
  CREATE TABLE "forms_blocks_radio_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_radio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_nav_items_with_icon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar NOT NULL,
  	"link_icon" "enum_footer_nav_items_with_icon_link_icon" DEFAULT 'none',
  	"link_new_tab" boolean DEFAULT false
  );
  
  ALTER TABLE "services" DROP CONSTRAINT "services_image_id_media_id_fk";
  
  ALTER TABLE "_services_v" DROP CONSTRAINT "_services_v_version_image_id_media_id_fk";
  
  ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_image_id_media_id_fk";
  
  DROP INDEX "services_image_idx";
  DROP INDEX "_services_v_version_version_image_idx";
  DROP INDEX "portfolio_image_idx";
  ALTER TABLE "portfolio" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "portfolio" ALTER COLUMN "description" SET DATA TYPE jsonb;
  ALTER TABLE "portfolio" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "portfolio" ADD COLUMN "hero_type" "enum_portfolio_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "portfolio" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "portfolio" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "portfolio" ADD COLUMN "hero_giant_title_color" varchar;
  ALTER TABLE "portfolio" ADD COLUMN "hero_gradient_color" "enum_portfolio_hero_gradient_color" DEFAULT 'yellow';
  ALTER TABLE "portfolio" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "portfolio" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "portfolio" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "portfolio" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "portfolio" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "portfolio" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "portfolio" ADD COLUMN "slug" varchar;
  ALTER TABLE "portfolio" ADD COLUMN "_status" "enum_portfolio_status" DEFAULT 'draft';
  ALTER TABLE "header_nav_items_sub_items" ADD COLUMN "primary_color" varchar;
  ALTER TABLE "header_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "footer" ADD COLUMN "form_id" numeric DEFAULT 1;
  ALTER TABLE "footer" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "footer" ADD COLUMN "heading" varchar DEFAULT 'Start a project with Gaia';
  ALTER TABLE "footer_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "pages_hero_buttons" ADD CONSTRAINT "pages_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block_columns_buttons" ADD CONSTRAINT "pages_blocks_button_block_columns_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block_columns" ADD CONSTRAINT "pages_blocks_button_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block" ADD CONSTRAINT "pages_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_process_block_steps" ADD CONSTRAINT "pages_blocks_our_process_block_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_process_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_process_block" ADD CONSTRAINT "pages_blocks_our_process_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_insight_insights" ADD CONSTRAINT "pages_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_insight_insights" ADD CONSTRAINT "pages_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_insight" ADD CONSTRAINT "pages_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_image_banner" ADD CONSTRAINT "pages_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_image_banner" ADD CONSTRAINT "pages_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_buttons" ADD CONSTRAINT "_pages_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_columns_buttons" ADD CONSTRAINT "_pages_v_blocks_button_block_columns_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_columns" ADD CONSTRAINT "_pages_v_blocks_button_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block" ADD CONSTRAINT "_pages_v_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_process_block_steps" ADD CONSTRAINT "_pages_v_blocks_our_process_block_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_process_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_process_block" ADD CONSTRAINT "_pages_v_blocks_our_process_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_pages_v_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_pages_v_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_insight" ADD CONSTRAINT "_pages_v_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_pages_v_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_pages_v_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_hero_buttons" ADD CONSTRAINT "services_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_detail_sub_services" ADD CONSTRAINT "services_blocks_services_detail_sub_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_services_detail_sub_services" ADD CONSTRAINT "services_blocks_services_detail_sub_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_detail" ADD CONSTRAINT "services_blocks_services_detail_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_services_detail" ADD CONSTRAINT "services_blocks_services_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_portfolio_insight_insights" ADD CONSTRAINT "services_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_portfolio_insight_insights" ADD CONSTRAINT "services_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_portfolio_insight" ADD CONSTRAINT "services_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_portfolio_image_banner" ADD CONSTRAINT "services_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_portfolio_image_banner" ADD CONSTRAINT "services_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_hero_buttons" ADD CONSTRAINT "_services_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_detail_sub_services" ADD CONSTRAINT "_services_v_blocks_services_detail_sub_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_detail_sub_services" ADD CONSTRAINT "_services_v_blocks_services_detail_sub_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_services_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_detail" ADD CONSTRAINT "_services_v_blocks_services_detail_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_services_detail" ADD CONSTRAINT "_services_v_blocks_services_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_services_v_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_services_v_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_portfolio_insight" ADD CONSTRAINT "_services_v_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_services_v_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_services_v_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_hero_buttons" ADD CONSTRAINT "portfolio_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_hero_links" ADD CONSTRAINT "portfolio_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_cta_links" ADD CONSTRAINT "portfolio_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_cta" ADD CONSTRAINT "portfolio_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_content_columns" ADD CONSTRAINT "portfolio_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_content" ADD CONSTRAINT "portfolio_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_media_block" ADD CONSTRAINT "portfolio_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_media_block" ADD CONSTRAINT "portfolio_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_form_block" ADD CONSTRAINT "portfolio_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_form_block" ADD CONSTRAINT "portfolio_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_content_media" ADD CONSTRAINT "portfolio_blocks_content_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_content_media" ADD CONSTRAINT "portfolio_blocks_content_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_portfolio_insight_insights" ADD CONSTRAINT "portfolio_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_portfolio_insight_insights" ADD CONSTRAINT "portfolio_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_portfolio_insight" ADD CONSTRAINT "portfolio_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_portfolio_image_banner" ADD CONSTRAINT "portfolio_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_portfolio_image_banner" ADD CONSTRAINT "portfolio_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_rels" ADD CONSTRAINT "portfolio_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_hero_buttons" ADD CONSTRAINT "_portfolio_v_version_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_hero_links" ADD CONSTRAINT "_portfolio_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_cta_links" ADD CONSTRAINT "_portfolio_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_cta" ADD CONSTRAINT "_portfolio_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_content_columns" ADD CONSTRAINT "_portfolio_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_content" ADD CONSTRAINT "_portfolio_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_media_block" ADD CONSTRAINT "_portfolio_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_media_block" ADD CONSTRAINT "_portfolio_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_form_block" ADD CONSTRAINT "_portfolio_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_form_block" ADD CONSTRAINT "_portfolio_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_content_media" ADD CONSTRAINT "_portfolio_v_blocks_content_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_content_media" ADD CONSTRAINT "_portfolio_v_blocks_content_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_portfolio_v_blocks_portfolio_insight_insights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_portfolio_insight_insights" ADD CONSTRAINT "_portfolio_v_blocks_portfolio_insight_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v_blocks_portfolio_insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_portfolio_insight" ADD CONSTRAINT "_portfolio_v_blocks_portfolio_insight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_portfolio_v_blocks_portfolio_image_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_portfolio_image_banner" ADD CONSTRAINT "_portfolio_v_blocks_portfolio_image_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_parent_id_portfolio_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolio"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_rels" ADD CONSTRAINT "_portfolio_v_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options" ADD CONSTRAINT "forms_blocks_radio_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio" ADD CONSTRAINT "forms_blocks_radio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_with_icon" ADD CONSTRAINT "footer_nav_items_with_icon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_buttons_order_idx" ON "pages_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_hero_buttons_parent_id_idx" ON "pages_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_columns_buttons_order_idx" ON "pages_blocks_button_block_columns_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_columns_buttons_parent_id_idx" ON "pages_blocks_button_block_columns_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_columns_order_idx" ON "pages_blocks_button_block_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_columns_parent_id_idx" ON "pages_blocks_button_block_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_order_idx" ON "pages_blocks_button_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_parent_id_idx" ON "pages_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_path_idx" ON "pages_blocks_button_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_our_process_block_steps_order_idx" ON "pages_blocks_our_process_block_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_process_block_steps_parent_id_idx" ON "pages_blocks_our_process_block_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_process_block_order_idx" ON "pages_blocks_our_process_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_process_block_parent_id_idx" ON "pages_blocks_our_process_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_process_block_path_idx" ON "pages_blocks_our_process_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_insight_insights_order_idx" ON "pages_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_insight_insights_parent_id_idx" ON "pages_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_insight_insights_image_idx" ON "pages_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "pages_blocks_portfolio_insight_order_idx" ON "pages_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_insight_parent_id_idx" ON "pages_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_insight_path_idx" ON "pages_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_image_banner_order_idx" ON "pages_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_image_banner_parent_id_idx" ON "pages_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_image_banner_path_idx" ON "pages_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_image_banner_image_idx" ON "pages_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_hero_buttons_order_idx" ON "_pages_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_buttons_parent_id_idx" ON "_pages_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_columns_buttons_order_idx" ON "_pages_v_blocks_button_block_columns_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_columns_buttons_parent_id_idx" ON "_pages_v_blocks_button_block_columns_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_columns_order_idx" ON "_pages_v_blocks_button_block_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_columns_parent_id_idx" ON "_pages_v_blocks_button_block_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_order_idx" ON "_pages_v_blocks_button_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_parent_id_idx" ON "_pages_v_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_path_idx" ON "_pages_v_blocks_button_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_our_process_block_steps_order_idx" ON "_pages_v_blocks_our_process_block_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_process_block_steps_parent_id_idx" ON "_pages_v_blocks_our_process_block_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_process_block_order_idx" ON "_pages_v_blocks_our_process_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_process_block_parent_id_idx" ON "_pages_v_blocks_our_process_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_process_block_path_idx" ON "_pages_v_blocks_our_process_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_insights_order_idx" ON "_pages_v_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_insights_parent_id_idx" ON "_pages_v_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_insights_image_idx" ON "_pages_v_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_order_idx" ON "_pages_v_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_parent_id_idx" ON "_pages_v_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_insight_path_idx" ON "_pages_v_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_image_banner_order_idx" ON "_pages_v_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_image_banner_parent_id_idx" ON "_pages_v_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_image_banner_path_idx" ON "_pages_v_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_image_banner_image_idx" ON "_pages_v_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "services_hero_buttons_order_idx" ON "services_hero_buttons" USING btree ("_order");
  CREATE INDEX "services_hero_buttons_parent_id_idx" ON "services_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_detail_sub_services_order_idx" ON "services_blocks_services_detail_sub_services" USING btree ("_order");
  CREATE INDEX "services_blocks_services_detail_sub_services_parent_id_idx" ON "services_blocks_services_detail_sub_services" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_detail_sub_services_image_idx" ON "services_blocks_services_detail_sub_services" USING btree ("image_id");
  CREATE INDEX "services_blocks_services_detail_order_idx" ON "services_blocks_services_detail" USING btree ("_order");
  CREATE INDEX "services_blocks_services_detail_parent_id_idx" ON "services_blocks_services_detail" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_detail_path_idx" ON "services_blocks_services_detail" USING btree ("_path");
  CREATE INDEX "services_blocks_services_detail_intro_intro_image_idx" ON "services_blocks_services_detail" USING btree ("intro_image_id");
  CREATE INDEX "services_blocks_portfolio_insight_insights_order_idx" ON "services_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "services_blocks_portfolio_insight_insights_parent_id_idx" ON "services_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_portfolio_insight_insights_image_idx" ON "services_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "services_blocks_portfolio_insight_order_idx" ON "services_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "services_blocks_portfolio_insight_parent_id_idx" ON "services_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_portfolio_insight_path_idx" ON "services_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "services_blocks_portfolio_image_banner_order_idx" ON "services_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "services_blocks_portfolio_image_banner_parent_id_idx" ON "services_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_portfolio_image_banner_path_idx" ON "services_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "services_blocks_portfolio_image_banner_image_idx" ON "services_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "_services_v_version_hero_buttons_order_idx" ON "_services_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_services_v_version_hero_buttons_parent_id_idx" ON "_services_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_detail_sub_services_order_idx" ON "_services_v_blocks_services_detail_sub_services" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_detail_sub_services_parent_id_idx" ON "_services_v_blocks_services_detail_sub_services" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_detail_sub_services_image_idx" ON "_services_v_blocks_services_detail_sub_services" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_services_detail_order_idx" ON "_services_v_blocks_services_detail" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_services_detail_parent_id_idx" ON "_services_v_blocks_services_detail" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_services_detail_path_idx" ON "_services_v_blocks_services_detail" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_services_detail_intro_intro_image_idx" ON "_services_v_blocks_services_detail" USING btree ("intro_image_id");
  CREATE INDEX "_services_v_blocks_portfolio_insight_insights_order_idx" ON "_services_v_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_portfolio_insight_insights_parent_id_idx" ON "_services_v_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_portfolio_insight_insights_image_idx" ON "_services_v_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_portfolio_insight_order_idx" ON "_services_v_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_portfolio_insight_parent_id_idx" ON "_services_v_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_portfolio_insight_path_idx" ON "_services_v_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_portfolio_image_banner_order_idx" ON "_services_v_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_portfolio_image_banner_parent_id_idx" ON "_services_v_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_portfolio_image_banner_path_idx" ON "_services_v_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_portfolio_image_banner_image_idx" ON "_services_v_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "portfolio_hero_buttons_order_idx" ON "portfolio_hero_buttons" USING btree ("_order");
  CREATE INDEX "portfolio_hero_buttons_parent_id_idx" ON "portfolio_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "portfolio_hero_links_order_idx" ON "portfolio_hero_links" USING btree ("_order");
  CREATE INDEX "portfolio_hero_links_parent_id_idx" ON "portfolio_hero_links" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_cta_links_order_idx" ON "portfolio_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_cta_links_parent_id_idx" ON "portfolio_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_cta_order_idx" ON "portfolio_blocks_cta" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_cta_parent_id_idx" ON "portfolio_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_cta_path_idx" ON "portfolio_blocks_cta" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_content_columns_order_idx" ON "portfolio_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_content_columns_parent_id_idx" ON "portfolio_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_content_order_idx" ON "portfolio_blocks_content" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_content_parent_id_idx" ON "portfolio_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_content_path_idx" ON "portfolio_blocks_content" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_media_block_order_idx" ON "portfolio_blocks_media_block" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_media_block_parent_id_idx" ON "portfolio_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_media_block_path_idx" ON "portfolio_blocks_media_block" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_media_block_media_idx" ON "portfolio_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "portfolio_blocks_form_block_order_idx" ON "portfolio_blocks_form_block" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_form_block_parent_id_idx" ON "portfolio_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_form_block_path_idx" ON "portfolio_blocks_form_block" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_form_block_form_idx" ON "portfolio_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "portfolio_blocks_content_media_order_idx" ON "portfolio_blocks_content_media" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_content_media_parent_id_idx" ON "portfolio_blocks_content_media" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_content_media_path_idx" ON "portfolio_blocks_content_media" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_content_media_media_idx" ON "portfolio_blocks_content_media" USING btree ("media_id");
  CREATE INDEX "portfolio_blocks_portfolio_insight_insights_order_idx" ON "portfolio_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_portfolio_insight_insights_parent_id_idx" ON "portfolio_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_portfolio_insight_insights_image_idx" ON "portfolio_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "portfolio_blocks_portfolio_insight_order_idx" ON "portfolio_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_portfolio_insight_parent_id_idx" ON "portfolio_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_portfolio_insight_path_idx" ON "portfolio_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_portfolio_image_banner_order_idx" ON "portfolio_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_portfolio_image_banner_parent_id_idx" ON "portfolio_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_portfolio_image_banner_path_idx" ON "portfolio_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "portfolio_blocks_portfolio_image_banner_image_idx" ON "portfolio_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "portfolio_rels_order_idx" ON "portfolio_rels" USING btree ("order");
  CREATE INDEX "portfolio_rels_parent_idx" ON "portfolio_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_rels_path_idx" ON "portfolio_rels" USING btree ("path");
  CREATE INDEX "portfolio_rels_services_id_idx" ON "portfolio_rels" USING btree ("services_id");
  CREATE INDEX "portfolio_rels_pages_id_idx" ON "portfolio_rels" USING btree ("pages_id");
  CREATE INDEX "portfolio_rels_posts_id_idx" ON "portfolio_rels" USING btree ("posts_id");
  CREATE INDEX "portfolio_rels_portfolio_id_idx" ON "portfolio_rels" USING btree ("portfolio_id");
  CREATE INDEX "_portfolio_v_version_hero_buttons_order_idx" ON "_portfolio_v_version_hero_buttons" USING btree ("_order");
  CREATE INDEX "_portfolio_v_version_hero_buttons_parent_id_idx" ON "_portfolio_v_version_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_version_hero_links_order_idx" ON "_portfolio_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_portfolio_v_version_hero_links_parent_id_idx" ON "_portfolio_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_cta_links_order_idx" ON "_portfolio_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_cta_links_parent_id_idx" ON "_portfolio_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_cta_order_idx" ON "_portfolio_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_cta_parent_id_idx" ON "_portfolio_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_cta_path_idx" ON "_portfolio_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_content_columns_order_idx" ON "_portfolio_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_content_columns_parent_id_idx" ON "_portfolio_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_content_order_idx" ON "_portfolio_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_content_parent_id_idx" ON "_portfolio_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_content_path_idx" ON "_portfolio_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_media_block_order_idx" ON "_portfolio_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_media_block_parent_id_idx" ON "_portfolio_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_media_block_path_idx" ON "_portfolio_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_media_block_media_idx" ON "_portfolio_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_portfolio_v_blocks_form_block_order_idx" ON "_portfolio_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_form_block_parent_id_idx" ON "_portfolio_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_form_block_path_idx" ON "_portfolio_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_form_block_form_idx" ON "_portfolio_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_portfolio_v_blocks_content_media_order_idx" ON "_portfolio_v_blocks_content_media" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_content_media_parent_id_idx" ON "_portfolio_v_blocks_content_media" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_content_media_path_idx" ON "_portfolio_v_blocks_content_media" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_content_media_media_idx" ON "_portfolio_v_blocks_content_media" USING btree ("media_id");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_insights_order_idx" ON "_portfolio_v_blocks_portfolio_insight_insights" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_insights_parent_id_idx" ON "_portfolio_v_blocks_portfolio_insight_insights" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_insights_image_idx" ON "_portfolio_v_blocks_portfolio_insight_insights" USING btree ("image_id");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_order_idx" ON "_portfolio_v_blocks_portfolio_insight" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_parent_id_idx" ON "_portfolio_v_blocks_portfolio_insight" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_portfolio_insight_path_idx" ON "_portfolio_v_blocks_portfolio_insight" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_portfolio_image_banner_order_idx" ON "_portfolio_v_blocks_portfolio_image_banner" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_portfolio_image_banner_parent_id_idx" ON "_portfolio_v_blocks_portfolio_image_banner" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_portfolio_image_banner_path_idx" ON "_portfolio_v_blocks_portfolio_image_banner" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_portfolio_image_banner_image_idx" ON "_portfolio_v_blocks_portfolio_image_banner" USING btree ("image_id");
  CREATE INDEX "_portfolio_v_parent_idx" ON "_portfolio_v" USING btree ("parent_id");
  CREATE INDEX "_portfolio_v_version_hero_version_hero_media_idx" ON "_portfolio_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_portfolio_v_version_meta_version_meta_image_idx" ON "_portfolio_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_portfolio_v_version_version_slug_idx" ON "_portfolio_v" USING btree ("version_slug");
  CREATE INDEX "_portfolio_v_version_version_updated_at_idx" ON "_portfolio_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolio_v_version_version_created_at_idx" ON "_portfolio_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolio_v_version_version__status_idx" ON "_portfolio_v" USING btree ("version__status");
  CREATE INDEX "_portfolio_v_created_at_idx" ON "_portfolio_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_v_updated_at_idx" ON "_portfolio_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_v_latest_idx" ON "_portfolio_v" USING btree ("latest");
  CREATE INDEX "_portfolio_v_autosave_idx" ON "_portfolio_v" USING btree ("autosave");
  CREATE INDEX "_portfolio_v_rels_order_idx" ON "_portfolio_v_rels" USING btree ("order");
  CREATE INDEX "_portfolio_v_rels_parent_idx" ON "_portfolio_v_rels" USING btree ("parent_id");
  CREATE INDEX "_portfolio_v_rels_path_idx" ON "_portfolio_v_rels" USING btree ("path");
  CREATE INDEX "_portfolio_v_rels_services_id_idx" ON "_portfolio_v_rels" USING btree ("services_id");
  CREATE INDEX "_portfolio_v_rels_pages_id_idx" ON "_portfolio_v_rels" USING btree ("pages_id");
  CREATE INDEX "_portfolio_v_rels_posts_id_idx" ON "_portfolio_v_rels" USING btree ("posts_id");
  CREATE INDEX "_portfolio_v_rels_portfolio_id_idx" ON "_portfolio_v_rels" USING btree ("portfolio_id");
  CREATE INDEX "forms_blocks_radio_options_order_idx" ON "forms_blocks_radio_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_options_parent_id_idx" ON "forms_blocks_radio_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_order_idx" ON "forms_blocks_radio" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_parent_id_idx" ON "forms_blocks_radio" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_path_idx" ON "forms_blocks_radio" USING btree ("_path");
  CREATE INDEX "footer_nav_items_with_icon_order_idx" ON "footer_nav_items_with_icon" USING btree ("_order");
  CREATE INDEX "footer_nav_items_with_icon_parent_id_idx" ON "footer_nav_items_with_icon" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_portfolio_id_idx" ON "pages_rels" USING btree ("portfolio_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_portfolio_id_idx" ON "_pages_v_rels" USING btree ("portfolio_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_portfolio_id_idx" ON "services_rels" USING btree ("portfolio_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_portfolio_id_idx" ON "_services_v_rels" USING btree ("portfolio_id");
  CREATE INDEX "portfolio_hero_hero_media_idx" ON "portfolio" USING btree ("hero_media_id");
  CREATE INDEX "portfolio_meta_meta_image_idx" ON "portfolio" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "portfolio_slug_idx" ON "portfolio" USING btree ("slug");
  CREATE INDEX "portfolio__status_idx" ON "portfolio" USING btree ("_status");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_portfolio_id_idx" ON "header_rels" USING btree ("portfolio_id");
  CREATE INDEX "footer_background_image_idx" ON "footer" USING btree ("background_image_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_portfolio_id_idx" ON "footer_rels" USING btree ("portfolio_id");
  ALTER TABLE "services" DROP COLUMN "description";
  ALTER TABLE "services" DROP COLUMN "image_id";
  ALTER TABLE "_services_v" DROP COLUMN "version_description";
  ALTER TABLE "_services_v" DROP COLUMN "version_image_id";
  ALTER TABLE "portfolio" DROP COLUMN "image_id";
  ALTER TABLE "footer" DROP COLUMN "visitor_count";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block_columns_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_our_process_block_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_our_process_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_block_columns_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_process_block_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_process_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_services_detail_sub_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_services_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_services_detail_sub_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_services_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_content_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolio_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_version_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_content_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_portfolio_insight_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_portfolio_insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_blocks_portfolio_image_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolio_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_radio_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_radio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items_with_icon" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_button_block_columns_buttons" CASCADE;
  DROP TABLE "pages_blocks_button_block_columns" CASCADE;
  DROP TABLE "pages_blocks_button_block" CASCADE;
  DROP TABLE "pages_blocks_our_process_block_steps" CASCADE;
  DROP TABLE "pages_blocks_our_process_block" CASCADE;
  DROP TABLE "pages_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "pages_blocks_portfolio_insight" CASCADE;
  DROP TABLE "pages_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "_pages_v_version_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_columns_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block" CASCADE;
  DROP TABLE "_pages_v_blocks_our_process_block_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_our_process_block" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_insight" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "services_hero_buttons" CASCADE;
  DROP TABLE "services_blocks_services_detail_sub_services" CASCADE;
  DROP TABLE "services_blocks_services_detail" CASCADE;
  DROP TABLE "services_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "services_blocks_portfolio_insight" CASCADE;
  DROP TABLE "services_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "_services_v_version_hero_buttons" CASCADE;
  DROP TABLE "_services_v_blocks_services_detail_sub_services" CASCADE;
  DROP TABLE "_services_v_blocks_services_detail" CASCADE;
  DROP TABLE "_services_v_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "_services_v_blocks_portfolio_insight" CASCADE;
  DROP TABLE "_services_v_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "portfolio_hero_buttons" CASCADE;
  DROP TABLE "portfolio_hero_links" CASCADE;
  DROP TABLE "portfolio_blocks_cta_links" CASCADE;
  DROP TABLE "portfolio_blocks_cta" CASCADE;
  DROP TABLE "portfolio_blocks_content_columns" CASCADE;
  DROP TABLE "portfolio_blocks_content" CASCADE;
  DROP TABLE "portfolio_blocks_media_block" CASCADE;
  DROP TABLE "portfolio_blocks_form_block" CASCADE;
  DROP TABLE "portfolio_blocks_content_media" CASCADE;
  DROP TABLE "portfolio_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "portfolio_blocks_portfolio_insight" CASCADE;
  DROP TABLE "portfolio_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "portfolio_rels" CASCADE;
  DROP TABLE "_portfolio_v_version_hero_buttons" CASCADE;
  DROP TABLE "_portfolio_v_version_hero_links" CASCADE;
  DROP TABLE "_portfolio_v_blocks_cta_links" CASCADE;
  DROP TABLE "_portfolio_v_blocks_cta" CASCADE;
  DROP TABLE "_portfolio_v_blocks_content_columns" CASCADE;
  DROP TABLE "_portfolio_v_blocks_content" CASCADE;
  DROP TABLE "_portfolio_v_blocks_media_block" CASCADE;
  DROP TABLE "_portfolio_v_blocks_form_block" CASCADE;
  DROP TABLE "_portfolio_v_blocks_content_media" CASCADE;
  DROP TABLE "_portfolio_v_blocks_portfolio_insight_insights" CASCADE;
  DROP TABLE "_portfolio_v_blocks_portfolio_insight" CASCADE;
  DROP TABLE "_portfolio_v_blocks_portfolio_image_banner" CASCADE;
  DROP TABLE "_portfolio_v" CASCADE;
  DROP TABLE "_portfolio_v_rels" CASCADE;
  DROP TABLE "forms_blocks_radio_options" CASCADE;
  DROP TABLE "forms_blocks_radio" CASCADE;
  DROP TABLE "footer_nav_items_with_icon" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_services_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_portfolio_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_services_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_portfolio_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_services_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_portfolio_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_services_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_portfolio_fk";
  
  ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_hero_media_id_media_id_fk";
  
  ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_meta_image_id_media_id_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_services_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_portfolio_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_background_image_id_media_id_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_services_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_portfolio_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_services_hero_type";
  CREATE TYPE "public"."enum_services_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero');
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_services_hero_type";
  ALTER TABLE "services" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_services_hero_type" USING "hero_type"::"public"."enum_services_hero_type";
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__services_v_version_hero_type";
  CREATE TYPE "public"."enum__services_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'nonHomepageHero');
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__services_v_version_hero_type";
  ALTER TABLE "_services_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__services_v_version_hero_type" USING "version_hero_type"::"public"."enum__services_v_version_hero_type";
  DROP INDEX "pages_rels_services_id_idx";
  DROP INDEX "pages_rels_portfolio_id_idx";
  DROP INDEX "_pages_v_rels_services_id_idx";
  DROP INDEX "_pages_v_rels_portfolio_id_idx";
  DROP INDEX "services_rels_services_id_idx";
  DROP INDEX "services_rels_portfolio_id_idx";
  DROP INDEX "_services_v_rels_services_id_idx";
  DROP INDEX "_services_v_rels_portfolio_id_idx";
  DROP INDEX "portfolio_hero_hero_media_idx";
  DROP INDEX "portfolio_meta_meta_image_idx";
  DROP INDEX "portfolio_slug_idx";
  DROP INDEX "portfolio__status_idx";
  DROP INDEX "header_rels_services_id_idx";
  DROP INDEX "header_rels_portfolio_id_idx";
  DROP INDEX "footer_background_image_idx";
  DROP INDEX "footer_rels_services_id_idx";
  DROP INDEX "footer_rels_portfolio_id_idx";
  ALTER TABLE "portfolio" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "portfolio" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "portfolio" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "services" ADD COLUMN "description" varchar;
  ALTER TABLE "services" ADD COLUMN "image_id" integer;
  ALTER TABLE "_services_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_services_v" ADD COLUMN "version_image_id" integer;
  ALTER TABLE "portfolio" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "visitor_count" numeric;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "portfolio_image_idx" ON "portfolio" USING btree ("image_id");
  ALTER TABLE "pages_rels" DROP COLUMN "services_id";
  ALTER TABLE "pages_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "services_rels" DROP COLUMN "services_id";
  ALTER TABLE "services_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "portfolio" DROP COLUMN "hero_type";
  ALTER TABLE "portfolio" DROP COLUMN "hero_title";
  ALTER TABLE "portfolio" DROP COLUMN "hero_rich_text";
  ALTER TABLE "portfolio" DROP COLUMN "hero_giant_title_color";
  ALTER TABLE "portfolio" DROP COLUMN "hero_gradient_color";
  ALTER TABLE "portfolio" DROP COLUMN "hero_media_id";
  ALTER TABLE "portfolio" DROP COLUMN "meta_title";
  ALTER TABLE "portfolio" DROP COLUMN "meta_image_id";
  ALTER TABLE "portfolio" DROP COLUMN "meta_description";
  ALTER TABLE "portfolio" DROP COLUMN "published_at";
  ALTER TABLE "portfolio" DROP COLUMN "generate_slug";
  ALTER TABLE "portfolio" DROP COLUMN "slug";
  ALTER TABLE "portfolio" DROP COLUMN "_status";
  ALTER TABLE "header_nav_items_sub_items" DROP COLUMN "primary_color";
  ALTER TABLE "header_rels" DROP COLUMN "services_id";
  ALTER TABLE "header_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "footer" DROP COLUMN "form_id";
  ALTER TABLE "footer" DROP COLUMN "background_image_id";
  ALTER TABLE "footer" DROP COLUMN "heading";
  ALTER TABLE "footer_rels" DROP COLUMN "services_id";
  ALTER TABLE "footer_rels" DROP COLUMN "portfolio_id";
  DROP TYPE "public"."enum_pages_hero_buttons_icon";
  DROP TYPE "public"."enum_pages_hero_buttons_icon_position";
  DROP TYPE "public"."enum_pages_hero_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_button_block_columns_size";
  DROP TYPE "public"."enum__pages_v_version_hero_buttons_icon";
  DROP TYPE "public"."enum__pages_v_version_hero_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_version_hero_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_columns_size";
  DROP TYPE "public"."enum_services_hero_buttons_icon";
  DROP TYPE "public"."enum_services_hero_buttons_icon_position";
  DROP TYPE "public"."enum_services_hero_buttons_variant";
  DROP TYPE "public"."enum__services_v_version_hero_buttons_icon";
  DROP TYPE "public"."enum__services_v_version_hero_buttons_icon_position";
  DROP TYPE "public"."enum__services_v_version_hero_buttons_variant";
  DROP TYPE "public"."enum_portfolio_hero_buttons_icon";
  DROP TYPE "public"."enum_portfolio_hero_buttons_icon_position";
  DROP TYPE "public"."enum_portfolio_hero_buttons_variant";
  DROP TYPE "public"."enum_portfolio_hero_links_link_type";
  DROP TYPE "public"."enum_portfolio_hero_links_link_appearance";
  DROP TYPE "public"."enum_portfolio_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_portfolio_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_portfolio_blocks_content_columns_size";
  DROP TYPE "public"."enum_portfolio_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_portfolio_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_portfolio_blocks_content_media_media_position";
  DROP TYPE "public"."enum_portfolio_hero_type";
  DROP TYPE "public"."enum_portfolio_hero_gradient_color";
  DROP TYPE "public"."enum_portfolio_status";
  DROP TYPE "public"."enum__portfolio_v_version_hero_buttons_icon";
  DROP TYPE "public"."enum__portfolio_v_version_hero_buttons_icon_position";
  DROP TYPE "public"."enum__portfolio_v_version_hero_buttons_variant";
  DROP TYPE "public"."enum__portfolio_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__portfolio_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__portfolio_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__portfolio_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__portfolio_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__portfolio_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__portfolio_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__portfolio_v_blocks_content_media_media_position";
  DROP TYPE "public"."enum__portfolio_v_version_hero_type";
  DROP TYPE "public"."enum__portfolio_v_version_hero_gradient_color";
  DROP TYPE "public"."enum__portfolio_v_version_status";
  DROP TYPE "public"."enum_footer_nav_items_with_icon_link_icon";`)
}
