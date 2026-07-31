A plain HTML/CSS/JS starter site — no framework, no build step. Three files do all the work:

index.html — content and structure
styles.css — all styling (colors/fonts are set as CSS variables at the top)
script.js — one line, sets the footer year
Edit it
Open the folder in VS Code.
Job openings — in the #jobs section, each .pin-card is one posting. Copy/paste the block to add a role, delete one when it's filled, and point href="#" at the real application link (your ATS, a Google Form, wherever candidates apply).
Book a meeting with HR — in the #meet section, replace the iframe's src="about:blank" with a real embed link:
Google Calendar: open your appointment schedule → Share → "Embed this calendar" → copy the URL from the <iframe src="..."> code it gives you.
Calendly: open your event type → Share → Embed → "Inline Embed" → copy the URL from the code snippet.
Once you paste a real src in, you can delete the <div class="embed-placeholder">...</div> block right below it — that's just filler text shown while the src is blank.
Other resources — the #resources section has extra cards (handbook, onboarding, benefits) — edit, delete, or add more the same way as the job cards.
Contact form — create a free form at https://formspree.io, then swap your-form-id in the form's action attribute for your real endpoint.
In styles.css, the :root block at the top has your color palette and fonts — change those to reskin the whole site at once.
Preview locally

Just open index.html in a browser — no server needed. (Or, for live-reload while editing, install the "Live Server" extension in VS Code and click "Go Live.")

Deploy it

Option A — Netlify (easiest)

Push this folder to a new GitHub repo.