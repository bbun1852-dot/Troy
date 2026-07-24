/**
 * 지역(시·도) 및 취업상태 옵션
 * 정책 자격을 지역·상황별로 세분화하는 데 쓰인다.
 */

/** 17개 광역 시·도 */
export const REGIONS = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
] as const

export type Region = (typeof REGIONS)[number]

/** 취업/활동 상태 */
export type Employment = 'employed' | 'jobseeker' | 'student' | 'founder'

export const EMPLOYMENT_OPTIONS: { key: Employment; label: string }[] = [
  { key: 'employed', label: '재직 중' },
  { key: 'jobseeker', label: '구직 중' },
  { key: 'student', label: '학생' },
  { key: 'founder', label: '창업 준비·운영' },
]

/** 취업상태 → 한글 라벨 */
export const EMPLOYMENT_LABEL: Record<Employment, string> = {
  employed: '재직 중',
  jobseeker: '구직 중',
  student: '학생',
  founder: '창업 준비·운영',
}
