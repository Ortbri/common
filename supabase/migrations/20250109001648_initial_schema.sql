-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create designs table for architectural assets
create table public.designs (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text,
    category text,
    dimensions jsonb, -- Store width, height, depth, etc.
    tags text[],
    file_path text not null,
    preview_path text,
    file_size bigint,
    file_type text,
    user_id uuid references auth.users not null,
    is_premium boolean default false,
    downloads integer default 0,
    metadata jsonb default '{}'::jsonb
);

-- Create customers table for extended user info
create table public.customers (
    id uuid references auth.users primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text,
    stripe_customer_id text,
    subscription_status text,
    subscription_tier text,
    subscription_id text,
    metadata jsonb default '{}'::jsonb
);

-- Create downloads table to track usage
create table public.downloads (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    design_id uuid references public.designs not null,
    user_id uuid references auth.users not null,
    ip_address text
);

-- Enable RLS (Row Level Security)
alter table public.designs enable row level security;
alter table public.customers enable row level security;
alter table public.downloads enable row level security;

-- Designs policies
create policy "Public designs are viewable by everyone"
    on public.designs for select
    using (not is_premium);

create policy "Premium designs are viewable by subscribers"
    on public.designs for select
    using (
        is_premium and exists (
            select 1 from public.customers
            where user_id = auth.uid()
            and subscription_status = 'active'
        )
    );

create policy "Users can create designs"
    on public.designs for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own designs"
    on public.designs for update
    using (auth.uid() = user_id);

-- Customers policies
create policy "Users can view their own customer record"
    on public.customers for select
    using (auth.uid() = id);

create policy "Users can update their own customer record"
    on public.customers for update
    using (auth.uid() = id);

-- Downloads policies
create policy "Users can view their download history"
    on public.downloads for select
    using (auth.uid() = user_id);

create policy "Users can create download records"
    on public.downloads for insert
    with check (auth.uid() = user_id);

-- Create storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
    ('designs', 'designs', false, 104857600, array['image/svg+xml', 'image/png', 'application/pdf', 'application/dxf']),
    ('previews', 'previews', true, 5242880, array['image/png', 'image/jpeg', 'image/webp']);

-- Storage policies
create policy "Anyone can view public previews"
    on storage.objects for select
    using (bucket_id = 'previews');

create policy "Only subscribers can download premium designs"
    on storage.objects for select
    using (
        bucket_id = 'designs' 
        and exists (
            select 1 from public.customers
            where user_id = auth.uid()
            and subscription_status = 'active'
        )
    );

create policy "Authenticated users can upload designs"
    on storage.objects for insert
    with check (
        bucket_id in ('designs', 'previews')
        and auth.role() = 'authenticated'
    );

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.customers (id, email)
    values (new.id, new.email);
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Handle updated timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_designs_updated_at
    before update on public.designs
    for each row
    execute function public.handle_updated_at();

create trigger handle_customers_updated_at
    before update on public.customers
    for each row
    execute function public.handle_updated_at();

create trigger handle_downloads_updated_at
    before update on public.downloads
    for each row
    execute function public.handle_updated_at();