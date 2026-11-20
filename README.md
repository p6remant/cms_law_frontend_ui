# Vanguard & Sterling LLP — Law Firm CMS

A custom, section-based Content Management System (CMS) and public website frontend engineered for **Vanguard & Sterling LLP**, an elite corporate governance and appellate litigation law firm.

Built with **Next.js App Router (React 19)**, **TypeScript**, and **Tailwind CSS**.

---

## 🏛️ System Highlights

- **Section-Based Page Builder**: Build pages dynamically by composing, reordering, and configuring reusable legal components (Hero, Partners Carousel, Practice Directory, Statistics, FAQs, Accolades, CTAs, Rich Text, etc.).
- **Zero Inline Clutter (Focused Modals)**: Adding or editing collection items (partners, slides, FAQs, testimonials, metrics) opens lightweight modals with clean placeholders, keeping the inspector uncluttered.
- **Universal Image Upload System**: Drag-and-drop or file select from local disk (auto-saved as data URLs and registered to the Media Library), 1-click select from Media Library, or external URL fallback.
- **Intuitive Navigation Manager**: Drag-and-drop / single-click reordering, dropdown child nesting, live menu placement selection, automatic page-title syncing, and real-time Desktop / Mobile simulation.
- **1-Click Navigation Linking**: Automatically add new CMS pages to the main navigation menu during page creation.
- **Hierarchical Visibility Engine**: Clean suppression rules (Site $\rightarrow$ Page $\rightarrow$ Section $\rightarrow$ Child Link) where hiding content never deletes it.
- **SSR-Safe Client Persistence**: Full offline/local operation with `localStorage` reactive synchronization and pre-seeded demonstration data.

---

## 📁 Project Architecture

For a comprehensive guide on architecture, data flow, and how each feature works, see [IMPLEMENTATION.md](file:///c:/Users/RemantaPaudelKhatri/Desktop/Projects/cms/IMPLEMENTATION.md).

```
src/
├── app/
│   ├── (website)/                  # Public website routes (Home, The Firm, Practice, Partners, FAQ, Contact, Blog)
│   └── admin/                      # Administration CMS (/admin/pages, /admin/navigation, /admin/media, etc.)
├── components/
│   ├── admin/
│   │   ├── page-builder/           # Section list, 3-tab inspector, section library modal, collection modals
│   │   ├── navigation/             # Navigation link modals and placement controls
│   │   └── common/                 # ImageUploadField, AdminBadge, AdminSwitch, ConfirmModal
│   └── website/                    # Public layout (Header, Footer) & DynamicPageRenderer
├── lib/
│   ├── cmsStore.ts                 # React hook & persistence engine (useCMS)
│   └── initialData.ts              # Pre-seeded firm data (partners, pages, articles)
└── types/
    └── cms.ts                      # Strict TypeScript interfaces
```

---

## 🌐 Routes Overview

### Public Website
- `/`: Homepage (Hero, practice domains, firm statistics, partners carousel, client accolades, latest insights, CTA)
- `/the-firm`: Heritage, firm history, and core values
- `/practice`: Practice area directory
- `/practice/[slug]`: Specific practice area details
- `/partners`: Senior leadership and partner directory
- `/partners/[slug]`: Detailed partner biography, court admissions, and clerkships
- `/questions`: Retention criteria, conflict checks, and billing FAQs
- `/contact`: Manhattan headquarters registry, contact lines, and confidential inquiry intake form
- `/blog`: Legal insights and publications feed
- `/blog/[slug]`: Specific legal brief and analysis
- `/[slug]`: Catch-all router for dynamic administrator-created pages

### Admin CMS Dashboard (`/admin`)
- `/admin`: Executive overview, metrics, quick actions, and recent activity
- `/admin/pages`: Full page listing with templates, status, visibility, and quick duplicate/delete
- `/admin/pages/create`: Page creation wizard with pre-configured legal templates & 1-click navigation linking
- `/admin/pages/[id]`: Modular Page Builder & Section Inspector
- `/admin/sections`: Section Library with shared vs. page-specific view and deep-linking to host pages
- `/admin/navigation`: Multi-menu builder (Header, Footer) with nested dropdowns and desktop/mobile simulation
- `/admin/media`: Universal Media Library (drag-and-drop upload, dimensions, and usage tracking)
- `/admin/blog`: Legal insights and brief editor with rich HTML support
- `/admin/seo`: Global SEO defaults, Google search snippet preview, and audit health checks
- `/admin/settings`: Firm settings, contact info, and global website kill switch

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Check TypeScript types
npx tsc --noEmit

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

### URLs
- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **CMS Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📄 Documentation
- [IMPLEMENTATION.md](file:///c:/Users/RemantaPaudelKhatri/Desktop/Projects/cms/IMPLEMENTATION.md): Complete, simple guide to the CMS architecture, component design, and workflows.
