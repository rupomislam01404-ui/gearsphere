# GearSphere Brand Style Guide

## 🎨 Color Palette

### Primary Colors
- **Primary Purple**: `#6366f1` - Main brand color, used for CTAs and accents
- **Primary Dark**: `#4f46e5` - Hover states and darker variations
- **Primary Light**: `#818cf8` - Lighter accents and backgrounds

### Secondary Colors
- **Secondary Pink**: `#ec4899` - Accent color for badges and highlights
- **Secondary Dark**: `#db2777` - Darker pink variations

### Neutral Colors
- **Dark**: `#0f172a` - Primary text, headings
- **Dark Light**: `#1e293b` - Secondary dark elements
- **Gray**: `#64748b` - Body text, secondary information
- **Gray Light**: `#cbd5e1` - Borders, dividers
- **Light**: `#f1f5f9` - Background sections
- **White**: `#ffffff` - Main background

### Accent Colors
- **Success Green**: `#10b981` - Success messages, trust indicators
- **Warning Orange**: `#f59e0b` - Alerts, special offers
- **Danger Red**: `#ef4444` - Error messages, urgent actions

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #6366f1 0%, #ec4899 100%)`
- **Dark Gradient**: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`

---

## 📝 Typography

### Font Family
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extra Bold: 800

### Typography Scale
- **Hero Heading (H1)**: 3.5rem (56px) / 800 weight
- **Page Heading (H1)**: 3rem (48px) / 800 weight
- **Section Heading (H2)**: 2.5rem (40px) / 800 weight
- **Subsection (H3)**: 1.5rem (24px) / 700 weight
- **Card Title (H4)**: 1.25rem (20px) / 700 weight
- **Body Large**: 1.25rem (20px) / 400 weight
- **Body Regular**: 1rem (16px) / 400 weight
- **Body Small**: 0.875rem (14px) / 400 weight

### Line Heights
- Headings: 1.1 - 1.2
- Body text: 1.6 - 1.8

---

## 🎯 Logo Usage

### Logo Variations
- **Primary Logo**: Purple mobile icon + "GearSphere" text
- **Icon Only**: For favicons and small spaces
- **Monochrome**: White on dark backgrounds

### Logo Spacing
- Minimum clear space: Equal to height of mobile icon
- Minimum size: 120px width for full logo, 40px for icon only

### Logo Don'ts
- Never stretch or distort the logo
- Never use unapproved colors
- Never place on busy backgrounds without proper contrast

---

## 🔘 Buttons & CTAs

### Primary Button
- Background: Primary gradient
- Text: White, 600 weight
- Padding: 0.875rem 1.75rem
- Border Radius: 0.5rem
- Hover: Transform up 2px + shadow

### Secondary Button
- Background: Transparent
- Border: 2px solid gray-light
- Text: Dark
- Hover: Border color changes to primary

### Add to Cart Button
- Background: Dark (#0f172a)
- Text: White
- Hover: Background changes to primary

### Button Sizes
- Regular: 0.875rem padding, 1rem font
- Large: 1.25rem padding, 1.125rem font

---

## 📦 Card Components

### Product Cards
- Background: White
- Border Radius: 1rem (16px)
- Shadow: Medium shadow on default, large on hover
- Hover Effect: Transform up 5px
- Image Aspect Ratio: 1:1 (square)

### Feature Cards
- Background: White
- Padding: 2rem
- Icon: Circular, gradient background
- Text alignment: Center

### Testimonial Cards
- Background: Light (#f1f5f9)
- Padding: 2rem
- Stars: Yellow (#fbbf24)
- Author image: 50px circle

---

## 🖼️ Imagery Guidelines

### Product Photography
- High resolution (minimum 800px width)
- Clean white or light gray backgrounds
- Multiple angles for product pages
- Consistent lighting and shadows
- Show product in use when possible

### Hero Images
- Minimum 1200px width
- Professional, lifestyle-focused
- Showcase product benefits
- High contrast for text overlay

### Image Optimization
- WebP format preferred
- JPG fallback
- Lazy loading enabled
- Alt text for all images

---

## 💬 Voice & Tone

### Brand Voice
- **Friendly**: Approachable and conversational
- **Confident**: Assured about quality and service
- **Helpful**: Always focused on customer needs
- **Modern**: Tech-savvy and current

### Tone Guidelines
- Use active voice
- Keep sentences clear and concise
- Avoid jargon unless necessary
- Be enthusiastic but not pushy
- Show personality without being unprofessional

### Writing Examples

**Good**: "Protect your tech, elevate your style"
**Avoid**: "We sell phone accessories"

**Good**: "Premium quality you can trust"
**Avoid**: "Our products are good"

**Good**: "Join 50,000+ happy customers"
**Avoid**: "Many people buy from us"

---

## 🎪 Spacing System

### Base Unit: 0.25rem (4px)

- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 2rem (32px)
- **lg**: 4rem (64px)
- **xl**: 6rem (96px)

### Section Padding
- Desktop: 5rem (80px) top/bottom
- Mobile: 3rem (48px) top/bottom

### Container
- Max-width: 1200px
- Side padding: 1.5rem (24px)

---

## 🎨 Border Radius

- **Small**: 0.375rem (6px) - Inputs, small buttons
- **Medium**: 0.5rem (8px) - Buttons, small cards
- **Large**: 1rem (16px) - Cards, sections
- **Extra Large**: 1.5rem (24px) - Hero images, featured cards
- **Circle**: 50% - Icons, avatars

---

## 🌊 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Usage
- Cards: Medium shadow
- Cards on hover: Large shadow
- Buttons: Medium shadow
- Modals: Extra large shadow

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
Mobile: Default (< 768px)
Tablet: 768px
Desktop: 1024px
Large Desktop: 1200px
```

### Grid Layouts
- **Desktop**: 4 columns for products, 3 for features
- **Tablet**: 2-3 columns
- **Mobile**: 1-2 columns

---

## ✨ Animations & Transitions

### Default Transition
```css
transition: all 0.3s ease;
```

### Hover Effects
- Buttons: Transform up 2px
- Cards: Transform up 5px
- Links: Color change
- Icons: Scale 1.1

### Loading States
- Skeleton screens in light gray
- Smooth fade-in animations
- Progress indicators in primary color

---

## 🔍 SEO Best Practices

### Meta Descriptions
- 150-160 characters
- Include main keyword
- Action-oriented
- Unique for each page

### Headings Hierarchy
- One H1 per page
- Logical H2-H6 structure
- Include keywords naturally

### Image Alt Text
- Descriptive and specific
- Include product name
- Keep under 125 characters

---

## ♿ Accessibility

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Navigation
- Keyboard accessible
- Skip to main content link
- ARIA labels for icons

### Forms
- Clear labels
- Error messages visible
- Required fields marked

---

## 📊 Trust Elements

### Trust Badges
- Free Shipping icon
- Secure Payment icon
- 30-Day Returns icon
- 24/7 Support icon

### Social Proof
- Customer reviews with star ratings
- Number of customers served
- Testimonials with photos
- Press mentions (if available)

### Security Indicators
- SSL certificate
- Payment method logos
- Trust seals
- Money-back guarantee

---

## 🎯 Conversion Optimization

### Call-to-Action Placement
- Above the fold on homepage
- Clear product CTAs
- Multiple touchpoints
- Sticky add-to-cart on mobile

### Urgency & Scarcity
- Limited time offers
- Low stock warnings
- Countdown timers (use sparingly)

### Value Propositions
- Free shipping threshold
- Money-back guarantee
- Fast delivery promise
- Quality certification

---

## 📧 Email Marketing Style

### Subject Lines
- 40-50 characters
- Emoji use: 1 per subject line
- Action-oriented
- Personalized when possible

### Email Design
- Mobile-first
- Single column layout
- Clear CTAs
- Brand colors consistent
- Alt text for images

---

## 🌐 Social Media Guidelines

### Profile Setup
- Consistent username: @gearsphere
- Brand colors in profile
- Clear bio with value proposition
- Link to website

### Post Style
- High-quality product photos
- Lifestyle images
- Customer testimonials
- Behind-the-scenes content
- Educational content

### Hashtags
- #GearSphere
- #MobileAccessories
- #PhoneCase
- #TechGear
- #ProtectYourTech

---

## 🚀 Performance Standards

### Page Load Times
- Target: Under 3 seconds
- Images optimized
- Minified CSS/JS
- Lazy loading enabled

### Mobile Optimization
- Touch-friendly buttons (44px minimum)
- Readable text (16px minimum)
- Fast mobile performance
- No horizontal scrolling

---

This comprehensive style guide ensures brand consistency across all touchpoints and provides clear guidelines for future development and marketing materials.
