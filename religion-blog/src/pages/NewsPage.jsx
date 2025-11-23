import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import Header from '../components/Header'
import ContentGrid from '../components/ContentGrid'
import { getNews, categories } from '../data/content'

function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const allNews = getNews()

  const filteredNews = allNews.filter(newsItem => {
    const matchesCategory = selectedCategory === 'All' || newsItem.category === selectedCategory
    const matchesSearch = newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         newsItem.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <Motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Religious News
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Latest updates and breaking stories from the world of faith and spirituality
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </Motion.button>
            ))}
          </div>
        </Motion.div>
      </section>

      {/* News Grid */}
      <ContentGrid 
        items={filteredNews} 
        showFeatured={selectedCategory === 'All' && !searchQuery}
        title="Latest News"
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Sacred Insights</h3>
            <p className="text-slate-400 mb-6">Exploring Faith & Spirituality</p>
            <p className="text-slate-500 text-sm">© 2025 Sacred Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NewsPage
