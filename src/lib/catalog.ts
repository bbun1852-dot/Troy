/**
 * 검색용 통합 카탈로그
 * 정책 카탈로그(POLICIES, 건강 포함)를 검색 화면에서 그대로 사용한다.
 */
import {
  POLICIES,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  type Policy,
  type PolicyCategory,
} from '../data/policies'

export type CatalogCategory = PolicyCategory
export type CatalogItem = Policy

export { CATEGORY_LABEL, CATEGORY_ORDER }

/** 전체 검색 대상 목록 */
export const CATALOG: CatalogItem[] = POLICIES
