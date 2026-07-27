/**
 * 로드맵 결과 저장 + 공유링크 (Supabase)
 * - 저장: 입력 조건을 shared_roadmaps 테이블에 insert (id는 여기서 생성)
 * - 조회: get_shared_roadmap RPC로 id 한 건만 읽기 (전체 목록 유출 방지)
 */
import { supabase } from './supabase'

export interface RoadmapShareInput {
  age: number
  salary: number
  region: string
  employment: string
  noHome: boolean
}

/** 결과를 저장하고 공유용 id를 돌려준다. 실패하면 null. */
export async function saveSharedRoadmap(input: RoadmapShareInput): Promise<string | null> {
  if (!supabase) return null
  const id = crypto.randomUUID()
  const { error } = await supabase.from('shared_roadmaps').insert({
    id,
    age: input.age,
    salary: input.salary,
    region: input.region || null,
    employment: input.employment || null,
    no_home: input.noHome,
  })
  if (error) {
    console.error('[sharedRoadmap] save 실패:', error.message)
    return null
  }
  return id
}

/** 공유 id로 저장된 조건을 불러온다. 없거나 실패하면 null. */
export async function loadSharedRoadmap(id: string): Promise<RoadmapShareInput | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('get_shared_roadmap', { p_id: id })
  if (error) {
    console.error('[sharedRoadmap] load 실패:', error.message)
    return null
  }
  const row = Array.isArray(data) ? data[0] : data
  if (!row) return null
  return {
    age: row.age,
    salary: row.salary,
    region: row.region ?? '',
    employment: row.employment ?? '',
    noHome: row.no_home,
  }
}
