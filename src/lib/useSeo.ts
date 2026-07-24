/**
 * 페이지별 SEO 메타 태그를 동적으로 세팅하는 훅
 * - SPA라 라우트마다 <title>·description·canonical·OG 태그를 갱신한다.
 *   (구글 등 JS 실행 크롤러가 라우트별 메타를 읽을 수 있게)
 */
import { useEffect } from 'react'
import { SITE_NAME, SITE_URL, DEFAULT_DESC } from '../config/site'

interface SeoOptions {
  /** 페이지 제목 (사이트명은 자동으로 뒤에 붙음) */
  title: string
  description?: string
  /** 라우트 경로 (canonical·og:url용). 예: '/career' */
  path?: string
}

/** name/property 메타 태그를 없으면 만들고 있으면 갱신 */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** link 태그(canonical 등)를 없으면 만들고 있으면 갱신 */
function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({ title, description = DEFAULT_DESC, path = '/' }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`
    const url = SITE_URL + path

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertLink('canonical', url)

    // Open Graph
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
  }, [title, description, path])
}
