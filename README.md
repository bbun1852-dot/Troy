# 청년로드맵 (Youth Roadmap)

20·30을 위한 **청년 혜택·정책 로드맵** 웹앱.
나이·연봉·지역만 넣으면 받을 수 있는 정부 지원을 단계별로 정리해 주고, 진로가 막막하면 적성 검사부터 직무·국비 교육·채용까지 이어줍니다.

## 주요 기능

| 페이지 | 설명 |
|---|---|
| `/` | 나이·세전연봉·지역·취업상태·무주택 여부 입력 |
| `/career` | 홀랜드(RIASEC) 12문항 진로적성 검사 → 추천 직무 9종 + 단계별 경로 + 국비 교육 + 채용 딥링크 |
| `/roadmap` | 조건에 맞는 정부 지원을 6개 분야로 그룹핑한 로드맵 + 또래 평균 자산 비교 게이지 |
| `/search` | 정책 키워드 검색 + 분야·지역 필터 |
| `/privacy` | 개인정보처리방침 |

## 데이터

- **정책 45종** — 전국 공통 33종 + 지역 특화 12종(서울·경기·부산·대전·광주), 전부 공식 포털 링크 포함
- **직업 36종** — 6개 유형 × 6종, 비전공·무경력 진입 경로 중심

> ⚠️ 정책 자격 요건·금액은 연도별/지자체별로 바뀝니다. 각 항목의 공식 포털에서 최신 조건을 확인하세요. 본 서비스의 정보는 참고용이며 투자·금융 자문이 아닙니다.

## 기술 스택

Vite + React + TypeScript / 순수 CSS(디자인 토큰) / react-router-dom / lucide-react

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 → dist/
```

## 배포 전 체크리스트

- [ ] `src/config/site.ts`의 `SITE_URL`을 실제 도메인으로 교체
- [ ] 같은 도메인을 `public/robots.txt`, `public/sitemap.xml`, `index.html`(canonical·og:url)에도 반영
- [ ] `src/pages/Privacy.tsx`의 운영자명·문의 이메일 채우기
- [ ] Google AdSense 신청 시 `index.html`의 주석 처리된 스크립트 활성화, 승인 후 `public/ads.txt`에 게시자 ID 기입
