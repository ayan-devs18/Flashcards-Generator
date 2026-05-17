# Summit Peak Roofing Co. — Animated Website

A fully animated, modern, single-page marketing website for **Summit Peak Roofing Co.**, a residential & commercial roofing contractor based in Phoenix, AZ.

Tagline: *Protecting Homes One Roof at a Time.*

---

## Features

- Fully responsive (desktop / tablet / mobile)
- Sticky animated header with mobile hamburger nav
- Animated marquee announcement bar
- Hero section with parallax sun, mountains, city silhouettes and falling rain
- Scroll-reveal animations (IntersectionObserver) on every section
- Animated count-up stats
- Hover-animated service cards with shimmer CTAs
- Lead-magnet form with floating labels, validation, and inline success state
- Animated process timeline
- Touch-swipeable testimonial carousel with auto-play, dots, and arrows
- CTA banner with rotating radial glow
- Google Maps embed of business address
- Floating call-now button with pulsing ring
- Back-to-top button
- Magnetic CTA effect on desktop
- Respects `prefers-reduced-motion`
- No build tools, no dependencies — vanilla HTML / CSS / JS

## Business Information Built In

| Field | Value |
|---|---|
| Owner | Daniel Mercer |
| Business | Summit Peak Roofing Co. |
| Type | Residential & Commercial Roofing |
| Tagline | Protecting Homes One Roof at a Time |
| Phone | (602) 555-1847 |
| Email | info@summitpeakroofingco.com |
| Website | www.summitpeakroofingco.com |
| Address | 2841 E Camelback Rd, Phoenix, AZ 85016 |
| Timezone | America/Phoenix (MST) |
| Hours | Mon–Fri 7a–6p · Sat 8a–2p · Sun Closed |
| Offer | FREE 21-Point Roof Inspection + Same-Day Estimates |
| Facebook | facebook.com/SummitPeakRoofingCo |
| Instagram | @summitpeakroofing |

### Services Featured
- Roof Repair
- Roof Replacement
- Tile Roofing
- Shingle Roofing
- Emergency Leak Repair (24/7)
- Commercial Flat Roofing
- Roof Inspections

## File Structure

```
summit-peak-roofing/
├── index.html
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/                (reserved for any future photo assets)
```

## Running Locally

Because the site is pure static HTML/CSS/JS, you can open it directly:

```bash
open summit-peak-roofing/index.html
```

Or serve it with any local web server (recommended so the Google Maps iframe loads correctly):

```bash
# Python 3
cd summit-peak-roofing && python3 -m http.server 8080
# Then visit http://localhost:8080
```

```bash
# Node (any of these work)
npx serve summit-peak-roofing
npx http-server summit-peak-roofing -p 8080
```

## Customizing

- **Colors / branding** — edit the CSS custom properties at the top of `assets/css/styles.css` under `:root`.
- **Lead form submission** — currently simulates a submit. To hook it up to a real endpoint (e.g. Formspree, Zapier, your CRM), edit the `#leadForm` submit handler in `assets/js/main.js`.
- **Replace SVG illustrations with photos** — drop your photos into `assets/img/` and swap the SVGs in the hero, about, and service sections.
- **Replace map** — update the iframe `src` in the contact section with your preferred map embed URL.

## Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Gracefully degrades without animations when `prefers-reduced-motion` is set.
