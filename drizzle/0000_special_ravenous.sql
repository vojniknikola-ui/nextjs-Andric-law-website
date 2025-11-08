CREATE TABLE "act" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_title" text,
	"jurisdiction" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"official_number" text,
	"official_url" text,
	"summary" text,
	"published_at" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gazette_issue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"act_id" uuid NOT NULL,
	"issue_number" text NOT NULL,
	"issue_date" date NOT NULL,
	"issue_type" text DEFAULT 'amendment' NOT NULL,
	"summary" text,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "amendment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"act_id" uuid NOT NULL,
	"gazette_issue_id" uuid,
	"title" text NOT NULL,
	"description" text,
	"effective_from" date NOT NULL,
	"effective_to" date,
	"status" text DEFAULT 'published' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "version" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"act_id" uuid NOT NULL,
	"label" text NOT NULL,
	"snapshot_date" date NOT NULL,
	"generated_from_amendment_id" uuid,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provision" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"act_id" uuid NOT NULL,
	"version_id" uuid,
	"amendment_id" uuid,
	"provision_key" text NOT NULL,
	"heading" text,
	"level" text DEFAULT 'article' NOT NULL,
	"path" text,
	"order_index" integer DEFAULT 0 NOT NULL,
	"valid_from" date NOT NULL,
	"valid_to" date,
	"content" text NOT NULL,
	"plain_content" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provision_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provision_id" uuid NOT NULL,
	"source_version_id" uuid,
	"change_type" text DEFAULT 'modified' NOT NULL,
	"diff" text,
	"notes" text,
	"changed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gazette_issue" ADD CONSTRAINT "gazette_issue_act_id_act_id_fk" FOREIGN KEY ("act_id") REFERENCES "public"."act"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "amendment" ADD CONSTRAINT "amendment_act_id_act_id_fk" FOREIGN KEY ("act_id") REFERENCES "public"."act"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "amendment" ADD CONSTRAINT "amendment_gazette_issue_id_gazette_issue_id_fk" FOREIGN KEY ("gazette_issue_id") REFERENCES "public"."gazette_issue"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "version" ADD CONSTRAINT "version_act_id_act_id_fk" FOREIGN KEY ("act_id") REFERENCES "public"."act"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "version" ADD CONSTRAINT "version_generated_from_amendment_id_amendment_id_fk" FOREIGN KEY ("generated_from_amendment_id") REFERENCES "public"."amendment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provision" ADD CONSTRAINT "provision_act_id_act_id_fk" FOREIGN KEY ("act_id") REFERENCES "public"."act"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provision" ADD CONSTRAINT "provision_version_id_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."version"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provision" ADD CONSTRAINT "provision_amendment_id_amendment_id_fk" FOREIGN KEY ("amendment_id") REFERENCES "public"."amendment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provision_history" ADD CONSTRAINT "provision_history_provision_id_provision_id_fk" FOREIGN KEY ("provision_id") REFERENCES "public"."provision"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provision_history" ADD CONSTRAINT "provision_history_source_version_id_version_id_fk" FOREIGN KEY ("source_version_id") REFERENCES "public"."version"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "act_slug_idx" ON "act" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "gazette_issue_act_idx" ON "gazette_issue" USING btree ("act_id","issue_date");--> statement-breakpoint
CREATE INDEX "amendment_act_effective_idx" ON "amendment" USING btree ("act_id","effective_from");--> statement-breakpoint
CREATE INDEX "version_act_snapshot_idx" ON "version" USING btree ("act_id","snapshot_date");--> statement-breakpoint
CREATE INDEX "provision_act_key_idx" ON "provision" USING btree ("act_id","provision_key","valid_from");--> statement-breakpoint
CREATE INDEX "provision_validity_idx" ON "provision" USING btree ("act_id","valid_from","valid_to");--> statement-breakpoint
CREATE INDEX "provision_history_provision_idx" ON "provision_history" USING btree ("provision_id","changed_at");