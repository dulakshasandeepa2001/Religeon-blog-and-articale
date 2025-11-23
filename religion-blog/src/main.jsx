import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import ArticlesPage from './pages/ArticlesPage.jsx'
import NewsPage from './pages/NewsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/news/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
