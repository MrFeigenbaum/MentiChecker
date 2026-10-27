/* popup.js - MentiChecker */

'use strict';

let allSlides = [];
let currentFilter = 'all';

const main = document.getElementById('main');
const stat = document.getElementById('stat');
const filters = document.getElementById('filters');
const footer = document.getElementById('footer');
const footerTxt = document.getElementById('footer-txt');

/* -- helpers -- */
function esc(s)
{
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripeClass(type)
{
  if (type === 'quiz-choice') return 'stripe-quiz';
  if (type === 'multiple-choice') return 'stripe-mc';
  if (type === 'heading' || type === 'free-text' || type === 'list') return 'stripe-info';
  return '';
}

function tagClass(type)
{
  if (type === 'quiz-choice') return 'tag-quiz';
  if (type === 'multiple-choice') return 'tag-mc';
  if (type === 'heading' || type === 'free-text' || type === 'list') return 'tag-info';
  return '';
}

function tagLabel(type)
{
  const MAP =
  {
    'quiz-choice': 'QUIZ',
    'multiple-choice': 'POLL',
    'heading': 'HEADING',
    'free-text': 'TEXT',
    'list': 'LIST',
    'word-cloud': 'WORD CLOUD',
    'open-ended': 'OPEN',
    'paragraph': 'SLIDE',
    'instructions': 'INTRO',
    'leaderboard': 'BOARD'
  };
  return MAP[type] ?? (type ?? 'SLIDE').toUpperCase();
}

/* -- states -- */
function showLoading() { main.innerHTML = '<div class="state"><div class="loader"></div><p>Scanning page\u2026</p></div>'; }

function showError(msg)
{
  main.innerHTML = '<div class="state"><div class="state-symbol">!</div><h2>Nothing found</h2><p>' + msg + '</p><button class="btn-scan" id="btn-retry">Try again</button></div>';
  document.getElementById('btn-retry')?.addEventListener('click', doScan);
}

function showEmpty() { main.innerHTML = '<div class="state"><div class="state-symbol">\u2014</div><h2>No slides here</h2><p>Try a different filter.</p></div>'; }

/* -- render -- */
function render(slides)
{
  if (!slides.length)
  {
    showEmpty();
    return;
  }

  const frag = document.createDocumentFragment();
  slides.forEach
  (
    (s, i) =>
    {
      const div = document.createElement('div');
      div.className = 'card' + (i < 2 ? ' open' : '');

      /* body content */
      let body = '';
      if (s.isInfo) body = '<div class="info-text">' + esc(s.content) + '</div>';
      else
      {
        let meta = '';
        if (s.countdown) meta += '<span class="meta-pill timer">' + s.countdown + 's</span>';
        if (s.scoring) meta += '<span class="meta-pill score">' + s.scoring.replace(/_/g, ' ') + '</span>';
        if (meta) body += '<div class="meta-row">' + meta + '</div>';

        s.choices.forEach
        (
          (c, idx) =>
          {
            const letter = String.fromCharCode(65 + idx);
            body += '<div class="choice"><span class="choice-num">' + letter + '</span><span class="choice-text">' + esc(c) + '</span></div>';
          }
        );
      }

      const stripe = stripeClass(s.slideType);
      const tag = tagClass(s.slideType);
      const label = tagLabel(s.slideType);
      const q = esc(s.question || s.title || '');

      div.innerHTML =
        '<div class="card-top">' +
        '<div class="card-stripe ' + stripe + '"></div>' +
        '<div class="card-middle">' +
        '<div class="card-tag ' + tag + '">' + label + '</div>' +
        '<div class="card-q">' + q + '</div>' +
        '</div>' +
        '<i class="card-chevron">&#9660;</i>' +
        '</div>' +
        '<div class="card-body">' + body + '</div>';

      div.querySelector('.card-top').addEventListener('click', () => div.classList.toggle('open'));
      frag.appendChild(div);
    }
  );

  main.innerHTML = '';
  main.appendChild(frag);
}

function applyFilter(f)
{
  currentFilter = f;
  const out = f === 'all' ? allSlides :
    f === 'quiz' ? allSlides.filter(s => s.slideType === 'quiz-choice') :
      f === 'mc' ? allSlides.filter(s => s.slideType === 'multiple-choice') :
        f === 'info' ? allSlides.filter(s => s.isInfo) :
          allSlides;
  render(out);
}

/* -- page extraction (runs in page context) -- */
function extractFromPage()
{
  function getSlideDeck()
  {
    const scripts = Array.from(document.querySelectorAll('script'));
    for (const sc of scripts)
    {
      const txt = sc.textContent || '';
      if (!txt.includes('slideDeck')) continue;
      /* collect self.__next_f.push([1,"..."]) chunks */
      const re = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
      let m, combined = '';
      while ((m = re.exec(txt)) !== null)
      {
        try { combined += JSON.parse('"' + m[1] + '"'); }
        catch (e) { combined += m[1]; }
      }
      const start = combined.indexOf('{"slideDeck":');
      if (start === -1) continue;
      /* balanced brace walk */
      let d = 0, str = false, esc = false, end = -1;
      for (let i = start; i < combined.length; i++)
      {
        const c = combined[i];
        if (esc)
        {
          esc = false;
          continue;
        }
        if (c === '\\')
        {
          esc = true;
          continue;
        }
        if (c === '"')
        {
          str = !str;
          continue;
        }
        if (!str)
        {
          if (c === '{') d++;
          else if (c === '}' && --d === 0)
          {
            end = i + 1;
            break;
          }
        }
      }
      if (end === -1) continue;
      try { return JSON.parse(combined.slice(start, end)); }
      catch (e) {}
    }
    return null;
  }

  const raw = getSlideDeck();
  if (!raw) return [];

  function extractText(n)
  {
    if (!n) return [];
    if (typeof n === 'string') return [n];
    if (Array.isArray(n)) return n.flatMap(extractText);
    if (n.type === 'text' && n.text) return [n.text];
    return Object.values(n).flatMap(extractText);
  }

  const result = [];
  const SKIP = ['Open-ended choice', 'Word cloud choice'];

  for (const slide of (raw.slideDeck?.slides ?? []))
  {
    const type = slide?.staticContent?.type ?? 'unknown';
    const title = slide?.title ?? '';
    const items = slide?.interactiveContents ?? [];

    for (const item of items)
    {
      const choices = (item?.choices ?? []).map(c => c.title ?? '').filter(Boolean);
      if (!choices.length) continue;
      if (choices.length === 1 && SKIP.some(s => choices[0].includes(s.split(' ')[0]))) continue;
      result.push
      (
        {
          slideType: type,
          question: item.title ?? title,
          choices,
          countdown: item.countdown ?? null,
          scoring: item.scoring ?? null,
        }
      );
    }

    if (!items.length && ['heading', 'free-text', 'list'].includes(type))
    {
      const sc = slide.staticContent ?? {};
      const parts = [];
      if (sc.heading) parts.push(sc.heading);
      if (sc.subheading) parts.push(sc.subheading);
      (sc.list?.items ?? []).forEach(it => parts.push('- ' + (it.content ?? '')));
      if (sc.styledColumns) parts.push(...extractText(sc.styledColumns).filter(t => t.trim()).slice(0, 4));
      if (parts.length) result.push({ slideType: type, isInfo: true, title, content: parts.join(' | ') });
    }
  }
  return result;
}

/* -- scan -- */
function doScan()
{
  showLoading();
  filters.style.display = 'none';
  footer.style.display = 'none';
  stat.style.display = 'none';

  chrome.tabs.query
  (
    { active: true, currentWindow: true }, tabs =>
    {
      const tab = tabs[0];
      if (!tab?.url?.includes('menti.com'))
      {
        showError('Navigate to a <strong>menti.com</strong> page first.');
        return;
      }
      chrome.scripting.executeScript
      (
        { target: { tabId: tab.id }, func: extractFromPage }, res =>
        {
          if (chrome.runtime.lastError)
          {
            showError('Script error: ' + chrome.runtime.lastError.message);
            return;
          }
          const slides = res?.[0]?.result ?? [];
          if (!slides.length)
          {
            showError('No slide data found.<br>Make sure the page has fully loaded.');
            return;
          }
          allSlides = slides;
          const qCount = slides.filter(s => !s.isInfo).length;

          stat.textContent = qCount + ' Q / ' + slides.length + ' slides';
          stat.style.display = '';
          filters.style.display = 'flex';
          footer.style.display = 'flex';
          footerTxt.textContent = qCount + ' interactive, ' + (slides.length - qCount) + ' info';

          /* wire filter buttons once */
          document.querySelectorAll('.f-btn').forEach
          (
            btn =>
            {
              btn.addEventListener
              (
                'click', () =>
                {
                  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
                  btn.classList.add('active');
                  applyFilter(btn.dataset.filter);
                }
              );
            }
          );

          /* reset filter state */
          document.querySelector('.f-btn[data-filter="all"]').classList.add('active');
          currentFilter = 'all';
          applyFilter('all');
        }
      );
    }
  );
}

/* -- auto-answer toggle -- */
const btnAutoToggle = document.getElementById('btn-auto-toggle');

function updatePopupAutoUI(enabled)
{
  if (!btnAutoToggle) return;
  if (enabled)
  {
    btnAutoToggle.className = 'auto-btn on';
    btnAutoToggle.textContent = 'AUTO ON';
    btnAutoToggle.title = 'Auto-answer on presentation slide is ENABLED (0.5s–1.5s delay). Click to disable';
  }
  else
  {
    btnAutoToggle.className = 'auto-btn off';
    btnAutoToggle.textContent = 'AUTO OFF';
    btnAutoToggle.title = 'Auto-answer on presentation slide is DISABLED. Click to enable';
  }
}

if (typeof chrome !== 'undefined' && chrome.storage?.local)
{
  chrome.storage.local.get
  (
    ['mc_autosel'], (data) =>
    {
      const isAuto = data.mc_autosel !== false;
      updatePopupAutoUI(isAuto);
    }
  );
}

btnAutoToggle?.addEventListener
(
  'click', () =>
  {
    if (typeof chrome !== 'undefined' && chrome.storage?.local)
    {
      chrome.storage.local.get
      (
        ['mc_autosel'], (data) =>
        {
          const next = data.mc_autosel === false;
          chrome.storage.local.set({ mc_autosel: next });
          updatePopupAutoUI(next);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { if (tabs[0]?.id) chrome.tabs.sendMessage(tabs[0].id, { type: 'SET_AUTO_SEL', value: next }).catch(() => {}); });
        }
      );
    }
  }
);

/* -- init -- */
document.getElementById('btn-scan')?.addEventListener('click', doScan);
document.getElementById('btn-rescan')?.addEventListener('click', doScan);

chrome.tabs.query({ active: true, currentWindow: true }, tabs => { if (tabs[0]?.url?.includes('menti.com')) doScan(); });