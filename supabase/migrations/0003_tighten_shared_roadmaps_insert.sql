-- shared_roadmaps insert 정책을 '항상 true' 대신 범위 검증으로 교체
-- (보안 린터 경고 해소 + 잘못된 값 저장 방지)
drop policy if exists "public insert" on public.shared_roadmaps;
create policy "public insert"
  on public.shared_roadmaps
  for insert
  to anon
  with check (
    age between 15 and 100
    and salary between 0 and 100000
    and (region is null or char_length(region) <= 20)
    and (employment is null or char_length(employment) <= 20)
  );
