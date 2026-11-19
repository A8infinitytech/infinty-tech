create table if not exists public.site_settings (
  id text primary key default 'default' check (id = 'default'),
  brand text not null default '',
  slogan text not null default '',
  email text not null default '',
  phone text not null default '',
  phone_href text not null default '',
  skip_link text not null default '',
  process_number_prefix text not null default '0',
  updated_at timestamptz not null default now()
);
 
create table if not exists public.seo_settings (
  id text primary key default 'default' check (id = 'default'),
  title_default text not null default '',
  title_template text not null default '',
  description text not null default '',
  og_type text not null default '',
  og_title text not null default '',
  og_description text not null default '',
  icons text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.page_seo (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  title text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  asset_key text not null unique,
  src text not null default '',
  dark_src text not null default '',
  alt text not null default '',
  path text not null default '',
  view_box text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null default '',
  href text not null default '',
  nav_group text not null default 'main',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.ui_labels (
  id uuid primary key default gen_random_uuid(),
  label_key text not null unique,
  value text not null default '',
  description text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_sections (
  id text primary key default 'default' check (id = 'default'),
  heading_lead text not null default '',
  heading_accent text not null default '',
  description text not null default '',
  primary_cta_label text not null default '',
  primary_cta_href text not null default '/contact',
  secondary_cta_label text not null default '',
  secondary_cta_href text not null default '/services',
  updated_at timestamptz not null default now()
);

create table if not exists public.section_headings (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  eyebrow text not null default '',
  title text not null default '',
  description text not null default '',
  button_label text not null default '',
  button_href text not null default '',
  loading_label text not null default '',
  empty_title text not null default '',
  empty_description text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.hero_ask (
  id text primary key default 'default' check (id = 'default'),
  label text not null default '',
  placeholder text not null default '',
  submit_label text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.suggested_prompts (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'hero_ask',
  label text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.about_blocks (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'block',
  title text not null default '',
  description text not null default '',
  icon text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.services add column if not exists sort_order integer not null default 0;
alter table public.services add column if not exists published boolean not null default true;
alter table public.services add column if not exists updated_at timestamptz not null default now();

create table if not exists public.service_settings (
  id text primary key default 'default' check (id = 'default'),
  preview_limit integer not null default 5,
  explore_button_label text not null default '',
  explore_button_href text not null default '/services',
  quote_label text not null default '',
  fallback_icon_name text not null default '',
  contact_base_url text not null default '/contact?service=',
  loading_label text not null default '',
  empty_label text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  page_key text not null default 'home',
  title text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.why_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  icon text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null default '',
  icon text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  category text not null default '',
  description text not null default '',
  image_url text not null default '',
  link text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text not null default '',
  quote text not null default '',
  avatar_url text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null default '',
  answer text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  href text not null default '',
  icon text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_info (
  id text primary key default 'default' check (id = 'default'),
  email text not null default '',
  phone text not null default '',
  phone_href text not null default '',
  whatsapp_base_url text not null default '',
  whatsapp_number text not null default '',
  fallback_email text not null default '',
  fallback_phone text not null default '',
  heading_eyebrow text not null default '',
  heading_title text not null default '',
  heading_description text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_form_labels (
  id text primary key default 'default' check (id = 'default'),
  name_label text not null default '',
  email_label text not null default '',
  service_label text not null default '',
  details_label text not null default '',
  other_option text not null default '',
  submit_label text not null default '',
  sending_label text not null default '',
  success_message text not null default '',
  error_message text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_config (
  id text primary key default 'default' check (id = 'default'),
  title text not null default '',
  subtitle text not null default '',
  welcome text not null default '',
  welcome_with_slogan text not null default '',
  thinking text not null default '',
  aria_label text not null default '',
  open_label text not null default '',
  close_label text not null default '',
  send_label text not null default '',
  message_label text not null default '',
  message_placeholder text not null default '',
  fallback_email text not null default '',
  fallback_phone text not null default '',
  default_service_names text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.chatbot_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text not null unique,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.dashboard_config (
  id text primary key default 'default' check (id = 'default'),
  auto_label text not null default '',
  live_label text not null default '',
  quote_label text not null default '',
  console_label text not null default '',
  loading_label text not null default '',
  process_label text not null default '',
  tablist_label text not null default '',
  services_label text not null default '',
  completed_label text not null default '',
  in_progress_label text not null default '',
  performance_label text not null default '',
  skeleton_rows integer not null default 5,
  updated_at timestamptz not null default now()
);

create table if not exists public.dashboard_steps (
  id uuid primary key default gen_random_uuid(),
  service_name text not null default '',
  label text not null default '',
  scope text not null default 'workflow',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.state_messages (
  id uuid primary key default gen_random_uuid(),
  message_key text not null unique,
  code text not null default '',
  heading text not null default '',
  description text not null default '',
  button_label text not null default '',
  button_href text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.footer_config (
  id text primary key default 'default' check (id = 'default'),
  pages_heading text not null default '',
  contact_heading text not null default '',
  newsletter_heading text not null default '',
  newsletter_description text not null default '',
  email_placeholder text not null default '',
  wait_label text not null default '',
  subscribe_label text not null default '',
  success_message text not null default '',
  error_message text not null default '',
  copyright_symbol text not null default '',
  copyright_text text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.icon_meta (
  id text primary key default 'default' check (id = 'default'),
  fallback_name text not null default '',
  whatsapp_path text not null default '',
  whatsapp_view_box text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonial_placeholder (
  id text primary key default 'default' check (id = 'default'),
  heading text not null default '',
  description text not null default '',
  updated_at timestamptz not null default now()
);

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'site_settings','seo_settings','page_seo','media_assets','navigation_items','ui_labels',
    'hero_sections','section_headings','hero_ask','suggested_prompts','about_blocks','services',
    'service_settings','process_steps','why_cards','tools','projects','testimonials','faqs',
    'social_links','contact_info','contact_form_labels','chatbot_config','chatbot_templates',
    'dashboard_config','dashboard_steps','state_messages','footer_config','icon_meta','testimonial_placeholder'
  ]) loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read %I" on public.%I', t, t);
    execute format('create policy "public read %I" on public.%I for select using (true)', t, t);
  end loop;
end $$;

grant select on all tables in schema public to anon, authenticated;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to anon, authenticated;
grant all on all sequences in schema public to service_role;

with src as (
  select
    coalesce((select data::jsonb from public.site_content where key = 'site'), '{}'::jsonb) as site,
    coalesce((select data::jsonb from public.site_content where key = 'constants'), '{}'::jsonb) as constants
)
insert into public.site_settings (id, brand, slogan, email, phone, phone_href, skip_link, process_number_prefix)
select
  'default',
  coalesce(site->>'brand', constants->>'slogan', ''),
  coalesce(site->>'slogan', constants->>'slogan', ''),
  coalesce(site->>'email', constants->>'email', ''),
  coalesce(site->>'phone', constants->>'phone', ''),
  coalesce(site->>'phoneHref', constants->>'phoneHref', ''),
  coalesce(site->>'skipLink', ''),
  coalesce((select data::jsonb->>'processNumberPrefix' from public.site_content where key = 'home'), '0')
from src
on conflict (id) do update set
  brand = excluded.brand,
  slogan = excluded.slogan,
  email = excluded.email,
  phone = excluded.phone,
  phone_href = excluded.phone_href,
  skip_link = excluded.skip_link,
  process_number_prefix = excluded.process_number_prefix,
  updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'site'), '{}'::jsonb) as site
)
insert into public.seo_settings (id, title_default, title_template, description, og_type, og_title, og_description, icons)
select
  'default',
  coalesce(site->'metadata'->'title'->>'default', ''),
  coalesce(site->'metadata'->'title'->>'template', ''),
  coalesce(site->'metadata'->>'description', ''),
  coalesce(site->'metadata'->'openGraph'->>'type', ''),
  coalesce(site->'metadata'->'openGraph'->>'title', ''),
  coalesce(site->'metadata'->'openGraph'->>'description', ''),
  coalesce(site->'metadata'->>'icons', '')
from src
on conflict (id) do update set
  title_default = excluded.title_default,
  title_template = excluded.title_template,
  description = excluded.description,
  og_type = excluded.og_type,
  og_title = excluded.og_title,
  og_description = excluded.og_description,
  icons = excluded.icons,
  updated_at = now();

insert into public.page_seo (page_key, title, description, sort_order)
select 'home', coalesce((select data::jsonb->'site'->'metadata'->'title'->>'default' from public.site_content where key = 'site'), ''), coalesce((select data::jsonb->'site'->>'slogan' from public.site_content where key = 'site'), ''), 0
where not exists (select 1 from public.page_seo where page_key = 'home');

insert into public.page_seo (page_key, title, description, sort_order)
select key, coalesce(data::jsonb->'metadata'->>'title', ''), coalesce(data::jsonb->'metadata'->>'description', ''), case key when 'about' then 1 when 'services' then 2 when 'projects' then 3 when 'contact' then 4 else 9 end
from public.site_content
where key in ('about','services','projects','contact')
on conflict (page_key) do update set title = excluded.title, description = excluded.description, updated_at = now();

do $$
begin
  if not exists (select 1 from public.page_seo where page_key = 'services') then
    insert into public.page_seo (page_key, title, description, sort_order)
    select 'services', coalesce(data::jsonb->'heading'->>'title', ''), coalesce(data::jsonb->'heading'->>'desc', ''), 2
    from public.site_content where key = 'servicesPage';
  end if;
end $$;

insert into public.media_assets (asset_key, src, dark_src, alt)
select 'logo', coalesce(data::jsonb->'logo'->>'src', ''), coalesce(data::jsonb->'logo'->>'darkSrc', ''), coalesce(data::jsonb->'logo'->>'alt', '')
from public.site_content where key = 'images'
on conflict (asset_key) do update set src = excluded.src, dark_src = excluded.dark_src, alt = excluded.alt, updated_at = now();

insert into public.media_assets (asset_key, src)
select 'favicon', coalesce(data::jsonb->>'favicon', '')
from public.site_content where key = 'images'
on conflict (asset_key) do update set src = excluded.src, updated_at = now();

insert into public.media_assets (asset_key, path, view_box, alt)
select 'whatsapp', coalesce(data::jsonb->'whatsapp'->>'path', ''), coalesce(data::jsonb->'whatsapp'->>'viewBox', ''), 'WhatsApp'
from public.site_content where key = 'iconMeta'
on conflict (asset_key) do update set path = excluded.path, view_box = excluded.view_box, updated_at = now();

insert into public.navigation_items (label, href, nav_group, sort_order)
select value->>'label', value->>'href', 'main', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'navigation'
on conflict do nothing;

insert into public.ui_labels (label_key, value)
select 'navbar.ariaLabel', coalesce(data::jsonb->>'ariaLabel', '') from public.site_content where key = 'navbar'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'navbar.homeAriaLabel', coalesce(data::jsonb->>'homeAriaLabel', '') from public.site_content where key = 'navbar'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'navbar.ctaLabel', coalesce(data::jsonb->>'ctaLabel', '') from public.site_content where key = 'navbar'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'navbar.openMenuLabel', coalesce(data::jsonb->>'openMenuLabel', '') from public.site_content where key = 'navbar'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'navbar.closeMenuLabel', coalesce(data::jsonb->>'closeMenuLabel', '') from public.site_content where key = 'navbar'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'socialLinks.ariaLabel', coalesce(data::jsonb->>'ariaLabel', '') from public.site_content where key = 'socialLinks'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'socialLinks.comingSoonSuffix', coalesce(data::jsonb->>'comingSoonSuffix', '') from public.site_content where key = 'socialLinks'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'themeToggle.ariaLabel', coalesce(data::jsonb->>'ariaLabel', '') from public.site_content where key = 'themeToggle'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'scrollUtils.backToTopLabel', coalesce(data::jsonb->>'backToTopLabel', '') from public.site_content where key = 'scrollUtils'
on conflict (label_key) do update set value = excluded.value, updated_at = now();

insert into public.ui_labels (label_key, value)
select 'footer.ariaLabel', 'Footer'
on conflict (label_key) do nothing;

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'home'), '{}'::jsonb) as home,
         coalesce((select data::jsonb from public.site_content where key = 'hero'), '{}'::jsonb) as hero
)
insert into public.hero_sections (id, heading_lead, heading_accent, description, primary_cta_label, secondary_cta_label)
select
  'default',
  coalesce(home->'hero'->>'headingLead', hero->>'headingLead', ''),
  coalesce(home->'hero'->>'headingAccent', hero->>'headingAccent', ''),
  coalesce(home->'hero'->>'description', hero->>'description', ''),
  coalesce(home->'hero'->>'primaryCta', hero->>'primaryCta', ''),
  coalesce(home->'hero'->>'secondaryCta', hero->>'secondaryCta', '')
from src
on conflict (id) do update set
  heading_lead = excluded.heading_lead,
  heading_accent = excluded.heading_accent,
  description = excluded.description,
  primary_cta_label = excluded.primary_cta_label,
  secondary_cta_label = excluded.secondary_cta_label,
  updated_at = now();

insert into public.section_headings (page_key, section_key, eyebrow, title, description, button_label, button_href, loading_label, empty_title, empty_description, sort_order)
select 'home', x.key, coalesce(x.value->>'eyebrow', ''), coalesce(x.value->>'title', ''), coalesce(x.value->>'desc', ''), coalesce(x.value->>'button', ''), '', coalesce(x.value->>'loading', ''), '', '', (ord - 1)::int
from public.site_content as sc, jsonb_each(case when jsonb_typeof(sc.data::jsonb->'sections') = 'object' then sc.data::jsonb->'sections' else '{}'::jsonb end) with ordinality as x(key, value, ord)
where sc.key = 'home'
on conflict (page_key, section_key) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  description = excluded.description,
  button_label = excluded.button_label,
  loading_label = excluded.loading_label,
  updated_at = now();

insert into public.section_headings (page_key, section_key, eyebrow, title, description, sort_order)
select 'about', x.key, coalesce(x.value->>'eyebrow', ''), coalesce(x.value->>'title', ''), '', (ord - 1)::int
from public.site_content as sc, jsonb_each(case when jsonb_typeof(sc.data::jsonb->'sections') = 'object' then sc.data::jsonb->'sections' else '{}'::jsonb end) with ordinality as x(key, value, ord)
where sc.key = 'about'
on conflict (page_key, section_key) do update set eyebrow = excluded.eyebrow, title = excluded.title, updated_at = now();

insert into public.section_headings (page_key, section_key, eyebrow, title, description, loading_label, empty_title, sort_order)
select 'services', 'services', coalesce(data::jsonb->'heading'->>'eyebrow', ''), coalesce(data::jsonb->'heading'->>'title', ''), coalesce(data::jsonb->'heading'->>'desc', ''), coalesce(data::jsonb->>'loading', ''), coalesce(data::jsonb->>'noServices', ''), 0
from public.site_content where key = 'servicesPage'
on conflict (page_key, section_key) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  description = excluded.description,
  loading_label = excluded.loading_label,
  empty_title = excluded.empty_title,
  updated_at = now();

insert into public.section_headings (page_key, section_key, eyebrow, title, empty_title, empty_description, sort_order)
select 'projects', 'projects', coalesce(data::jsonb->'heading'->>'eyebrow', ''), coalesce(data::jsonb->'heading'->>'title', ''), coalesce(data::jsonb->'emptyState'->>'heading', ''), coalesce(data::jsonb->'emptyState'->>'description', ''), 0
from public.site_content where key = 'projects'
on conflict (page_key, section_key) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  empty_title = excluded.empty_title,
  empty_description = excluded.empty_description,
  updated_at = now();

insert into public.section_headings (page_key, section_key, eyebrow, title, description, sort_order)
select 'about', 'intro', coalesce(data::jsonb->'intro'->>'eyebrow', ''), '', coalesce(data::jsonb->'intro'->>'desc', ''), 99
from public.site_content where key = 'about'
on conflict (page_key, section_key) do update set eyebrow = excluded.eyebrow, description = excluded.description, updated_at = now();

insert into public.section_headings (page_key, section_key, title, description, button_label, sort_order)
select 'home', 'cta', coalesce(data::jsonb->>'heading', ''), coalesce(data::jsonb->>'description', ''), coalesce(data::jsonb->>'button', ''), 99
from public.site_content where key = 'cta'
on conflict (page_key, section_key) do update set title = excluded.title, description = excluded.description, button_label = excluded.button_label, updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'heroAsk'), '{}'::jsonb) as hero_ask
)
insert into public.hero_ask (id, label, placeholder, submit_label)
select 'default', coalesce(hero_ask->>'label', ''), coalesce(hero_ask->>'placeholder', ''), coalesce(hero_ask->>'submitLabel', '')
from src
on conflict (id) do update set label = excluded.label, placeholder = excluded.placeholder, submit_label = excluded.submit_label, updated_at = now();

insert into public.suggested_prompts (scope, label, sort_order)
select 'hero_ask', value #>> '{}', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'heroAsk'
on conflict do nothing;

insert into public.suggested_prompts (scope, label, sort_order)
select 'chatbot', value #>> '{}', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb->'suggestions') = 'array' then sc.data::jsonb->'suggestions' else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'chatbot'
on conflict do nothing;

insert into public.about_blocks (kind, title, description, icon, sort_order)
select 'block', value->>'t', value->>'d', value->>'i', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb->'blocks') = 'array' then sc.data::jsonb->'blocks' else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'about'
on conflict do nothing;

insert into public.about_blocks (kind, title, description, icon, sort_order)
select 'value', value->>'t', value->>'d', value->>'i', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb->'values') = 'array' then sc.data::jsonb->'values' else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'about'
on conflict do nothing;

update public.services set sort_order = s.ord::int - 1, published = true
from (
  select id, row_number() over (order by created_at, title) as ord
  from public.services
) s
where public.services.id = s.id;

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'servicesPreview'), '{}'::jsonb) as preview,
         coalesce((select data::jsonb from public.site_content where key = 'serviceCard'), '{}'::jsonb) as card,
         coalesce((select data::jsonb from public.site_content where key = 'servicesPage'), '{}'::jsonb) as page
)
insert into public.service_settings (id, preview_limit, explore_button_label, quote_label, fallback_icon_name, contact_base_url, loading_label, empty_label)
select 'default', coalesce((preview->>'previewLimit')::int, 5), coalesce(preview->>'button', ''), coalesce(card->>'quoteLabel', ''), coalesce(card->>'fallbackIconName', ''), coalesce(card->>'contactBaseUrl', '/contact?service='), coalesce(page->>'loading', ''), coalesce(page->>'noServices', '')
from src
on conflict (id) do update set
  preview_limit = excluded.preview_limit,
  explore_button_label = excluded.explore_button_label,
  quote_label = excluded.quote_label,
  fallback_icon_name = excluded.fallback_icon_name,
  contact_base_url = excluded.contact_base_url,
  loading_label = excluded.loading_label,
  empty_label = excluded.empty_label,
  updated_at = now();

insert into public.process_steps (page_key, title, description, sort_order)
select 'home', value->>'t', value->>'d', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'process'
on conflict do nothing;

insert into public.why_cards (title, description, sort_order)
select value->>'t', value->>'d', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'why'
on conflict do nothing;

insert into public.tools (name, description, icon, sort_order)
select value->>'name', value->>'desc', value->>'icon', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'tools'
on conflict (name) do update set description = excluded.description, icon = excluded.icon, sort_order = excluded.sort_order, updated_at = now();

insert into public.tools (name, description, icon, sort_order)
select value #>> '{}', '', 'Sparkles', (ord - 1)::int + 100
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'stack'
on conflict (name) do nothing;

insert into public.faqs (question, answer, sort_order)
select value->>'q', value->>'a', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'faq'
on conflict do nothing;

insert into public.social_links (name, href, icon, sort_order)
select value->>'name', value->>'href', value->>'icon', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb) = 'array' then sc.data::jsonb else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'socials'
on conflict do nothing;

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'contact'), '{}'::jsonb) as contact,
         coalesce((select data::jsonb from public.site_content where key = 'constants'), '{}'::jsonb) as constants,
         coalesce((select data::jsonb from public.site_content where key = 'chatbot'), '{}'::jsonb) as chatbot
)
insert into public.contact_info (id, email, phone, phone_href, whatsapp_base_url, fallback_email, fallback_phone, heading_eyebrow, heading_title, heading_description)
select 'default', coalesce(constants->>'email', ''), coalesce(constants->>'phone', ''), coalesce(constants->>'phoneHref', ''), coalesce(contact->>'whatsappBaseUrl', ''), coalesce(contact->'fallbacks'->>'email', chatbot->'fallbackDefaults'->>'email', ''), coalesce(contact->'fallbacks'->>'phone', chatbot->'fallbackDefaults'->>'phone', ''), coalesce(contact->'heading'->>'eyebrow', ''), coalesce(contact->'heading'->>'title', ''), coalesce(contact->'heading'->>'desc', '')
from src
on conflict (id) do update set
  email = excluded.email,
  phone = excluded.phone,
  phone_href = excluded.phone_href,
  whatsapp_base_url = excluded.whatsapp_base_url,
  fallback_email = excluded.fallback_email,
  fallback_phone = excluded.fallback_phone,
  heading_eyebrow = excluded.heading_eyebrow,
  heading_title = excluded.heading_title,
  heading_description = excluded.heading_description,
  updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'contactForm'), '{}'::jsonb) as form
)
insert into public.contact_form_labels (id, name_label, email_label, service_label, details_label, other_option, submit_label, sending_label, success_message, error_message)
select 'default', coalesce(form->'labels'->>'name', ''), coalesce(form->'labels'->>'email', ''), coalesce(form->'labels'->>'service', ''), coalesce(form->'labels'->>'details', ''), coalesce(form->>'otherOption', ''), coalesce(form->>'sendMessage', ''), coalesce(form->>'sending', ''), coalesce(form->>'sent', ''), coalesce(form->>'error', '')
from src
on conflict (id) do update set
  name_label = excluded.name_label,
  email_label = excluded.email_label,
  service_label = excluded.service_label,
  details_label = excluded.details_label,
  other_option = excluded.other_option,
  submit_label = excluded.submit_label,
  sending_label = excluded.sending_label,
  success_message = excluded.success_message,
  error_message = excluded.error_message,
  updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'chatbot'), '{}'::jsonb) as chatbot
)
insert into public.chatbot_config (id, title, subtitle, welcome, welcome_with_slogan, thinking, aria_label, open_label, close_label, send_label, message_label, message_placeholder, fallback_email, fallback_phone, default_service_names)
select 'default', coalesce(chatbot->>'title', ''), coalesce(chatbot->>'subtitle', ''), coalesce(chatbot->>'welcome', ''), coalesce(chatbot->>'welcomeWithSlogan', ''), coalesce(chatbot->>'thinking', ''), coalesce(chatbot->>'ariaLabel', ''), coalesce(chatbot->>'openLabel', ''), coalesce(chatbot->>'closeLabel', ''), coalesce(chatbot->>'sendLabel', ''), coalesce(chatbot->>'messageLabel', ''), coalesce(chatbot->>'messagePlaceholder', ''), coalesce(chatbot->'fallbackDefaults'->>'email', ''), coalesce(chatbot->'fallbackDefaults'->>'phone', ''), coalesce(chatbot->'fallbackTemplates'->>'defaultServiceNames', '')
from src
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  welcome = excluded.welcome,
  welcome_with_slogan = excluded.welcome_with_slogan,
  thinking = excluded.thinking,
  aria_label = excluded.aria_label,
  open_label = excluded.open_label,
  close_label = excluded.close_label,
  send_label = excluded.send_label,
  message_label = excluded.message_label,
  message_placeholder = excluded.message_placeholder,
  fallback_email = excluded.fallback_email,
  fallback_phone = excluded.fallback_phone,
  default_service_names = excluded.default_service_names,
  updated_at = now();

insert into public.chatbot_templates (template_key, value)
select x.key, x.value #>> '{}'
from public.site_content as sc, jsonb_each(case when jsonb_typeof(sc.data::jsonb->'fallbackTemplates') = 'object' then sc.data::jsonb->'fallbackTemplates' else '{}'::jsonb end) as x(key, value)
where sc.key = 'chatbot'
on conflict (template_key) do update set value = excluded.value, updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'dashboard'), '{}'::jsonb) as dashboard
)
insert into public.dashboard_config (id, auto_label, live_label, quote_label, console_label, loading_label, process_label, tablist_label, services_label, completed_label, in_progress_label, performance_label, skeleton_rows)
select 'default', coalesce(dashboard->>'autoLabel', ''), coalesce(dashboard->>'liveLabel', ''), coalesce(dashboard->>'quoteLabel', ''), coalesce(dashboard->>'consoleLabel', ''), coalesce(dashboard->>'loadingLabel', ''), coalesce(dashboard->>'processLabel', ''), coalesce(dashboard->>'tablistLabel', ''), coalesce(dashboard->>'servicesLabel', ''), coalesce(dashboard->>'completedLabel', ''), coalesce(dashboard->>'inProgressLabel', ''), coalesce(dashboard->>'performanceLabel', ''), coalesce(jsonb_array_length(case when jsonb_typeof(dashboard->'skeletonRows') = 'array' then dashboard->'skeletonRows' else '[]'::jsonb end), 5)
from src
on conflict (id) do update set
  auto_label = excluded.auto_label,
  live_label = excluded.live_label,
  quote_label = excluded.quote_label,
  console_label = excluded.console_label,
  loading_label = excluded.loading_label,
  process_label = excluded.process_label,
  tablist_label = excluded.tablist_label,
  services_label = excluded.services_label,
  completed_label = excluded.completed_label,
  in_progress_label = excluded.in_progress_label,
  performance_label = excluded.performance_label,
  skeleton_rows = excluded.skeleton_rows,
  updated_at = now();

insert into public.dashboard_steps (service_name, label, scope, sort_order)
select w.key, s.value, 'workflow', ((w.ord - 1) * 10 + (s.ord - 1))::int
from public.site_content as sc,
     jsonb_each(case when jsonb_typeof(sc.data::jsonb->'workflowSteps') = 'object' then sc.data::jsonb->'workflowSteps' else '{}'::jsonb end) with ordinality as w(key, value, ord),
     jsonb_array_elements_text(case when jsonb_typeof(w.value) = 'array' then w.value else '[]'::jsonb end) with ordinality as s(value, ord)
where sc.key = 'dashboard'
on conflict do nothing;

insert into public.dashboard_steps (service_name, label, scope, sort_order)
select '', value #>> '{}', 'default', (ord - 1)::int
from public.site_content as sc, jsonb_array_elements(case when jsonb_typeof(sc.data::jsonb->'defaultSteps') = 'array' then sc.data::jsonb->'defaultSteps' else '[]'::jsonb end) with ordinality as x(value, ord)
where sc.key = 'dashboard'
on conflict do nothing;

insert into public.state_messages (message_key, heading, description, button_label, button_href)
select 'loading', coalesce(data::jsonb->>'statusLabel', ''), coalesce(data::jsonb->>'srOnly', ''), '', ''
from public.site_content where key = 'loading'
on conflict (message_key) do update set heading = excluded.heading, description = excluded.description, updated_at = now();

insert into public.state_messages (message_key, heading, description, button_label, button_href)
select 'error', coalesce(data::jsonb->>'heading', ''), coalesce(data::jsonb->>'description', ''), coalesce(data::jsonb->>'goHome', ''), '/'
from public.site_content where key = 'error'
on conflict (message_key) do update set heading = excluded.heading, description = excluded.description, button_label = excluded.button_label, updated_at = now();

insert into public.state_messages (message_key, code, heading, description, button_label, button_href)
select 'notFound', coalesce(data::jsonb->>'code', ''), coalesce(data::jsonb->>'heading', ''), coalesce(data::jsonb->>'description', ''), coalesce(data::jsonb->>'button', ''), '/'
from public.site_content where key = 'notFound'
on conflict (message_key) do update set code = excluded.code, heading = excluded.heading, description = excluded.description, button_label = excluded.button_label, updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'footer'), '{}'::jsonb) as footer
)
insert into public.footer_config (id, pages_heading, contact_heading, newsletter_heading, newsletter_description, email_placeholder, wait_label, subscribe_label, success_message, error_message, copyright_symbol, copyright_text)
select 'default', coalesce(footer->'headings'->>'pages', ''), coalesce(footer->'headings'->>'contact', ''), coalesce(footer->'headings'->>'newsletter', ''), coalesce(footer->>'newsletterDescription', ''), coalesce(footer->>'emailPlaceholder', ''), coalesce(footer->>'waitLabel', ''), coalesce(footer->>'subscribeLabel', ''), coalesce(footer->>'success', ''), coalesce(footer->>'error', ''), coalesce(footer->>'copyrightSymbol', ''), coalesce(footer->>'copyrightText', '')
from src
on conflict (id) do update set
  pages_heading = excluded.pages_heading,
  contact_heading = excluded.contact_heading,
  newsletter_heading = excluded.newsletter_heading,
  newsletter_description = excluded.newsletter_description,
  email_placeholder = excluded.email_placeholder,
  wait_label = excluded.wait_label,
  subscribe_label = excluded.subscribe_label,
  success_message = excluded.success_message,
  error_message = excluded.error_message,
  copyright_symbol = excluded.copyright_symbol,
  copyright_text = excluded.copyright_text,
  updated_at = now();

with src as (
  select coalesce((select data::jsonb from public.site_content where key = 'iconMeta'), '{}'::jsonb) as icon_meta
)
insert into public.icon_meta (id, fallback_name, whatsapp_path, whatsapp_view_box)
select 'default', coalesce(icon_meta->>'fallbackName', ''), coalesce(icon_meta->'whatsapp'->>'path', ''), coalesce(icon_meta->'whatsapp'->>'viewBox', '')
from src
on conflict (id) do update set fallback_name = excluded.fallback_name, whatsapp_path = excluded.whatsapp_path, whatsapp_view_box = excluded.whatsapp_view_box, updated_at = now();

insert into public.testimonial_placeholder (id, heading, description)
select 'default', coalesce(data::jsonb->>'heading', ''), coalesce(data::jsonb->>'description', '')
from public.site_content where key = 'testimonialsPlaceholder'
on conflict (id) do update set heading = excluded.heading, description = excluded.description, updated_at = now();

create index if not exists idx_navigation_items_order on public.navigation_items (nav_group, sort_order);
create index if not exists idx_section_headings_page on public.section_headings (page_key, sort_order);
create index if not exists idx_suggested_prompts_scope on public.suggested_prompts (scope, sort_order);
create index if not exists idx_about_blocks_kind_order on public.about_blocks (kind, sort_order);
create index if not exists idx_process_steps_page_order on public.process_steps (page_key, sort_order);
create index if not exists idx_why_cards_order on public.why_cards (sort_order);
create index if not exists idx_tools_order on public.tools (sort_order);
create index if not exists idx_projects_order on public.projects (sort_order);
create index if not exists idx_testimonials_order on public.testimonials (sort_order);
create index if not exists idx_faqs_order on public.faqs (sort_order);
create index if not exists idx_social_links_order on public.social_links (sort_order);
create index if not exists idx_dashboard_steps_scope_order on public.dashboard_steps (scope, sort_order);
