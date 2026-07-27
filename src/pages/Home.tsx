import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowRight,
  PiggyBank,
  HeartPulse,
  Gauge,
  Landmark,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { REGIONS, EMPLOYMENT_OPTIONS } from '../data/regions'
import type { Region, Employment } from '../data/regions'
import { useSeo } from '../lib/useSeo'
import { isSupabaseConfigured } from '../lib/supabase'
import FeedbackForm from '../components/FeedbackForm'
import './Home.css'

/** 홈 히어로에 노출할 핵심 기능 3종 (더미 소개용) */
const FEATURES = [
  {
    icon: PiggyBank,
    title: '세제혜택 로드맵',
    desc: 'ISA·연금저축펀드 등 지금 반드시 챙겨야 할 절세 혜택을 단계별로.',
  },
  {
    icon: Landmark,
    title: '청년정책·일자리',
    desc: '나이·연봉 조건에 맞는 청년복지·일자리 지원 정책을 골라서.',
  },
  {
    icon: Gauge,
    title: '또래 평균 비교',
    desc: '"내 나이 땐 남들 얼마 모을까?"를 게이지바로 한눈에.',
  },
] as const

/** 진행 단계 (How it works) */
const STEPS = [
  { n: 1, title: '나이·연봉 입력', desc: '딱 두 가지만 입력하면 끝.' },
  { n: 2, title: '맞춤 로드맵 생성', desc: '세제·정책·건강 루틴을 자동 정리.' },
  { n: 3, title: '또래와 비교', desc: '평균 대비 내 위치를 확인.' },
] as const

export default function Home() {
  useSeo({ title: '내가 받을 수 있는 청년 혜택 한눈에', path: '/' })

  const navigate = useNavigate()
  const [age, setAge] = useState('')
  const [salary, setSalary] = useState('')
  // 세부 조건 — 지역/취업상태는 미선택 시 전체, 무주택은 기본 true
  const [region, setRegion] = useState<Region | ''>('')
  const [employment, setEmployment] = useState<Employment | ''>('')
  const [noHome, setNoHome] = useState(true)

  // 입력값을 결과 페이지로 전달 → Roadmap에서 조건에 맞는 정책만 계산
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/roadmap', {
      state: {
        age: Number(age),
        salary: Number(salary),
        region,
        employment,
        noHome,
      },
    })
  }

  return (
    <>
      {/* ================= 히어로 + 핵심 입력 ================= */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="hero__badge">
              <Sparkles className="icon" strokeWidth={1.5} aria-hidden />
              청년 혜택 · 정책 · 지원 로드맵
            </span>
            <h1 className="hero__title">
              나도 몰랐던 내 혜택,
              <br />
              <span className="hero__title-accent">한 번에 찾아드립니다.</span>
            </h1>
            <p className="hero__lead">
              나이·연봉·지역만 넣으면 지금 받을 수 있는 청년 정책·세제 혜택·주거
              지원을 <b>단계별 로드맵</b>으로 정리해 드려요.
            </p>

            {/* 핵심 입력 폼 — 홈 히어로에 바로 배치 */}
            <form className="quest-form" onSubmit={handleSubmit}>
              <div className="quest-form__row">
                <label className="field">
                  <span className="field__label">나이</span>
                  <div className="field__control">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={19}
                      max={45}
                      required
                      placeholder="28"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <span className="field__suffix">세</span>
                  </div>
                </label>

                <label className="field">
                  <span className="field__label">
                    세전 연봉
                    <em className="field__hint">공제 전 총급여</em>
                  </span>
                  <div className="field__control">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={100}
                      required
                      placeholder="3,600"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    <span className="field__suffix">만원</span>
                  </div>
                </label>
              </div>

              {/* 세전 기준 안내 — 정부 지원 자격이 총급여(세전)로 판단되기 때문 */}
              <p className="quest-form__note">
                💡 <b>세전(공제 전) 연봉</b>을 입력해 주세요. 세금·4대보험을 떼기 전
                금액이며, 대부분의 정부 지원 자격도 세전 총급여로 판단해요.
              </p>

              {/* 세부 조건 — 지역/취업상태로 내 지역 정책까지 골라준다 */}
              <div className="quest-form__row">
                <label className="field">
                  <span className="field__label">지역</span>
                  <div className="field__control">
                    <select
                      className="field__select"
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region | '')}
                    >
                      <option value="">전체 (지역 무관)</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="field">
                  <span className="field__label">현재 상태</span>
                  <div className="field__control">
                    <select
                      className="field__select"
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
                  </div>
                </label>
              </div>

              <label className="quest-form__check">
                <input
                  type="checkbox"
                  checked={noHome}
                  onChange={(e) => setNoHome(e.target.checked)}
                />
                <span>무주택자입니다 (청약·전세·월세 지원 대상 확인)</span>
              </label>

              <Button type="submit" size="lg" className="quest-form__submit">
                내 로드맵 만들기
                <ArrowRight className="icon" strokeWidth={1.5} aria-hidden />
              </Button>
            </form>

            <p className="hero__note">
              <ShieldCheck className="icon" strokeWidth={1.5} aria-hidden />
              가입 없이 바로 확인 · 입력값은 브라우저에만 사용돼요.
            </p>

            {/* 진로부터 막막한 사용자를 위한 별도 진입점 */}
            <Link to="/career" className="hero__career">
              <span className="hero__career-emoji">🧭</span>
              <span className="hero__career-text">
                <b>아직 뭘 해야 할지 모르겠나요?</b>
                <em>2분 진로적성 검사로 방향부터 잡아보세요</em>
              </span>
              <ArrowRight className="icon" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>

          {/* 우측 미리보기 카드 (더미) */}
          <aside className="hero__preview" aria-hidden>
            <div className="preview-card">
              <div className="preview-card__head">
                <Gauge className="icon" strokeWidth={1.5} />
                <span>내 또래(28세) 평균 자산</span>
              </div>
              <div className="preview-gauge">
                <div className="preview-gauge__fill" style={{ width: '62%' }} />
              </div>
              <div className="preview-gauge__labels">
                <span>나 · 2,300만원</span>
                <span>평균 · 3,700만원</span>
              </div>
              <ul className="preview-list">
                <li>
                  <PiggyBank className="icon" strokeWidth={1.5} /> ISA 계좌 개설
                  <b className="tag">절세</b>
                </li>
                <li>
                  <Landmark className="icon" strokeWidth={1.5} /> 청년도약계좌
                  <b className="tag">정책</b>
                </li>
                <li>
                  <HeartPulse className="icon" strokeWidth={1.5} /> 저속노화 식단
                  루틴
                  <b className="tag tag--green">건강</b>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= 핵심 기능 3종 ================= */}
      <section className="section features">
        <div className="container">
          <h2 className="section__title">한 번에 챙기는 3가지</h2>
          <p className="section__sub">복잡한 정보는 우리가, 실행은 당신이.</p>
          <div className="features__grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <article className="feature-card" key={title}>
                <span className="feature-card__icon">
                  <Icon className="icon" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="feature-card__title">{title}</h3>
                <p className="feature-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 이용 방법 ================= */}
      <section className="section how" aria-label="이용 방법">
        <div className="container">
          <h2 className="section__title">3단계면 충분해요</h2>
          <div className="how__grid">
            {STEPS.map(({ n, title, desc }) => (
              <div className="how__step" key={n}>
                <span className="how__num">{n}</span>
                <h3 className="how__step-title">{title}</h3>
                <p className="how__step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 하단 CTA ================= */}
      <section className="section cta">
        <div className="container cta__inner">
          <h2 className="cta__title">지금 내 로드맵, 1분이면 나와요</h2>
          <p className="cta__sub">늦지 않았어요. 오늘이 가장 빠른 예습입니다.</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Button size="lg" variant="primary">
              위로 올라가 입력하기
              <ArrowRight className="icon" strokeWidth={1.5} aria-hidden />
            </Button>
          </a>
        </div>
      </section>

      {/* ================= 사용자 피드백 ================= */}
      {isSupabaseConfigured && (
        <section className="section feedback-section" aria-label="의견 보내기">
          <div className="container">
            <FeedbackForm />
          </div>
        </section>
      )}
    </>
  )
}
