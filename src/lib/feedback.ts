/**
 * 사용자 피드백 저장 (Supabase)
 * - insert 전용. 저장된 피드백은 공개키로 조회 불가(관리자만 대시보드에서 확인).
 */
import { supabase } from './supabase'

export interface FeedbackInput {
  message: string
  /** 1~5 별점 (선택) */
  rating?: number | null
  /** 회신용 이메일 (선택) */
  contact?: string
}

/** 피드백을 저장한다. 성공하면 true. */
export async function submitFeedback(input: FeedbackInput): Promise<boolean> {
  if (!supabase) return false
  const message = input.message.trim()
  if (!message) return false

  const { error } = await supabase.from('feedback').insert({
    message,
    rating: input.rating ?? null,
    contact: input.contact?.trim() || null,
  })
  if (error) {
    console.error('[feedback] 저장 실패:', error.message)
    return false
  }
  return true
}
