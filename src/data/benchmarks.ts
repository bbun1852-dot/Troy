/**
 * 연령대별 평균 소득 (실제 공식 통계)
 *
 * 출처: 국가데이터처(구 통계청)「2024년 임금근로일자리 소득(보수) 결과」
 *       2026-02-23 발표 · 2024년 12월 기준 · 세전 월평균소득
 *
 * ⚠️ 이 통계는 연 1회 발표된다(다음 발표 시 수치 갱신 필요).
 *    연봉은 월평균소득 × 12로 환산한 값이라 실제 계약 연봉과는 차이가 있을 수 있다.
 */

/** 통계 출처 표기 (화면에 그대로 노출) */
export const BENCHMARK_SOURCE = {
  label: '국가데이터처 「2024년 임금근로일자리 소득(보수) 결과」',
  baseline: '2024년 12월 기준',
  url: 'https://www.kostat.go.kr/board.es?mid=a10301010000&bid=11113',
} as const

export interface SalaryBenchmark {
  /** 연령대 라벨 (예: '30대') */
  label: string
  /** 해당 연령대 하한 나이 */
  minAge: number
  /** 해당 연령대 상한 나이 */
  maxAge: number
  /** 세전 월평균소득 (만원) */
  monthlyManwon: number
}

/** 연령대별 세전 월평균소득 (만원) — 공식 발표 수치 그대로 */
export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  { label: '20대', minAge: 20, maxAge: 29, monthlyManwon: 271 },
  { label: '30대', minAge: 30, maxAge: 39, monthlyManwon: 397 },
  { label: '40대', minAge: 40, maxAge: 49, monthlyManwon: 469 },
  { label: '50대', minAge: 50, maxAge: 59, monthlyManwon: 445 },
  { label: '60대', minAge: 60, maxAge: 69, monthlyManwon: 293 },
  { label: '70세 이상', minAge: 70, maxAge: 200, monthlyManwon: 165 },
]

/** 전체 임금근로자 평균 (세전 월, 만원) */
export const OVERALL_MONTHLY_MANWON = 375

/**
 * 나이가 속한 연령대의 평균 소득 정보를 반환한다.
 * 통계 구간(10년 단위)을 그대로 쓰므로 보간하지 않는다.
 * 구간을 벗어나면(20세 미만) 가장 가까운 구간을 쓴다.
 */
export function salaryBenchmarkForAge(age: number): SalaryBenchmark {
  const found = SALARY_BENCHMARKS.find((b) => age >= b.minAge && age <= b.maxAge)
  if (found) return found
  return age < SALARY_BENCHMARKS[0].minAge
    ? SALARY_BENCHMARKS[0]
    : SALARY_BENCHMARKS[SALARY_BENCHMARKS.length - 1]
}

/** 월평균소득(만원) → 연 환산 (만원) */
export function toAnnualManwon(monthlyManwon: number): number {
  return monthlyManwon * 12
}
