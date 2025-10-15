// theme toggle
const btn  = document.getElementById('theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if(saved) html.setAttribute('data-theme', saved);
btn.onclick = () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
};

// footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// build post list
fetch('blogs/')
  .then(r => r.text())
  .then(txt => {
    const doc = new DOMParser().parseFromString(txt, 'text/html');
    const links = [...doc.querySelectorAll('a')]
                    .map(a => a.getAttribute('href'))
                    .filter(h => h.endsWith('.html') && h !== 'index.html');
    const list = document.getElementById('list');
    if(!links.length){ list.innerHTML = '<p>No posts yet.</p>'; return; }
    list.innerHTML = links.map(l => {
      const title = l.replace('.html','').replace(/-/g,' ');
      return `
        <article>
          <h2><a href="blogs/${l}">${title}</a></h2>
          <div class="meta">${new Date().getFullYear()}</div>
        </article>`;
    }).join('');
  })
  .catch(() => document.getElementById('list').innerHTML = '<p>Could not load posts.</p>');
