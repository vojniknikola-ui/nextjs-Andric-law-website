CREATE TABLE "cms_post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"content_md" text NOT NULL,
	"tags" text[],
	"hero_image_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"is_law_document" boolean DEFAULT false NOT NULL,
	"canonical_url" text,
	"read_minutes" integer DEFAULT 3 NOT NULL,
	"law_slug" text,
	"law_meta" jsonb,
	"author_name" text DEFAULT 'Andrić Law' NOT NULL,
	"author_role" text DEFAULT 'Advokatski ured' NOT NULL,
	"published_at" date DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "cms_post_slug_idx" ON "cms_post" USING btree ("slug");
