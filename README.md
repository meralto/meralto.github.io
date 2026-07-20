# KlaroPoint v1 Website

Production-ready static website package for GitHub Pages.

## Pages
- `index.html` — conversion-focused homepage
- `contact.html` — working demo/free-audit request form
- `security.html` — public security overview
- `privacy.html` — website privacy notice draft
- `thank-you.html` — post-submission confirmation
- `404.html` — not-found page

## Contact form
The form uses FormSubmit and delivers submissions to `info@klaropoint.com`.

Important first-time activation:
1. Publish the website.
2. Submit a test request through the live contact form.
3. FormSubmit will send an activation message to `info@klaropoint.com`.
4. Open that message and confirm the form.
5. Submit a second test and verify delivery and the thank-you redirect.

The service documents that static HTML forms can submit directly to its endpoint and that the destination email must be confirmed on first use.

The form intentionally tells users not to submit patient information or PHI.

## GitHub Pages
Upload every file to the repository root. Keep:
- `CNAME`
- `.nojekyll`
- `robots.txt`
- `sitemap.xml`

Use GitHub Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Before launch
- Have counsel review `privacy.html`.
- Confirm all security statements against the implemented architecture.
- Confirm whether current SOC 2 or other assurance documentation can be named publicly.
- Test all form fields and mobile breakpoints.
- Do not request or accept PHI through the public contact form.
