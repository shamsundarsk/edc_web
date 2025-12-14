# SEO Quick Start Guide - EDC Cell Website

## 🚀 5-Minute Setup

### 1. Update Configuration Files

**Replace in all files:**
- `https://edccell.edu` → Your actual domain
- `edccell@college.edu` → Your actual email
- `@edccell` → Your Twitter handle
- `G-XXXXXXXXXX` → Your Google Analytics ID

### 2. Add to .env.local
```bash
SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Update package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap",
    "start": "next start"
  }
}
```

### 4. Add FAQSchema to Landing Page
```typescript
// app/page.tsx
import FAQSchema from './components/FAQSchema';

export default function HomePage() {
  return (
    <>
      <FAQSchema />
      {/* Your content */}
    </>
  );
}
```

### 5. Add Analytics to Layout
```typescript
// app/layout.tsx
import Analytics from './components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 6. Generate Favicons
1. Go to https://realfavicongenerator.net/
2. Upload your logo
3. Download and extract to `/public`

### 7. Create OG Images
Create these images (1200x630px):
- `/public/og-image.jpg` - Default
- `/public/og-landing.jpg` - Landing page
- `/public/og-events.jpg` - Events page
- `/public/og-blog.jpg` - Blog default

### 8. Build and Deploy
```bash
npm run build
npm start
```

### 9. Submit to Google
1. **Google Search Console**: https://search.google.com/search-console
   - Add property
   - Verify ownership
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Google Analytics**: https://analytics.google.com/
   - Create property
   - Get Measurement ID
   - Add to .env.local

### 10. Test SEO
```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.com --view

# Check meta tags
curl -I https://your-domain.com

# Validate structured data
# Visit: https://search.google.com/test/rich-results
```

## ✅ Verification Checklist

- [ ] All URLs updated to your domain
- [ ] Favicons generated and added
- [ ] OG images created
- [ ] Google Analytics configured
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] Robots.txt accessible
- [ ] All images have alt text
- [ ] Lighthouse score > 90
- [ ] Mobile-friendly test passed

## 📊 Expected Results

**Within 1 Week:**
- Site indexed by Google
- Search Console data appearing

**Within 1 Month:**
- Organic traffic starting
- Keywords ranking

**Within 3 Months:**
- Steady organic growth
- Multiple keywords in top 10

## 🆘 Troubleshooting

**Sitemap not generating?**
```bash
npm install next-sitemap
npm run build
```

**Analytics not tracking?**
- Check GA_ID in .env.local
- Verify Analytics component is in layout
- Check browser console for errors

**Images not optimized?**
- Use Next.js Image component
- Check image formats (WebP preferred)
- Compress images before upload

## 📞 Need Help?

Refer to the complete guide: `SEO_OPTIMIZATION_GUIDE.md`
