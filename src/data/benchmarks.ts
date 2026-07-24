/**
 * 또래 평균 순자산 벤치마크 (가상 예시 데이터)
 * ⚠️ 실제 통계가 아니라 화면 시연용 더미 값이다. 실서비스 시 공신력 있는 통계로 교체.
 */
export interface Benchmark {
  age: number
  /** 해당 나이의 평균 순자산 (만원) */
  avgAssetManwon: number
}

// 나이 → 평균 자산(만원) 앵커 포인트 (예시)
const TABLE: Benchmark[] = [
  { age: 24, avgAssetManwon: 1500 },
  { age: 28, avgAssetManwon: 3700 },
  { age: 30, avgAssetManwon: 5200 },
  { age: 33, avgAssetManwon: 7800 },
  { age: 36, avgAssetManwon: 11000 },
  { age: 40, avgAssetManwon: 16000 },
  { age: 45, avgAssetManwon: 23000 },
]

/**
 * 주어진 나이의 또래 평균 자산을 앵커 테이블에서 선형 보간해 반환한다.
 */
export function avgAssetForAge(age: number): number {
  const first = TABLE[0]
  const last = TABLE[TABLE.length - 1]
  if (age <= first.age) return first.avgAssetManwon
  if (age >= last.age) return last.avgAssetManwon

  for (let i = 0; i < TABLE.length - 1; i++) {
    const a = TABLE[i]
    const b = TABLE[i + 1]
    if (age >= a.age && age <= b.age) {
      const ratio = (age - a.age) / (b.age - a.age)
      const value = a.avgAssetManwon + ratio * (b.avgAssetManwon - a.avgAssetManwon)
      return Math.round(value)
    }
  }
  return last.avgAssetManwon
}
