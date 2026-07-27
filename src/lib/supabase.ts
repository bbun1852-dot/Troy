/**
 * Supabase 클라이언트
 * - 환경변수(.env)에서 URL·공개키를 읽어 클라이언트를 만든다.
 * - 키가 없으면 null을 반환해, 키 미설정 시에도 앱이 죽지 않게 한다.
 *   (기능 코드에서는 isSupabaseConfigured로 사용 가능 여부를 확인)
 */
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
