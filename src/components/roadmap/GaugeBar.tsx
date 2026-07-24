import type { GaugeResult } from '../../lib/roadmap'
import './GaugeBar.css'

interface GaugeBarProps {
  gauge: GaugeResult
}

/**
 * 또래 평균 비교 게이지바
 * - 트랙 전체를 (내 예상 자산, 평균) 중 큰 값 기준으로 스케일링
 * - 채움(fill)은 내 예상 자산, 세로 마커는 또래 평균 위치
 */
export default function GaugeBar({ gauge }: GaugeBarProps) {
  const { avgAsset, myEstimateAsset, percentOfAvg, annualSaving, savingRate } = gauge

  const scaleMax = Math.max(myEstimateAsset, avgAsset) * 1.15 || 1
  const fillPct = Math.min(100, (myEstimateAsset / scaleMax) * 100)
  const avgPct = Math.min(100, (avgAsset / scaleMax) * 100)

  const ahead = percentOfAvg >= 100
  const diff = Math.abs(percentOfAvg - 100)

  return (
    <div className="gauge">
      <div className="gauge__headline">
        {ahead ? (
          <>
            또래 평균보다 <b className="gauge__accent">{diff}% 앞서</b> 있어요 🎉
          </>
        ) : (
          <>
            또래 평균의 <b className="gauge__accent">{percentOfAvg}%</b> 수준이에요
          </>
        )}
      </div>

      <div className="gauge__bar" role="img" aria-label={`내 예상 자산 ${myEstimateAsset}만원, 또래 평균 ${avgAsset}만원`}>
        <div className="gauge__fill" style={{ width: `${fillPct}%` }} />
        {/* 또래 평균 마커 */}
        <div className="gauge__marker" style={{ left: `${avgPct}%` }}>
          <span className="gauge__marker-label">평균</span>
        </div>
      </div>

      <div className="gauge__stats">
        <div className="gauge__stat">
          <span className="gauge__stat-label">내 예상 자산</span>
          <span className="gauge__stat-value">{myEstimateAsset.toLocaleString()}만원</span>
        </div>
        <div className="gauge__stat">
          <span className="gauge__stat-label">또래 평균 자산</span>
          <span className="gauge__stat-value gauge__stat-value--sub">
            {avgAsset.toLocaleString()}만원
          </span>
        </div>
        <div className="gauge__stat">
          <span className="gauge__stat-label">예상 연 저축</span>
          <span className="gauge__stat-value gauge__stat-value--sub">
            {annualSaving.toLocaleString()}만원
            <em className="gauge__rate"> (저축률 {Math.round(savingRate * 100)}%)</em>
          </span>
        </div>
      </div>

      <p className="gauge__disclaimer">
        * 예상 자산은 25세부터 연 저축을 단순 누적한 시연용 추정치이며, 실제 자산·수익률과
        다를 수 있어요.
      </p>
    </div>
  )
}
