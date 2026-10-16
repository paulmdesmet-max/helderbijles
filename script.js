const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', nav.classList.toggle('open'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
document.querySelector('#year').textContent = new Date().getFullYear();
const fallback={testimonials:[{quote:'We voelden meteen dat er geluisterd werd. Niet alleen naar de punten, maar ook naar wat ons kind nodig had.',label:'Ouder van een leerling',name:'Anoniem'},{quote:'De rustige uitleg en duidelijke planning zorgden ervoor dat leren weer haalbaar voelde.',label:'Ouder van een leerling',name:'Anoniem'}],posts:[{category:'STUDIETIP',title:'Een rustige studieplek maken: drie kleine aanpassingen.',accent:false},{category:'BOODSCHAP',title:'Wat je mag verwachten van een eerste kennismaking.',accent:false},{category:'BINNENKORT',title:'Hier delen we tips, nieuws en verhalen uit de werking.',accent:true}]};

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const postUrl = value => {
  try {
    const url = new URL(value || 'index.html#contact', window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : 'index.html#contact';
  } catch {
    return 'index.html#contact';
  }
};
// Dates determine the order; undated posts retain their order in the admin list.
const sortedPosts = posts => posts.map((post, index) => ({post, index}))
  .sort((a, b) => ((Date.parse(b.post.date) || 0) - (Date.parse(a.post.date) || 0)) || a.index - b.index)
  .map(item => item.post);
const homepagePosts = posts => {
  const selected = posts.filter(post => post.homepage === true);
  return (selected.length ? selected : posts).slice(0, 3);
};
const postCard = post => `<article${post.accent ? ' class="post-accent"' : ''}>
  <p class="post-label">${escapeHtml(post.category)}</p>
  <h3>${escapeHtml(post.title)}</h3>
  ${post.date && !Number.isNaN(Date.parse(post.date)) ? `<time class="post-date" datetime="${escapeHtml(post.date)}">${new Date(post.date).toLocaleDateString('nl-BE', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'})}</time>` : ''}
  ${post.accent && !post.url ? '<span class="big-spark" aria-hidden="true">✦</span>' : `<a href="${postUrl(post.url)}" target="_blank" rel="noopener noreferrer">Lees verder <span aria-hidden="true">→</span><span class="visually-hidden">: ${escapeHtml(post.title)} (opent in een nieuw tabblad)</span></a>`}
</article>`;
const render = content => {
  const testimonials = document.querySelector('[data-testimonials]');
  if (testimonials) testimonials.innerHTML = content.testimonials.map(item => `<figure><div class="quote-mark">“</div><blockquote>${escapeHtml(item.quote)}</blockquote><figcaption>${escapeHtml(item.label)}<br><strong>${escapeHtml(item.name)}</strong></figcaption></figure>`).join('');
  const posts = sortedPosts(content.posts);
  const homepage = document.querySelector('[data-posts]');
  const archive = document.querySelector('[data-all-posts]');
  if (homepage) homepage.innerHTML = homepagePosts(posts).map(postCard).join('');
  if (archive) archive.innerHTML = posts.length ? posts.map(postCard).join('') : '<p>Er zijn nog geen berichten. Kom binnenkort nog eens kijken.</p>';
};
render(fallback);
fetch('content/site-content.json').then(response => response.ok ? response.json() : Promise.reject()).then(render).catch(() => {
  const status = document.querySelector('[data-posts-status]');
  if (status) status.textContent = 'De berichten konden niet worden geladen. Vernieuw de pagina om opnieuw te proberen.';
});
