# Sopha's Space

## Project structure

- `index.html` — main portfolio homepage
- `about.html`, `contact.html` — information pages
- `note.html` — student-note detail page
- `editorial-policy.html`, `privacy.html`, `terms.html` — policy pages
- `assets/css/style.css` — website styles
- `assets/js/script.js` — homepage interactions and content
- `assets/js/note-detail.js` — student-note detail-page behavior
- `assets/js/site-config.js` — public Supabase browser configuration
- `assets/images/` — profile photo and other images

## Add your profile photo

Save your profile picture as **`profile.png`** and place it in `assets/images/`.
The homepage already points to `assets/images/profile.png`.

You can use JPG or WebP too, but if you do, update the image filename in `index.html`.

## Run locally

Open `index.html` in a browser for a basic preview. For development, use VS Code with the Live Server extension.

## Important

Keep `site-config.js` in the project. It contains the public Supabase URL and publishable/anon key used by the browser. Never put a Supabase `service_role` key in frontend files. Make sure Supabase Row Level Security policies are configured correctly.

This reorganization keeps the HTML pages at the project root so the existing links between pages remain straightforward.
