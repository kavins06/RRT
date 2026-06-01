# Renaissance Realty Trust - Website

A lightweight, single-page marketing site for **Renaissance Realty Trust, Inc.**, a private
multifamily REIT. Plain HTML / CSS / vanilla JavaScript - **no build step, no backend**, and a
single small vendored library (Lenis, ~17 KB, for smooth momentum scrolling). It opens in any
browser and hosts on anything.

## Preview locally

Just **double-click `index.html`** - that's it.

For the best experience (so the background video and fonts load over `http://` rather than
`file://`), serve the folder with any static server:

```powershell
# Option A - Python (if installed)
python -m http.server 8000

# Option B - Node
npx serve .
```

Then open <http://localhost:8000>.

> Fonts (Cormorant Garamond + Inter) load from Google Fonts when online and fall back to
> system serif/sans automatically when offline - nothing breaks either way.

## Project structure

```
index.html            The entire site (all sections live here)
favicon.svg           RRT monogram favicon
assets/
  css/styles.css      Design system + every section + responsive + motion
  js/main.js          Scroll reveals, sticky nav, parallax, mobile menu, video control
  img/                Drop-in images (hero poster, founder photos, OG image) - see img/README.txt
  video/              Drop-in hero video - see video/README.txt
Founders/             Original source material (article + LinkedIn bios) - reference only
```

## Adding media (optional - the site is complete without it)

The hero video and founder headshots are already wired in; everything ships finished.

- **Hero video - already included.** `assets/video/hero.mp4` is a Senate / Washington, D.C. street
  timelapse (VideoVault stock, supplied by the client). It was compressed to a muted ~11-second loop
  (~1.8 MB, audio stripped), with a matching `assets/img/hero-poster.jpg`. To swap it, replace those
  two files (keep the same names) - see [`assets/video/README.txt`](assets/video/README.txt) for
  specs. If no `hero.mp4` is present, the hero automatically falls back to a hand-built D.C. skyline
  graphic.
- **Founder photos - already included.** `assets/img/morris.jpg` and `assets/img/wilson.jpg`
  (optimized from the supplied `JM HS.png` / `BW HS.png`) are wired into the Leadership cards.
  To swap a photo, replace the corresponding `morris.jpg` / `wilson.jpg` (square or 4:5 works;
  the frame uses `object-fit: cover`). The original `*.png` files are unused and safe to delete.
- **Social preview:** drop `assets/img/og-image.jpg` (1200×630) to enable rich link previews.

## Editing content

Everything is in `index.html`, organized by clearly commented sections:
`NAV → HERO → THE FIRM → STRATEGY → UPREIT → MARKETS → LEADERSHIP → VISION → CONTACT → FOOTER`.

Colors, fonts, and spacing are CSS variables at the top of `assets/css/styles.css` (`:root`),
so the whole palette can be retuned in one place.

## Before going live - checklist

- [ ] Replace the placeholder email `info@renaissancerealtytrust.com` with a real branded inbox.
      (The source bios list personal Gmail addresses; a company address is recommended.)
- [ ] Confirm the contact phone `(202) 365-0955` is the correct public number.
- [x] Founder headshots added (`morris.jpg` / `wilson.jpg`). Original `JM HS.png` / `BW HS.png` can be deleted.
- [ ] Optionally swap the included Pexels D.C. hero video for licensed/branded footage.
- [ ] Have counsel review the footer **securities disclaimer** and forward-looking language -
      this site references a planned securities offering, so that language is intentional.

## Deploying

Because it's fully static, you can host it anywhere - drag-and-drop to Netlify, push to Vercel,
GitHub Pages, Cloudflare Pages, or any web host / S3 bucket. No build command; the publish
directory is the project root.
