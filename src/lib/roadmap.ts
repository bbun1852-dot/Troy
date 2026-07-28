/**
 * 로드맵 생성 로직
 * 나이·연봉을 입력받아 (1) 자격에 맞는 정책을 카테고리별로 필터·정렬하고
 * (2) 같은 연령대 평균 소득과 내 연봉을 비교하는 게이지를 계산한다.
 * 게이지는 양쪽 모두 실제 값이다 — 내 연봉은 사용자 입력, 또래 평균은 공식 통계.
 */
import {
  POLICIES,
  CATEGORY_ORDER,
  type Policy,
  type PolicyCategory,
} from '../data/policies'
import type { Region, Employment } from '../data/regions'
import { salaryBenchmarkForAge, toAnnualManwon } from '../data/benchmarks'

export interface RoadmapInput {
  age: number
  salary: number // 연봉 (만원)
  /** 거주 지역(시·도). 미선택이면 지역 조건으로 거르지 않는다. */
  region?: Region | ''
  /** 취업·활동 상태. 미선택이면 상태 조건으로 거르지 않는다. */
  employment?: Employment | ''
  /** 무주택 여부 (기본 true) */
  noHome?: boolean
}

export interface GaugeResult {
  /** 비교 기준 연령대 라벨 (예: '30대') */
  bracketLabel: string
  /** 내 세전 연봉 (만원) — 사용자 입력값 */
  mySalary: number
  /** 같은 연령대 평균 연봉 (만원) — 월평균소득 × 12 */
  avgSalary: number
  /** 같은 연령대 평균 월소득 (만원) — 통계 원값 */
  avgMonthly: number
  /** 또래 평균 대비 비율 (%) */
  percentOfAvg: number
}

export interface RoadmapSection {
  category: PolicyCategory
  items: Policy[]
}

export interface Roadmap {
  /** 항목이 있는 카테고리 섹션만 (표시 순서 = CATEGORY_ORDER) */
  sections: RoadmapSection[]
  gauge: GaugeResult
  totalSteps: number
}

/**
 * 입력 조건이 정책 자격 범위에 들어가는지 검사.
 * 지역·취업상태는 사용자가 선택했을 때만 필터로 작용한다(미선택 = 전체 보기).
 */
export function isEligible(policy: Policy, input: RoadmapInput): boolean {
  const { age, salary, region, employment, noHome } = input

  if (policy.minAge !== undefined && age < policy.minAge) return false
  if (policy.maxAge !== undefined && age > policy.maxAge) return false
  if (policy.minSalary !== undefined && salary < policy.minSalary) return false
  if (policy.maxSalary !== undefined && salary > policy.maxSalary) return false

  // 지역 특화 정책은 거주 지역이 일치할 때만 (policy.regions 없으면 전국 공통)
  if (policy.regions && region && !policy.regions.includes(region)) return false

  // 취업상태 조건
  if (policy.employment && employment && !policy.employment.includes(employment)) {
    return false
  }

  // 무주택 대상 정책은 유주택자에게 제외
  if (policy.requiresNoHome && noHome === false) return false

  return true
}

/** 내 연봉을 같은 연령대 평균 연봉과 비교한다. 양쪽 모두 실제 값. */
function buildGauge({ age, salary }: RoadmapInput): GaugeResult {
  const benchmark = salaryBenchmarkForAge(age)
  const avgSalary = toAnnualManwon(benchmark.monthlyManwon)
  const percentOfAvg = avgSalary > 0 ? Math.round((salary / avgSalary) * 100) : 0
  return {
    bracketLabel: benchmark.label,
    mySalary: salary,
    avgSalary,
    avgMonthly: benchmark.monthlyManwon,
    percentOfAvg,
  }
}

/**
 * 입력값으로 전체 로드맵을 생성한다.
 * 자격에 맞는 정책을 카테고리 순서대로 그룹핑하고, 빈 카테고리는 제외한다.
 */
export function buildRoadmap(input: RoadmapInput): Roadmap {
  const eligible = POLICIES.filter((p) => isEligible(p, input))

  const sections: RoadmapSection[] = CATEGORY_ORDER.map((category) => ({
    category,
    items: eligible
      .filter((p) => p.category === category)
      .sort((a, b) => a.priority - b.priority),
  })).filter((section) => section.items.length > 0)

  const totalSteps = sections.reduce((sum, s) => sum + s.items.length, 0)

  return { sections, gauge: buildGauge(input), totalSteps }
}
