/* ═══ PORTFOLIO SCRIPT ═══════════════════════════════════════ */

/* ── PRELOADER ───────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
  }, 400);
});

/* ── THEME ───────────────────────────────────────────────── */
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('kk-theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kk-theme', next);
});

/* ── MOBILE MENU ─────────────────────────────────────────── */
const burger     = document.getElementById('burger');
const mobDrawer  = document.getElementById('mobDrawer');
const mobOverlay = document.getElementById('mobOverlay');

const openMenu  = () => { burger.classList.add('open');    mobDrawer.classList.add('open');  mobOverlay.classList.add('open');  document.body.style.overflow='hidden'; };
const closeMenu = () => { burger.classList.remove('open'); mobDrawer.classList.remove('open'); mobOverlay.classList.remove('open'); document.body.style.overflow=''; };

burger.addEventListener('click', () => mobDrawer.classList.contains('open') ? closeMenu() : openMenu());
mobOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.md-link').forEach(l => l.addEventListener('click', closeMenu));

/* ── NAVBAR ──────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const btt    = document.getElementById('btt');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  btt.classList.toggle('vis', window.scrollY > 500);
}, { passive: true });

btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── ACTIVE NAV ──────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nl');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });
sections.forEach(s => navObs.observe(s));

/* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    const off = window.innerWidth <= 768 ? 80 : 90;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    revObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = Math.min(idx * 100, 300) + 'ms';
  revObs.observe(el);
});

/* ── TYPEWRITER ──────────────────────────────────────────── */
const roles   = ['QA Engineer', 'Test Automation Dev', 'Banking Security Tester', 'Selenium Expert', 'Software Engineer'];
const typed   = document.getElementById('typed');
let ri = 0, ci = 0, del = false;

function typeLoop() {
  const word = roles[ri];
  typed.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);
  let d = del ? 45 : 88;
  if (!del && ci === word.length) { d = 2200; del = true; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; d = 400; }
  setTimeout(typeLoop, d);
}
setTimeout(typeLoop, 900);

/* ── COUNT UP ────────────────────────────────────────────── */
function countUp(el, target, duration = 1600) {
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  })(t0);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count));
    statsObs.unobserve(entry.target);
  });
}, { threshold: 0.6 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

/* ── 3D TILT ON PROJECT CARDS ────────────────────────────── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s var(--spring)';
    card.style.transform = '';
    setTimeout(() => card.style.transition = '', 500);
  });
});

/* ── MAGNETIC BUTTONS ────────────────────────────────────── */
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.22;
    const y = (e.clientY - r.top  - r.height / 2) * 0.22;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform .4s var(--spring)';
    btn.style.transform  = '';
    setTimeout(() => btn.style.transition = '', 400);
  });
});

/* ── PROJECT CARD HOVER DIM ──────────────────────────────── */
const projCards = document.querySelectorAll('.proj-card');
projCards.forEach(c => {
  c.addEventListener('mouseenter', () => projCards.forEach(o => { if (o !== c) o.style.opacity = '.45'; }));
  c.addEventListener('mouseleave', () => projCards.forEach(o => o.style.opacity = ''));
});

/* ── SKILL TAG STAGGER ANIMATION ─────────────────────────── */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.sk-tags span').forEach((tag, i) => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(10px)';
      setTimeout(() => {
        tag.style.transition = 'opacity .35s ease, transform .35s ease';
        tag.style.opacity = '1';
        tag.style.transform = 'none';
      }, i * 50);
    });
    skObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sk-card').forEach(c => skObs.observe(c));

/* ── CONTACT FORM ────────────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const mail = document.getElementById('femail').value.trim();
  const subj = document.getElementById('fsubj').value.trim();
  const msg  = document.getElementById('fmsg').value.trim();
  const body = encodeURIComponent(`Hi Kaarthikeyan,\n\nMy name is ${name} (${mail}).\n\n${msg}`);
  window.location.href = `mailto:Kaarthikeyanvs@gmail.com?subject=${encodeURIComponent(subj)}&body=${body}`;
});

/* ── CANVAS PARTICLE NETWORK (hero) ──────────────────────── */
;(function(){
  const canvas = document.getElementById('bgCanvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const N   = window.innerWidth <= 768 ? 28 : 55;
  const MAX = 130;
  let W, H, running = true;
  const PAL = [[124,92,252],[34,211,238],[192,132,252],[74,222,128]];

  function resize(){
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function mkP(){
    const rgb = PAL[Math.floor(Math.random() * PAL.length)];
    return {
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-.5)*.36, vy:(Math.random()-.5)*.36,
      r: Math.random()*1.2+.4,
      rgb, a: Math.random()*.34+.12
    };
  }

  resize();
  window.addEventListener('resize', resize, {passive:true});
  const pts = Array.from({length:N}, mkP);

  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, {threshold:0}).observe(hero);

  (function frame(){
    if (running){
      ctx.clearRect(0,0,W,H);
      for (let i=0; i<N; i++){
        const p = pts[i];
        for (let j=i+1; j<N; j++){
          const q = pts[j];
          const dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if (d < MAX){
            ctx.beginPath();
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle = `rgba(124,92,252,${(1-d/MAX)*.14})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.rgb.join(',')},${p.a})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  })();
})();

/* ── CUSTOM CURSOR + GLOW ────────────────────────────────── */
;(function(){
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  const glow = document.getElementById('cursorGlow');
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)');
  if (!dot || !fine.matches) return;

  let mx=0, my=0, rx=0, ry=0, gx=0, gy=0, moved=false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (!moved){
      moved = true;
      rx=mx; ry=my; gx=mx; gy=my;          // snap ring & glow on first move
      dot.style.opacity  = '1';
      ring.style.opacity = '.65';
      if (glow) glow.style.opacity = '1';
    }
  }, {passive:true});

  // RAF loop — ring follows at 14% lerp, glow at 8% lerp
  (function loop(){
    rx += (mx-rx) * .14;  ry += (my-ry) * .14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    if (glow && moved){
      gx += (mx-gx) * .08; gy += (my-gy) * .08;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
    }
    requestAnimationFrame(loop);
  })();

  // Hover-state selectors
  const LINK = 'a,button,.mag-btn,.nl,.ac-link,.clink,.md-link,.dl-resume,.sk-tags span,.about-badges span,.stat-pill,.theme-btn,.btn-hire,.f-links a,.proj-foot span,.exp-tools span';
  const CARD = '.tilt-card,.sk-card,.edu-card,.exp-card,.proj-card';
  const TEXT = 'input,textarea';

  function setState(dot, ring, cls){
    dot.classList.remove('hov-link','hov-card','hov-text');
    ring.classList.remove('hov-link','hov-card','hov-text');
    if (cls){ dot.classList.add(cls); ring.classList.add(cls); }
  }

  document.addEventListener('mouseover', e => {
    if      (e.target.closest(TEXT)) setState(dot, ring, 'hov-text');
    else if (e.target.closest(LINK)) setState(dot, ring, 'hov-link');
    else if (e.target.closest(CARD)) setState(dot, ring, 'hov-card');
    else                             setState(dot, ring, null);
  });
  document.addEventListener('mouseout', () => setState(dot, ring, null));

  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking'); ring.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking'); ring.classList.remove('clicking');
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.add('gone'); ring.classList.add('gone');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('gone'); ring.classList.remove('gone');
  });
})();
