# Build Spec: "Contable DMG" Landing Page — MOBILE breakpoint

This is a companion/addendum to `contable-dmg-landing-spec.md` (the desktop spec). It documents the **mobile layout** (from the phone mockup PDF) so the agent implements the correct responsive behavior instead of just naively shrinking the desktop layout — several things actually **re-align**, not just resize.

Apply everything in the desktop spec (design tokens, colors, fonts, copy, component structure) as the base. This file only calls out what changes at mobile widths.

**Breakpoint:** apply these rules at `max-width: 640px` (typical phone width). Treat the desktop spec as the default/wider behavior.

---

## 1. Global mobile adjustments

- `--section-padding-x` drops to ~`24px` on mobile (from 40px).
- Base font sizes shrink roughly 10–15% across the board (e.g. hero tagline ~22px instead of 28px).
- Everything stays full-bleed width; no horizontal scroll.

---

## 2. Hero section — mobile differences

Structure/order is identical to desktop (nav → logo → button → tagline, all over the same photo background with the same dark overlay), **but**:

- **Nav bar**: the 3 links (`SERVICIOS`, `HOME`, `CONTACTO`) stay in a single horizontal row (do NOT stack vertically or collapse into a hamburger menu) — just tighter spacing and a smaller font (~12–13px), evenly spread across the width with `justify-content: space-between` and side padding ~24px.
- **Logo**: same 3-line stacked wordmark with corner brackets, centered, just scaled down (~70% of desktop size — main "DMG" line around ~32px instead of ~48px).
- **Button** (`Iniciar sesión`): same pill/outline style, centered, slightly narrower padding (~`12px 32px`).
- **Tagline — IMPORTANT DIFFERENCE FROM DESKTOP**: on desktop this text block is left-aligned and positioned toward the lower-left of the hero. **On mobile it becomes fully centered** (both lines center-aligned, block itself horizontally centered under the button), not left-aligned. Keep the same bold spans (`claro, moderno` and `tu medida` bold, rest regular).
- Vertical rhythm: logo → button → tagline are stacked with generous but tighter gaps than desktop (~20px between each), positioned in the upper-to-middle portion of the hero photo (roughly the top 60% of the section), leaving the lower ~40% as plain background photo (the teal-sweater/desk area) with no text overlay, matching the mockup.

---

## 3. "¿Por qué elegirnos?" section — mobile differences

Desktop is a 3-column grid. **Mobile is a single stacked column**, but it is NOT simply center-aligned all the way down — the three feature blocks **zigzag their text alignment**, alternating left / center / left. Implement exactly this pattern:

1. **Section title pill** (`¿Por qué elegirnos?` + search icon): same style as desktop, centered horizontally, same rounded white bar with shadow.

2. **Block 1 — "+30 años de experiencia"**
   - Pill badge: **left-aligned** (sits near the left edge of the content container, not centered).
   - Paragraph below it: **left-aligned text**, ragged-right, same grey color and bold spans (`asesoramiento contable`, `impositivo`) as desktop copy.

3. **Block 2 — "Más de 500 clientes"**
   - Pill badge: **centered** (shifted toward the horizontal center/right of the container — visually distinct from block 1's left position).
   - Paragraph below it: **center-aligned text** (all lines centered, not ragged-right).
   - Bold span: `500 clientes`.

4. **Block 3 — "Adaptación constante"**
   - Pill badge: **left-aligned** again (same horizontal position as block 1).
   - Paragraph below it: **left-aligned text**, ragged-right.
   - Bold span: `herramientas modernas`.

Spacing: generous vertical gap between each of the 3 blocks (~48–56px), and between the title pill and block 1 (~48px). Each pill badge sits directly above its paragraph with a smaller gap (~16px).

Container: all of this sits inside a single-column content container with ~24px side padding; alignment (left vs center) is applied per-block as described above, not to the whole column.

> Implementation tip: build each block as `<div class="whyus-block whyus-block--left">` / `<div class="whyus-block whyus-block--center">` with a modifier class controlling `text-align` and the pill's own alignment (`margin-right: auto` for left blocks, `margin: 0 auto` for the center block).

---

## 4. Contact / Footer section — mobile differences

- The section background keeps the same muted/washed photo treatment as desktop.
- The contact card behavior changes: on desktop it's a fixed-width (~380–420px) card left-aligned in the container. **On mobile it becomes a wide card centered in the section**, spanning most of the viewport width with side margins of ~24px (i.e. `width: calc(100% - 48px)`, centered), while all of its **internal content stays left-aligned** exactly as in the desktop card (logo, divider, contact lines, icon row — no internal centering).
- Card internal padding shrinks slightly (~28px instead of 40px).
- Everything else (small logo, divider line, email/phone/address lines, 2 circular social icons) is unchanged from the desktop spec — same order, same styles, same copy.

---

## 5. Summary table of alignment changes (mobile vs desktop)

| Element | Desktop | Mobile |
|---|---|---|
| Hero tagline block | Left-aligned, lower-left position | Centered, upper-middle position |
| Nav links | Spread across full width | Same, just tighter/smaller |
| WhyUs layout | 3-column grid, all centered per column | 1 column, zigzag: left / center / left |
| Contact card position | Left-aligned in container, fixed width | Centered in container, near-full width |
| Contact card internal content | Left-aligned | Left-aligned (unchanged) |

---

## 6. Nothing else changes

All copy strings, colors, fonts, corner-bracket logo construction, pill/button shapes, background image placeholders (same 3 files: `hero-placeholder.jpg`, `why-us-bg-placeholder.jpg`, `contact-bg-placeholder.jpg`), and the WhatsApp/Instagram icon links from the desktop spec apply as-is at mobile widths — only layout/alignment shifts as documented above.
