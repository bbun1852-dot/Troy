import type { GaugeResult } from '../../lib/roadmap'
import { BENCHMARK_SOURCE } from '../../data/benchmarks'
import './GaugeBar.css'

interface GaugeBarProps {
  gauge: GaugeResult
}

/**
 * 또래 평균 연봉 비교 게이지바
 * - 채움(fill)은 내 세전 연봉, 세로 마커는 같은 연령대 평균 연봉 위치
 * - 양쪽 모두 실제 값이다 (내 연봉=입력값, 평균=공식 통계)
 */
export default function GaugeBar({ gauge }: GaugeBarProps) {
  const { bracketLabel, mySalary, avgSalary, avgMonthly, percentOfAvg } = gauge

  const scaleMax = Math.max(mySalary, avgSalary) * 1.15 || 1
  const fillPct = Math.min(100, (mySalary / scaleMax) * 100)
  const avgPct = Math.min(100, (avgSalary / scaleMax) * 100)

  const ahead = percentOfAvg >= 100
  const diff = Math.abs(percentOfAvg - 100)

  return (
    <div className="gauge">
      <div className="gauge__headline">
        {ahead ? (
          <>
            {bracketLabel} 평균보다 <b className="gauge__accent">{diff}% 높아요</b> 🎉
          </>
        ) : (
          <>
            {bracketLabel} 평균의 <b className="gauge__accent">{percentOfAvg}%</b> 수준이에요
          </>
        )}
      </div>

      <div
        className="gauge__bar"
        role="img"
        aria-label={`내 세전 연봉 ${mySalary}만원, ${bracketLabel} 평균 연봉 ${avgSalary}만원`}
      >
        <div className="gauge__fill" style={{ width: `${fillPct}%` }} />
        {/* 또래 평균 마커 */}
        <div className="gauge__marker" style={{ left: `${avgPct}%` }}>
          <span className="gauge__marker-label">평균</span>
        </div>
      </div>

      <div className="gauge__stats">
        <div className="gauge__stat">
          <span className="gauge__stat-label">내 세전 연봉</span>
          <span className="gauge__stat-value">{mySalary.toLocaleString()}만원</span>
        </div>
        <div className="gauge__stat">
          <span className="gauge__stat-label">{bracketLabel} 평균 연봉</span>
          <span className="gauge__stat-value gauge__stat-value--sub">
            {avgSalary.toLocaleString()}만원
          </span>
        </div>
        <div className="gauge__stat">
          <span className="gauge__stat-label">{bracketLabel} 평균 월소득</span>
          <span className="gauge__stat-value gauge__stat-value--sub">
            {avgMonthly.toLocaleString()}만원
          </span>
        </div>
      </div>

      <p className="gauge__disclaimer">
        * 출처:{' '}
        <a href={BENCHMARK_SOURCE.url} target="_blank" rel="noopener noreferrer">
          {BENCHMARK_SOURCE.label}
        </a>{' '}
        ({BENCHMARK_SOURCE.baseline}). 연봉은 세전 월평균소득을 12개월로 환산한 값이라 실제
        계약 연봉과 차이가 있을 수 있어요.
      </p>
    </div>
  )
}
