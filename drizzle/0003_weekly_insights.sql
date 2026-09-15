CREATE TABLE public.newsletter_subscribers (
    id serial PRIMARY KEY NOT NULL,
    email text NOT NULL,
    source text DEFAULT 'weekly-insights' NOT NULL,
    consent_at timestamp DEFAULT now() NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    unsubscribed_at timestamp
);
--> statement-breakpoint
CREATE UNIQUE INDEX newsletter_subscribers_email_unique ON public.newsletter_subscribers (email);
--> statement-breakpoint
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
REVOKE ALL ON public.newsletter_subscribers FROM anon, authenticated;
--> statement-breakpoint
REVOKE ALL ON SEQUENCE public.newsletter_subscribers_id_seq FROM anon, authenticated;
