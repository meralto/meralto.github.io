# Klaropoint Static Website

Static, dependency-free website designed for GitHub Pages.

## Form provider: Formspree

This build replaces FormSubmit with Formspree because Formspree provides a maintained dashboard, spam controls, submission history, email notifications, and a straightforward static-form API. Its free plan is suitable for early-stage, low-volume website inquiries; verify current limits before launch.

### Configure the form

1. Create a form at Formspree and verify the destination mailbox.
2. Copy the generated endpoint, such as `https://formspree.io/f/abcdwxyz`.
3. In `contact.html`, replace:

   `https://formspree.io/f/REPLACE_WITH_FORM_ID`

4. Submit a test from the live GitHub Pages site.
5. Confirm delivery, spam handling, and the Formspree retention/privacy settings.

The form deliberately blocks a false-success experience when the placeholder endpoint has not been replaced.

## GitHub Pages

This repository is already static. In GitHub:

1. Open **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select `master` (or rename to `main`) and `/ (root)`.
4. Keep `.nojekyll` in the repository root.

For a custom domain, add a `CNAME` file containing only the domain name and configure DNS according to GitHub Pages documentation.

## Important launch review

- Have counsel review `privacy.html`.
- Confirm all public security language against the implemented platform.
- Do not publicly claim certifications, a BAA, or compliance status unless documented and approved.
- Never accept PHI, claim files, patient identifiers, or sensitive clinical data through the public form.
- Replace placeholder contact/security/privacy email addresses if they are not active.
