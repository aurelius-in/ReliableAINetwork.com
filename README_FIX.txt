Fix steps (takes 1 minute)

1) Restore full styling:
   - Replace your current styles.css with the one in this zip.
     (It includes the full theme + splash styles, and a smaller hero title.)

2) Make sure the splash exists:
   - Confirm your index.html has the splash overlay right after <body>.
   - If it’s missing, paste the snippet from body_splash_snippet.html right after <body>.

3) Keep the hero simple (optional, matches your spec):
   - If needed, replace the <section id="overview" ...> with index_hero_snippet.html.

4) Ensure script.js is updated:
   - Replace script.js with the one in this zip to always show the splash, auto-hide after 9s, and keep the fade.

5) Verify links in <head> of index.html:
   - <link rel="stylesheet" href="./styles.css">
   - <script src="./script.js" defer></script>

That’s it—reload and you should see the dark theme, the gradient header, and the splash every visit for ~9s with a smooth fade.
