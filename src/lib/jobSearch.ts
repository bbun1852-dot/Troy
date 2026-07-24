/**
 * 채용 공고 '바로가기' 링크 생성
 * 직무 키워드(+지역)를 각 채용 사이트의 검색 URL에 그대로 넣어,
 * 사용자가 직접 검색어를 입력할 필요 없이 결과 화면으로 바로 보낸다.
 */
import type { Region } from '../data/regions'

export interface JobLink {
  label: string
  url: string
  /** 키워드가 URL에 반영되는지 (false면 포털 홈으로 이동) */
  keywordApplied: boolean
}

/**
 * 직무 키워드와 지역으로 채용 검색 링크들을 만든다.
 * 지역이 있으면 검색어에 포함해 결과를 좁힌다.
 */
export function buildJobLinks(keyword: string, region?: Region | ''): JobLink[] {
  const term = region ? `${region} ${keyword}` : keyword
  const q = encodeURIComponent(term)

  return [
    {
      label: '잡코리아에서 보기',
      url: `https://www.jobkorea.co.kr/Search/?stext=${q}`,
      keywordApplied: true,
    },
    {
      label: '사람인에서 보기',
      url: `https://www.saramin.co.kr/zf_user/search?searchword=${q}`,
      keywordApplied: true,
    },
    {
      label: '고용24 (공공 채용정보)',
      url: 'https://www.work24.go.kr',
      keywordApplied: false,
    },
  ]
}
