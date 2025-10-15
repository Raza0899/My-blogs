// theme toggle
const btn = document.getElementById('theme-toggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
btn.onclick = () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
};
document.getElementById('yr').textContent = new Date().getFullYear();

// build list from JSON
fetch('posts.json')
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(arr => {
    const list = document.getElementById('list');
    if (!arr.length) { list.innerHTML = '<p>No posts yet.</p>'; return; }
    list.innerHTML = arr.map(p => `
      <article>
        <h2><a href="blogs/${p.file}">${p.title}</a></h2>
        <div class="meta">${p.date}</div>
      </article>`).join('');
  })
  .catch(() => document.getElementById('list').innerHTML = '<p>Could not load posts.</p>');
