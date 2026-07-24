import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  GraduationCap,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  MapPin,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { QUESTIONS, ANSWER_OPTIONS, CAREER_TYPES } from '../data/careers'
import { REGIONS } from '../data/regions'
import type { Region } from '../data/regions'
import { scoreAnswers, type Answers } from '../lib/career'
import { buildJobLinks } from '../lib/jobSearch'
import { useSeo } from '../lib/useSeo'
import './Career.css'

type Phase = 'intro' | 'quiz' | 'result'

export default function Career() {
  useSeo({
    title: '진로적성 검사',
    description:
      '2분 홀랜드 진로적성 검사로 나에게 맞는 직무와 국비 교육, 채용까지 한 번에. 뭘 해야 할지 막막할 때 방향을 잡아드려요.',
    path: '/career',
  })

  const [phase, setPhase] = useState<Phase>('intro')
  const [step, setStep] = useState(0) // 현재 문항 인덱스
  const [answers, setAnswers] = useState<Answers>({})
  // 채용 링크에 넣을 희망 근무지
  const [region, setRegion] = useState<Region | ''>('')

  const question = QUESTIONS[step]
  const progress = Math.round((step / QUESTIONS.length) * 100)

  /** 답을 고르면 기록하고 다음 문항으로(마지막이면 결과로) */
  function handleAnswer(score: number) {
    const next = { ...answers, [question.id]: score }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setPhase('result')
    }
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setPhase('intro')
  }

  // ==================== 인트로 ====================
  if (phase === 'intro') {
    return (
      <div className="career">
        <section className="career__hero">
          <div className="container career__intro">
            <span className="career__badge">
              <Compass className="icon" strokeWidth={1.5} aria-hidden />
              2분 진로적성 검사
            </span>
            <h1 className="career__title">
              뭘 해야 할지 모르겠다면,
              <br />
              <span className="career__title-accent">여기서부터 시작해요.</span>
            </h1>
            <p className="career__lead">
              할 줄 아는 게 없는 것 같아도 괜찮아요. 12개 질문에 답하면 나에게 맞는
              직무와 <b>거기까지 가는 단계</b>, 그리고 <b>국비로 들을 수 있는 교육</b>까지
              한 번에 정리해 드릴게요.
            </p>
            <ul className="career__points">
              <li>
                <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
                12문항 · 약 2분 · 가입 없이 바로
              </li>
              <li>
                <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
                추천 직무별 <b>단계별 경로</b> 제공
              </li>
              <li>
                <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
                정부 지원 교육 + 채용 공고 <b>바로 연결</b>
              </li>
            </ul>
            <Button size="lg" onClick={() => setPhase('quiz')}>
              검사 시작하기
              <ArrowRight className="icon" strokeWidth={1.5} aria-hidden />
            </Button>
            <p className="career__disclaimer">
              * 방향을 잡아주는 간이 진단이에요. 정밀 검사는 커리어넷·워크넷의 무료
              직업심리검사를 이용해 보세요.
            </p>
          </div>
        </section>
      </div>
    )
  }

  // ==================== 검사 진행 ====================
  if (phase === 'quiz') {
    return (
      <div className="career">
        <section className="section container career__quiz">
          {/* 진행률 */}
          <div className="quiz__progress-wrap">
            <div className="quiz__progress">
              <div className="quiz__progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="quiz__count">
              {step + 1} / {QUESTIONS.length}
            </span>
          </div>

          <p className="quiz__type">{CAREER_TYPES[question.type].emoji} 질문 {step + 1}</p>
          <h2 className="quiz__question">{question.text}</h2>

          <div className="quiz__options">
            {ANSWER_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`quiz__option ${
                  answers[question.id] === opt.score ? 'quiz__option--active' : ''
                }`}
                onClick={() => handleAnswer(opt.score)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              type="button"
              className="quiz__back"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="icon" strokeWidth={1.5} aria-hidden />
              이전 질문
            </button>
          )}
        </section>
      </div>
    )
  }

  // ==================== 결과 ====================
  const result = scoreAnswers(answers)
  const primary = CAREER_TYPES[result.primary]
  const secondary = CAREER_TYPES[result.secondary]

  return (
    <div className="career">
      {/* 유형 결과 */}
      <section className="career__hero">
        <div className="container">
          <p className="result__eyebrow">검사 결과</p>
          <h1 className="result__title">
            {primary.emoji} 당신은 <span className="career__title-accent">{primary.name}</span>
            <br />
            <span className="result__tagline">{primary.tagline}</span>
          </h1>
          <p className="result__desc">{primary.desc}</p>

          <div className="result__strengths">
            {primary.strengths.map((s) => (
              <span className="result__strength" key={s}>
                {s}
              </span>
            ))}
          </div>

          {/* 6유형 점수 막대 */}
          <div className="result__scores">
            {result.ranked.map(({ type, percent }) => (
              <div className="score-row" key={type}>
                <span className="score-row__label">
                  {CAREER_TYPES[type].emoji} {CAREER_TYPES[type].name}
                </span>
                <div className="score-row__bar">
                  <div className="score-row__fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="score-row__pct">{percent}%</span>
              </div>
            ))}
          </div>

          <p className="result__secondary">
            2순위는 <b>{secondary.emoji} {secondary.name}</b> — {secondary.tagline}. 아래
            추천에 두 유형을 함께 반영했어요.
          </p>

          <div className="result__actions">
            <Button variant="outline" onClick={restart} leading={<RotateCcw className="icon" strokeWidth={1.5} />}>
              다시 검사하기
            </Button>
          </div>
        </div>
      </section>

      {/* 희망 근무지 — 채용 링크에 반영 */}
      <section className="section container">
        <label className="career__region">
          <MapPin className="icon" strokeWidth={1.5} aria-hidden />
          <span>희망 근무지</span>
          <select value={region} onChange={(e) => setRegion(e.target.value as Region | '')}>
            <option value="">전국</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <em>선택하면 아래 채용 검색에 지역이 함께 적용돼요</em>
        </label>

        {/* 추천 직무 카드 */}
        <h2 className="result__section-title">나에게 맞는 직무 {result.jobs.length}가지</h2>
        <div className="job-grid">
          {result.jobs.map((job) => (
            <article className="job-card" key={job.id}>
              <h3 className="job-card__title">{job.title}</h3>
              <p className="job-card__summary">{job.summary}</p>

              {/* 단계별 경로 */}
              <div className="job-card__block">
                <h4 className="job-card__label">여기까지 가는 길</h4>
                <ol className="job-steps">
                  {job.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>

              {/* 정부 지원 교육 */}
              <div className="job-card__block">
                <h4 className="job-card__label">
                  <GraduationCap className="icon" strokeWidth={1.5} aria-hidden />
                  정부 지원 교육·자격
                </h4>
                <ul className="job-links">
                  {job.trainings.map((t) => (
                    <li key={t.label + t.link}>
                      <a href={t.link} target="_blank" rel="noopener noreferrer">
                        {t.label}
                        <ExternalLink className="icon" strokeWidth={1.5} aria-hidden />
                      </a>
                      <span className="job-links__note">{t.note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 채용 공고 바로가기 */}
              <div className="job-card__block">
                <h4 className="job-card__label">
                  <Briefcase className="icon" strokeWidth={1.5} aria-hidden />
                  지금 뜬 채용 보기
                </h4>
                <div className="job-search">
                  {buildJobLinks(job.searchKeyword, region).map((l) => (
                    <a
                      key={l.url}
                      className="job-search__link"
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                      <ExternalLink className="icon" strokeWidth={1.5} aria-hidden />
                    </a>
                  ))}
                </div>
                <p className="job-search__hint">
                  "{region ? `${region} ` : ''}
                  {job.searchKeyword}" 검색 결과로 바로 이동해요.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 다음 단계 — 돈 로드맵으로 연결 */}
      <section className="section container">
        <div className="career__next">
          <h2 className="career__next-title">진로를 잡았다면, 이제 돈과 삶의 로드맵</h2>
          <p className="career__next-desc">
            나이·연봉·지역만 넣으면 지금 챙길 수 있는 정부 지원과 자산·주거 로드맵까지
            이어서 만들어 드려요.
          </p>
          <Link to="/roadmap">
            <Button size="lg">
              내 인생 로드맵 만들기
              <ArrowRight className="icon" strokeWidth={1.5} aria-hidden />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
