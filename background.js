// background.js - MentiChecker Background Service Worker
// Bypasses page Content Security Policy (CSP) and proxies Gemini API calls

chrome.runtime.onMessage.addListener
(
  (request, sender, sendResponse) =>
  {
    if (request.type === 'SOLVE_ALL_IN_ONE')
    {
      handleSolveAllInOne(request)
        .then(res => sendResponse(res))
        .catch(err => sendResponse({ success: false, error: err.message }));
      return true; // Keep channel open for async response
    }
    if (request.type === 'SOLVE_BATCH')
    {
      handleBatchSolve(request)
        .then(res => sendResponse(res))
        .catch(err => sendResponse({ success: false, error: err.message }));
      return true;
    }
    if (request.type === 'SOLVE_GEMINI')
    {
      handleGeminiSolve(request)
        .then(res => sendResponse(res))
        .catch(err => sendResponse({ success: false, error: err.message }));
      return true;
    }
    if (request.type === 'TEST_KEY')
    {
      testGeminiKey(request.key)
        .then(res => sendResponse(res))
        .catch(err => sendResponse({ success: false, error: err.message }));
      return true;
    }
  }
);

function sanitizeKey(raw)
{
  if (!raw) return '';
  return String(raw)
    .trim()
    .replace(/^bearer\s+/i, '')
    .replace(/^key=/i, '')
    .replace(/^["'`]|["'`]$/g, '')
    .trim();
}

let cachedWorkingModel = null;
const bannedModels = new Set
(
  [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-lite',
    'gemini-3.1-flash-lite'
  ]
);

async function getCandidateModels(cleanKey)
{
  if (cachedWorkingModel && !bannedModels.has(cachedWorkingModel)) return [cachedWorkingModel, 'gemini-2.0-flash', 'gemini-1.5-flash'].filter(m => !bannedModels.has(m));

  const preferred =
  [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-1.5-pro'
  ];

  try
  {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(cleanKey)}`);
    if (resp.ok)
    {
      const data = await resp.json();
      const available = (data.models || [])
        .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
        .map(m => (m.name || '').replace(/^models\//, ''))
        .filter(m => m && !m.includes('2.5') && !m.includes('2.0-flash-lite') && !bannedModels.has(m));

      console.log('[MentiChecker] API reports available safe models:', available);

      const ordered = [];
      for (const p of preferred)
      {
        const match = available.find(m => m === p || m.startsWith(p));
        if (match && !ordered.includes(match)) ordered.push(match);
      }
      for (const m of available) { if (!ordered.includes(m) && m.includes('flash')) ordered.push(m); }
      for (const m of available) { if (!ordered.includes(m) && m.includes('gemini')) ordered.push(m); }
      if (ordered.length > 0)
      {
        cachedWorkingModel = ordered[0];
        return ordered;
      }
    }
  }
  catch (e)
  {
    console.warn('[MentiChecker] Could not query ListModels:', e);
  }

  return ['gemini-2.0-flash', 'gemini-1.5-flash'];
}

async function testGeminiKey(rawKey)
{
  const cleanKey = sanitizeKey(rawKey);
  if (!cleanKey) return { success: false, error: 'No API key entered' };

  cachedWorkingModel = null;
  const models = await getCandidateModels(cleanKey);
  let lastError = null;

  for (const model of models)
  {
    try
    {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      const resp = await fetch
      (
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify
          (
            {
              contents: [{ parts: [{ text: 'Ping' }] }],
              generationConfig: { maxOutputTokens: 8 }
            }
          )
        }
      );

      if (!resp.ok)
      {
        let msg = `HTTP ${resp.status}`;
        try
        {
          const errData = await resp.json();
          if (errData?.error?.message) msg += ` (${errData.error.message})`;
        }
        catch (e)
        {
          const t = await resp.text();
          if (t) msg += ` (${t.slice(0, 100)})`;
        }
        throw new Error(msg);
      }

      const data = await resp.json();
      if (data?.candidates?.[0])
      {
        cachedWorkingModel = model;
        return { success: true, model };
      }
    }
    catch (e)
    {
      lastError = e.message;
    }
  }

  return { success: false, error: lastError || 'Could not connect to Gemini API' };
}

/* -- 1-REQUEST MASTER SOLVER (Solves ALL questions in a single 1.5s call!) -- */
async function handleSolveAllInOne({ key, questions })
{
  const cleanKey = sanitizeKey(key);
  if (!cleanKey) return { success: false, error: 'No API key provided' };
  if (!questions || !questions.length) return { success: true, letters: [] };

  const qBlocks = questions.map
  (
    (q, idx) =>
    {
      const choicesText = (q.choices || []).map
      (
        (ch, ci) =>
        {
          const letter = String.fromCharCode(65 + ci);
          return `${letter}) ${ch}`;
        }
      ).join('\n');
      return `[Question ${idx + 1}]\n${q.question || 'Select best option'}\n${choicesText}`;
    }
  ).join('\n\n');

  const prompt =
    `You are an authoritative expert exam solver. Be technically precise and 100% accurate.\n` +
    `Solve all ${questions.length} multiple-choice questions below.\n` +
    `For each question from 1 to ${questions.length}, select the single strictly correct option (A, B, C, or D).\n\n` +
    `OUTPUT FORMAT:\n` +
    `Output the answers as a numbered list with ONLY the question number and correct uppercase letter, for example:\n` +
    `1. A\n` +
    `2. B\n` +
    `3. C\n` +
    `...\n` +
    `Do not write any explanations or Markdown formatting. Output ONLY the list.\n\n` +
    `Questions:\n\n${qBlocks}\n\n` +
    `Answers:`;

  const models = await getCandidateModels(cleanKey);
  let lastError = null;

  for (const model of models)
  {
    if (bannedModels.has(model)) continue;
    try
    {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      const resp = await fetch
      (url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify
          (
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 256, temperature: 0.0 }
            }
          )
        }
      );

      if (!resp.ok)
      {
        let msg = `HTTP ${resp.status}`;
        let isDailyLimit = false;
        try
        {
          const errData = await resp.json();
          if (errData?.error?.message)
          {
            msg += ` (${errData.error.message})`;
            if (errData.error.message.includes('per day') || errData.error.message.includes('15h') || errData.error.message.includes('ResourceExhausted')) isDailyLimit = true;
          }
        } catch { }

        if (resp.status === 404 || msg.includes('404') || msg.includes('no longer available') || msg.includes('not found'))
        {
          console.warn(`[MentiChecker BG] Model ${model} is dead/404. Banning for session.`);
          bannedModels.add(model);
          if (cachedWorkingModel === model) cachedWorkingModel = null;
          continue; // Try next model immediately!
        }

        if (resp.status === 429)
        {
          if (isDailyLimit || msg.includes('limit: 20') || msg.includes('per day'))
          {
            console.warn(`[MentiChecker BG] Model ${model} daily quota exhausted. Banning for session.`);
            bannedModels.add(model);
            if (cachedWorkingModel === model) cachedWorkingModel = null;
            continue; // Try next model immediately!
          }

          console.warn(`[MentiChecker BG] Rate limited on ${model}, retrying in 1s...`);
          await new Promise(r => setTimeout(r, 1000));
          const retryResp = await fetch
          (url,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify
              (
                {
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: { maxOutputTokens: 256, temperature: 0.0 }
                }
              )
            }
          );
          
          if (retryResp.ok)
          {
            const data = await retryResp.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (rawText)
            {
              cachedWorkingModel = model;
              const letters = parseAllInOneAnswers(rawText, questions.length);
              return { success: true, letters, rawText, model };
            }
          }
        }

        throw new Error(msg);
      }

      const data = await resp.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (rawText)
      {
        cachedWorkingModel = model;
        const letters = parseAllInOneAnswers(rawText, questions.length);
        return { success: true, letters, rawText, model };
      }
    }
    catch (e)
    {
      lastError = e.message;
      if (e.message.includes('429') && (e.message.includes('per day') || e.message.includes('quota')))
      {
        bannedModels.add(model);
        if (cachedWorkingModel === model) cachedWorkingModel = null;
      }
      console.warn(`[MentiChecker BG] 1-request model ${model} failed:`, e);
    }
  }

  return { success: false, error: lastError || 'All models failed 1-request solve' };
}

function parseAllInOneAnswers(rawText, count)
{
  if (!rawText) return [];

  const indexed = new Array(count).fill(null);
  let indexedCount = 0;

  // 1. Line-by-line pattern: "1. A", "1: A", "Q1: A", "Question 1: A", "1) A"
  const lines = rawText.split('\n');
  for (const line of lines)
  {
    const m = line.match(/(?:^|\b)(?:Q|Question|\[)?\s*(\d+)[\.\:\)\s\]\-]+([A-H])\b/i);
    if (m)
    {
      const qNum = parseInt(m[1], 10);
      const letter = m[2].toUpperCase();
      if (qNum >= 1 && qNum <= count && !indexed[qNum - 1])
      {
        indexed[qNum - 1] = letter;
        indexedCount++;
      }
    }
  }

  if (indexedCount === count) return indexed;

  // 2. Comma or space separated letters: "A, B, C, D" or "A B C D"
  const tokens = rawText.replace(/[^A-Ha-h\s,]/g, ' ').split(/[\s,]+/).filter(t => /^[A-Ha-h]$/.test(t));
  if (tokens.length >= count) return tokens.slice(0, count).map(t => t.toUpperCase());

  // 3. Direct sequence of letters (e.g. "ABBCDCDC")
  const stripped = rawText.replace(/(?:answers?|options?|questions?|solutions?|output|correct)[\s:]*/gi, '').trim();

  const lettersOnly = stripped.replace(/[^A-H]/gi, '').toUpperCase().split('');
  if (lettersOnly.length >= count) return lettersOnly.slice(0, count);
  if (indexedCount > 0) return indexed;

  return lettersOnly;
}

/* -- SINGLE QUESTION SOLVER -- */
async function handleGeminiSolve({ key, question, choices })
{
  const cleanKey = sanitizeKey(key);
  if (!cleanKey) return { success: false, error: 'No API key provided' };

  // Clean choice texts (strip leading A), B), 1. etc)
  const cleanChoices = (choices || []).map
  (
    (c, i) =>
    {
      const raw = typeof c === 'string' ? c : (c?.text || '');
      const stripped = raw.replace(/^[A-Z0-9][).\s:-]+/i, '').trim();
      return String.fromCharCode(65 + i) + ') ' + stripped;
    }
  );

  const prompt =
    'You are an authoritative expert exam and quiz solver. Be technically precise and 100% accurate.\n' +
    'Analyze the question and all choices carefully.\n' +
    'Identify the single strictly correct option (or the best recommended answer if a survey/poll).\n' +
    'CRITICAL: Return ONLY the single uppercase letter of the correct choice (A, B, C, or D). Absolutely no other words, punctuation, or explanations.\n\n' +
    'Question:\n' + (question || 'Select the best option') + '\n\n' +
    'Choices:\n' + cleanChoices.join('\n') + '\n\n' +
    'Answer:';

  const models = await getCandidateModels(cleanKey);
  let lastError = null;

  for (const model of models)
  {
    if (bannedModels.has(model)) continue;
    try
    {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      const resp = await fetch
      (url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify
          (
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 16, temperature: 0.0 }
            }
          )
        }
      );

    if (!resp.ok)
    {
      let msg = `HTTP ${resp.status}`;
      let isDailyLimit = false;
      try
      {
          const errData = await resp.json();
          if (errData?.error?.message)
          {
            msg += ` (${errData.error.message})`;
            if (errData.error.message.includes('per day') || errData.error.message.includes('15h') || errData.error.message.includes('ResourceExhausted')) isDailyLimit = true;
          }
        }
        catch
        {
          const t = await resp.text();
          if (t) msg += ` (${t.slice(0, 100)})`;
        }

        if (resp.status === 404 || msg.includes('404') || msg.includes('no longer available') || msg.includes('not found'))
        {
          console.warn(`[MentiChecker BG] Model ${model} is dead/404. Banning for session.`);
          bannedModels.add(model);
          if (cachedWorkingModel === model) cachedWorkingModel = null;
          continue;
        }

        if (resp.status === 429)
        {
          if (isDailyLimit || msg.includes('limit: 20') || msg.includes('per day'))
          {
            console.warn(`[MentiChecker BG] Model ${model} daily quota exhausted. Banning for session.`);
            bannedModels.add(model);
            if (cachedWorkingModel === model) cachedWorkingModel = null;
            continue;
          }

          console.warn(`[MentiChecker BG] Rate limited on ${model}, retrying in 1s...`);
          await new Promise(r => setTimeout(r, 1000));
          const retryResp = await fetch
          (
            url,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify
              (
                {
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: { maxOutputTokens: 16, temperature: 0.0 }
                }
              )
            }
          );
          if (retryResp.ok)
          {
            const data = await retryResp.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (text)
            {
              cachedWorkingModel = model;
              return { success: true, text: text.trim(), model };
            }
          }
        }

        throw new Error(msg);
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text)
      {
        cachedWorkingModel = model;
        return { success: true, text: text.trim(), model };
      }
    }
    catch (e)
    {
      lastError = e.message;
      if (e.message.includes('429') && (e.message.includes('per day') || e.message.includes('quota')))
      {
        bannedModels.add(model);
        if (cachedWorkingModel === model) cachedWorkingModel = null;
      }
      console.warn(`[MentiChecker BG] Model ${model} failed:`, e);
    }
  }

  return { success: false, error: lastError || 'All models failed' };
}

/* -- BATCH SOLVER (FALLBACK) -- */
async function handleBatchSolve({ key, items })
{
  const cleanKey = sanitizeKey(key);
  if (!cleanKey) return { success: false, error: 'No API key provided' };
  if (!items || !items.length) return { success: true, answers: {} };

  const qBlocks = items.map
  (
    (it) =>
    {
      const cleanChoices = (it.choices || []).map
      (
        (c, i) =>
        {
          const raw = typeof c === 'string' ? c : (c?.text || '');
          const stripped = raw.replace(/^[A-Z0-9][).\s:-]+/i, '').trim();
          return String.fromCharCode(65 + i) + ') ' + stripped;
        }
      );
      return `[Q${it.id}] ${it.question || 'Select best option'}\n${cleanChoices.join('\n')}`;
    }
  );

  const prompt =
    'You are an authoritative expert exam solver. Be technically precise, 100% accurate, and fast.\n' +
    'For each question, return ONLY its question tag and single correct uppercase letter on a new line (e.g. "Q1: B" or "[Q1] B"). Absolutely no other text or explanations.\n\n' +
    qBlocks.join('\n\n') +
    '\n\nAnswers:';

  const models = await getCandidateModels(cleanKey);
  let lastError = null;

  for (const model of models)
  {
    try
    {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
      const resp = await fetch
      (
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify
          (
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: 256, temperature: 0.0 }
            }
          )
        }
      );

      if (!resp.ok)
      {
        let msg = `HTTP ${resp.status}`;
        try
        {
          const errData = await resp.json();
          if (errData?.error?.message) msg += ` (${errData.error.message})`;
        } catch (e) { }

        if (resp.status === 429)
        {
          console.warn(`[MentiChecker BG] Rate limited on batch ${model}, retrying in 1s...`);
          await new Promise(r => setTimeout(r, 1000));
          const retryResp = await fetch
          (
            url,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify
              (
                {
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: { maxOutputTokens: 256, temperature: 0.0 }
                }
              )
            }
          );

          if (retryResp.ok)
          {
            const data = await retryResp.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (rawText)
            {
              cachedWorkingModel = model;
              const answers = parseBatchAnswers(rawText, items);
              return { success: true, answers, model };
            }
          }
        }

        throw new Error(msg);
      }

      const data = await resp.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (rawText)
      {
        cachedWorkingModel = model;
        const answers = parseBatchAnswers(rawText, items);
        return { success: true, answers, model };
      }
    }
    catch (e)
    {
      lastError = e.message;
      console.warn(`[MentiChecker BG] Batch model ${model} failed:`, e);
    }
  }

  return { success: false, error: lastError || 'Batch solve failed' };
}

function parseBatchAnswers(rawText, items)
{
  const answers = {};
  const lines = rawText.split('\n');
  for (const line of lines)
  {
    const m = line.match(/(?:Q|\[Q)?(\d+)\]?[\s:\.\-]+([A-H])\b/i);
    if (m) answers[parseInt(m[1], 10)] = m[2].toUpperCase();
  }
  if (Object.keys(answers).length === 0)
  {
    const letterMatches = rawText.match(/\b([A-H])\b/g);
    if (letterMatches && letterMatches.length === items.length) items.forEach((it, idx) => { answers[it.id] = letterMatches[idx]; });
  }
  return answers;
}