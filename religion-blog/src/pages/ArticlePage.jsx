import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { BookOpen, Calendar, User, Heart, Share2, MessageCircle, ChevronLeft, Clock, Trash2 } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import Header from '../components/Header'
import { articles, news } from '../data/content'

function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const shareMenuRef = useRef(null)
  
  // Load initial data from localStorage
  const getStoredLikes = () => {
    const stored = localStorage.getItem(`article-${id}-likes`)
    return stored ? JSON.parse(stored) : { liked: false, count: Math.floor(Math.random() * 100) + 20 }
  }

  const getStoredComments = () => {
    const stored = localStorage.getItem(`article-${id}-comments`)
    return stored ? JSON.parse(stored) : []
  }

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [userName, setUserName] = useState('')

  // Initialize data on component mount
  useEffect(() => {
    const likesData = getStoredLikes()
    setLiked(likesData.liked)
    setLikeCount(likesData.count)
    setComments(getStoredComments())
    
    // Get user name from localStorage or prompt
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    } else {
      const name = prompt('Enter your name for comments:') || 'Anonymous'
      localStorage.setItem('userName', name)
      setUserName(name)
    }

    // Close share menu when clicking outside
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [id])
  
  // Combine articles and news
  const allContent = [...articles, ...news]
  const content = allContent.find(item => item.id === parseInt(id))

  const handleLike = () => {
    const newLiked = !liked
    const newCount = newLiked ? likeCount + 1 : likeCount - 1
    
    setLiked(newLiked)
    setLikeCount(newCount)
    
    // Save to localStorage
    localStorage.setItem(`article-${id}-likes`, JSON.stringify({
      liked: newLiked,
      count: newCount
    }))
  }

  const handleShare = async () => {
    setShowShareMenu(!showShareMenu)
  }

  const handleSocialShare = async (platform) => {
    const url = window.location.href
    const title = content.title
    const text = content.excerpt

    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        break
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(url)
          alert('Link copied to clipboard!')
          setShowShareMenu(false)
          return
        } catch (err) {
          console.log('Copy failed:', err)
          return
        }
      case 'native':
        try {
          if (navigator.share) {
            await navigator.share({ title, text, url })
            setShowShareMenu(false)
            return
          }
        } catch (err) {
          console.log('Native share failed:', err)
          return
        }
        break
      default:
        return
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      setShowShareMenu(false)
    }
  }

  const handleComment = () => {
    setShowComments(!showComments)
  }

  const handlePostComment = () => {
    if (!newComment.trim()) {
      alert('Please enter a comment')
      return
    }

    if (!userName.trim()) {
      alert('Please enter your name')
      return
    }

    const comment = {
      id: Date.now(),
      author: userName,
      text: newComment,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now'
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    setNewComment('')

    // Save to localStorage
    localStorage.setItem(`article-${id}-comments`, JSON.stringify(updatedComments))
    // Update stored username
    localStorage.setItem('userName', userName)
  }

  const handleDeleteComment = (commentId) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      const updatedComments = comments.filter(comment => comment.id !== commentId)
      setComments(updatedComments)
      
      // Save to localStorage
      localStorage.setItem(`article-${id}-comments`, JSON.stringify(updatedComments))
    }
  }

  const handleChangeUsername = () => {
    const newName = prompt('Enter your new name:', userName)
    if (newName && newName.trim()) {
      setUserName(newName.trim())
      localStorage.setItem('userName', newName.trim())
    }
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const commentTime = new Date(timestamp)
    const diffMs = now - commentTime
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Content Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    )
  }

  // Placeholder content for articles/news
  const fullContent = `
    <p>${content.excerpt}</p>
    
    <h2>Introduction</h2>
    <p>This is a fascinating exploration of ${content.title.toLowerCase()}. Our team of experts has compiled comprehensive insights to bring you the most authoritative perspective on this important topic.</p>
    
    <h2>Key Points</h2>
    <p>Understanding the nuances of this subject requires careful examination of multiple perspectives and historical contexts. Through extensive research and consultation with leading scholars, we've gathered essential information to help you gain a deeper appreciation.</p>
    
    <h2>Historical Context</h2>
    <p>The rich history surrounding this topic spans centuries of human thought and experience. From ancient wisdom to modern interpretations, each era has contributed valuable insights that continue to inform our understanding today.</p>
    
    <h2>Contemporary Relevance</h2>
    <p>In today's rapidly changing world, these timeless principles remain remarkably relevant. Modern practitioners and scholars continue to find new applications and interpretations that speak to current challenges and opportunities.</p>
    
    <h2>Practical Applications</h2>
    <p>Beyond theoretical understanding, these concepts offer practical guidance for daily life. Many individuals have found meaningful ways to integrate these teachings into their personal spiritual practice and community engagement.</p>
    
    <h2>Conclusion</h2>
    <p>As we've explored, this topic offers profound insights that continue to inspire and guide people around the world. Whether you're just beginning your journey or deepening an existing practice, there's always more to discover and appreciate.</p>
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Article Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={content.image} 
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-2 mb-4">
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {content.category}
                </span>
                {content.type === 'news' && (
                  <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                    NEWS
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{content.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{content.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{content.readTime}</span>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          {/* Article Excerpt */}
          <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed">
            {content.excerpt}
          </p>

          {/* Article Body */}
          <div 
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-800
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-slate-600 prose-li:mb-2
              prose-strong:text-slate-800 prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: fullContent }}
          />

          {/* Social Actions - Moved to bottom */}
          <div className="flex gap-4 pt-8 mt-8 border-t border-slate-200">
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 transition-colors ${liked ? 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100' : 'hover:bg-slate-50'}`}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-600' : ''}`} />
              <span>{liked ? 'Liked' : 'Like'} ({likeCount})</span>
            </Button>
            
            {/* Share Button with Dropdown */}
            <div className="relative" ref={shareMenuRef}>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <Motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-lg shadow-xl p-2 z-50 min-w-[200px]"
                >
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      f
                    </div>
                    <span className="text-slate-700 font-medium">Facebook</span>
                  </button>
                  
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-sky-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      𝕏
                    </div>
                    <span className="text-slate-700 font-medium">Twitter/X</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      in
                    </div>
                    <span className="text-slate-700 font-medium">LinkedIn</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('whatsapp')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-green-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      W
                    </div>
                    <span className="text-slate-700 font-medium">WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('telegram')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-sky-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      T
                    </div>
                    <span className="text-slate-700 font-medium">Telegram</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare('email')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      @
                    </div>
                    <span className="text-slate-700 font-medium">Email</span>
                  </button>

                  <div className="border-t border-slate-200 my-2"></div>

                  <button
                    onClick={() => handleSocialShare('copy')}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-purple-50 rounded transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      📋
                    </div>
                    <span className="text-slate-700 font-medium">Copy Link</span>
                  </button>
                </Motion.div>
              )}
            </div>

            <Button 
              variant="outline" 
              className={`flex items-center gap-2 transition-colors ${showComments ? 'bg-green-50 text-green-600 border-green-300' : 'hover:bg-green-50 hover:text-green-600 hover:border-green-300'}`}
              onClick={handleComment}
            >
              <MessageCircle className="w-4 h-4" />
              Comment
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <Motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-8 border-t border-slate-200"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Comments ({comments.length})
              </h3>
              <div className="space-y-4">
                {/* Comment Input */}
                <div className="flex gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full h-10 w-10 flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts..."
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) {
                          handlePostComment()
                        }
                      }}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Posting as:</span>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="px-2 py-1 border border-slate-300 rounded text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handlePostComment}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* User Comments */}
                {comments.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-full h-10 w-10 flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800">{comment.author}</span>
                              <span className="text-sm text-slate-500">{getTimeAgo(comment.timestamp)}</span>
                            </div>
                            {/* Delete button - only show if this is user's comment */}
                            {comment.author === userName && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
                                title="Delete this comment"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            )}
                          </div>
                          <p className="text-slate-600 whitespace-pre-wrap">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {comments.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </Motion.div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  About {content.author}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A dedicated writer and researcher specializing in {content.category.toLowerCase()} 
                  and interfaith dialogue, bringing scholarly insights to accessible {content.type === 'news' ? 'news coverage' : 'articles'} that 
                  bridge ancient wisdom with contemporary understanding.
                </p>
              </div>
            </div>
          </div>

          {/* Related Content CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Enjoyed this {content.type === 'news' ? 'news story' : 'article'}?
            </h3>
            <p className="text-slate-600 mb-4">
              Explore more insightful content on faith, spirituality, and philosophy.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Browse All Content
              </Button>
              <Button 
                onClick={() => navigate(content.type === 'news' ? '/news' : '/articles')}
                variant="outline"
              >
                More {content.type === 'news' ? 'News' : 'Articles'}
              </Button>
            </div>
          </div>
        </Motion.div>
      </div>

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

export default ArticlePage
