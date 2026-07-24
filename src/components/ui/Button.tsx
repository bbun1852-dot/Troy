import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** 좌측 아이콘 등 앞쪽 요소 */
  leading?: ReactNode
  children: ReactNode
}

/**
 * 공통 버튼 컴포넌트
 * - 모양은 디자인 토큰(--btn-*)을 따른다: radius 10px, padding 12/20, weight 700
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  leading,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      {leading && <span className="btn__leading">{leading}</span>}
      {children}
    </button>
  )
}
