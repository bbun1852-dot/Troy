import { useMemo, useState } from 'react'
import { Search as SearchIcon, ExternalLink, CheckCircle2, MapPin } from 'lucide-react'
import {
  CATALOG,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  type CatalogCategory,
  type CatalogItem,
} from '../lib/catalog'
import { CATEGORY_ICON } from '../lib/categoryIcons'
import { REGIONS } from '../data/regions'
import type { Region } from '../data/regions'
import { useSeo } from '../lib/useSeo'
import './Search.css'

type CategoryFilter = 'all' | CatalogCategory
type SortKey = 'relevance' | 'name'

/** 필터 칩 목록 (전체 + 전 카테고리, 순서 = CATEGORY_ORDER) */
const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  ...CATEGORY_ORDER.map((c) => ({ key: c, label: CATEGORY_LABEL[c] })),
]

export default function Search() {
  useSeo({
    title: '정책 검색',
    description:
      '세제혜택·청년정책·일자리·주거·건강 정부 지원을 키워드와 지역으로 검색하세요. 전국 및 지자체 정책을 한 곳에서.',
    path: '/search',
  })

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [region, setRegion] = useState<Region | ''>('')
  const [sort, setSort] = useState<SortKey>('relevance')

  // 키워드(제목·요약·태그) + 카테고리 + 지역 필터 → 정렬. 소규모라 클라이언트에서 처리.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    let items: CatalogItem[] = CATALOG.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      // 지역 선택 시: 전국 공통(regions 없음) + 해당 지역 정책만
      if (region && item.regions && !item.regions.includes(region)) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      )
    })
    if (sort === 'name') {
      items = [...items].sort((a, b) => a.title.localeCompare(b.title, 'ko'))
    }
    return items
  }, [query, category, region, sort])

  return (
    <div className="search">
      {/* ============ 헤더 + 검색창 ============ */}
      <section className="search__hero">
        <div className="container">
          <h1 className="search__title">정책 검색</h1>
          <p className="search__subtitle">
            세제혜택·청년정책·일자리·건강 정보를 키워드로 찾아보세요.
          </p>

          <div className="search__box">
            <SearchIcon className="icon" strokeWidth={1.5} aria-hidden />
            <input
              type="search"
              placeholder="예: 연금, 청년, 절세, 수면…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="정책 키워드 검색"
            />
          </div>

          {/* 카테고리 필터 칩 */}
          <div className="search__filters" role="group" aria-label="카테고리 필터">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`chip ${category === key ? 'chip--active' : ''}`}
                onClick={() => setCategory(key)}
                aria-pressed={category === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 지역 필터 — 전국 공통 + 선택 지역 정책만 표시 */}
          <label className="search__region">
            <MapPin className="icon" strokeWidth={1.5} aria-hidden />
            <span>지역</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region | '')}
            >
              <option value="">전국 전체</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* ============ 결과 ============ */}
      <section className="section container">
        <div className="search__resultbar">
          <span className="search__count">
            총 <b>{results.length}</b>건
          </span>
          <label className="search__sort">
            정렬
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="relevance">기본순</option>
              <option value="name">이름순(가나다)</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <p className="search__empty">
            검색 결과가 없어요. 다른 키워드나 카테고리로 시도해 보세요.
          </p>
        ) : (
          <div className="search__grid">
            {results.map((item) => {
              const Icon = CATEGORY_ICON[item.category]
              return (
                <article className="result-card" key={item.id}>
                  <div className="result-card__head">
                    <span className="result-card__icon">
                      <Icon className="icon" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="result-card__cat">
                      {CATEGORY_LABEL[item.category]}
                    </span>
                    {/* 지역 특화 정책 배지 */}
                    {item.regions && (
                      <span className="result-card__region">{item.regions.join('·')}</span>
                    )}
                    <span className="result-card__tag">{item.tag}</span>
                  </div>
                  <h3 className="result-card__title">{item.title}</h3>
                  <p className="result-card__summary">{item.summary}</p>
                  <p className="result-card__action">
                    <CheckCircle2 className="icon" strokeWidth={1.5} aria-hidden />
                    {item.action}
                  </p>
                  <a
                    className="result-card__link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.linkLabel ?? '바로가기'}
                    <ExternalLink className="icon" strokeWidth={1.5} aria-hidden />
                  </a>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
