# Regtime Business Website

A modern, production-ready business website built with Next.js 13, TypeScript, and Tailwind CSS. Features comprehensive brand integration, analytics tracking, and lead generation forms.

## 🚀 Ready to Publish to Bolt

**→ READ: [PUBLISH_TO_BOLT.md](./PUBLISH_TO_BOLT.md) ← START HERE**

Your credentials are set. Just add 2 environment variables to Bolt dashboard and click Publish.

## 🚀 Features

- **Modern Tech Stack**: Next.js 13 with App Router, TypeScript, Tailwind CSS
- **Brand Integration**: Complete Regtime brand asset implementation
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Analytics Ready**: Google Analytics 4 and HubSpot tracking integration
- **Lead Generation**: HubSpot and Salesforce form components
- **Performance Optimized**: Static export ready, optimized images and fonts
- **Accessibility**: WCAG compliant with proper semantic markup
- **SEO Optimized**: Complete meta tags, Open Graph, and structured data

## 📁 Project Structure

```
├── app/
│   ├── (site)/
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HubSpotForm.tsx
│   └── SalesforceLeadForm.tsx
├── public/
│   ├── fonts/
│   └── [brand assets]
└── [config files]
```

## 🎨 Brand Implementation

### Fonts
- **Aspekta**: Primary brand font loaded via `next/font/local`
- **Weights**: 300, 400, 500, 600, 700
- **CSS Variables**: `--font-aspekta` applied globally

### Colors (Tailwind Tokens)
- `brand.primary`: #4A90E2 (Alice Blue)
- `brand.secondary`: #5F9EA0 (Cadet)
- `brand.accent`: #F0E68C (Maize)
- `brand.night`: #2C3E50 (Night)

### Logo Usage
- **Header**: Lockup Alice Blue (32px desktop, 24px mobile)
- **Footer**: Lockup White on dark background
- **Favicon**: IconMark Alice Blue
- **Social/OG**: IconMark Alice Blue

## 🔧 Environment Variables

Create a `.env.local` file with the following optional variables:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id
NEXT_PUBLIC_HUBSPOT_FORM_ID=your-form-id

# Salesforce
NEXT_PUBLIC_SALESFORCE_ORG_ID=your-org-id
NEXT_PUBLIC_SALESFORCE_OID=your-oid
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📊 Performance

The website is optimized for:
- **Core Web Vitals**: Excellent LCP, FID, and CLS scores
- **SEO**: Complete meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized images, fonts, and code splitting

## 🔗 Pages

- **Home** (`/`): Hero, features, stats, and CTA sections
- **About** (`/about`): Company story, values, team, and stats
- **Services** (`/services`): Product offerings and pricing
- **Contact** (`/contact`): Contact forms and information
- **Privacy** (`/privacy`): Privacy policy and legal information

## 🎯 Lead Generation

### HubSpot Integration
- Automatic form embedding with portal/form ID
- Custom styling to match brand
- Error handling and fallbacks

### Salesforce Integration
- Web-to-Lead form implementation
- Custom field mapping
- Success/error state management

## 📱 Responsive Design

- **Mobile**: Optimized navigation and content layout
- **Tablet**: Balanced grid systems and typography
- **Desktop**: Full-featured layout with hover states
- **Breakpoints**: Tailwind's responsive system

## 🔍 SEO Features

- Complete meta tags and Open Graph
- Structured data markup
- Semantic HTML structure
- Optimized images with alt text
- Clean URL structure

## 🛠️ Development

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component-based architecture

### Performance
- Static export configuration
- Image optimization
- Font optimization with `next/font`
- CSS-in-JS with Tailwind

## 📈 Analytics

### Google Analytics 4
- Automatic page view tracking
- Event tracking ready
- Privacy-compliant implementation

### HubSpot Tracking
- Visitor identification
- Form submission tracking
- Lead scoring integration

## 🔒 Security

- No sensitive data in client-side code
- Environment variable protection
- HTTPS-ready configuration
- Content Security Policy ready

## 📄 License

This project is proprietary to Regtime. All rights reserved.