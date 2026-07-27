-- ============================================================
-- 청년로드맵: 로드맵 결과 저장 + 공유링크 (로그인 없음)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run 하세요.
-- ============================================================

-- 1) 저장 테이블 : 로드맵 입력 조건을 저장 (id는 클라이언트에서 생성)
create table if not exists public.shared_roadmaps (
  id          uuid        primary key,
  created_at  timestamptz not null default now(),
  age         int         not null,
  salary      int         not null,   -- 세전 연봉(만원)
  region      text,
  employment  text,
  no_home     boolean     not null default true
);

-- 2) RLS 켜기 (이걸 켜야 공개키로 무단 접근을 막을 수 있음)
alter table public.shared_roadmaps enable row level security;

-- 3) 저장 정책 : 누구나 insert 가능 (개인 식별정보는 저장하지 않음)
drop policy if exists "public insert" on public.shared_roadmaps;
create policy "public insert"
  on public.shared_roadmaps
  for insert
  to anon
  with check (true);

--   * 직접 select 정책은 만들지 않는다 → anon의 전체 목록 조회를 RLS가 차단.
--     (아무나 GET 으로 저장된 연봉 목록을 훑는 것을 방지)

-- 4) 조회 함수 : id를 아는 사람만 딱 그 한 건을 읽을 수 있게 (공유링크용)
create or replace function public.get_shared_roadmap(p_id uuid)
returns setof public.shared_roadmaps
language sql
security definer
set search_path = public
as $$
  select * from public.shared_roadmaps where id = p_id;
$$;

grant execute on function public.get_shared_roadmap(uuid) to anon;
