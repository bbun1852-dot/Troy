/**
 * 카테고리 → 아이콘 매핑 (Roadmap·Search 공용)
 */
import {
  PiggyBank,
  Building2,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PolicyCategory } from '../data/policies'

export const CATEGORY_ICON: Record<PolicyCategory, LucideIcon> = {
  finance: PiggyBank,
  housing: Building2,
  job: Briefcase,
  education: GraduationCap,
  welfare: HeartHandshake,
  health: HeartPulse,
}
