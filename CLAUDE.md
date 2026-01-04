# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LUA Wedding Agency landing page - a static, bilingual (Russian/English) wedding planning website built with vanilla HTML, CSS, and JavaScript. The site features a modern, elegant design with smooth animations and interactive components.

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Architecture**: Static site with no build process
- **Deployment**: GitHub Pages (automated via GitHub Actions)
- **Languages**: Russian (main) + English version

## Project Structure

```
.
├── index.html              # Russian version (main page)
├── en/
│   └── index.html         # English version
├── css/
│   ├── variables.css      # Design system tokens
│   └── style.css          # Main styles
├── js/
│   └── main.js           # All interactive functionality
├── assets/
│   ├── favicon.ico           # Site favicon (32x32)
│   ├── favicon-16x16.png     # Small favicon
│   ├── favicon-32x32.png     # Standard favicon
│   ├── apple-touch-icon.png  # iOS home screen icon (180x180)
│   └── logos/
│       ├── logo-white.png           # White logo with text
│       ├── logo-white-icon.png      # White logo icon only
│       ├── logo-light-blue.png      # Light blue logo with text
│       ├── logo-light-blue-icon.png # Light blue logo icon only
│       ├── logo-dark-blue.png       # Dark blue logo with text
│       └── logo-dark-blue-icon.png  # Dark blue logo icon only
└── .github/workflows/
    ├── deploy.yml        # GitHub Pages deployment
    └── static.yml        # Static content deployment
```

## Design System

### CSS Variables (`css/variables.css`)

The design system uses CSS custom properties organized by category:

- **Colors**: Neutral palette with cream/warm tones (`--color-background-cream`, `--color-accent`)
- **Typography**: Serif headings (`Cormorant Garamond`) + sans-serif body (`Inter`)
- **Spacing**: Consistent scale from `--space-1` (4px) to `--space-40` (160px)
- **Responsive**: Mobile overrides at 768px breakpoint

### Key Design Tokens

- Container max-width: `1200px`
- Section spacing: `160px` (desktop) / `80px` (mobile)
- Primary font: `Inter` for body, `Cormorant Garamond` for headings
- Color scheme: Dark text on cream/white backgrounds

## Site Architecture

### Zero-Block Pattern

The site uses a "zero-block" architecture where each major section is a standalone block:

1. **Hero** - Full-screen intro with CTA
2. **About** - Company introduction with key points
3. **Gallery (1)** - Portfolio showcase (8 images)
4. **Principles** - 6 core values
5. **Workflow** - 8-step process timeline
6. **Services** - 6 service cards with modals
7. **Formats** - 6 wedding format types
8. **Gallery (2)** - Additional portfolio (6 images)
9. **Reviews** - 3 client testimonials
10. **FAQ** - Accordion component
11. **Contact** - Form + contact details
12. **Final CTA** - Questionnaire prompt

### Interactive Components

All interactive features are in `js/main.js`:

- **Header**: Scrolling state with `header--scrolled` class
- **Mobile Menu**: Slide-in navigation with body scroll lock
- **Smooth Scroll**: Anchor link navigation with header offset
- **FAQ Accordion**: Single-item-open pattern
- **Modals**: Service detail overlays with backdrop
- **Lightbox**: Gallery image viewer
- **Scroll Animations**: Intersection Observer for `.fade-in` elements
- **Contact Form**: Client-side validation (no backend integration yet)

## Development Workflow

### Local Development

Simply open `index.html` in a browser - no build step required:

```bash
open index.html
# or start a local server:
python3 -m http.server 8000
# or use any static server
npx serve .
```

### Testing Changes

1. **Desktop**: Test at 1200px+ viewport
2. **Mobile**: Test at 360-390px (primary mobile target)
3. **Tablet**: Test at 768px breakpoint
4. **Cross-browser**: Ensure IntersectionObserver fallback works

### Bilingual Content

The site has two versions with identical structure:

- `/index.html` - Russian (primary)
- `/en/index.html` - English

When editing content, update BOTH versions to maintain parity. Language switcher uses these paths.

## Deployment

The site auto-deploys to GitHub Pages via two workflows:

- **deploy.yml** - Triggers on push to `claude/lua-wedding-landing-3weLk` or `main` branches
- **static.yml** - Additional static deployment workflow

No build step is required. Deployment uploads the entire directory as-is.

### GitHub Pages Configuration

- Deploys from repository root
- Serves static files directly
- URL structure: `/{path}` for Russian, `/en/{path}` for English

## Key Implementation Details

### Header Scroll Effect

Uses `requestAnimationFrame` throttling for smooth performance:
- Adds `header--scrolled` class at 50px scroll
- Changes background and potentially shadow/opacity

### Form Handling

Current implementation (js/main.js:289-335):
- Client-side validation only
- Simulated submission (1.5s delay)
- No backend integration yet
- To integrate: Replace setTimeout in `initContactForm()` with actual API call

### Animation Pattern

Scroll-triggered animations use Intersection Observer:
1. Add `fade-in` class to elements
2. Observer adds `visible` class when in viewport
3. CSS transitions handle the animation
4. Observer unobserves after triggering (one-time animation)

Fallback for older browsers: All elements immediately get `visible` class

### Modal System

Data-attribute based:
- Trigger: `data-modal="service-full"` on buttons
- Target: `id="modal-service-full"` on modal elements
- Close: `data-close-modal` on close buttons/backdrop

### Mobile Menu

- Adds `no-scroll` class to body when open
- Closes on: link click, escape key, close button
- Full-screen overlay approach

## Content Placeholders

Several areas use placeholder content that should be replaced with real assets:

1. **Gallery images** - Currently solid color divs (index.html:171-194, 503-521)
2. **Hero background** - Gradient placeholder (index.html:80)
3. **About image** - Cream background div (index.html:112)
4. **Format cards** - Background color placeholders (index.html:435-486)

To add real images: Replace the inline style divs with `<img>` tags and update gallery lightbox logic.

## Common Tasks

### Adding a new service

1. Add service card in Services section (both index.html and en/index.html)
2. Create corresponding modal with `id="modal-service-{name}"`
3. Link via `data-modal="{name}"` attribute

### Updating contact information

Contact details appear in three places:
1. Contact section (index.html:693-719)
2. Footer (index.html:822-828)
3. Both Russian and English versions

### Modifying the design system

Edit `css/variables.css` to change colors, spacing, typography. All components reference these variables, so changes propagate automatically.

### Adding new FAQ items

Add `.faq-item` structure in FAQ section. The accordion JavaScript automatically binds to all `.faq-item` elements.

## Browser Support

- Modern browsers (ES6+ required)
- Graceful degradation for Intersection Observer
- Smooth scroll fallback in older browsers

## Performance Considerations

- Throttled scroll events via `requestAnimationFrame`
- Intersection Observer for efficient scroll animations
- No external dependencies or frameworks
- Minimal CSS/JS footprint

## Notes

- No package manager or dependencies
- No transpilation needed
- Images are currently placeholders (design stage)
- Contact form needs backend integration for production
- Social media links in footer are placeholder (`href="#"`)
- делай коммит по завершении задачи, что бы мой сайт обновился и я увидел результат