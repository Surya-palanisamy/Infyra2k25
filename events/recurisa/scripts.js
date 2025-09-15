/* ---------- utilities ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- typed terminal line ---------- */
const typed = $('#typed-line');
const lines = [
  './recursia --start',
  'Initializing polymorphic recall...',
  'Loading recursive challenges...',
  'Ready. Teams: submit your entry.',
];
let li = 0, char = 0;
function typeLoop() {
  const line = lines[li];
  if (!line) return;
  if (char <= line.length) {
    typed.textContent = line.slice(0, char);
    char++;
    setTimeout(typeLoop, 40 + Math.random()*40);
  } else {
    setTimeout(() => {
      char = 0; li = (li+1) % lines.length;
      typeLoop();
    }, 1200);
  }
}
document.addEventListener('DOMContentLoaded', () => typeLoop());

/* ---------- floating code snippets background ---------- */
const snippets = [
  "for (let i=0;i<n;i++){}",
  "def recurse(n): return recurse(n-1)",
  "if (a && b) solve();",
  "while(true) { optimize(); }",
  "console.log('Recursia')",
  "function polymorph(){ return recall(); }",
  "map(filter(arr, f), g)",
  "memoize(fn)",
  "tailCall(fn, args)",
  "/* Big-O: O(n log n) */",
  "let ans = fib(n)",
  "try{ run(); }catch(e){ /* debug */ }",
  "// TODO: optimize recursion",
  "-> pseudocode: recurse(x) { if x==0 return }"
];

const bg = document.getElementById('code-bg');
const S = Math.min(window.innerWidth, 1400);
const count = Math.round((window.innerWidth*window.innerHeight)/70000); // scale with viewport
function makeSnippet(i){
  const el = document.createElement('div');
  el.className = 'snip';
  el.textContent = snippets[Math.floor(Math.random()*snippets.length)];
  const size = (10 + Math.random()*14).toFixed(1);
  el.style.fontSize = size + 'px';
  const left = Math.random()*100;
  const top = (60 + Math.random()*40); // start below fold so they float up
  el.style.left = left + 'vw';
  el.style.top = top + 'vh';
  const dur = (18 + Math.random()*26).toFixed(1);
  el.style.animation = `floatUp ${dur}s linear infinite`;
  // color variation
  const r = Math.random();
  if (r < 0.36) el.style.color = 'rgba(62, 249, 180, 0.93)'; // mint
  else if (r < 0.72) el.style.color = 'rgba(255, 79, 217, 0.9)'; // pink
  else el.style.color = 'rgba(58, 0, 134, 0.85)'; // indigo
  el.style.transform = `translateZ(0) rotate(${(-10 + Math.random()*20).toFixed(1)}deg)`;
  bg.appendChild(el);
  // random delay offset
  el.style.animationDelay = (-Math.random()*dur).toFixed(1)+'s';
  return el;
}
let snips = [];
function initSnips(){
  bg.innerHTML = '';
  snips = Array.from({length: Math.max(18, count)}, (_,i)=> makeSnippet(i));
}
initSnips();
window.addEventListener('resize', () => { clearTimeout(window._rs); window._rs = setTimeout(initSnips,250); });

/* ---------- hamburger/mobile menu ---------- */
const ham = $('#hamburger');
const nav = $('#main-nav');
ham?.addEventListener('click', () => {
  const open = ham.getAttribute('aria-expanded') === 'true';
  ham.setAttribute('aria-expanded', (!open).toString());
  nav.style.display = open ? 'none' : 'flex';
  nav.style.flexDirection = 'column';
  nav.style.gap = '8px';
  nav.style.padding = '12px';
  nav.style.background = 'linear-gradient(180deg, rgba(11,8,22,0.9), rgba(11,8,22,0.6))';
});

/* ---------- smooth scroll anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length>1) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      if (window.innerWidth < 760) { nav.style.display = 'none'; ham.setAttribute('aria-expanded','false'); }
    }
  });
});

/* ---------- accordion ---------- */
$$('[data-acc] .acc-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const panel = btn.nextElementSibling;
    const open = panel.style.display === 'block';
    // close all
    $$('.acc-panel').forEach(p=> p.style.display = 'none');
    if (!open) panel.style.display = 'block';
  });
});

/* ---------- poster console reveal modal ---------- */
const openConsoleBtn = $('#openConsoleBtn');
const posterModal = $('#posterModal');
const modalConsole = $('#modalConsole');
const closeModal = $('#closeModal');
const liveConsole = $('#console');

function streamLines(targetEl, lines, cbDelay=400){
  let idx=0;
  targetEl.innerHTML = '';
  function step(){
    if (idx >= lines.length) return;
    const line = lines[idx++];
    const row = document.createElement('div');
    row.className = 'c-line';
    targetEl.appendChild(row);
    let pos = 0;
    const typer = setInterval(() => {
      row.textContent = line.slice(0,pos);
      pos++;
      targetEl.scrollTop = targetEl.scrollHeight;
      if (pos > line.length){
        clearInterval(typer);
        setTimeout(step, cbDelay + Math.random()*300);
      }
    }, 18 + Math.random()*18);
  }
  step();
}

const posterLines = [
  '$ ./recursia --poster',
  'Loading assets...',
  'Applying neon-gradient... done',
  'Rendering recursion fractal... 73% ... 100%',
  'Polymorphic Recall — Recursia',
  'Date: 05 Oct 2025',
  'Location: Event Hall / Online',
  'Get ready to recurse. ♻️',
];

function streamLines(targetEl, lines, cbDelay=400, doneCallback){
    let idx=0;
    targetEl.innerHTML = '';
    function step(){
      if (idx >= lines.length) {
        if (doneCallback) doneCallback();
        return;
      }
      const line = lines[idx++];
      const row = document.createElement('div');
      row.className = 'c-line';
      targetEl.appendChild(row);
      let pos = 0;
      const typer = setInterval(() => {
        row.textContent = line.slice(0,pos);
        pos++;
        targetEl.scrollTop = targetEl.scrollHeight;
        if (pos > line.length){
          clearInterval(typer);
          setTimeout(step, cbDelay + Math.random()*300);
        }
      }, 18 + Math.random()*18);
    }
    step();
  }
  
  openConsoleBtn?.addEventListener('click', () => {
    posterModal.style.display = 'flex';
    posterModal.setAttribute('aria-hidden','false');
    modalConsole.innerHTML = '';
    const posterImg = posterModal.querySelector('img');
    posterImg.style.opacity = 0;
    streamLines(modalConsole, posterLines, 300, () => {
      posterImg.style.transition = 'opacity 1s ease';
      posterImg.style.opacity = 1;
    });
  });

// keyboard reveal R
document.addEventListener('keydown', (e)=>{
  if (e.key.toLowerCase() === 'r') {
    openConsoleBtn?.click();
  } else if (e.key === 'Escape') {
    posterModal.style.display = 'none';
    posterModal.setAttribute('aria-hidden','true');
  }
});

closeModal?.addEventListener('click', () => {
  posterModal.style.display = 'none';
  posterModal.setAttribute('aria-hidden','true');
});
posterModal?.addEventListener('click', (ev)=>{
  if (ev.target === posterModal) {
    posterModal.style.display = 'none';
    posterModal.setAttribute('aria-hidden','true');
  }
});
/*const posterLines = [
    '$ ./recursia --poster',
    'Loading assets...',
    'Applying neon-gradient... done',
    'Rendering recursion fractal... 73% ... 100%',
    'Polymorphic Recall — Recursia',
    'Date: 05 Oct 2025',
    'Location: Event Hall / Online',
    'Get ready to recurse. ♻️',
    '', // spacing
    "  ____                           _           ",
    " |  _ \\ ___  ___ _   _ _ __ ___ (_)_ __  ___ ",
    " | |_) / _ \\/ __| | | | '_ ` _ \\| | '_ \\/ __|",
    " |  _ <  __/ (__| |_| | | | | | | | | | \\__ \\",
    " |_| \\_\\___|\\___|\\__,_|_| |_| |_|_|_| |_|___/",
    ""
  ];*/


/* ---------- init footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();


/* ---------- intro animation ---------- */
const introOverlay = document.getElementById('introOverlay');
const introConsole = document.getElementById('introConsole');

const introLines = [
  '>> booting Recursia...',
  '>> loading polymorphic recall engine...',
  '>> initializing memory stack...',
  '>> system: ONLINE',
  '',
 
];

function runIntro() {
  let idx = 0;
  function step() {
    if (idx >= introLines.length) {
      setTimeout(() => {
        introOverlay.classList.add('fade-out');
      }, 200);
      return;
    }
    const row = document.createElement('div');
    row.textContent = '';
    introConsole.appendChild(row);
    let pos = 0;
    const typer = setInterval(() => {
      row.textContent = introLines[idx].slice(0, pos);
      pos++;
      if (pos > introLines[idx].length) {
        clearInterval(typer);
        idx++;
        setTimeout(step, 50);
      }
    }, 25);
  }
  step();
}

window.addEventListener('load', runIntro);
function runIntro() {
    let idx = 0;
    function step() {
      if (idx >= introLines.length) {
        setTimeout(() => {
          introOverlay.classList.add('fade-out');
          // 👇 After fade, reveal sections one by one
          setTimeout(() => {
            document.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 300);
            });
          }, 1000);
        }, 1000);
        return;
      }
      const row = document.createElement('div');
      row.textContent = '';
      introConsole.appendChild(row);
      let pos = 0;
      const typer = setInterval(() => {
        row.textContent = introLines[idx].slice(0, pos);
        pos++;
        if (pos > introLines[idx].length) {
          clearInterval(typer);
          idx++;
          setTimeout(step, 400);
        }
      }, 25);
    }
    step();
  }