-- ============================================================
-- 청년로드맵: 사용자 피드백 수집
-- ============================================================
create table if not exists public.feedback (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  rating      smallint    check (rating between 1 and 5),
  message     text        not null,
  contact     text
);

alter table public.feedback enable row level security;

-- 저장: 누구나 insert 가능하되, 길이 제한으로 남용 방지
drop policy if exists "public insert feedback" on public.feedback;
create policy "public insert feedback"
  on public.feedback
  for insert
  to anon
  with check (
    char_length(message) between 1 and 2000
    and (contact is null or char_length(contact) <= 200)
  );

-- select 정책 없음 → anon은 저장된 피드백을 읽을 수 없음 (관리자만 대시보드에서 확인)
