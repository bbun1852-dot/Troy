import { useSeo } from '../lib/useSeo'
import './Privacy.css'

/**
 * 개인정보처리방침 — Google AdSense 심사에 필수인 정적 페이지.
 * ⚠️ [운영자], 문의 이메일, 시행일은 실제 값으로 교체하세요.
 */
export default function Privacy() {
  useSeo({
    title: '개인정보처리방침',
    description: '청년로드맵의 개인정보 수집·이용 및 쿠키·광고 관련 안내입니다.',
    path: '/privacy',
  })

  return (
    <div className="legal">
      <div className="container legal__inner">
        <h1 className="legal__title">개인정보처리방침</h1>
        <p className="legal__updated">시행일: 2026-07-21</p>

        <section className="legal__section">
          <h2>1. 수집하는 정보와 이용 목적</h2>
          <p>
            청년로드맵(이하 "서비스")은 회원가입 없이 이용할 수 있으며, 별도의
            개인식별정보(이름·연락처 등)를 서버에 저장하지 않습니다.
          </p>
          <ul>
            <li>
              로드맵·진로 검사에 입력하는 <b>나이·연봉·지역·취업상태</b> 등은 오직
              사용자의 브라우저 안에서만 계산에 사용되며, 서버로 전송·저장되지 않습니다.
            </li>
            <li>
              서비스 품질 개선을 위해 접속 통계(방문 페이지, 브라우저 종류 등)가 익명으로
              수집될 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>2. 쿠키(Cookie)</h2>
          <p>
            서비스는 이용 통계와 광고 제공을 위해 쿠키를 사용할 수 있습니다. 쿠키는
            브라우저 설정에서 거부하거나 삭제할 수 있으며, 거부 시 일부 기능이 제한될 수
            있습니다.
          </p>
        </section>

        <section className="legal__section">
          <h2>3. 제3자 광고 및 Google AdSense</h2>
          <p>
            서비스는 Google을 포함한 제3자 광고 사업자의 광고를 게재할 수 있습니다. Google은
            광고 쿠키(예: DoubleClick 쿠키)를 사용해 사용자의 방문 기록을 바탕으로 맞춤
            광고를 제공할 수 있습니다.
          </p>
          <ul>
            <li>
              사용자는{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 설정
              </a>
              에서 맞춤 광고를 해제할 수 있습니다.
            </li>
            <li>
              제3자 광고 사업자의 쿠키 사용에 관한 자세한 내용은{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 정책
              </a>
              을 참고하세요.
            </li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>4. 외부 링크 및 정보의 정확성</h2>
          <p>
            서비스가 제공하는 정책·혜택·직업·채용 정보는 참고용이며, 투자·금융·법률 자문이
            아닙니다. 각 항목의 공식 포털로 연결되는 외부 링크의 내용과 최신 자격 요건은 해당
            기관 페이지에서 반드시 확인하시기 바랍니다.
          </p>
        </section>

        <section className="legal__section">
          <h2>5. 문의</h2>
          <p>
            개인정보 처리에 관한 문의는 아래로 연락해 주세요.
            <br />
            운영자: [운영자명] · 이메일: [contact@your-domain.com]
          </p>
        </section>

        <p className="legal__note">
          본 방침은 관련 법령 및 서비스 정책 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를
          통해 공지합니다.
        </p>
      </div>
    </div>
  )
}
