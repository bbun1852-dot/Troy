/**
 * 진로적성 검사 채점 로직
 * 문항 응답(유형별 점수 합) → 상위 유형 → 추천 직무
 */
import {
  QUESTIONS,
  CAREER_TYPES,
  JOBS_BY_TYPE,
  type RiasecType,
  type JobRecommendation,
} from '../data/careers'

/** 문항 id → 선택 점수 */
export type Answers = Record<number, number>

export interface TypeScore {
  type: RiasecType
  score: number
  /** 만점 대비 백분율 */
  percent: number
}

export interface CareerResult {
  /** 점수 내림차순 전체 유형 */
  ranked: TypeScore[]
  /** 1순위 유형 */
  primary: RiasecType
  /** 2순위 유형 */
  secondary: RiasecType
  /** 1순위 3종 + 2순위 2종 추천 직무 */
  jobs: JobRecommendation[]
}

/** 유형별 문항 수 × 최고점(2) = 유형 만점 */
function maxScorePerType(type: RiasecType): number {
  return QUESTIONS.filter((q) => q.type === type).length * 2
}

/**
 * 응답을 채점해 유형 순위와 추천 직무를 만든다.
 */
export function scoreAnswers(answers: Answers): CareerResult {
  const totals: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

  for (const q of QUESTIONS) {
    totals[q.type] += answers[q.id] ?? 0
  }

  const ranked: TypeScore[] = (Object.keys(CAREER_TYPES) as RiasecType[])
    .map((type) => {
      const max = maxScorePerType(type)
      return {
        type,
        score: totals[type],
        percent: max > 0 ? Math.round((totals[type] / max) * 100) : 0,
      }
    })
    .sort((a, b) => b.score - a.score)

  const primary = ranked[0].type
  const secondary = ranked[1].type

  // 1순위 유형의 직무 전체(6종) + 2순위 유형의 직무 3종을 함께 제안 → 다양성 확보
  const jobs = [...JOBS_BY_TYPE[primary], ...JOBS_BY_TYPE[secondary].slice(0, 3)]

  return { ranked, primary, secondary, jobs }
}

/** 모든 문항에 답했는지 */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined)
}
