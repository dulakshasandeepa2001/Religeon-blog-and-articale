# News Article Pages Feature

## What's New

I've added individual article pages to your religion blog! Now each article can be viewed in full detail on its own dedicated page.

## Features Added

### 1. **React Router Integration**
- Installed `react-router-dom` for navigation
- Set up routing in `main.jsx` with two routes:
  - `/` - Home page (main blog listing)
  - `/article/:id` - Individual article page

### 2. **New Article Page Component** (`src/pages/ArticlePage.jsx`)
- Full article content display with rich formatting
- Beautiful hero image header
- Article metadata (author, date, read time, category)
- Social interaction buttons (Like, Share, Comment)
- Author bio section
- Related articles call-to-action
- "Back to Home" button in header
- Responsive design for all screen sizes

### 3. **Updated Main App**
- Added navigation functionality to article cards
- Click on any article card to view the full article
- Click on the featured article to view it in detail
- Smooth transitions and animations

## How It Works

### Navigation
- Click on any article card or the featured article on the home page
- You'll be taken to a dedicated page showing the full article
- Click "Back to Home" or the logo to return to the main page

### Article Content
Each article page includes:
- Full article text with proper formatting (headings, paragraphs, lists)
- High-quality header image
- Author information
- Publication date and reading time
- Category badge
- Interactive elements (like, share, comment buttons)

## Article Data

Currently, the site includes 6 full articles with complete content:
1. **The Intersection of Faith and Modern Science** (Christianity)
2. **Understanding the Five Pillars of Islam** (Islam)
3. **Mindfulness and Buddhist Meditation Practices** (Buddhism)
4. **The Sacred Texts: A Comparative Study** (Philosophy)
5. **Yoga Philosophy: Beyond the Physical Practice** (Hinduism)
6. **The Kabbalah: Mystical Traditions in Judaism** (Judaism)

## Technical Details

### Files Modified/Created
- ✅ `src/main.jsx` - Added BrowserRouter and Routes
- ✅ `src/App.jsx` - Added useNavigate and onClick handlers
- ✅ `src/pages/ArticlePage.jsx` - New component for article display
- ✅ `package.json` - Added react-router-dom dependency

### Styling
- Uses the same design system (Tailwind CSS + shadcn/ui components)
- Consistent with the rest of the site
- Beautiful typography for article content
- Responsive layouts for mobile, tablet, and desktop

## Future Enhancements

You can easily extend this feature by:
- Adding a backend API to fetch articles dynamically
- Implementing actual like, share, and comment functionality
- Adding a comments section with a commenting system
- Creating an admin panel to manage articles
- Adding article search and filtering on the article page
- Implementing related articles recommendations
- Adding social media integration for sharing

## Running the Project

```bash
npm run dev
```

Then visit `http://localhost:5173` and click on any article to see the new feature in action!
