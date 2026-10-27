// pageWorld.js - Runs in MAIN execution world (shares window & React state with menti.com)
(
  function ()
  {
    'use strict';

    function triggerReactComponentClick(element)
    {
      if (!element) return false;

      // Gather candidate elements (the element itself, closest button/label, inner elements)
      const candidates =
      [
        element,
        element.closest('button, [role="button"], label, a'),
        ...element.querySelectorAll('button, [role="button"], label, input, span')
      ].filter(Boolean);

      let reactHandled = false;

      for (const el of candidates)
      {
        // Unlock if disabled
        if (el.hasAttribute && el.hasAttribute('disabled'))
        {
          el.removeAttribute('disabled');
          try { el.disabled = false; } catch (e) {}
        }
        if (el.getAttribute && el.getAttribute('aria-disabled') === 'true') el.removeAttribute('aria-disabled');

        // 1. Direct React Fiber / Props access (React 16, 17, 18, 19)
        const propKey = Object.keys(el).find
        (
          k =>
            k.startsWith('__reactProps$') ||
            k.startsWith('__reactFiber$') ||
            k.startsWith('__reactInternalInstance$')
        );

        if (propKey && el[propKey])
        {
          const val = el[propKey];
          const props = val.memoizedProps || val;

          const fakeEvt =
          {
            preventDefault() {},
            stopPropagation() {},
            target: el,
            currentTarget: el,
            bubbles: true,
            cancelable: true,
            isTrusted: true
          };

          if (typeof props.onClick === 'function')
          {
            try
            {
              console.log('[MentiChecker MAIN] Directly invoking React props.onClick()');
              props.onClick(fakeEvt);
              reactHandled = true;
            }
            catch (err) { console.warn('[MentiChecker MAIN] React onClick error:', err); }
          }
          if (typeof props.onChange === 'function') try { props.onChange(fakeEvt); reactHandled = true; } catch (e) {}
          if (typeof props.onPointerDown === 'function') try { props.onPointerDown(fakeEvt); reactHandled = true; } catch (e) {}
          if (typeof props.onMouseDown === 'function') try { props.onMouseDown(fakeEvt); reactHandled = true; } catch (e) {}
        }

        // 2. Fiber parent chain traversal
        const fiberKey = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
        if (fiberKey && el[fiberKey])
        {
          let cur = el[fiberKey];
          let depth = 0;
          while (cur && depth < 6)
          {
            if (cur.memoizedProps && typeof cur.memoizedProps.onClick === 'function')
            {
              try
              {
                console.log('[MentiChecker MAIN] Invoking Fiber parent onClick() at depth', depth);
                cur.memoizedProps.onClick
                (
                  {
                    preventDefault() {},
                    stopPropagation() {},
                    target: el,
                    currentTarget: el,
                    bubbles: true,
                    cancelable: true,
                    isTrusted: true
                  }
                );
                reactHandled = true;
              }
              catch (err) {}
              break;
            }
            cur = cur.return;
            depth++;
          }
        }

        // Radio/checkbox input check
        if (el.tagName === 'INPUT' && (el.type === 'radio' || el.type === 'checkbox'))
        {
          try
          {
            el.checked = true;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
          catch (e) {}
        }
      }

      // 3. Main-world native Mouse & Pointer event sequence
      try
      {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const opts =
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          view: window,
          clientX: x,
          clientY: y,
          button: 0,
          buttons: 1
        };
        element.dispatchEvent(new PointerEvent('pointerdown', { ...opts, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
        element.dispatchEvent(new MouseEvent('mousedown', opts));
        element.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
        element.dispatchEvent(new MouseEvent('mouseup', { ...opts, buttons: 0 }));
        element.dispatchEvent(new MouseEvent('click', { ...opts, buttons: 0 }));
        element.click();
      }
      catch (e) { console.warn('[MentiChecker MAIN] Native click error:', e); }

      return reactHandled;
    }

    function handleTriggerClick(e)
    {
      try
      {
        const selector = e.detail?.selector || '[data-mc-answer="correct"]';
        const el = document.querySelector(selector);
        if (el) triggerReactComponentClick(el);
      }
      catch (err) { console.warn('[MentiChecker MAIN] MC_TRIGGER_CLICK handler error:', err); }
    }

    // Listen on BOTH document and window to guarantee reception across worlds
    document.addEventListener('MC_TRIGGER_CLICK', handleTriggerClick);
    window.addEventListener('MC_TRIGGER_CLICK', handleTriggerClick);

    console.log('[MentiChecker] Main world bridge initialized successfully.');
  }
)();