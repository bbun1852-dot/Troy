/**
 * 정부 정책 API 프록시 (Vercel 서버리스 함수)
 *
 * 왜 필요한가:
 * - 온통청년·복지로 API는 CORS 헤더를 주지 않아 브라우저에서 직접 호출할 수 없다.
 * - API 키를 브라우저에 노출하지 않기 위해 서버에서만 키를 사용한다.
 *   (그래서 환경변수에 VITE_ 접두사를 붙이면 안 된다 — 붙이면 번들에 포함되어 유출된다)
 *
 * 사용법:
 *   /api/policies?source=youth&query=주거&page=1&size=20
 *   /api/policies?source=welfare&query=청년&page=1&size=20
 */

const SOURCES = {
  // 온통청년 청년정책 (한국고용정보원)
  youth: {
    url: 'https://www.youthcenter.go.kr/go/ythip/getPlcy',
    envKey: 'YOUTH_API_KEY',
    applyUrl: 'https://www.youthcenter.go.kr/myPage/openapi',
    buildParams: (key, { query, page, size }) => {
      const p = new URLSearchParams({
        apiKeyNm: key,
        pageNum: String(page),
        pageSize: String(size),
        rtnType: 'json',
      })
      if (query) p.set('plcyKywdNm', query)
      return p
    },
  },
  // 복지로 국가복지정보 (보건복지부, 공공데이터포털)
  welfare: {
    url: 'https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001',
    envKey: 'WELFARE_API_KEY',
    applyUrl: 'https://www.data.go.kr/data/15095006/openapi.do',
    buildParams: (key, { query, page, size }) => {
      const p = new URLSearchParams({
        serviceKey: key,
        pageNo: String(page),
        numOfRows: String(size),
      })
      if (query) p.set('searchWrd', query)
      return p
    },
  },
}

export default async function handler(req, res) {
  const { source = 'youth', query = '', page = '1', size = '20' } = req.query

  const config = SOURCES[source]
  if (!config) {
    return res.status(400).json({
      error: 'unknown_source',
      message: `source는 ${Object.keys(SOURCES).join(' 또는 ')} 여야 합니다.`,
    })
  }

  const apiKey = process.env[config.envKey]
  if (!apiKey) {
    // 키 미설정은 장애가 아니라 '아직 준비 안 됨' 상태로 명확히 알린다.
    return res.status(503).json({
      error: 'api_key_missing',
      message: `${config.envKey} 환경변수가 설정되지 않았습니다.`,
      applyUrl: config.applyUrl,
    })
  }

  const params = config.buildParams(apiKey, {
    query,
    page: Number(page) || 1,
    size: Math.min(Number(size) || 20, 100),
  })

  try {
    const upstream = await fetch(`${config.url}?${params}`, {
      headers: { Accept: 'application/json' },
    })
    const text = await upstream.text()

    // 정부 API가 에러 시 JSON이 아닌 평문/XML을 주는 경우가 있어 방어적으로 처리
    let data
    try {
      data = JSON.parse(text)
    } catch {
      return res.status(502).json({
        error: 'upstream_not_json',
        status: upstream.status,
        body: text.slice(0, 500),
      })
    }

    // 브라우저 캐시 5분 (같은 검색 반복 시 API 호출 절약)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(upstream.ok ? 200 : upstream.status).json(data)
  } catch (err) {
    return res.status(502).json({
      error: 'upstream_failed',
      message: err instanceof Error ? err.message : String(err),
    })
  }
}
