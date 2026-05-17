# Summit Peak Roofing Co. — Animated Website

A fully animated, modern, single-page marketing website for **Summit Peak Roofing Co.**, a residential & commercial roofing contractor based in Phoenix, AZ.

Tagline: *Protecting Homes One Roof at a Time.*

---

## Features

- Fully responsive (desktop / tablet / mobile)
- Sticky animated header with mobile hamburger nav
- Animated marquee announcement bar
- Hero section with real Phoenix sunset photo, Ken-Burns zoom, parallax sun/mountains/city, and falling rain
- Scroll-reveal animations (IntersectionObserver) on every section
- Animated count-up stats
- Image-led service cards with hover zoom and brand-tinted overlay
- **Gallery** with filter chips (Residential / Commercial / Tile / Shingle / Inspections / Emergency) and a full keyboard-navigable lightbox
- **Financing** banner with 4 glassmorphic feature cards
- **FAQ** accordion with smooth grid-template-rows expand animation and rotating +/× icon
- Lead form **wired to Netlify Forms** (with honeypot anti-spam, fetch submission, and ?submitted=true success state)
- Animated process timeline
- Touch-swipeable testimonial carousel with auto-play, dots, and arrows
- CTA banner with rotating radial glow
- Google Maps embed of business address
- Floating call-now button with pulsing ring
- Back-to-top button
- Magnetic CTA effect on desktop
- Respects `prefers-reduced-motion`
- No build tools, no dependencies — vanilla HTML / CSS / JS

## Netlify Forms

The lead form is automatically detected by Netlify on deploy — no extra setup needed beyond hosting on Netlify. Submissions appear under your site's **Forms** tab in the Netlify dashboard. You can also forward submissions to email or webhooks (Slack, Zapier, your CRM) from there.

To wire submissions to email, in Netlify: Site → **Forms** → **Form notifications** → add an email or webhook.

If you ever move off Netlify, swap the `fetch('/', ...)` call in `assets/js/main.js` (`#leadForm` handler) with a POST to your endpoint of choice (Formspree, Getform, Basin, your CRM, etc.).

## Backend integration — for the backend developer

This site is intentionally front-end only. To connect the lead form to a CRM (GHL, HubSpot, etc.), there's exactly **one place to edit** in each of two files.

### Form fields (`index.html`, inside `<form id="leadForm">`)

| Field | Type | Required | Maps cleanly to |
|---|---|---|---|
| `name` | text | yes | Contact name (split on first space for first/last) |
| `phone` | tel | yes | Contact phone |
| `email` | email | yes | Contact email |
| `service` | select | yes | Custom field — "Service Requested" |
| `message` | textarea | no | Notes |
| `bot-field` | hidden honeypot | no | Drop submissions where this is non-empty |
| `form-name` | hidden = `free-inspection` | always | Useful for routing/source attribution |

### Where to plug in the endpoint

1. **`index.html`** — set the GHL Inbound Webhook URL (or other CRM endpoint) on the `<form>`:

   ```html
   <form id="leadForm" ... data-ghl-endpoint="https://services.leadconnectorhq.com/hooks/...">
   ```

2. **`assets/js/main.js`** — find the comment block `BACKEND HOOKUP HERE` inside the `#leadForm` submit handler. The fetch already reads `form.dataset.ghlEndpoint`, so once the attribute is set the form will POST there. Adjust `Content-Type` / body encoding if the endpoint needs JSON instead of URL-encoded.

Keep the honeypot (`bot-field`) and the inline `#formSuccess` element in place — they handle spam protection and the success UI respectively.

### Other common GHL touchpoints (where to drop snippets)

| Feature | Where to put it |
|---|---|
| GHL chat widget | Paste snippet just before `</body>` in `index.html` |
| GHL calendar embed | Add a new section before the Offer form, or replace the form with the calendar iframe |
| Call tracking number | Search/replace `(602) 555-1847` and `tel:+16025551847` across `index.html` |
| FB Pixel / Google Ads | Add in `<head>` of `index.html`; fire conversion event from the form's success callback in `main.js` |

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
