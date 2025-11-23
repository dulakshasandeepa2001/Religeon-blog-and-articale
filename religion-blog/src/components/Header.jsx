import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Menu, X } from 'lucide-react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

function Header() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Motion.div 
            className="flex items-center gap-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sacred Insights
              </h1>
              <p className="text-xs text-slate-600">Exploring Faith & Spirituality</p>
            </div>
          </Motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate('/')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/articles')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Articles
            </button>
            <button 
              onClick={() => navigate('/news')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              News
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <Motion.nav 
              className="md:hidden mt-4 pb-4 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <button 
                onClick={() => {
                  navigate('/')
                  setIsMenuOpen(false)
                }} 
                className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  navigate('/articles')
                  setIsMenuOpen(false)
                }} 
                className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                Articles
              </button>
              <button 
                onClick={() => {
                  navigate('/news')
                  setIsMenuOpen(false)
                }} 
                className="block w-full text-left text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                News
              </button>
            </Motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
