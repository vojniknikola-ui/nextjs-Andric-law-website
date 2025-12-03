CREATE TABLE "lead" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"contact" text NOT NULL,
	"contact_type" text,
	"category" text NOT NULL,
	"message" text NOT NULL,
	"page_url" text,
	"page_type" text,
	"client_type" text,
	"source" text DEFAULT 'chat_widget' NOT NULL,
	"out_of_hours" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "lead_created_idx" ON "lead" USING btree ("created_at");
