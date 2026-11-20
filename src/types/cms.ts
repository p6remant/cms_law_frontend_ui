export type PublishStatus = 'draft' | 'published' | 'archived';

export type DestinationType = 'page' | 'external' | 'email' | 'tel';

export interface SEOSettings {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface SectionSettings {
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  layout?: 'default' | 'split' | 'centered' | 'grid' | 'cards' | 'timeline';
  spacing?: {
    top?: number;
    bottom?: number;
  };
  containerWidth?: 'normal' | 'narrow' | 'wide' | 'full';
}

export type SectionType =
  | 'hero'
  | 'slider'
  | 'carousel'
  | 'richText'
  | 'introduction'
  | 'practiceAreas'
  | 'partners'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'contact'
  | 'latestArticles'
  | 'gallery'
  | 'statistics'
  | 't2-hero'
  | 't2-highlights'
  | 't2-ticker'
  | 't2-statistics'
  | 't2-overview'
  | 't2-practice-areas'
  | 't2-foreword'
  | 't2-partners'
  | 't2-faq'
  | 't2-judgments'
  | 't2-contact';

export interface SliderSectionContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  sliderId?: string;
  autoplay?: boolean;
  interval?: number; // in milliseconds, e.g. 5000
  showArrows?: boolean;
  showDots?: boolean;
  slides?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    desktopImage: string;
    mobileImage?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    overlayOpacity?: number;
  }>;
}

// Specific Content Schemas for Discriminated Unions
export interface HeroSectionContent {
  headline: string;
  subheadline?: string;
  description?: string;
  badgeText?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  imageUrl?: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface RichTextSectionContent {
  title?: string;
  subtitle?: string;
  htmlContent: string;
}

export interface IntroductionSectionContent {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  imageUrl?: string;
  imageCaption?: string;
  highlights?: string[];
  signatureName?: string;
  signatureRole?: string;
}

export interface PracticeAreasSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    title: string;
    slug: string;
    icon?: string;
    shortDescription: string;
    longDescription?: string;
    keyContacts?: string[];
  }>;
}

export interface PartnersSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  partnerIds?: string[]; // References to central partner items or inline items
  items?: Array<{
    id: string;
    name: string;
    role: string;
    slug: string;
    imageUrl: string;
    bio: string;
    email: string;
    phone: string;
    admissions: string[];
    education: string[];
  }>;
}

export interface TestimonialsSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    quote: string;
    clientName: string;
    clientTitle?: string;
    companyOrCase?: string;
    rating?: number;
  }>;
}

export interface FAQSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    question: string;
    answer: string;
    category?: string;
  }>;
}

export interface CTASectionContent {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  confidentialityNote?: string;
}

export interface ContactSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  formId?: string; // Reference to central Form
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: string;
  mapEmbedUrl?: string;
}

export interface LatestArticlesSectionContent {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
  categoryFilter?: string;
  viewAllUrl?: string;
}

export interface GallerySectionContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

export interface StatisticsSectionContent {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: Array<{
    value: string;
    label: string;
    sublabel?: string;
  }>;
}

export interface PageSection {
  id: string;
  type: SectionType;
  name: string;
  order: number;
  isVisible: boolean;
  isReusable: boolean;
  content: Record<string, any>;
  settings: SectionSettings;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  template: string;
  status: PublishStatus;
  isVisible: boolean;
  featuredImage?: string;
  sections: PageSection[];
  seo?: SEOSettings;
  updatedAt: string;
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  type: 'page' | 'external' | 'custom';
  url: string;
  order: number;
  isVisible: boolean;
  isButton: boolean;
  target?: '_self' | '_blank';
  children?: NavigationItem[];
}

export interface NavigationMenu {
  id: string;
  name: string;
  location: 'header' | 'footer' | 'secondary';
  isVisible: boolean;
  items: NavigationItem[];
}

export interface ButtonConfig {
  id: string;
  name: string;
  label: string;
  destinationType: DestinationType;
  destinationValue: string;
  variant: 'primary' | 'secondary' | 'outline' | 'text';
  size: 'sm' | 'md' | 'lg';
  target: '_self' | '_blank';
  isVisible: boolean;
}

export interface SlideItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  desktopImage: string;
  mobileImage?: string;
  overlayOpacity?: number;
  ctaLabel?: string;
  ctaUrl?: string;
  order: number;
  isVisible: boolean;
}

export interface SliderConfig {
  id: string;
  name: string;
  type: 'hero' | 'partner' | 'testimonial' | 'blog' | 'gallery';
  slides: SlideItem[];
  autoplay: boolean;
  interval: number; // in milliseconds
  showArrows: boolean;
  showDots: boolean;
  loop: boolean;
  isVisible: boolean;
}

export interface MediaAsset {
  id: string;
  name: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  sizeBytes: number;
  dimensions?: { width: number; height: number };
  altText: string;
  description?: string;
  createdAt: string;
  usedInCount?: number;
  usages?: Array<{ type: 'page' | 'blog' | 'section'; name: string }>;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'hidden';
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[]; // for select, radio
  validationMessage?: string;
  order: number;
}

export interface FormDefinition {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  privacyNotice: string;
  isVisible: boolean;
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  status: PublishStatus;
  isVisible: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seo?: SEOSettings;
}

export interface ContentRecord {
  id: string;
  name: string;
  type: 'text' | 'heading' | 'quote' | 'partner' | 'contact' | 'faq' | 'practice';
  category: string;
  data: Record<string, any>;
  updatedAt: string;
}

export type TemplateId = 'default1' | 'default2';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  code: string;
  tagline: string;
  description: string;
  style: string;
  previewUrl: string;
  themeColor: string;
  isPublished: boolean;
  version: string;
  lastModified?: string;
  author?: string;
}

export interface WebsiteSettings {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  defaultLanguage: string;
  timezone: string;
  isEnabled: boolean; // whole site master switch
  activeTemplate: TemplateId; // Single active published template mutex ('default1' | 'default2')
  templates?: Partial<Record<TemplateId, {
    name?: string;
    description?: string;
    lastUpdated?: string;
    isCustomized?: boolean;
    customSettings?: Record<string, any>;
  }>>;
  header: {
    isVisible: boolean;
    navigationId?: string;
    ctaButtonId?: string;
    sticky: boolean;
  };
  footer: {
    isVisible: boolean;
    navigationId?: string;
    description: string;
    copyrightText: string;
    address: string;
    phone: string;
    email: string;
    socialLinks: Array<{ platform: string; url: string }>;
  };
  features: {
    blog: boolean;
    forms: boolean;
    testimonials: boolean;
    sliders: boolean;
  };
  design: {
    primaryColor: string;
    accentColor: string;
    typography: 'classic-serif' | 'modern-sans' | 'editorial';
    containerWidth: 'normal' | 'wide' | 'narrow';
  };
}
