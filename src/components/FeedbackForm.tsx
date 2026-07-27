import { useState, type FormEvent } from 'react'
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react'
import Button from './ui/Button'
import { submitFeedback } from '../lib/feedback'
import './FeedbackForm.css'

/**
 * 사용자 피드백 폼 (홈페이지)
 * - 별점(선택) + 의견(필수) + 회신 이메일(선택)
 * - 제출 → Supabase 저장 → 감사 메시지
 */
export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    const ok = await submitFeedback({
      message,
      rating: rating || null,
      contact,
    })
    setStatus(ok ? 'done' : 'error')
  }

  // 제출 완료 화면
  if (status === 'done') {
    return (
      <div className="feedback feedback--done">
        <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
        <h3>소중한 의견 감사합니다! 🙏</h3>
        <p>보내주신 피드백은 청년로드맵을 더 좋게 만드는 데 쓰일게요.</p>
      </div>
    )
  }

  return (
    <div className="feedback">
      <div className="feedback__head">
        <span className="feedback__icon">
          <MessageSquare className="icon" strokeWidth={1.5} aria-hidden />
        </span>
        <div>
          <h3 className="feedback__title">의견을 들려주세요</h3>
          <p className="feedback__sub">
            불편한 점, 추가됐으면 하는 정책·기능 무엇이든 좋아요. (가입 불필요)
          </p>
        </div>
      </div>

      <form className="feedback__form" onSubmit={handleSubmit}>
        {/* 별점 (선택) */}
        <div className="feedback__stars" role="radiogroup" aria-label="만족도 별점">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              className="feedback__star"
              aria-label={`${n}점`}
              aria-pressed={rating === n}
              onClick={() => setRating(n === rating ? 0 : n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className="icon"
                strokeWidth={1.5}
                fill={(hover || rating) >= n ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>

        {/* 의견 (필수) */}
        <textarea
          className="feedback__textarea"
          placeholder="여기에 의견을 자유롭게 남겨주세요."
          value={message}
          maxLength={2000}
          rows={4}
          required
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 회신 이메일 (선택) */}
        <input
          className="feedback__contact"
          type="email"
          placeholder="답변 받을 이메일 (선택)"
          value={contact}
          maxLength={200}
          onChange={(e) => setContact(e.target.value)}
        />

        {status === 'error' && (
          <p className="feedback__error">
            저장에 실패했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === 'sending' || !message.trim()}
          leading={<Send className="icon" strokeWidth={1.5} />}
        >
          {status === 'sending' ? '보내는 중…' : '의견 보내기'}
        </Button>
      </form>
    </div>
  )
}
