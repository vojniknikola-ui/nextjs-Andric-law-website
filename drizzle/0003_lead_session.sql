ALTER TABLE "lead" ADD COLUMN "session_id" text;
CREATE INDEX "lead_session_idx" ON "lead" USING btree ("session_id");
