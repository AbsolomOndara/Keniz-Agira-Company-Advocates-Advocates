# Website activation guide

The redesigned pages work immediately with an email application fallback. Complete the steps below to enable automatic delivery, subscriber management and browser-based news publishing.

## 1. Connect both enquiry forms to Formspree

1. Sign in to Formspree and create two forms: `Keniz Agira Consultation` and `Keniz Agira General Contact`.
2. In each form, set the verified recipient to the firm's approved email address.
3. Copy each endpoint. It will look similar to `https://formspree.io/f/abcdefgh`.
4. Open `js/ka-integrations.js` and paste the endpoints between the quotation marks:

```javascript
consultationFormspreeEndpoint: "https://formspree.io/f/YOUR_CONSULTATION_ID",
contactFormspreeEndpoint: "https://formspree.io/f/YOUR_CONTACT_ID",
```

5. Submit one test from each page and confirm that Formspree delivers it to the correct inbox.
6. Turn on Formspree spam protection and notification settings before launch.

Until these values are added, each form opens the visitor's email application with a prepared message. The site never displays a false success message.

## 2. Connect the News subscription form to Kit

1. Sign in to Kit and create a form for Keniz Agira and Company Advocates.
2. Add the approved confirmation email, unsubscribe settings and sender details.
3. In Kit, open the form's HTML/embed settings and copy its form submission URL.
4. Open `js/ka-integrations.js` and add that URL:

```javascript
kitFormAction: "PASTE_THE_KIT_FORM_ACTION_HERE"
```

5. Match Kit custom fields or tags to the six interest values used on `insights.html` if you want interest-based segments.
6. Test subscribing, confirmation and unsubscribing with a non-client email address.

Until the Kit action is added, the subscription button prepares an email request to the firm.

## 3. Enable the no-code News editor with Sveltia CMS

1. Push this website to the GitHub repository used by Vercel.
2. Open `admin/config.yml`.
3. Replace `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY` with the repository owner and name. Example: `worldways/keniz-agira-website`.
4. Confirm that the production branch is `main`. If not, change the `branch` value.
5. Deploy the update to Vercel.
6. Visit `https://YOUR-DOMAIN/admin/` and authenticate with GitHub when prompted.
7. Open **News and Insights**, add or edit an item, then publish. Sveltia commits the updated `content/news.json` file to GitHub. Vercel then redeploys the site automatically.

The public News page reads `content/news.json`, sorts the displayed material by the saved order and lets visitors filter it by topic.

## 4. Launch checks

- Confirm the domain used by Vercel is allowed in Formspree and Kit.
- Confirm all sender details and consent language with the firm.
- Review every article for legal accuracy before publishing.
- Never request passwords, financial credentials or full evidence through a general website form.
- Submit all three forms on a telephone and a desktop browser.
- Confirm that the firm's privacy notice accurately describes Formspree, Kit and any analytics used on the live site.
