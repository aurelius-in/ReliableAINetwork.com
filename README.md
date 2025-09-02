# Reliable AI Network (RAIN) — Website

Static site optimized for GitHub Pages + custom domain **reliableainetwork.com**.

## Quick Deploy (GitHub Pages)

1. Create a new repo on GitHub, e.g. `reliable-ai-network-site`.
2. Upload everything in this folder to the repo root.
3. In **Settings → Pages**, set **Source** to **Deploy from a branch**, branch `main`, folder `/root` (or `/docs` if you prefer, then move files).
4. Add your custom domain in Pages settings: `reliableainetwork.com`.
5. Commit the included `CNAME` (already set to `reliableainetwork.com`). 
6. Point your DNS to GitHub Pages per their docs (A/AAAA records or CNAME) and wait for propagation.

## Local Preview

Open `index.html` directly in a browser (no build step).

## SEO

- Canonical URL + OpenGraph + Twitter tags
- `robots.txt` and `sitemap.xml`
- JSON‑LD Organization schema
- Lightweight, fast, accessible (no heavy frameworks)

## Editing Industry Demos

- Update `data/industries.json` to add/remove industries, edit summaries, and provide demo links.
- Cards render automatically; no HTML changes required.

## CTAs

All CTAs link to your Calendly: https://calendly.com/oliveraellison/15min

## License

Copyright © 2025 Reliable AI Network, LLC.
