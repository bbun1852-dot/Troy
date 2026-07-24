import { useMemo, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react'
import Button from '../components/ui/Button'
import GaugeBar from '../components/roadmap/GaugeBar'
import { buildRoadmap } from '../lib/roadmap'
import { CATEGORY_LABEL } from '../data/policies'
import { REGIONS, EMPLOYMENT_OPTIONS } from '../data/regions'
import type { Region, Employment } from '../data/regions'
import { CATEGORY_ICON } from '../lib/categoryIcons'
import { useSeo } from '../lib/useSeo'
import './Roadmap.css'

/** 홈에서 넘어온 입력값. 없으면 기본값으로 시작. */
interface NavState {
  age?: number
  salary?: number
  region?: Region | ''
  employment?: Employment | ''
  noHome?: boolean
}

export default function Roadmap() {
  useSeo({
    title: '내 맞춤 혜택 결과',
    description:
      '나이·연봉·지역·상황을 넣으면 받을 수 있는 청년 정책·세제 혜택·주거 지원을 단계별 로드맵으로 정리하고 또래 평균과 비교해 드려요.',
    path: '/roadmap',
  })

  const { state } = useLocation() as { state: NavState | null }

  // 입력값(재입력 가능) — 홈에서 온 값 또는 기본값
  const [age, setAge] = useState(state?.age && state.age > 0 ? String(state.age) : '28')
  const [salary, setSalary] = useState(
    state?.salary && state.salary > 0 ? String(state.salary) : '3600',
  )
  const [region, setRegion] = useState<Region | ''>(state?.region ?? '')
  const [employment, setEmployment] = useState<Employment | ''>(state?.employment ?? '')
  const [noHome, setNoHome] = useState(state?.noHome ?? true)

  // 실제 로드맵 계산에 쓰는 확정 입력값 (제출 시 갱신)
  const [applied, setApplied] = useState({
    age: Number(age),
    salary: Number(salary),
    region,
    employment,
    noHome,
  })

  const roadmap = useMemo(() => buildRoadmap(applied), [applied])

  function handleApply(e: FormEvent) {
    e.preventDefault()
    setApplied({ age: Number(age), salary: Number(salary), region, employment, noHome })
  }

  return (
    <div className="roadmap">
      {/* ============ 헤더 요약 + 재입력 ============ */}
      <section className="roadmap__hero">
        <div className="container">
          <h1 className="roadmap__title">
            {applied.region && `${applied.region} · `}
            {applied.age}세 · 세전 연봉 {applied.salary.toLocaleString()}만원 로드맵
          </h1>
          <p className="roadmap__subtitle">
            지금 챙길 수 있는 <b>{roadmap.totalSteps}개</b>의 퀘스트를 골라봤어요.
          </p>

          {/* 재입력 폼 — 값 바꿔서 즉시 재계산 */}
          <form className="roadmap__reinput" onSubmit={handleApply}>
            <label className="roadmap__field">
              <span>나이</span>
              <input
                type="number"
                min={19}
                max={45}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="roadmap__field">
              <span>세전 연봉(만원)</span>
              <input
                type="number"
                min={0}
                step={100}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </label>
            <label className="roadmap__field">
              <span>지역</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region | '')}
              >
                <option value="">전체</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label className="roadmap__field">
              <span>현재 상태</span>
              <select
                value={employment}
                onChange={(e) => setEmployment(e.target.value as Employment | '')}
              >
                <option value="">전체</option>
                {EMPLOYMENT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="roadmap__check">
              <input
                type="checkbox"
                checked={noHome}
                onChange={(e) => setNoHome(e.target.checked)}
              />
              <span>무주택</span>
            </label>
            <Button
              type="submit"
              variant="outline"
              leading={<RefreshCw className="icon" strokeWidth={1.5} />}
            >
              다시 계산
            </Button>
          </form>
        </div>
      </section>

      {/* ============ 또래 비교 게이지 ============ */}
      <section className="section container">
        <h2 className="roadmap__section-heading">내 또래와 비교하면?</h2>
        <GaugeBar gauge={roadmap.gauge} />
      </section>

      {/* ============ 단계별 로드맵 ============ */}
      <section className="section container">
        <h2 className="roadmap__section-heading">단계별 퀘스트</h2>
        <div className="roadmap__sections">
          {roadmap.sections.map(({ category, items }) => {
            const Icon = CATEGORY_ICON[category]
            return (
              <div className="rm-group" key={category}>
                <div className="rm-group__head">
                  <span className="rm-group__icon">
                    <Icon className="icon" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="rm-group__title">{CATEGORY_LABEL[category]}</h3>
                  <span className="rm-group__count">{items.length}</span>
                </div>

                <ol className="rm-timeline">
                  {items.map((item, idx) => (
                    <li className="rm-step" key={item.id}>
                      <span className="rm-step__num">{idx + 1}</span>
                      <div className="rm-step__body">
                        <div className="rm-step__titlerow">
                          <h4 className="rm-step__title">{item.title}</h4>
                          {/* 지역 특화 정책이면 지역 배지 표시 */}
                          {item.regions && (
                            <span className="rm-step__region">
                              {item.regions.join('·')}
                            </span>
                          )}
                          <span className="rm-step__tag">{item.tag}</span>
                        </div>
                        <p className="rm-step__summary">{item.summary}</p>
                        <p className="rm-step__action">
                          <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
                          {item.action}
                        </p>
                        {/* 공식 포털 바로가기 — 직접 검색 불필요 */}
                        <a
                          className="rm-step__link"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.linkLabel ?? '바로가기'}
                          <ExternalLink className="icon" strokeWidth={1.5} aria-hidden />
                        </a>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
