import { useNavigate } from 'react-router-dom'
import { Calendar, User, Heart, Share2, MessageCircle } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'

function ContentGrid({ items, showFeatured = true, title = "Latest Content", categories, selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate()
  
  const featuredItem = showFeatured ? items.find(item => item.featured) : null
  const regularItems = items.filter(item => !item.featured || !showFeatured)

  return (
    <>
      {/* Featured Item */}
      {featuredItem && (
        <section className="container mx-auto px-4 py-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
            onClick={() => navigate(featuredItem.type === 'news' ? `/news/${featuredItem.id}` : `/article/${featuredItem.id}`)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img 
              src={featuredItem.image} 
              alt={featuredItem.title}
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
                Featured {featuredItem.type === 'news' ? 'News' : 'Article'}
              </span>
              <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {featuredItem.title}
              </h3>
              <p className="text-lg text-white/90 mb-4 line-clamp-2">
                {featuredItem.excerpt}
              </p>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredItem.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredItem.date}
                </span>
                <span>{featuredItem.readTime}</span>
              </div>
            </div>
          </Motion.div>
        </section>
      )}

      {/* Items Grid */}
      <section className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        {categories && (
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'hover:bg-slate-100'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        )}
        
        <h3 className="text-3xl font-bold mb-8 text-slate-800">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularItems.map((item, index) => (
            <Motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => navigate(item.type === 'news' ? `/news/${item.id}` : `/article/${item.id}`)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
                {item.type === 'news' && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                      NEWS
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {item.author}
                  </span>
                  <span>{item.readTime}</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                  <div className="flex items-center gap-3">
                    <button 
                      className="text-slate-400 hover:text-red-500 transition-colors" 
                      onClick={(e) => {
                        e.stopPropagation()
                        // Simple visual feedback
                        e.currentTarget.classList.toggle('text-red-500')
                      }}
                      title="Like this article"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-slate-400 hover:text-blue-500 transition-colors" 
                      onClick={async (e) => {
                        e.stopPropagation()
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              title: item.title,
                              text: item.excerpt,
                              url: window.location.origin + (item.type === 'news' ? `/news/${item.id}` : `/article/${item.id}`)
                            })
                          } else {
                            await navigator.clipboard.writeText(window.location.origin + (item.type === 'news' ? `/news/${item.id}` : `/article/${item.id}`))
                            alert('Link copied to clipboard!')
                          }
                        } catch (err) {
                          console.log('Share failed:', err)
                        }
                      }}
                      title="Share this article"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-slate-400 hover:text-green-500 transition-colors" 
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(item.type === 'news' ? `/news/${item.id}` : `/article/${item.id}`)
                      }}
                      title="View comments"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

export default ContentGrid
