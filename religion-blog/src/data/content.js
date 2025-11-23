// Shared data for articles and news across all pages

export const articles = [
  {
    id: 1,
    type: 'article',
    title: 'The Intersection of Faith and Modern Science',
    excerpt: 'Exploring how contemporary scientific discoveries complement and challenge traditional religious beliefs, opening new dialogues between faith communities and the scientific world.',
    author: 'Dr. Sarah Mitchell',
    date: 'November 20, 2025',
    category: 'Christianity',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/faith-science/800/600',
    featured: true
  },
  {
    id: 2,
    type: 'article',
    title: 'Understanding the Five Pillars of Islam',
    excerpt: 'A comprehensive guide to the fundamental practices that form the foundation of Islamic faith, including their historical context and contemporary relevance.',
    author: 'Imam Hassan Al-Rahman',
    date: 'November 18, 2025',
    category: 'Islam',
    readTime: '10 min read',
    image: 'https://picsum.photos/seed/islam-pillars/800/600',
    featured: false
  },
  {
    id: 3,
    type: 'article',
    title: 'Mindfulness and Buddhist Meditation Practices',
    excerpt: 'Discover ancient Buddhist meditation techniques that have gained widespread acceptance in modern wellness practices, bridging Eastern wisdom with Western psychology.',
    author: 'Venerable Thich Nguyen',
    date: 'November 15, 2025',
    category: 'Buddhism',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/buddhist-meditation/800/600',
    featured: false
  },
  {
    id: 4,
    type: 'article',
    title: 'The Sacred Texts: A Comparative Study',
    excerpt: 'An in-depth analysis of how different religious traditions approach their sacred scriptures, revealing surprising commonalities and profound differences in interpretation.',
    author: 'Prof. David Cohen',
    date: 'November 12, 2025',
    category: 'Philosophy',
    readTime: '12 min read',
    image: 'https://picsum.photos/seed/sacred-texts/800/600',
    featured: false
  },
  {
    id: 5,
    type: 'article',
    title: 'Yoga Philosophy: Beyond the Physical Practice',
    excerpt: 'Delving into the spiritual and philosophical foundations of yoga that extend far beyond the physical postures, exploring the eight limbs of Patanjali.',
    author: 'Swami Ananda Devi',
    date: 'November 10, 2025',
    category: 'Hinduism',
    readTime: '9 min read',
    image: 'https://picsum.photos/seed/yoga-philosophy/800/600',
    featured: false
  },
  {
    id: 6,
    type: 'article',
    title: 'The Kabbalah: Mystical Traditions in Judaism',
    excerpt: 'Unraveling the mystical teachings of Jewish Kabbalah, from ancient wisdom to contemporary interpretations, and their influence on spiritual seekers worldwide.',
    author: 'Rabbi Rebecca Goldstein',
    date: 'November 8, 2025',
    category: 'Judaism',
    readTime: '11 min read',
    image: 'https://picsum.photos/seed/kabbalah-judaism/800/600',
    featured: false
  }
]

export const news = [
  {
    id: 101,
    type: 'news',
    title: 'Pope Francis Announces New Interfaith Dialogue Initiative',
    excerpt: 'The Vatican reveals plans for a global interfaith summit bringing together leaders from major world religions to address climate change and social justice.',
    author: 'Maria Gonzalez',
    date: 'November 22, 2025',
    category: 'Christianity',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/pope-interfaith/800/600',
    featured: true
  },
  {
    id: 102,
    type: 'news',
    title: 'Historic Buddhist Temple Discovered in Ancient Silk Road City',
    excerpt: 'Archaeologists uncover a remarkably preserved 1,500-year-old Buddhist temple complex in Central Asia, shedding new light on religious exchanges along the Silk Road.',
    author: 'Dr. James Chen',
    date: 'November 21, 2025',
    category: 'Buddhism',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/buddhist-temple/800/600',
    featured: false
  },
  {
    id: 103,
    type: 'news',
    title: 'Ramadan 2026: Dates Confirmed by Islamic Authorities',
    excerpt: 'The International Islamic Council announces official dates for Ramadan 2026, with preparations beginning for the holy month observed by 1.8 billion Muslims worldwide.',
    author: 'Fatima Al-Said',
    date: 'November 20, 2025',
    category: 'Islam',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/ramadan-2026/800/600',
    featured: false
  },
  {
    id: 104,
    type: 'news',
    title: 'New Study Shows Meditation Reduces Anxiety by 40%',
    excerpt: 'Harvard Medical School releases groundbreaking research demonstrating significant mental health benefits of daily meditation practice.',
    author: 'Dr. Emily Watson',
    date: 'November 19, 2025',
    category: 'Spirituality',
    readTime: '7 min read',
    image: 'https://picsum.photos/seed/meditation-study/800/600',
    featured: false
  },
  {
    id: 105,
    type: 'news',
    title: 'Jewish Communities Celebrate Hanukkah with Record Attendance',
    excerpt: 'Synagogues across the world report unprecedented participation in Hanukkah celebrations, marking a resurgence of interest in Jewish traditions.',
    author: 'Rabbi David Levy',
    date: 'November 18, 2025',
    category: 'Judaism',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/hanukkah-celebration/800/600',
    featured: false
  },
  {
    id: 106,
    type: 'news',
    title: 'Hindu Festival Diwali Breaks Records with Global Celebrations',
    excerpt: 'This years Diwali festival sees participation from over 100 countries, highlighting the global spread of Hindu culture and traditions.',
    author: 'Priya Sharma',
    date: 'November 17, 2025',
    category: 'Hinduism',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/diwali-festival/800/600',
    featured: false
  }
]

export const categories = ['All', 'Christianity', 'Islam', 'Buddhism', 'Hinduism', 'Judaism', 'Spirituality', 'Philosophy']

// Get all content (articles + news) sorted by date
export const getAllContent = () => {
  return [...articles, ...news].sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Get only articles
export const getArticles = () => {
  return articles
}

// Get only news
export const getNews = () => {
  return news
}
