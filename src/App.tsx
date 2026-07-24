import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import Search from './pages/Search'
import Career from './pages/Career'
import Privacy from './pages/Privacy'

/**
 * 앱 셸: 공통 레이아웃(Header/Footer) + 라우팅.
 * Home + Career(진로검사) + Roadmap(결과) + Search(정책 검색). (로그인/마이페이지는 제외.)
 */
export default function App() {
  return (
    <div className="app">
      <Header />
      <main id="top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
