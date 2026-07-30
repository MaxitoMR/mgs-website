# MGS Supply & Services Website - Complete Design Specification

**Source:** Extracted from `/tmp/mgs-full/MGSSupplyWebsite/`
**Generated:** 2026-03-23
**Purpose:** Pixel-perfect rebuild reference

---

## TABLE OF CONTENTS

1. [Tech Stack & Dependencies](#1-tech-stack--dependencies)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Global CSS & Resets](#4-global-css--resets)
5. [Layout Architecture](#5-layout-architecture)
6. [Header System (Desktop + Mobile)](#6-header-system)
7. [Navigation & Mega Menu](#7-navigation--mega-menu)
8. [Hero Section](#8-hero-section)
9. [Homepage Section Order & Structure](#9-homepage-section-order--structure)
10. [Service Category Data](#10-service-category-data)
11. [Reusable Section Components](#11-reusable-section-components)
12. [Footer](#12-footer)
13. [About Page](#13-about-page)
14. [Service Pages (Template)](#14-service-pages-template)
15. [Quote Page & Modal](#15-quote-page--modal)
16. [Walkthrough Modal](#16-walkthrough-modal)
17. [Floating Action Buttons](#17-floating-action-buttons)
18. [Animation System](#18-animation-system)
19. [Database Schema](#19-database-schema)
20. [Image Assets & URLs](#20-image-assets--urls)
21. [Routing Map](#21-routing-map)
22. [Search System](#22-search-system)
23. [Supabase Video Config](#23-supabase-video-config)

---

## 1. TECH STACK & DEPENDENCIES

### Core Framework
- **React 18.3.1** with TypeScript 5.6.3
- **Vite 5.4.14** (build tool)
- **Wouter 3.3.5** (routing - NOT React Router)
- **TanStack React Query 5.60.5** (server state)
- **Express 4.21.2** (backend)
- **Drizzle ORM 0.39.1** with Neon (PostgreSQL serverless)

### UI Libraries
- **Tailwind CSS 3.4.17** with `tailwindcss-animate` and `@tailwindcss/typography`
- **Framer Motion 11.18.2** (animations)
- **Lucide React 0.453.0** (icons)
- **Radix UI** (full suite - dialog, select, checkbox, toast, tooltip, etc.)
- **Shadcn/UI** component system (class-variance-authority, clsx, tailwind-merge)
- **React Player 2.16.0** (video playback)
- **React Hook Form 7.55.0** + Zod 3.24.2 (form validation)

### Fonts
- **Manrope** (Google Fonts: weights 200-800) - Primary font
- System fallbacks: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

---

## 2. COLOR SYSTEM

### CSS Custom Properties (`:root`)
```css
--background: hsl(240, 9%, 98%);        /* #FBFBFE - off-white */
--foreground: hsl(20, 14.3%, 4.1%);     /* near-black */
--primary: hsl(88, 60%, 41%);           /* #69AF23 - MGS Green */
--secondary: hsl(75, 92%, 55%);         /* #9FD01B - Lime Green */
--accent: hsl(198, 79%, 48%);           /* Blue accent */
--muted: hsl(60, 4.8%, 95.9%);
--muted-foreground: hsl(25, 5.3%, 44.7%);
--border: hsl(20, 5.9%, 90%);
--destructive: hsl(0, 84.2%, 60.2%);
--radius: 0.5rem;
```

### Hardcoded Color Values Used Throughout
| Color | Hex | Usage |
|-------|-----|-------|
| MGS Primary Green | `#69AF23` | Nav bar bg, CTAs, accents, links |
| MGS Lime/Secondary | `#9FD01B` | Hover states, secondary buttons, submit buttons |
| Off-White Background | `#FBFBFE` | Page background, hero text color |
| Body Text | `#1f2937` | Default text (gray-800) |
| Dark Overlay | `rgba(0,0,0,0.7)` | Image overlays |
| Green Hover Overlay | `rgba(105, 175, 35, 0.2)` | Service card hover |

### Tailwind Color References Used
- `text-gray-300`, `text-gray-400`, `text-gray-600`, `text-gray-700`, `text-gray-800`, `text-gray-900`
- `bg-gray-50`, `bg-gray-100`, `bg-gray-900`
- `bg-white`, `bg-black`
- `border-gray-100`, `border-gray-200`, `border-gray-300`, `border-gray-800`
- `text-green-100`, `text-green-200` (nav hover states)
- `bg-mgs-primary`, `bg-mgs-secondary`, `bg-mgs-accent`, `bg-mgs-clinical-gray` (custom Tailwind theme colors - mapped to CSS vars)

---

## 3. TYPOGRAPHY SYSTEM

### Font Family Classes
```css
.font-gothic    { font-family: 'Manrope', system-ui, sans-serif; }
.font-clinical  { font-family: 'Manrope', system-ui, sans-serif; }
.font-manrope   { font-family: 'Manrope', system-ui, sans-serif; }
```
All three aliases resolve to Manrope. The naming convention indicates semantic purpose:
- **font-gothic**: Headings, hero titles
- **font-clinical**: Body text, labels, descriptions
- **font-manrope**: Section headings (alternate usage)

### Font Weight Classes
```css
.font-ultra-light  { font-weight: 100; }  /* Hero titles */
.font-thin          { font-weight: 100; }  /* Subtitles, descriptions */
.font-extra-light   { font-weight: 200; }
.font-light         { font-weight: 300; }  /* Most body text, nav items */
```

### GlobalFontSystem Responsive Sizes
Injected via `<style>` tag at runtime:

| Token | Mobile (<=767px) | Tablet (768-1279px) | Desktop (>=1280px) |
|-------|-----------------|--------------------|--------------------|
| `--font-hero-heading` | 36px | 48px | 64px |
| `--font-h1` | 32px | 40px | 48px |
| `--font-h2` | 24px | 28px | 32px |
| `--font-h3` | 20px | 22px | 24px |
| `--font-body-large` | 18px | 18px | 20px |
| `--font-body-base` | 16px | 16px | 16px |
| `--font-caption` | 12px | 14px | 14px |

### Global Font Override
The GlobalFontSystem sets ALL elements to:
```css
* {
  font-family: 'URW Gothic', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### Common Typography Patterns
- **Hero H1**: `font-gothic font-ultra-light text-5xl lg:text-7xl leading-tight`
- **Section H2**: `font-gothic font-light text-4xl lg:text-5xl` or `font-manrope font-medium text-4xl lg:text-5xl`
- **Subtitle/Label**: `font-clinical font-thin text-sm tracking-wider uppercase`
- **Body**: `font-clinical font-thin text-base lg:text-lg leading-relaxed`
- **Card Title**: `font-clinical font-light text-2xl`
- **Small/Meta**: `font-clinical font-ultra-light text-gray-400`
- **Nav Links**: `text-white font-light text-lg xl:text-xl` (on green bar)
- **Buttons**: `font-clinical font-light tracking-wide uppercase`

---

## 4. GLOBAL CSS & RESETS

### index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
@import './components/Hero/hero.css';

/* Reset */
*, html, body { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow-x: hidden; scroll-behavior: smooth; }
body { font-family: system-ui, -apple-system, sans-serif; color: #1f2937; background-color: #FBFBFE; }

/* Global transitions on ALL elements */
* { transition: color 0.2s ease, background-color 0.2s ease; }
```

### Key CSS Classes
```css
/* Section reveal animation (IntersectionObserver-driven) */
.section-reveal {
  opacity: 0; transform: translateY(30px);
  transition: all 0.8s ease;
}
.section-reveal.visible {
  opacity: 1; transform: translateY(0);
}

/* Full-screen sections (break out of container) */
.full-screen-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

/* Big image overlay gradient */
.big-image-overlay {
  background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%);
}

/* Hero overlay gradient */
.hero-overlay {
  background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%);
}

/* Hero text shadow for readability */
.hero-text-shadow {
  text-shadow: 1px 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(0,0,0,0.3), 0 0 16px rgba(0,0,0,0.2);
}

/* Navigation dots */
.nav-dot {
  width: 12px; height: 12px; border-radius: 50%;
  background-color: rgba(251,251,254,0.3);
  border: 2px solid rgba(251,251,254,0.5);
  transition: all 0.3s ease; cursor: pointer;
}
.nav-dot:hover, .nav-dot.active {
  background-color: #69AF23; border-color: #69AF23; transform: scale(1.2);
}

/* Service card hover */
.service-category-card {
  border-radius: 8px; overflow: hidden; transition: all 0.3s ease;
}
.service-category-card:hover { transform: translateY(-4px); }
```

---

## 5. LAYOUT ARCHITECTURE

### App Wrapper (App.tsx)
```
QueryClientProvider > TooltipProvider > GlobalFontSystem + Toaster + Router
```

### Layout Component (Layout.tsx)
```tsx
<div className="min-h-screen bg-white">
  <DesktopHeader />   /* hidden lg:block */
  <MobileHeader />    /* lg:hidden */
  <main>
    <div className="w-full max-w-none overflow-x-hidden">
      {children}
    </div>
  </main>
  <Footer />
</div>
```

The Layout component also sets up the **IntersectionObserver** for `.section-reveal` elements:
- threshold: 0.1
- rootMargin: '0px 0px -50px 0px'
- Adds class `visible` when intersecting

---

## 6. HEADER SYSTEM

### Desktop Header (`DesktopHeader.tsx`) - `hidden lg:block`

**Structure (top to bottom):**

1. **Top Bar** - Contact info, right-aligned
   - `bg-white`, height: `h-[clamp(2rem,2.5vw,2.5rem)]`
   - Text: `text-[clamp(0.65rem,0.75vw,0.75rem)] text-gray-600`
   - Content: "Call Us: (281)-829-5358" | "Email: support@mgssupplyandservices.com" | "Hours: Mon-Fri 9AM-5PM"
   - Custom bottom border with logo cutout

2. **Main Header Row** - Logo + Search + Social
   - `bg-white py-4`
   - Logo: `h-[clamp(6rem,8vw,8rem)]` with negative margin `-ml-[clamp(0.5rem,0.75vw,0.75rem)]`
   - Logo asset: `@assets/MGS LOGOOOOOOO_1750105578653.png`
   - Search bar: `w-[clamp(28rem,35vw,35rem)]`
   - Social icons: Facebook, Twitter, Linkedin (Lucide, size 20)
   - Icon colors: `text-gray-500 hover:text-[#69AF23]`

3. **Navigation Bar** - Green bar with dropdowns (rendered by `<DesktopNav />`)

### Mobile Header (`MobileHeader.tsx`) - `lg:hidden`

**Structure:**
1. **Top Contact Bar** - centered
   - `h-8`, text: `text-xs text-gray-600`
   - Phone icon + number, Mail icon + email
2. **Main Row** - Logo + Search toggle + Hamburger
   - Logo: `h-12`
   - Menu toggle: 10x10 button, Menu/X icons (size 24)
3. **Mobile Nav Drawer** (`<MobileNav />`)

---

## 7. NAVIGATION & MEGA MENU

### Desktop Nav Bar (`DesktopNav.tsx`)
```tsx
<nav className="bg-[#69AF23] relative fixed top-0 left-0 right-0 z-[1000]">
```
- Height: `h-[clamp(3rem,3.5vw,3.5rem)]`
- Nav items: `text-white hover:text-green-100 text-lg xl:text-xl font-light`
- Items: **Commercial** | **Medical** | **Industrial** | **Specialized** | **About**
- Each dropdown trigger has ChevronDown icon (size 16)
- Hover delay: 300ms open, 150ms close (with timeout cleanup)

### Mega Menu (`MegaMenu.tsx`)
- Position: `absolute top-full left-0 right-0`
- Style: `bg-white shadow-2xl border-t-2 border-[#69AF23] z-50`
- Animation: Framer Motion `opacity 0->1, y -10->0` (0.2s easeOut)
- Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
- Uses `clamp()` for responsive padding/gaps
- Each service item animates in with staggered delay (0.05s per item)
- Bottom CTA: "Need a Custom Solution?" with border-t separator

### Mega Menu Service Data
```typescript
commercial: {
  services: [
    "Multi Tenant Offices" -> /services/multi-tenant-offices
    "Retail Facilities" -> /services/retail
    "Restaurants" -> /services/restaurants
    "Gymnasiums" -> /services/gymnasiums
    "Car Dealerships" -> /services/car-dealerships
    "School & University" -> /services/school-university
    "Banks" -> /services/banks
    "Churches" -> /services/churches
  ]
}
medical: {
  services: [
    "Surgery Centers" -> /services/surgical-centers
    "Laboratories" -> /services/laboratories
    "Imaging Facilities" -> /services/imaging-facilities
    "Sports & Rehab" -> /services/sports-rehab
    "Clinic & Private Practice" -> /services/clinic-private-practice
    "Terminal Cleaning" -> /services/terminal-cleaning
  ]
}
industrial: {
  services: [
    "Factory Plants" -> /services/factory-plants
    "Hydroelectric Power Plants" -> /services/hydroelectric-plants
    "Petrochemical Plants" -> /services/petrochemical-plants
    "Warehouses" -> /services/warehouses
  ]
}
additional (displayed as "Specialized"): {
  services: [
    "Terminal Sanitization" -> /services/terminal-sanitization
    "Various Concrete Floors" -> /services/concrete-floors
    "Post-Construction Cleanup" -> /services/post-construction
    "Industrial Cleanup" -> /services/industrial-cleanup
    "Windows" -> /services/windows
    "Power Washing" -> /services/power-washing
  ]
}
```

### Mobile Nav (`MobileNav.tsx`)
- Full-screen overlay: `fixed top-0 left-0 right-0 z-[1000] bg-white`
- Sections: Services (3 links), Quick Actions (3 links), About Us
- Bottom CTAs:
  - "Get Free Quote": `bg-[#69AF23] hover:bg-[#5a9e1d] text-white py-3 rounded-lg`
  - "Schedule Walkthrough": `border-2 border-[#69AF23] bg-white text-[#69AF23] py-3 rounded-lg`

---

## 8. HERO SECTION

### Structure (`Hero.tsx`)
```tsx
<section className="relative min-h-screen flex items-center full-screen-section">
  <HeroSupabaseVideo />  /* z-index: 10 */
  <HeroContent />        /* z-index: 50 */
</section>
```

### Hero Video (`HeroSupabaseVideo.tsx`)
- Uses **ReactPlayer** with dual-player cross-fade system
- 5 videos from Supabase Storage, cycling every **10 seconds**
- Playback rate: **0.6** (slow motion)
- Cross-fade: CSS `transition-opacity duration-1000 ease-in-out`
- Videos are `object-fit: cover` fullscreen
- Loading fallback: `bg-gray-900` with "Loading videos..." text

### Supabase Video URLs
```
https://uuvspvqebodievfkwwss.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-1.mp4
https://uuvspvqebodievfkwwss.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-2.mp4
https://uuvspvqebodievfkwwss.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-3.mp4
https://uuvspvqebodievfkwwss.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-4.mp4
https://uuvspvqebodievfkwwss.supabase.co/storage/v1/object/public/hero-videos/mgs-hero-vid-5.mp4
```

### Hero Content (`HeroContent.tsx`)
**Overlay layers (bottom to top):**
1. Video (z-10)
2. Hero overlay image: `@assets/HERO FOR MGS_1750791151007.png` at **opacity 0.4**, `background-size: cover`, `background-attachment: fixed` (z-20)
3. Dark overlay: `rgba(0, 0, 0, 0.05)` (z-21)
4. Text content (z-50)

**Text content:**
```
[Label]     "Est. 2006"
            font-clinical font-light text-sm tracking-wider text-gray-300 uppercase

[H1]        "Leaders In"
            "Methodical"          <- text-[#69AF23]
            "Precision Cleaning"
            font-gothic font-ultra-light text-5xl lg:text-7xl leading-tight hero-text-shadow

[Body]      "Comprehensive facility management services for commercial, medical,
             and industrial environments with three decades of proven expertise."
            font-clinical font-thin text-base lg:text-lg leading-relaxed mb-12
```

- Content: left-aligned (`text-left`), `max-w-4xl`
- Positioned: `flex items-center justify-start min-h-screen`

---

## 9. HOMEPAGE SECTION ORDER & STRUCTURE

The homepage (`HomePage.tsx`) renders these sections in order:

### 1. Hero Section
(See Section 8 above)

### 2. Service Category Full-Screen Sections (x4)
Each category gets a **full-screen** (`min-h-screen`) section with:

**Layout:** 2-column grid on desktop (`grid-cols-1 lg:grid-cols-2 gap-16`)
- **Left:** Category title, subtitle, description (white text on dark overlay)
- **Right:** Service card grid (`grid-cols-2 lg:grid-cols-3 gap-4`)

**Background:** Full-bleed image with `big-image-overlay` gradient. Background image changes on service card hover using Framer Motion AnimatePresence.

**Service Cards:**
```tsx
<div className="aspect-[4/3] overflow-hidden">
  <motion.img /> /* scale 1.1 on hover, 0.7s ease */
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
</div>
<div className="absolute bottom-0 left-0 right-0 p-4">
  <h3 className="font-clinical font-light text-[#FBFBFE] text-sm lg:text-base text-center" />
</div>
/* Green overlay on hover: rgba(105, 175, 35, 0.2) */
```

**Card animations:**
- Initial: `opacity: 0, y: 20`
- Staggered entrance: `delay: serviceIndex * 0.1`
- Hover: `scale: 1.05` (0.3s)
- Easing: `[0.4, 0.0, 0.2, 1]` (Material Design standard)

**Navigation Dots:** Right-side vertical dots (`right-8 top-1/2`), linked to each category section.

### 3. Call to Action Section
```tsx
<section className="py-16 bg-mgs-clinical-gray">
  /* centered, max-w-4xl */
  <h2>Ready to Transform Your Facility?</h2>
  <p>Experience the MGS difference...</p>
</section>
```

### 4. Floating Action Buttons
(Always visible - see Section 17)

---

## 10. SERVICE CATEGORY DATA

Complete data structure used in HomePage:

```typescript
const serviceCategories = [
  {
    id: "commercial",
    title: "Commercial Cleaning",
    subtitle: "PROFESSIONAL ENVIRONMENTS FOR YOUR BUSINESS",
    description: "Elevate your business environment with comprehensive commercial cleaning solutions...",
    heroImage: "photo-1497366216548-37526070297c",
    services: [
      { name: "Multi-Tenant Offices",  link: "/services/multi-tenant-offices" },
      { name: "Retail Spaces",         link: "/services/retail" },
      { name: "Restaurants",           link: "/services/restaurants" },
      { name: "Gymnasiums",            link: "/services/gymnasiums" },
      { name: "Car Dealerships",       link: "/services/car-dealerships" }
    ]
  },
  {
    id: "medical",
    title: "Medical Facilities",
    subtitle: "PRECISION CLEANING FOR HEALTHCARE",
    description: "Specialized cleaning protocols that meet the highest healthcare standards...",
    heroImage: "photo-1559757148-5c350d0d3c56",
    services: [
      { name: "Surgical Centers",      link: "/services/surgical-centers" },
      { name: "Laboratories",          link: "/services/laboratories" },
      { name: "Imaging Centers",       link: "/services/imaging-centers" },
      { name: "Sports Rehabilitation", link: "/services/sports-rehab" },
      { name: "Private Practices",     link: "/services/clinic-private-practice" }
    ]
  },
  {
    id: "industrial",
    title: "Industrial Cleaning",
    subtitle: "HEAVY-DUTY SOLUTIONS",
    description: "Robust industrial cleaning services designed for manufacturing...",
    heroImage: "photo-1565793298595-6a879b1d9492",
    services: [
      { name: "Factory Plants",        link: "/services/factory-plants" },
      { name: "Petrochemical Plants",  link: "/services/petrochemical-plants" },
      { name: "Warehouses",            link: "/services/warehouses" },
      { name: "Hydroelectric Plants",  link: "/services/hydroelectric-plants" }
    ]
  },
  {
    id: "specialized",
    title: "Specialized Services",
    subtitle: "ADVANCED CLEANING SOLUTIONS",
    description: "Specialized cleaning services for unique requirements...",
    heroImage: "photo-1541888946425-d81bb19240f5",
    services: [
      { name: "Post-Construction",     link: "/services/post-construction" },
      { name: "Industrial Cleanup",    link: "/services/industrial-cleanup" },
      { name: "Window Cleaning",       link: "/services/windows" },
      { name: "Terminal Sanitization",  link: "/services/terminal-sanitization" },
      { name: "Concrete Floors",       link: "/services/concrete-floors" }
    ]
  }
];
```

---

## 11. REUSABLE SECTION COMPONENTS

### CTASection
- Background: `bg-mgs-primary` (green)
- Padding: `py-20`
- Two buttons: "Schedule Free Assessment" (white bg) + "Request Detailed Quote" (white border)
- Button style: `px-8 py-4 font-clinical font-light text-lg`
- Uses Font Awesome icons (`fas fa-calendar-check`, `fas fa-file-invoice`)

### FeaturesSection
- Full-width background image with `bg-black bg-opacity-70` overlay
- 2-column grid: left = "Why Industry Leaders Choose MGS" with 3 feature items; right = white card with metrics
- Feature items: icon box (colored bg) + title + description
- Metrics: 99.8% Service Reliability | 500+ Facilities Managed | 30 Years Experience | 24/7 Emergency Response
- Includes testimonial quote at bottom of card
- Card style: `bg-white p-8 border-l-4 border-mgs-primary`

### ServicesOverview
- Background: `bg-mgs-clinical-gray`
- 3-column grid: Commercial | Medical | Industrial
- Each card: `bg-white p-8 border-l-4 border-[color]`
- Icon container: `w-16 h-16 bg-[color] bg-opacity-10`
- Uses Font Awesome icons
- Checklist items with colored checkmarks

---

## 12. FOOTER

```tsx
<footer className="bg-gray-900 text-white py-16">
```

**4-column grid** (`grid-cols-1 lg:grid-cols-4 gap-8`):

1. **Brand**: MGS logo box (12x12, green bg) + company name + tagline + description
2. **Services**: Links to main service pages
3. **Company**: About Us, Careers, Certifications, Contact
4. **Contact**:
   - Phone: (281)-829-5358
   - Email: support@mgssupplyandservices.com
   - Address: 5602 10th St. Katy, TX 77493

**Bottom bar**: `border-t border-gray-800 pt-8 mt-8`
- Copyright: "2024 MGS Supply & Services. All rights reserved."
- Links: Privacy Policy | Terms of Service
- Text: `font-clinical font-ultra-light text-gray-400`

---

## 13. ABOUT PAGE

### Sections (in order):

1. **Hero**: `bg-mgs-primary`, centered text
   - H1: "About MGS Supply & Services" (secondary-colored span)
   - Subtitle text

2. **Company Story**: White bg, 2-col grid
   - Left: "Our Story" heading + 3 paragraphs (Manrope medium heading)
   - Right: Background image (unsplash office photo, h-96)

3. **Mission & Values**: `bg-mgs-clinical-gray`, 3-col grid
   - Mission (primary border) | Values (accent border) | Vision (secondary border)
   - Each: `bg-white p-8 border-l-4`

4. **Leadership Team**: White bg, 3-col grid
   - Circular photos: `w-48 h-48 mx-auto`
   - Michael Rodriguez (CEO), Sarah Chen (COO), James Patterson (QA Director)

5. **Certifications**: `bg-mgs-clinical-gray`, 4-col grid
   - OSHA Certified | EPA Compliant | ISSA Member | Bonded & Insured
   - Font Awesome icons, `bg-white p-6 text-center`

---

## 14. SERVICE PAGES (TEMPLATE)

Example from `BanksPage.tsx` - all service pages follow this pattern:

1. **Hero**: Full-screen, bg image + dark overlay (60% opacity)
   - H1: `font-gothic font-ultra-light text-6xl lg:text-7xl`
   - Colored span for subtitle
   - CTA buttons (quote + walkthrough)

2. **Services Overview**: White bg, 3-col grid
   - Cards: `bg-mgs-clinical-gray p-8`
   - Icon boxes: `w-16 h-16 bg-[color] bg-opacity-10`
   - Checklist items

3. **Features with Image**: Full-width bg + `bg-mgs-primary bg-opacity-90` overlay
   - 2-col grid: Left = text features, Right = white card with requirements

4. **CTA Section**: `bg-mgs-clinical-gray`, centered text + buttons

---

## 15. QUOTE PAGE & MODAL

### QuotePage (`QuotePage.tsx`)
- Top padding: `paddingTop: '120px'` (for fixed header)

**Sections:**

1. **Hero**: `bg-gradient-to-br from-gray-50 to-white py-12 md:py-20`
   - "Request Your Custom Cleaning Quote" (green-colored span)

2. **Form Section**: 3-col grid (1 sidebar + 2 form)
   - **Left sidebar** (`lg:col-span-1`): `bg-[#69AF23]` green card
     - Contact info: Phone, Email, Service Areas
     - "Why Choose MGS?" checklist (4 items with CheckCircle icons)
   - **Form** (`lg:col-span-2`): 4 grouped sections in `bg-gray-50 p-4 md:p-6`
     - Contact Details (first/last name, email, phone)
     - Facility Information (company, type select, sq footage, frequency)
     - Services Needed (12 checkbox options)
     - Additional Details (textarea)
   - Submit: `bg-[#9FD01B] hover:bg-[#69AF23] rounded-md uppercase tracking-wider`
   - Secondary: `border-2 border-[#9FD01B]` - "Schedule Walkthrough"

3. **Process Steps**: `bg-gray-50`, 4-col grid
   - Steps: Submit Request -> Initial Contact -> Site Assessment -> Detailed Proposal
   - Circle icons: `w-16 h-16 bg-[#9FD01B] rounded-full`

### Quote Form Fields
```typescript
{
  firstName: string,    // required
  lastName: string,     // required
  email: string,        // required
  phone: string,        // required
  company: string,      // required
  facilityType: string, // required, select
  squareFootage: string,// optional, select
  services: string[],   // checkbox array
  frequency: string,    // optional, select
  details: string       // textarea
}
```

**Service options:** General Office Cleaning, Restroom Maintenance, Floor Care & Maintenance, Window Cleaning, Carpet Cleaning, Medical Facility Cleaning, Kitchen/Break Room Cleaning, Trash & Recycling, Disinfection Services, Post-Construction Cleanup, Emergency Cleanup, Specialized Equipment Cleaning

### QuoteModal (`QuoteModal.tsx`)
- Uses Shadcn Dialog component
- `max-w-2xl max-h-screen overflow-y-auto`
- Same field structure but uses react-hook-form + zod validation
- Submit button: `bg-mgs-primary`

---

## 16. WALKTHROUGH MODAL

### Fields
```typescript
{
  firstName: string,     // required
  lastName: string,      // required
  email: string,         // required
  phone: string,         // required
  address: string,       // required
  date: string,          // required, date input (min: tomorrow, weekdays only)
  time: string,          // required, select (8AM-4PM hourly)
  facilityType: string,  // optional, select
  notes: string          // optional, textarea
}
```

- Submit button: `bg-mgs-accent` (blue, not green)
- Time slots: 8:00 AM through 4:00 PM (hourly, no 12:00 PM)
- Facility types: Commercial Office, Medical Facility, Industrial Plant, Retail Space, Educational Institution, Other

---

## 17. FLOATING ACTION BUTTONS

```tsx
<div className="fixed bottom-4 right-6 z-[9999] flex flex-col space-y-2">
```

Two buttons stacked vertically:

1. **Request Quote**: `bg-[#69AF23] hover:bg-[#9FD01B] text-white shadow-lg hover:scale-105`
2. **Schedule Walkthrough**: `border-2 border-[#69AF23] bg-white text-[#69AF23] hover:bg-[#69AF23] hover:text-white shadow-lg hover:scale-105`

Both: `px-2 py-2 lg:px-3 lg:py-2`, text: `font-clinical font-light text-xs md:text-sm lg:text-base tracking-wide uppercase whitespace-nowrap`

---

## 18. ANIMATION SYSTEM

### Libraries Used
- **Framer Motion**: Primary animation library for component-level animations
- **CSS Transitions**: For simple hover effects and reveals
- **IntersectionObserver**: For scroll-triggered `.section-reveal` animations
- **GSAP**: Referenced in HomePage useEffect for hero overlay breathing animation (optional, checks `window.gsap`)

### Framer Motion Patterns

**Mega Menu entrance:**
```tsx
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

**Service card entrance (staggered):**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: activeCategory ? 1 : 0.8, y: activeCategory ? 0 : 8 }}
transition={{ duration: 0.5, delay: serviceIndex * 0.1, ease: [0.4, 0.0, 0.2, 1] }}
```

**Image hover zoom:**
```tsx
whileHover={{ scale: 1.1 }}
transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
```

**Background image swap (AnimatePresence):**
```tsx
initial={{ opacity: 0, scale: 1.05 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
```

**Video cross-fade:**
```css
transition-opacity duration-1000 ease-in-out
```

### Section Reveal System
Applied via `Layout.tsx` IntersectionObserver:
```css
.section-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
.section-reveal.visible { opacity: 1; transform: translateY(0); }
```

---

## 19. DATABASE SCHEMA

### Tables (Drizzle ORM / PostgreSQL)

**quotes:**
| Column | Type | Required |
|--------|------|----------|
| id | serial PK | auto |
| first_name | text | yes |
| last_name | text | yes |
| email | text | yes |
| phone | text | no |
| company | text | yes |
| facility_type | text | yes |
| square_footage | text | no |
| frequency | text | no |
| services | text (JSON) | no |
| details | text | no |
| created_at | timestamp | auto |

**walkthroughs:**
| Column | Type | Required |
|--------|------|----------|
| id | serial PK | auto |
| first_name | text | yes |
| last_name | text | yes |
| email | text | yes |
| phone | text | yes |
| address | text | yes |
| date | text | yes |
| time | text | yes |
| facility_type | text | no |
| notes | text | no |
| created_at | timestamp | auto |

**applications:**
| Column | Type | Required |
|--------|------|----------|
| id | serial PK | auto |
| first_name | text | yes |
| last_name | text | yes |
| email | text | yes |
| phone | text | yes |
| address | text | yes |
| city | text | yes |
| state | text | yes |
| zip_code | text | yes |
| position | text | yes |
| experience | text | no |
| availability | text (JSON) | no |
| transportation | text | yes |
| background | text | yes |
| references | text | no |
| additional_info | text | no |
| created_at | timestamp | auto |

**users:**
| Column | Type | Required |
|--------|------|----------|
| id | serial PK | auto |
| username | text (unique) | yes |
| password | text | yes |

---

## 20. IMAGE ASSETS & URLS

### Local Assets (in `client/src/assets/`)
- `MGS LOGOOOOOOO_1750105578653.png` - Company logo
- `HERO FOR MGS_1750791151007.png` - Hero overlay image (40% opacity)
- `MGS HERO VID 1 (1)_1750788728860.mp4` through `MGS HERO VID 5_1750788728859.mp4` - Hero videos

### Unsplash Images Used
All images use format: `https://images.unsplash.com/{id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080`

| Photo ID | Usage |
|----------|-------|
| photo-1497366216548-37526070297c | Commercial hero, offices |
| photo-1441986300917-64674bd600d8 | Retail Spaces |
| photo-1414235077428-338989a2e8c0 | Restaurants |
| photo-1571019613454-1cb2f99b2d8b | Gymnasiums, Sports Rehab |
| photo-1562694583-0671889972d9 | Car Dealerships |
| photo-1559757148-5c350d0d3c56 | Medical hero, Surgery Centers |
| photo-1582719471384-894fbb16e074 | Laboratories |
| photo-1551190822-a9333d879b1f | Imaging Centers |
| photo-1666214280557-f1b5022eb634 | Private Practices |
| photo-1565793298595-6a879b1d9492 | Industrial hero, Factory Plants |
| photo-1518709268805-4e9042af2176 | Petrochemical Plants |
| photo-1566041510394-cf7c8fe21800 | Warehouses |
| photo-1473341304170-971dccb5ac1e | Hydroelectric Plants |
| photo-1541888946425-d81bb19240f5 | Specialized hero, Post-Construction |
| photo-1581578731548-c64695cc6952 | Industrial Cleanup (also initial hero bg) |
| photo-1462826303086-329426d1aef5 | Window Cleaning |
| photo-1584982751601-97dcc096659c | Terminal Sanitization |
| photo-1558618666-fcd25c85cd64 | Concrete Floors |
| photo-1582719478250-c89cae4dc85b | Features section background |
| photo-1541354329998-f4d9a9f9297f | Banks hero |
| photo-1560518883-ce09059eeffa | Banks features section |
| photo-1560250097-0b93528c311a | Leadership - Michael Rodriguez |
| photo-1573496359142-b8d87734a5a2 | Leadership - Sarah Chen |
| photo-1472099645785-5658abf4ff4e | Leadership - James Patterson |

---

## 21. ROUTING MAP

```
/                              -> HomePage
/about                         -> AboutPage
/login                         -> LoginPage
/quote                         -> QuotePage
/walkthrough                   -> WalkthroughPage
/careers                       -> EmployeeApplicationPage

/services/multi-tenant-offices -> MultiTenantOfficesPage
/services/retail               -> RetailFacilitiesPage
/services/restaurants          -> RestaurantsPage
/services/gymnasiums           -> GymnasiumsPage
/services/car-dealerships      -> CarDealershipsPage
/services/school-university    -> SchoolUniversityPage
/services/banks                -> BanksPage
/services/churches             -> ChurchesPage
/services/surgical-centers     -> SurgeryCentersPage
/services/factory-plants       -> FactoryPlantsPage

/* 404 fallback */
*                              -> NotFound
```

### API Endpoints
- `POST /api/quotes` - Submit quote request
- `POST /api/walkthroughs` - Schedule walkthrough
- (Applications endpoint likely exists but not shown in frontend)

---

## 22. SEARCH SYSTEM

### SearchBar Component
- Desktop: Always visible, `w-[clamp(28rem,35vw,35rem)]`
- Mobile: Toggle button (Search icon) that expands to full input
- Debounced search (300ms)
- Client-side search against static data array
- Results dropdown: `bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto`

### Search Data
12 static entries with categories:
- Commercial (3), Medical (1), Industrial (1), Services (3), Company (1), Careers (1)

### Category Color Badges
```
Commercial: bg-blue-100 text-blue-800
Medical:    bg-green-100 text-green-800
Industrial: bg-orange-100 text-orange-800
Services:   bg-purple-100 text-purple-800
Company:    bg-gray-100 text-gray-800
Careers:    bg-teal-100 text-teal-800
```

---

## 23. SUPABASE VIDEO CONFIG

```typescript
const SUPABASE_PROJECT_REF = 'uuvspvqebodievfkwwss';

// URL pattern:
`https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/hero-videos/${fileName}`

// Bucket: "hero-videos"
// Files: mgs-hero-vid-1.mp4 through mgs-hero-vid-5.mp4
```

---

## CRITICAL IMPLEMENTATION NOTES

1. **No border-radius on most elements** - The design is deliberately sharp/angular. Cards, buttons, and containers generally have NO rounded corners except: search inputs (`rounded-lg`), mobile nav CTAs (`rounded-lg`), quote submit (`rounded-md`), nav dots (`rounded-full`).

2. **The `full-screen-section` class** is essential for the hero and category sections to break out of any container constraints: `width: 100vw; margin-left: calc(-50vw + 50%);`

3. **The header is NOT position:fixed in the Layout** - DesktopHeader uses `hidden lg:block bg-white shadow-md` (static). The DesktopNav green bar IS `fixed top-0 left-0 right-0 z-[1000]`. This means the nav bar pins on scroll but the top bar/logo scrolls away.

4. **Image preloading** - HomePage preloads all category images on mount using `new Image()` with onload tracking.

5. **Font Awesome** is used for some icons (fas fa-certificate, etc.) alongside Lucide React. Both icon systems coexist.

6. **The `clamp()` CSS function** is used extensively in newer components (DesktopHeader, DesktopNav, MegaMenu) for fluid responsive sizing without breakpoints.

7. **Form state management** differs: QuotePage uses local `useState`, while QuoteModal and WalkthroughModal use `react-hook-form` with Zod validation schemas from `@shared/schema`.

8. **The green nav bar** (`bg-[#69AF23]`) is the most distinctive visual element. It serves as the primary brand color anchor.

9. **Business contact info:**
   - Phone: (281)-829-5358
   - Email: support@mgssupplyandservices.com
   - Address: 5602 10th St. Katy, TX 77493
   - Hours: Mon-Fri 9AM-5PM
   - Est. 2006
