-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum types
create type priority as enum ('high', 'medium', 'low');
create type conversation_status as enum ('active', 'pending', 'resolved', 'archived');
create type platform as enum ('telegram', 'whatsapp', 'direct');

-- Create customers table
create table customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text,
  preferences jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create conversations table
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) on delete cascade,
  platform platform not null,
  priority priority not null default 'medium',
  status conversation_status not null default 'active',
  subject text not null,
  last_message text,
  has_attachments boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create messages table
create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  content text not null,
  sender text not null check (sender in ('user', 'ai')),
  created_at timestamp with time zone default now()
);

-- Create files table
create table files (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  filename text not null,
  file_type text not null,
  size integer not null,
  url text not null,
  uploaded_at timestamp with time zone default now()
);

-- Create follow_ups table
create table follow_ups (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  description text not null,
  due_date timestamp with time zone not null,
  status text not null check (status in ('pending', 'completed')),
  priority priority not null default 'medium',
  assigned_to uuid references auth.users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index idx_conversations_customer_id on conversations(customer_id);
create index idx_conversations_status on conversations(status);
create index idx_conversations_priority on conversations(priority);
create index idx_messages_conversation_id on messages(conversation_id);
create index idx_files_conversation_id on files(conversation_id);
create index idx_follow_ups_conversation_id on follow_ups(conversation_id);
create index idx_follow_ups_status on follow_ups(status);
create index idx_follow_ups_due_date on follow_ups(due_date);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers to automatically update updated_at
create trigger update_customers_updated_at
  before update on customers
  for each row
  execute function update_updated_at_column();

create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();

create trigger update_follow_ups_updated_at
  before update on follow_ups
  for each row
  execute function update_updated_at_column();
