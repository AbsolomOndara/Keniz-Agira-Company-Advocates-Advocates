(() => {
  'use strict';
  const config = window.KA_INTEGRATIONS || {};
  const firmEmail = 'keniz@worldwaysone.co.ke';
  const showStatus = (form, message, type) => {
    const status = form.querySelector('[data-kae-status]');
    if (!status) return;
    status.textContent = message;
    status.className = `kae-status is-visible is-${type}`;
    status.focus();
  };
  const formText = form => [...new FormData(form).entries()].map(([key,value]) => `${key}: ${value}`).join('\n');
  document.querySelectorAll('[data-kae-form]').forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const kind = form.dataset.kaeForm;
      const endpoint = kind === 'consultation' ? config.consultationFormspreeEndpoint : config.contactFormspreeEndpoint;
      const button = form.querySelector('[type=submit]');
      if (!endpoint) {
        const subject = kind === 'consultation' ? 'Consultation request from website' : 'General website enquiry';
        window.location.href = `mailto:${firmEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formText(form))}`;
        showStatus(form, 'Your email application has opened with the enquiry prepared. Please review it, then send it to the firm.', 'success');
        return;
      }
      button.disabled = true;
      try {
        const response = await fetch(endpoint, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        showStatus(form, 'Thank you. Your enquiry has been sent to the firm for an initial review.', 'success');
      } catch (error) {
        showStatus(form, `We could not send the form. Please call 0780 671 715 or email ${firmEmail}.`, 'error');
      } finally { button.disabled = false; }
    });
  });
  const subscribe = document.querySelector('[data-kae-subscribe]');
  const handleSubscription = event => {
    event.preventDefault();
    if (!subscribe.reportValidity()) return;
    if (config.kitFormAction) {
      subscribe.action = config.kitFormAction;
      subscribe.method = 'post';
      subscribe.removeEventListener('submit', handleSubscription);
      subscribe.submit();
      return;
    }
    const email = new FormData(subscribe).get('email');
    const interests = new FormData(subscribe).getAll('interests').join(', ') || 'All news';
    window.location.href = `mailto:${firmEmail}?subject=${encodeURIComponent('News subscription request')}&body=${encodeURIComponent(`Please add ${email} to the firm news list.\nInterests: ${interests}`)}`;
    showStatus(subscribe, 'Your email application has opened with the subscription request prepared. Please send it to the firm.', 'success');
  };
  if (subscribe) subscribe.addEventListener('submit', handleSubscription);
  const grid = document.querySelector('[data-kae-news-grid]');
  if (!grid) return;
  let posts = [];
  const render = category => {
    const filtered = category === 'all' ? posts : posts.filter(post => post.category === category);
    grid.innerHTML = filtered.map(post => `<article class="kae-news-card"><p class="kae-news-meta">${post.categoryLabel} · ${new Date(post.date+'T00:00:00').toLocaleDateString('en-KE',{day:'numeric',month:'long',year:'numeric'})}</p><h3>${post.title}</h3><p>${post.excerpt}</p><a href="request-consultation.html">Discuss this topic <span aria-hidden="true">→</span></a></article>`).join('');
    document.querySelector('[data-kae-news-empty]').hidden = filtered.length > 0;
  };
  fetch('content/news.json').then(response => response.json()).then(data => { posts = data.posts || []; render('all'); }).catch(() => { document.querySelector('[data-kae-news-empty]').hidden = false; });
  document.querySelectorAll('[data-kae-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-kae-filter]').forEach(item => item.setAttribute('aria-pressed','false'));
    button.setAttribute('aria-pressed','true'); render(button.dataset.kaeFilter);
  }));
})();
