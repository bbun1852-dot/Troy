import { Link, NavLink } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import Button from '../ui/Button'
import './Header.css'

/**
 * 상단 헤더 / 글로벌 내비게이션
 * - 우측 "시작하기"는 홈(나이·연봉 입력)으로 이동. (로그인/마이페이지 기능은 제외)
 */
export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        {/* 로고 */}
        <Link to="/" className="header__logo" aria-label="청년로드맵 홈">
          <Sprout className="icon" strokeWidth={1.5} aria-hidden />
          <span className="header__logo-text">청년로드맵</span>
        </Link>

        {/* 주요 내비 (해당 페이지들은 이후 단계에서 구현) */}
        <nav className="header__nav" aria-label="주요 메뉴">
          <NavLink to="/career" className="header__link">
            진로 검사
          </NavLink>
          <NavLink to="/roadmap" className="header__link">
            내 로드맵
          </NavLink>
          <NavLink to="/search" className="header__link">
            정책 검색
          </NavLink>
        </nav>

        {/* 시작하기: 홈(나이·연봉 입력)으로 이동 */}
        <div className="header__actions">
          <Link to="/">
            <Button size="md">시작하기</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
