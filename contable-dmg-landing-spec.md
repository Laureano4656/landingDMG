# Build Spec: "Contable DMG" Landing Page (Astro)

This document is a complete visual/content spec for building a 3-section landing page in Astro. It is written for an agent with no image access — every layout, color, spacing and copy detail is described explicitly. Follow it literally; do not invent additional sections or content.

---

## 0. Tech setup

- Framework: **Astro** (static site).
- Styling: plain CSS (or Tailwind if the agent prefers — this spec uses CSS-like values that map 1:1 to Tailwind if needed).
- Fonts: a geometric/rounded sans-serif similar to **Poppins** or **Montserrat**. Load via Google Fonts (`Poppins`, weights 300/400/500/600/700).
- Icons: use `astro-icon` or plain inline SVGs for: search/magnifying-glass, Instagram, WhatsApp.
- Single page, 3 stacked full-width `<section>`s: `Hero`, `WhyUs`, `Contact/Footer`.
- Build as components: `Nav.astro`, `Hero.astro`, `WhyUs.astro`, `ContactCard.astro`, and a shared `Logo.astro`.

---

## 1. Global design tokens

```css
:root {
  --color-dark: #3a3733;        /* charcoal/warm-black, used for pill badges, overlays, cards */
  --color-dark-translucent: rgba(58, 55, 51, 0.55); /* card / overlay backgrounds */
  --color-white: #ffffff;
  --color-text-muted: #6b6b6b;  /* body paragraph grey on light backgrounds */
  --color-bg-warm: #ded8cf;     /* warm beige-grey background for section 2 & 3 */
  --color-accent-teal: #2f7a6f; /* optional accent, sampled from hero photo, use sparingly */

  --radius-pill: 999px;
  --radius-card: 20px;

  --font-family: 'Poppins', 'Montserrat', sans-serif;

  --container-max: 1200px;
  --section-padding-y: 100px;
  --section-padding-x: 40px;
}
```

General rules:
- All body copy uses `var(--font-family)`.
- Headings/nav links: medium weight (500), generous letter-spacing (~0.5px), uppercase for nav items only.
- Buttons and section-title pills: fully rounded (`border-radius: 999px`), never square.
- Cards: large rounded corners (`20px`), soft look, semi-transparent dark fill over imagery (frosted/glass effect — use `backdrop-filter: blur(6px)` if supported).
- Every section is full-viewport-width, with an inner content container `max-width: 1200px`, centered, horizontal padding ~40px (less on mobile).

---

## 2. Shared component: Logo

Appears twice (nav... actually only in Hero center, and again small inside the Contact card). It is **not** a raster logo — build it as text + a decorative bracket icon (like camera-focus corner brackets), all in the current text color (white on dark backgrounds).

Structure:
```
[⌜ corner bracket top-left]                    [⌝ top-right corner bracket]
        contable
        DMG            <- larger, bolder, this is the "wordmark" line
        .com.ar
[⌞ bottom-left corner bracket]                  [⌟ bottom-right corner bracket]
```

Details:
- Three stacked lines, center-aligned:
  1. `contable` — light weight, normal case, smaller size (~18px)
  2. `DMG` — much larger (~48px), bold/black weight, this is the visual anchor
  3. `.com.ar` — light weight, smaller size (~18px), same size as line 1
- Around the three lines, four independent small bracket/corner marks (like a photo-viewfinder or QR-scan frame), one in each corner of an invisible bounding box, drawn as simple L-shaped strokes (2px white border, ~20px long each side). This gives the logo a "focus frame" feel.
- Color: white when placed on dark/photo backgrounds.
- A small scaled-down version (roughly 50% size) is reused inside the footer contact card, same structure, still white text (card background is dark).

---

## 3. Section 1 — Hero

**Layout:** full-width, min-height ~100vh (or ~650px), background = a full-bleed photo placeholder with a dark overlay on top for text contrast.

### Background
- `<div class="hero-bg">` — use an `<img>` or CSS `background-image` placeholder:
  - Placeholder path: `/images/hero-placeholder.jpg`
  - Alt text: "Escritorio de trabajo con laptop y monitor" (desk workspace with laptop and monitor)
  - `object-fit: cover`, full width/height of section.
- On top of the image, a dark semi-transparent overlay: `background: rgba(20,18,16,0.35)` (a soft charcoal wash, not fully black) so all overlaid text stays legible against a light photo.

### Nav bar (top of hero, inside the overlay, NOT a separate white header — it sits directly on the photo)
- Positioned at the top of the hero section, horizontal row, `padding: 24px 40px`.
- Layout: three text links, no logo in the nav bar itself (logo lives centered lower in the hero).
- Items, left-to-right (roughly left-third / center / right-third of the width, generously spaced — NOT tightly grouped):
  - `SERVICIOS` — uppercase, white, letter-spaced
  - `HOME` — uppercase, white
  - `CONTACTO` — uppercase, white
- Font size ~14px, weight 500, spaced apart (`letter-spacing: 1px`). No underlines, no active-state styling needed — treat as plain links `href="#servicios"`, `href="#home"`, `href="#contacto"`.
- No hamburger menu needed for this spec at desktop size; add a simple mobile toggle at small breakpoints if desired.

### Center content stack (vertically centered in the hero, or slightly upper-center)
All center-aligned, stacked in this exact order:
1. **Logo** (see Section 2 spec above), white, roughly 48px main line.
2. Vertical gap (~24px).
3. **"Iniciar sesión" button**:
   - Pill shape, `border: 1.5px solid white`, transparent/no fill, white text.
   - Padding ~`14px 40px`.
   - Font size ~15px, weight 500.
   - No arrow/icon, just the label.

### Lower-left tagline block
Positioned lower in the hero, aligned to the **left** edge of the content container (not centered like the logo block above it) — sits over the lower-left/lower-middle part of the photo.
- Line 1: `Asesoramiento impositivo` — regular/light weight, white, ~28px.
- Line 2 (directly below, same block): `claro, moderno y a tu medida` — same size, but the words **"claro, moderno"** and **"tu medida"** are bold, the word `y` in between stays regular weight.
- Left-aligned text block, max-width ~420px so it wraps into two lines as shown.

### Responsive
- Stack nav items closer together and shrink logo/tagline sizes on mobile; keep same relative order (nav → logo → button → tagline).

---

## 4. Section 2 — "¿Por qué elegirnos?" (Why choose us)

**Layout:** full-width section, generous vertical padding (~100px top/bottom).

### Background
- A muted, low-contrast background: placeholder texture image (something like faded paper/architecture), heavily lightened.
  - Placeholder path: `/images/why-us-bg-placeholder.jpg`
  - Alt text: "" (decorative)
  - Apply a light wash overlay on top: `background: rgba(240,238,233,0.75)` over the image so it reads as a soft, almost-monochrome backdrop — text must be clearly legible on top.

### Section title (styled as a fake search bar)
- Centered horizontally, max-width ~600px.
- A pill-shaped bar: white/very light background (`#ffffff` or `#f7f5f2`), full rounded corners, subtle drop shadow (`0 4px 20px rgba(0,0,0,0.08)`), border `1px solid rgba(0,0,0,0.08)`.
- Inside, horizontal flex with `justify-content: space-between`, padding ~`20px 32px`:
  - Left: text `¿Por qué elegirnos?` — dark grey, weight 500, ~20px.
  - Right: a magnifying-glass (search) icon, dark grey/charcoal, ~20px.
- This element is purely decorative/a stylized `<h2>` — it is not a functional search input, but build it with an `<h2>` or a `<div>` wrapping a `<span>` + icon so it's still semantic.

### Three-column feature row
- Below the title bar, large gap (~60px), then a 3-column grid (`display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px`), max-width 1100px, centered.
- Each column is identical structure, center-aligned text:
  1. **Badge/pill heading** — dark charcoal pill (`background: var(--color-dark)`), fully rounded, white text, padding ~`14px 28px`, centered within the column, font-size ~15px, weight 600. Width hugs the text (inline-block), not full column width.
  2. Vertical gap (~20px).
  3. **Body paragraph** — grey text (`var(--color-text-muted)`), centered, font-size ~14–15px, line-height ~1.7, max-width ~280px per column (so text wraps to 3–4 lines).

Column content (use verbatim, Spanish, including which words are **bold**):

**Column 1**
- Pill text: `+30 años de experiencia`
- Paragraph: `Hace más de 30 años brindamos **asesoramiento contable** e **impositivo** con compromiso, experiencia y una atención cercana, acompañando a cada cliente con soluciones claras y profesionales.`

**Column 2**
- Pill text: `Más de 500 clientes`
- Paragraph: `A lo largo de nuestra trayectoria trabajamos junto a **más de 500 clientes**, ofreciendo soluciones contables adaptadas a cada necesidad con profesionalismo y dedicación.`

**Column 3**
- Pill text: `Adaptación constante`
- Paragraph: `Nos adaptamos constantemente a los cambios del entorno profesional y tecnológico, incorporando **herramientas modernas** para brindar un servicio más ágil, claro y eficiente.`

### Responsive
- Collapse the 3-column grid to 1 column, stacked, on mobile, each column full-width and centered, with ~40px vertical gap between columns.

---

## 5. Section 3 — Contact / Footer

**Layout:** full-width section, similar muted background treatment as Section 2 (reuse a light, desaturated background placeholder — can be the same or a different texture image).

### Background
- Placeholder path: `/images/contact-bg-placeholder.jpg`
- Alt text: "" (decorative)
- Same light wash overlay approach as Section 2 (`rgba(240,238,233,0.7)` over the image).
- Section padding: ~`100px 40px`.

### Contact card
A single floating card, **left-aligned** within the max-width content container (not centered, not full width) — sits toward the left/center-left of the section, roughly 380–420px wide.
- Background: dark, semi-transparent (`var(--color-dark-translucent)` ≈ `rgba(58,55,51,0.6)`), with `backdrop-filter: blur(8px)` for a frosted-glass look over the busy background.
- Border-radius: `20px` (`var(--radius-card)`).
- Padding: `~40px`.
- Text color throughout: white.
- Internal layout, top to bottom, **left-aligned**:
  1. **Small logo** (reuse Logo component at ~55–60% scale) — same 3-line stacked wordmark with corner brackets, but here it can be left-aligned instead of center-aligned; keep it visually consistent with the hero logo (same font, same bracket motif). Roughly 24px main "DMG" line size here.
  2. Thin horizontal divider line below the logo, full card width, `border-top: 1px solid rgba(255,255,255,0.25)`, margin ~`20px 0`.
  3. Contact details, stacked, left-aligned, each on its own line, moderate line spacing (~10px between lines):
     - `estudio@contabledmg.com.ar` — **bold**, ~15px.
     - `+54 9 223 366 73 52` — regular weight, ~15px.
     - `Gral. Roca 1511, Mar del Plata` — regular weight, ~15px.
  4. Gap (~20px), then a row of two circular icon buttons, left-aligned, ~12px gap between them:
     - Circle outline button (transparent fill, `1.5px solid white` border, ~44px diameter), containing a white **Instagram** glyph icon, centered.
     - Same circle style, containing a white **WhatsApp** glyph icon, centered.
     - Both should be real links: Instagram → placeholder `href="#"` (fill in real profile URL later), WhatsApp → `href="https://wa.me/5492233667352"` (built from the phone number shown, remove spaces, add `54` country code already implied).

### Responsive
- Card becomes full-width (with side margins) and stays left-aligned text/content on mobile; reduce card padding to ~24px.

---

## 6. Image placeholders to create/leave for the user

List every placeholder the agent should create empty/generic stand-ins for (the user will replace these):

| Placeholder file | Used in | Suggested aspect ratio | Notes |
|---|---|---|---|
| `/images/hero-placeholder.jpg` | Hero background | ~16:9, landscape, wide | Real photo will be a desk/workspace scene; overlay must stay dark enough for white text regardless of the final image's brightness — keep the overlay opacity as a separate, easily-tunable CSS variable. |
| `/images/why-us-bg-placeholder.jpg` | "¿Por qué elegirnos?" section background | wide/landscape | Should be a low-contrast, muted/faded texture — not a busy photo, since 3 columns of body text sit directly on it. |
| `/images/contact-bg-placeholder.jpg` | Contact/footer section background | wide/landscape | Same muted-texture treatment as above; a dark glass card floats on top so keep overlay legible under the card too. |

Use plain grey placeholder rectangles (e.g. `background-color: #cfcac2` or an `<img src="https://placehold.co/1600x900" />`) until real assets are supplied, but keep the `<img>`/`background-image` hook and `alt` text wired up exactly at the paths above so swapping files is a drop-in replacement.

---

## 7. Content/copy checklist (verbatim strings used across the page)

- Nav: `SERVICIOS`, `HOME`, `CONTACTO`
- Logo wordmark: `contable` / `DMG` / `.com.ar`
- Hero button: `Iniciar sesión`
- Hero tagline: `Asesoramiento impositivo` + `claro, moderno y a tu medida` (bold on "claro, moderno" and "tu medida")
- Section 2 title bar: `¿Por qué elegirnos?`
- Section 2 pill 1: `+30 años de experiencia`
- Section 2 pill 2: `Más de 500 clientes`
- Section 2 pill 3: `Adaptación constante`
- Section 2 paragraphs: as written verbatim above, with bold spans preserved
- Contact email: `estudio@contabledmg.com.ar`
- Contact phone: `+54 9 223 366 73 52`
- Contact address: `Gral. Roca 1511, Mar del Plata`

---

## 8. Suggested file/component structure

```
src/
  components/
    Logo.astro          // props: size ("large" | "small"), align ("center" | "left")
    Nav.astro
    Hero.astro
    WhyUs.astro
    ContactCard.astro
  pages/
    index.astro          // imports Nav (inside Hero), Hero, WhyUs, ContactCard in order
  styles/
    global.css            // design tokens from Section 1 above
public/
  images/
    hero-placeholder.jpg
    why-us-bg-placeholder.jpg
    contact-bg-placeholder.jpg
```

`index.astro` renders, in order: `<Hero />` (which internally renders the nav + logo + button + tagline over the background), `<WhyUs />`, `<ContactCard />`.

---

## 9. Things to explicitly NOT add

- No extra sections beyond Hero / Why Us / Contact — the source design only has these three.
- No sharp corners anywhere — every button, pill, and card uses rounded/pill radii.
- No colorful accent palette — this is a monochrome/charcoal + white + warm-beige design; do not introduce blues, purples, etc.
- Don't make the fake search bar in Section 2 a real functional input — it's a styled heading.
