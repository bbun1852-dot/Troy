import { Sprout } from 'lucide-react'
import './Footer.css'

/** 하단 푸터 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <Sprout className="icon" strokeWidth={1.5} aria-hidden />
            <span>청년로드맵</span>
          </div>
          <p className="footer__desc">
            20·30을 위한 청년 혜택·정책 로드맵.
            <br />
            나이·연봉·지역만 넣으면 받을 수 있는 지원을 한눈에.
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__title">서비스</h4>
            <a href="/career">진로 검사</a>
            <a href="/roadmap">내 로드맵</a>
            <a href="/search">정책 검색</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__title">안내</h4>
            <a href="/privacy">개인정보처리방침</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © 2026 청년로드맵. 본 정보는 참고용이며 투자·금융 자문이 아닙니다.
        </div>
      </div>
    </footer>
  )
}
