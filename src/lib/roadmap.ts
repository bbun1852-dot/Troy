/**
 * 로드맵 생성 로직
 * 나이·연봉을 입력받아 (1) 자격에 맞는 정책을 카테고리별로 필터·정렬하고
 * (2) 또래 평균 대비 예상 자산 게이지를 계산한다.
 * ⚠️ 게이지의 저축률·예상 자산은 시연용 단순 추정이며 재무 자문이 아니다.
 */
import {
  POLICIES,
  CATEGORY_ORDER,
  type Policy,
  type PolicyCategory,
} from '../data/policies'
import type { Region, Employment } from '../data/regions'
import { avgAssetForAge } from '../data/benchmarks'

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
  /** 또래 평균 자산 (만원) */
  avgAsset: number
  /** 내 예상 자산 (만원, 단순 추정) */
  myEstimateAsset: number
  /** 적용된 연 저축률 (0~1) */
  savingRate: number
  /** 예상 연 저축액 (만원) */
  annualSaving: number
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

/** 연봉 구간별 예상 저축률 (예시값) */
function savingRateFor(salary: number): number {
  if (salary <= 3000) return 0.15
  if (salary <= 5000) return 0.22
  if (salary <= 7000) return 0.28
  return 0.33
}

function buildGauge({ age, salary }: RoadmapInput): GaugeResult {
  const savingRate = savingRateFor(salary)
  const annualSaving = Math.round(salary * savingRate)
  // 25세부터 일했다고 가정한 단순 누적(복리 미반영) — 어디까지나 예시
  const yearsWorked = Math.max(0, age - 25)
  const myEstimateAsset = annualSaving * yearsWorked
  const avgAsset = avgAssetForAge(age)
  const percentOfAvg = avgAsset > 0 ? Math.round((myEstimateAsset / avgAsset) * 100) : 0
  return { avgAsset, myEstimateAsset, savingRate, annualSaving, percentOfAvg }
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
