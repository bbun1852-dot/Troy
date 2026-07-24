/**
 * 진로적성 검사 (홀랜드 RIASEC 6유형 기반) 데이터
 * - 12문항(유형별 2문항) → 유형 점수 → 추천 직무 → 정부 지원 교육 → 채용 연결
 * ⚠️ 정식 심리검사가 아니라 방향을 잡아주는 간이 진단이다.
 *    정밀 검사는 커리어넷·워크넷의 무료 직업심리검사를 안내한다.
 */

export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

/** 검사 문항 */
export interface Question {
  id: number
  text: string
  type: RiasecType
}

/** 유형 설명 */
export interface CareerType {
  key: RiasecType
  name: string
  emoji: string
  tagline: string
  desc: string
  strengths: string[]
}

/** 정부 지원 교육 등 다음 단계 */
export interface Training {
  label: string
  link: string
  note: string
}

/** 추천 직무 */
export interface JobRecommendation {
  id: string
  title: string
  summary: string
  /** 이 직무로 가는 단계별 경로 */
  steps: string[]
  /** 거쳐가면 좋은 정부 지원 교육·자격 */
  trainings: Training[]
  /** 채용 검색에 쓸 키워드 */
  searchKeyword: string
}

/** 응답 선택지 (점수) */
export const ANSWER_OPTIONS = [
  { label: '그렇다', score: 2 },
  { label: '보통', score: 1 },
  { label: '아니다', score: 0 },
] as const

/** 12문항 — 유형별 2문항씩 */
export const QUESTIONS: Question[] = [
  { id: 1, text: '몸을 쓰거나 손으로 직접 만들고 고치는 일이 재미있다.', type: 'R' },
  { id: 2, text: '원인을 파고들어 "왜 그런지" 분석하는 걸 좋아한다.', type: 'I' },
  { id: 3, text: '새로운 걸 만들거나 나만의 방식으로 표현할 때 즐겁다.', type: 'A' },
  { id: 4, text: '누군가를 돕거나 가르칠 때 보람을 느낀다.', type: 'S' },
  { id: 5, text: '사람들을 설득하거나 이끄는 상황이 즐겁다.', type: 'E' },
  { id: 6, text: '자료를 정리하고 정해진 규칙대로 처리하는 게 편하다.', type: 'C' },
  { id: 7, text: '사무실에 앉아만 있기보다 현장에서 움직이는 편이 낫다.', type: 'R' },
  { id: 8, text: '숫자나 데이터로 문제를 풀 때 몰입된다.', type: 'I' },
  { id: 9, text: '정해진 틀을 따르기보다 내 스타일대로 하는 게 편하다.', type: 'A' },
  { id: 10, text: '사람들의 이야기를 듣고 공감하는 게 어렵지 않다.', type: 'S' },
  { id: 11, text: '성과나 경쟁이 있는 환경에서 오히려 힘이 난다.', type: 'E' },
  { id: 12, text: '계획과 절차가 명확할 때 일이 훨씬 잘 된다.', type: 'C' },
]

/** 6유형 설명 */
export const CAREER_TYPES: Record<RiasecType, CareerType> = {
  R: {
    key: 'R',
    name: '현실형',
    emoji: '🔧',
    tagline: '손으로 만들고 고치는 사람',
    desc: '몸으로 익히고 결과물이 눈에 보이는 일에서 힘을 냅니다. 기술 하나 잡아두면 오래 먹고살 수 있는 유형이에요.',
    strengths: ['손기술·장비 다루기', '현장 대응력', '꾸준한 실행력'],
  },
  I: {
    key: 'I',
    name: '탐구형',
    emoji: '🔍',
    tagline: '파고들어 알아내는 사람',
    desc: '데이터와 논리로 문제를 푸는 걸 즐깁니다. 배우는 속도가 무기라, 비전공이어도 진입할 길이 넓은 유형이에요.',
    strengths: ['분석·논리력', '학습 지구력', '문제 정의'],
  },
  A: {
    key: 'A',
    name: '예술형',
    emoji: '🎨',
    tagline: '만들어서 보여주는 사람',
    desc: '자기 감각으로 결과물을 만들 때 살아납니다. 포트폴리오가 곧 스펙이라 학벌 영향이 상대적으로 적어요.',
    strengths: ['창의력·감각', '표현력', '결과물 완성도'],
  },
  S: {
    key: 'S',
    name: '사회형',
    emoji: '🤝',
    tagline: '사람을 돕고 이어주는 사람',
    desc: '사람과 부대끼며 도움을 줄 때 보람을 느낍니다. 자격증 기반으로 안정적인 진입 경로가 잘 갖춰진 유형이에요.',
    strengths: ['공감·소통', '조율 능력', '신뢰 형성'],
  },
  E: {
    key: 'E',
    name: '진취형',
    emoji: '🚀',
    tagline: '설득하고 밀어붙이는 사람',
    desc: '목표와 경쟁이 있을 때 폭발합니다. 성과가 곧 보상으로 이어지는 일에서 빠르게 성장할 수 있어요.',
    strengths: ['설득력', '추진력', '기회 포착'],
  },
  C: {
    key: 'C',
    name: '관습형',
    emoji: '📊',
    tagline: '정확하게 굴러가게 하는 사람',
    desc: '규칙과 절차 안에서 정확히 처리하는 데 강합니다. 자격증 하나로 진입이 명확해 계획 세우기 좋은 유형이에요.',
    strengths: ['꼼꼼함·정확성', '규정 이해', '문서·수치 처리'],
  },
}

// 자주 쓰는 교육 포털 (중복 줄이기용)
const T_HRD: Training = { label: 'HRD-Net', link: 'https://www.hrd.go.kr', note: '내일배움카드 국비 훈련과정' }
const T_KDT: Training = { label: 'K-디지털 트레이닝', link: 'https://www.hrd.go.kr', note: '국비 지원 디지털 부트캠프' }
const T_SESAC: Training = { label: 'SeSAC (서울)', link: 'https://sesac.seoul.kr', note: '서울 거주자 무료 실무 교육' }
const T_QNET: Training = { label: '큐넷(Q-Net)', link: 'https://www.q-net.or.kr', note: '국가기술자격 원서접수' }
const T_KOPO: Training = { label: '한국폴리텍대학', link: 'https://www.kopo.ac.kr', note: '실습 중심 기술 교육·학위' }
const T_CB: Training = { label: '학점은행제', link: 'https://www.cb.or.kr', note: '학점 이수로 자격 요건 충족' }

/** 유형별 추천 직무 (각 6종, 총 36종) */
export const JOBS_BY_TYPE: Record<RiasecType, JobRecommendation[]> = {
  // ==================== 현실형 (기술·현장) ====================
  R: [
    {
      id: 'electrician',
      title: '전기·설비 기사',
      summary: '건물·공장의 전기 설비를 시공하고 유지보수. 자격증이 곧 진입권이라 비전공자도 길이 명확합니다.',
      steps: ['① 전기기능사 필기·실기 준비 (3~6개월)', '② 폴리텍/내일배움카드 실습 과정 수료', '③ 현장 보조로 경력 시작', '④ 전기산업기사로 단계 상승'],
      trainings: [T_KOPO, T_QNET, T_HRD],
      searchKeyword: '전기기사',
    },
    {
      id: 'auto-tech',
      title: '자동차 정비·검사',
      summary: '차량 진단과 정비. 전기차 전환으로 신규 인력 수요가 이어지는 분야입니다.',
      steps: ['① 자동차정비기능사 취득', '② 폴리텍·직업훈련으로 실습 경험', '③ 정비소·서비스센터 입사', '④ 전기차 정비 특화 과정으로 차별화'],
      trainings: [T_KOPO, T_QNET],
      searchKeyword: '자동차정비',
    },
    {
      id: 'production-qc',
      title: '생산·품질관리',
      summary: '제조 현장의 공정과 품질을 관리. 학력보다 성실성과 현장 이해가 통하는 분야입니다.',
      steps: ['① 품질경영기사 또는 관련 기능사 준비', '② 내일배움카드로 생산관리 과정 수강', '③ 중소 제조기업 생산직·품질직 지원', '④ 청년내일채움공제로 목돈까지 확보'],
      trainings: [T_HRD, T_QNET],
      searchKeyword: '생산관리',
    },
    {
      id: 'welding-machining',
      title: '용접·기계 가공',
      summary: '조선·플랜트·기계 산업의 핵심 기술직. 숙련될수록 몸값이 오르고 해외 취업 길도 열립니다.',
      steps: ['① 용접기능사 또는 컴퓨터응용가공(CNC) 기능사 준비', '② 폴리텍 실습 과정으로 장비 숙련', '③ 제조·플랜트 기업 현장직 입사', '④ 특수용접·기사 자격으로 전문성 강화'],
      trainings: [T_KOPO, T_QNET, T_HRD],
      searchKeyword: '용접',
    },
    {
      id: 'chef-bakery',
      title: '조리사 · 제과제빵',
      summary: '손으로 만들어 바로 결과가 나오는 일. 자격증 + 현장 경험이면 어디서든 일할 수 있습니다.',
      steps: ['① 한식/양식 조리기능사 또는 제과·제빵기능사 취득', '② 내일배움카드로 실습형 과정 수강', '③ 식당·호텔·베이커리 실무 경험', '④ 특화 메뉴·창업(K-Startup)으로 확장'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '조리사',
    },
    {
      id: 'logistics-heavy',
      title: '물류·중장비 운전',
      summary: '지게차·굴착기 등 자격 기반 현장직. 물류 수요가 꾸준해 안정적으로 진입할 수 있습니다.',
      steps: ['① 지게차/굴착기 운전기능사 취득', '② 내일배움카드로 실기 교육 이수', '③ 물류센터·건설현장 취업', '④ 다수 장비 자격으로 선택지 확대'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '지게차 운전',
    },
  ],

  // ==================== 탐구형 (분석·기술) ====================
  I: [
    {
      id: 'data-analyst',
      title: '데이터 분석가',
      summary: '데이터로 문제를 정의하고 의사결정을 돕는 일. 국비 부트캠프 진입 경로가 가장 잘 닦인 직무입니다.',
      steps: ['① 엑셀 + SQL 기초 (1~2개월)', '② 파이썬·통계 기초 학습', '③ K-디지털 트레이닝 수료 + 포트폴리오 2~3개', '④ 주니어 분석가·데이터 인턴 지원'],
      trainings: [T_KDT, T_SESAC, T_QNET],
      searchKeyword: '데이터 분석',
    },
    {
      id: 'backend-dev',
      title: '백엔드 개발자',
      summary: '서비스의 서버·데이터를 만드는 일. 비전공 국비 과정 → 취업 사례가 가장 많은 트랙입니다.',
      steps: ['① 프로그래밍 기초(파이썬/자바) 독학 2~3개월', '② K-디지털 트레이닝 6개월 과정 수료', '③ 팀·개인 프로젝트로 포트폴리오', '④ 신입 공채·중소기업 지원(일자리도약장려금 확인)'],
      trainings: [T_KDT, T_SESAC, T_KOPO],
      searchKeyword: '백엔드 개발자 신입',
    },
    {
      id: 'frontend-dev',
      title: '프론트엔드 개발자',
      summary: '눈에 보이는 화면을 만드는 개발. 결과가 바로 보여 학습 동기가 붙고 포트폴리오 만들기도 쉽습니다.',
      steps: ['① HTML/CSS/자바스크립트 기초', '② 리액트 등 프레임워크 학습', '③ KDT 부트캠프 + 클론코딩·개인 웹앱', '④ 스타트업·에이전시 신입 지원'],
      trainings: [T_KDT, T_SESAC],
      searchKeyword: '프론트엔드 개발자 신입',
    },
    {
      id: 'ai-ml',
      title: 'AI·머신러닝 입문',
      summary: '수요가 폭발하는 분야. 수학·코딩 기초 위에 국비 과정을 얹으면 주니어로 진입할 수 있습니다.',
      steps: ['① 파이썬 + 선형대수·통계 기초', '② 머신러닝 기본 개념·라이브러리 학습', '③ KDT AI 과정 + 캐글·프로젝트 경험', '④ 데이터/AI 관련 신입·인턴 지원'],
      trainings: [T_KDT, T_SESAC],
      searchKeyword: '머신러닝 엔지니어 신입',
    },
    {
      id: 'infosec',
      title: '정보보안 담당자',
      summary: '시스템과 데이터를 지키는 일. 자격증 체계가 명확해 목표를 세우기 쉽습니다.',
      steps: ['① 네트워크·리눅스 기초', '② 정보처리기사 또는 정보보안기사 준비', '③ 국비 보안 과정 수료', '④ 보안관제·SI 기업 신입 지원'],
      trainings: [T_KDT, T_QNET],
      searchKeyword: '정보보안 신입',
    },
    {
      id: 'semiconductor',
      title: '반도체 공정 기술직',
      summary: '국가 전략산업이라 채용·교육 지원이 두텁습니다. 비전공자 대상 양성 과정도 활발해요.',
      steps: ['① 반도체 기초·공정 개념 학습', '② 폴리텍 하이테크/반도체 과정 수료', '③ 공정·설비 오퍼레이터로 입사', '④ 설비·공정 엔지니어로 성장'],
      trainings: [T_KOPO, T_KDT, T_HRD],
      searchKeyword: '반도체 공정',
    },
  ],

  // ==================== 예술형 (창작·콘텐츠) ====================
  A: [
    {
      id: 'uiux',
      title: 'UI/UX 디자이너',
      summary: '서비스 화면과 사용 경험을 설계. 포트폴리오가 학벌보다 강하게 작용하는 직무입니다.',
      steps: ['① 피그마 등 도구 익히기 (1개월)', '② UX 기본 이론 + 앱 리디자인 연습', '③ 국비 디자인 과정 + 포트폴리오 3건', '④ 에이전시·스타트업 주니어 지원'],
      trainings: [T_KDT, T_SESAC],
      searchKeyword: 'UIUX 디자이너 신입',
    },
    {
      id: 'video-editor',
      title: '영상 편집·콘텐츠 제작',
      summary: '숏폼·유튜브 수요로 진입 문턱이 낮아진 분야. 결과물만 있으면 바로 시작할 수 있습니다.',
      steps: ['① 프리미어/다빈치 기초 익히기', '② 개인 채널·클립으로 편집물 쌓기', '③ 내일배움카드 영상 과정으로 보강', '④ 제작사·마케팅팀 편집자 지원(외주 병행)'],
      trainings: [T_HRD, T_SESAC],
      searchKeyword: '영상편집',
    },
    {
      id: 'content-marketer',
      title: '콘텐츠 마케터',
      summary: '브랜드의 글·이미지·캠페인을 기획. 창의성과 데이터 감각을 함께 쓰는 직무입니다.',
      steps: ['① 블로그·SNS로 본인 콘텐츠 운영', '② GA·광고 기초 학습', '③ 국비 마케팅 과정 + 실전 캠페인', '④ 스타트업·에이전시 주니어 마케터 지원'],
      trainings: [T_HRD, T_KDT],
      searchKeyword: '콘텐츠 마케터 신입',
    },
    {
      id: 'graphic-brand',
      title: '그래픽·브랜드 디자이너',
      summary: '로고·패키지·홍보물을 디자인. 프리랜서·외주로도 수입을 만들기 좋은 직무입니다.',
      steps: ['① 포토샵·일러스트레이터 숙련', '② 브랜딩·타이포 기초 학습', '③ 국비 디자인 과정 + 포트폴리오', '④ 스튜디오·인하우스 디자이너 지원'],
      trainings: [T_HRD, T_KDT],
      searchKeyword: '그래픽 디자이너 신입',
    },
    {
      id: 'webtoon-illust',
      title: '웹툰·일러스트레이터',
      summary: 'K-콘텐츠 성장으로 수요가 큰 분야. 실력과 작품이 곧 스펙이라 진입 장벽이 학벌과 무관합니다.',
      steps: ['① 드로잉·클립스튜디오 기본기', '② 개인 작품·SNS로 팬층 쌓기', '③ 국비 웹툰/콘텐츠 과정 수강', '④ 스튜디오 어시스턴트·플랫폼 연재 도전'],
      trainings: [T_HRD, T_KDT],
      searchKeyword: '웹툰 작가',
    },
    {
      id: 'interior',
      title: '공간·인테리어 디자이너',
      summary: '공간을 기획하고 꾸미는 일. 자격증 + 감각 + 현장 이해가 함께 쓰이는 직무입니다.',
      steps: ['① 실내건축기능사·전산응용(CAD) 학습', '② 내일배움카드로 실무 과정 수강', '③ 인테리어 회사·시공팀 실무 경험', '④ 실내건축산업기사로 전문성 강화'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '인테리어 디자이너',
    },
  ],

  // ==================== 사회형 (사람·돌봄·교육) ====================
  S: [
    {
      id: 'social-worker',
      title: '사회복지사',
      summary: '복지 현장에서 사람을 돕는 일. 학점은행제로 2급 취득이 가능해 전공 무관 진입이 열려 있습니다.',
      steps: ['① 학점은행제로 사회복지 필수 과목 이수', '② 실습 160시간 → 사회복지사 2급 취득', '③ 복지관·지역센터 취업', '④ 경력 쌓아 1급 승급 도전'],
      trainings: [T_CB, { label: '복지로', link: 'https://www.bokjiro.go.kr', note: '복지 분야 정보·기관 확인' }],
      searchKeyword: '사회복지사',
    },
    {
      id: 'hr',
      title: '인사·HR 담당자',
      summary: '채용과 조직문화를 담당. 사람에 대한 감각과 문서 처리 능력이 함께 쓰입니다.',
      steps: ['① 노동법·4대보험 기초 학습', '② 인사노무 관련 과정 수강', '③ 중소기업 인사총무로 시작', '④ 채용·교육 등 전문 영역으로 심화'],
      trainings: [T_HRD, T_QNET],
      searchKeyword: '인사 총무 신입',
    },
    {
      id: 'career-counselor',
      title: '직업상담사',
      summary: '구직자의 진로를 상담. 고용센터·대학 등 공공 영역 수요가 꾸준합니다.',
      steps: ['① 직업상담사 2급 필기·실기 준비', '② 내일배움카드로 상담 실무 과정', '③ 고용센터·취업지원기관 계약직 시작', '④ 정규직·공공기관 전환 도전'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '직업상담사',
    },
    {
      id: 'nursing-care',
      title: '간호조무사 · 요양보호',
      summary: '고령화로 수요가 계속 느는 돌봄 분야. 자격 취득 후 취업이 빠른 편입니다.',
      steps: ['① 간호조무사 교육기관 이론·실습 이수', '② 국가시험 합격 후 자격 취득', '③ 병·의원·요양시설 취업', '④ 요양보호사·간호 관련 자격 추가로 확장'],
      trainings: [
        { label: '국시원', link: 'https://www.kuksiwon.or.kr', note: '간호조무사 국가시험 정보' },
        T_HRD,
      ],
      searchKeyword: '간호조무사',
    },
    {
      id: 'childcare-teacher',
      title: '보육·방과후 교사',
      summary: '아이와 함께하는 교육·돌봄. 학점 이수로 보육교사 자격을 얻어 진입할 수 있습니다.',
      steps: ['① 학점은행제로 보육 관련 과목 이수', '② 실습 후 보육교사 자격 취득', '③ 어린이집·유치원·방과후 교실 취업', '④ 경력·상위 자격으로 원장 등 도전'],
      trainings: [
        T_CB,
        { label: '보육인력국가자격증', link: 'https://chrd.childcare.go.kr', note: '보육교사 자격 안내' },
      ],
      searchKeyword: '보육교사',
    },
    {
      id: 'cx-cs',
      title: '고객경험(CX)·CS 매니저',
      summary: '고객 응대와 만족을 책임지는 일. 커뮤니케이션 강점을 바로 살릴 수 있고 진입 장벽이 낮습니다.',
      steps: ['① 커뮤니케이션·CS 기본기 다지기', '② 국비 CS/서비스 과정 수강', '③ 콜센터·이커머스 CS로 시작', '④ CX 기획·팀 리드로 성장'],
      trainings: [T_HRD, { label: '고용24', link: 'https://www.work24.go.kr', note: '국민취업지원제도로 구직 지원' }],
      searchKeyword: 'CS 매니저',
    },
  ],

  // ==================== 진취형 (영업·기획·창업) ====================
  E: [
    {
      id: 'sales',
      title: 'B2B 영업·세일즈',
      summary: '성과가 즉시 보상으로 돌아오는 직무. 학벌보다 태도와 실적이 평가 기준입니다.',
      steps: ['① 관심 산업 1~2개 정해 제품 지식 쌓기', '② 영업 직무 인턴·신입 진입', '③ 실적 데이터로 커리어 증명', '④ 핵심 고객 담당·팀 리드로 성장'],
      trainings: [{ label: '고용24', link: 'https://www.work24.go.kr', note: '국민취업지원제도로 구직 지원' }, T_HRD],
      searchKeyword: '영업 신입',
    },
    {
      id: 'pm',
      title: '서비스 기획자 / PM',
      summary: '무엇을 만들지 정하고 팀을 굴리는 일. 여러 직무를 조율하는 진취형에 잘 맞습니다.',
      steps: ['① 관심 서비스 분석·기획서 작성 연습', '② 데이터 기초(SQL·GA) 익히기', '③ 국비 기획/PM 과정 + 사이드 프로젝트', '④ 스타트업 주니어 기획자 진입'],
      trainings: [T_KDT, T_SESAC],
      searchKeyword: '서비스 기획자 신입',
    },
    {
      id: 'founder',
      title: '창업 (예비창업자)',
      summary: '내 아이템으로 시작하기. 정부 지원금·공간·멘토링이 가장 두텁게 준비된 영역입니다.',
      steps: ['① 아이템 구체화 + 시장 검증', '② 예비창업패키지 등 지원사업 지원', '③ 청년창업사관학교로 자금·공간 확보', '④ 시제품·초기 매출 만들기'],
      trainings: [
        { label: 'K-Startup', link: 'https://www.k-startup.go.kr', note: '창업지원사업 통합 공고' },
        { label: '청년창업사관학교', link: 'https://start.kosmes.or.kr', note: '자금·공간·교육 원스톱' },
      ],
      searchKeyword: '스타트업',
    },
    {
      id: 'ecommerce-seller',
      title: '온라인 셀러 · 이커머스 MD',
      summary: '작게 시작해 키우기 좋은 분야. 소싱·상세페이지·마케팅을 직접 굴리며 사업 감각을 키웁니다.',
      steps: ['① 스마트스토어 개설·소량 소싱 실험', '② 상세페이지·광고 기본기 학습', '③ 국비 이커머스/마케팅 과정 수강', '④ 자체 브랜드화 또는 MD로 취업'],
      trainings: [T_HRD, { label: 'K-Startup', link: 'https://www.k-startup.go.kr', note: '1인 창업·소상공인 지원' }],
      searchKeyword: '이커머스 MD',
    },
    {
      id: 'realtor',
      title: '부동산 컨설턴트',
      summary: '자격 하나로 개업·취업 모두 가능한 직무. 성과에 따라 보상이 크게 열려 있습니다.',
      steps: ['① 공인중개사 1·2차 시험 준비', '② 자격 취득 후 중개사무소 실무', '③ 지역·매물 데이터 감각 쌓기', '④ 개업 또는 프롭테크 기업 진출'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '부동산 중개',
    },
    {
      id: 'ad-ae',
      title: '광고·미디어 AE',
      summary: '광고주와 제작을 잇는 기획·관리 직무. 사람을 설득하고 프로젝트를 밀어붙이는 힘이 무기입니다.',
      steps: ['① 광고·마케팅 기본 개념 학습', '② 공모전·사이드 프로젝트로 경험', '③ 국비 마케팅/광고 과정 수강', '④ 대행사 AE·미디어 플래너 지원'],
      trainings: [T_KDT, T_HRD],
      searchKeyword: '광고 AE 신입',
    },
  ],

  // ==================== 관습형 (사무·관리·정확) ====================
  C: [
    {
      id: 'accounting',
      title: '회계·경리',
      summary: '모든 회사에 필요한 직무. 자격증 하나로 진입 경로가 가장 명확한 편입니다.',
      steps: ['① 전산회계 2급 → 1급 순서로 취득', '② 더존·세무프로그램 실습', '③ 중소기업 경리·회계 보조로 시작', '④ 재무회계·세무 영역으로 확장'],
      trainings: [
        { label: '한국세무사회', link: 'https://license.kacpta.or.kr', note: '전산회계·전산세무 자격' },
        T_HRD,
      ],
      searchKeyword: '경리 회계',
    },
    {
      id: 'office-admin',
      title: '사무행정·총무',
      summary: '조직이 굴러가게 만드는 뒷단 업무. 문서·엑셀 역량이 그대로 경쟁력이 됩니다.',
      steps: ['① 컴퓨터활용능력 2급 + 엑셀 실무', '② 내일배움카드로 사무행정 과정', '③ 중소기업·기관 사무보조로 진입', '④ 총무·구매 등 전문 영역으로 이동'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '사무행정',
    },
    {
      id: 'public-office',
      title: '공공기관 사무직',
      summary: '안정성을 최우선으로 본다면. 준비 기간은 길지만 경로가 투명합니다.',
      steps: ['① 목표 기관·직렬 정하기(공무원/공공기관)', '② NCS 또는 공무원 과목 학습 계획', '③ 컴활·한국사 등 가산 자격 확보', '④ 채용 공고 주기에 맞춰 응시'],
      trainings: [T_QNET, { label: '고용24', link: 'https://www.work24.go.kr', note: '공공기관 채용정보 확인' }],
      searchKeyword: '공공기관 사무',
    },
    {
      id: 'tax-bookkeeping',
      title: '세무 신고·기장',
      summary: '세무사무소·중소기업의 세무 실무. 자격 + 프로그램 숙련이면 수요가 꾸준합니다.',
      steps: ['① 전산세무 2급 → 1급 취득', '② 홈택스·세무프로그램 실습', '③ 세무사무소 기장 담당으로 시작', '④ 세무회계 전문가로 경력 심화'],
      trainings: [
        { label: '한국세무사회', link: 'https://license.kacpta.or.kr', note: '전산세무 자격' },
        T_HRD,
      ],
      searchKeyword: '세무 기장',
    },
    {
      id: 'logistics-scm',
      title: '물류·SCM 관리',
      summary: '주문·재고·배송을 관리하는 사무직. 이커머스 성장으로 수요가 안정적입니다.',
      steps: ['① 물류관리사 또는 유통관리사 준비', '② 엑셀·ERP 데이터 처리 숙련', '③ 물류회사·이커머스 운영팀 입사', '④ SCM 기획·구매 등으로 확장'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '물류 관리',
    },
    {
      id: 'bank-finance',
      title: '은행·금융 사무',
      summary: '정확함이 무기가 되는 금융 사무. 자격과 성실성으로 안정적 커리어를 쌓을 수 있습니다.',
      steps: ['① 컴활 + 금융 관련 자격(은행FP 등) 준비', '② 금융 상품·규정 기초 학습', '③ 은행·보험·증권 사무직 지원', '④ 자산관리·기획 등 전문 영역 이동'],
      trainings: [T_QNET, T_HRD],
      searchKeyword: '금융 사무',
    },
  ],
}
