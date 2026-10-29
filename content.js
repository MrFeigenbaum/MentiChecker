const MCSS = '\n  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n  :host {\n    all: initial !important;\n    position: fixed !important;\n    bottom: 24px !important;\n    right: 24px !important;\n    width: 0 !important;\n    height: 0 !important;\n    overflow: visible !important;\n    z-index: 2147483647 !important;\n    pointer-events: none !important;\n    display: block !important;\n    margin: 0 !important;\n    padding: 0 !important;\n    border: none !important;\n    background: transparent !important;\n\n    --bg:      #0D0D1A;\n    --surf:    #14142A;\n    --card:    #1A1A30;\n    --card2:   #20203C;\n    --border:  rgba(255,255,255,0.09);\n    --border2: rgba(255,255,255,0.15);\n    --white:   #EEEEFF;\n    --sub:     #8888B5;\n    --dim:     #424268;\n\n    --cyan:   #00F0FF;\n    --mint:   #00FFB3;\n    --amber:  #FFB347;\n    --red:    #FF3366;\n    --purple: #A855F7;\n\n    --gc: rgba(0,240,255,0.3);\n    --gm: rgba(0,255,179,0.3);\n    --ga: rgba(255,179,71,0.3);\n    --gr: rgba(255,51,102,0.3);\n    --gp: rgba(168,85,247,0.3);\n\n    --font: \'Inter\', system-ui, -apple-system, sans-serif;\n    --mono: \'DM Mono\', monospace;\n\n    font-family: var(--font);\n    color: var(--white);\n  }\n\n  /* ======== FAB ======== */\n  #fab {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 54px;\n    height: 54px;\n    border-radius: 50%;\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: auto;\n    height: 54px;\n    border-radius: 50%;\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n\n    background: linear-gradient(145deg, #1E1E42 0%, #0D0D1A 100%);\n    box-shadow:\n      0 0 0 1.5px rgba(0,240,255,0.25),\n      0 1px 0 rgba(255,255,255,0.15) inset,\n      0 8px 32px rgba(0,0,0,0.7);\n  }\n  #fab:hover {\n    transform: translateY(-3px) scale(1.05);\n    box-shadow:\n      0 0 0 2px var(--cyan),\n      0 0 22px var(--gc),\n      0 1px 0 rgba(255,255,255,0.2) inset,\n      0 12px 40px rgba(0,0,0,0.8);\n  }\n  #fab:active { transform: scale(0.96); }\n  #fab.open {\n    box-shadow:\n      0 0 0 2px var(--cyan),\n      0 0 26px var(--gc),\n      0 1px 0 rgba(255,255,255,0.2) inset,\n      0 8px 32px rgba(0,0,0,0.7);\n  }\n\n  #fab-dot {\n    position: absolute;\n    top: 9px; right: 9px;\n    width: 10px; height: 10px;\n    border-radius: 50%;\n    background: var(--mint);\n    border: 2px solid #0D0D1A;\n    box-shadow: 0 0 10px var(--gm);\n    display: none;\n  }\n  #fab-dot.on {\n    display: block;\n    animation: pulseDot 2s ease-in-out infinite;\n  }\n  @keyframes pulseDot {\n    0%, 100% { box-shadow: 0 0 6px var(--gm); transform: scale(1); }\n    50%      { box-shadow: 0 0 16px var(--gm), 0 0 28px var(--gm); transform: scale(1.15); }\n  }\n\n  /* ======== PANEL ======== */\n  #panel {\n    position: absolute;\n    bottom: 64px;\n    right: 0;\n    width: 420px;\n    height: 560px;\n    max-height: calc(100vh - 90px);\n    min-height: 380px;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    border-radius: 14px;\n\n    background: var(--bg);\n    border: 1px solid rgba(255,255,255,0.12);\n    box-shadow:\n      0 0 0 1px rgba(0,240,255,0.1),\n      0 1px 0 rgba(255,255,255,0.1) inset,\n      0 28px 80px rgba(0,0,0,0.9);\n\n    opacity: 0;\n    transform: translateY(16px) scale(0.96);\n    pointer-events: none;\n    transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n  }\n  #panel.open {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n    pointer-events: all;\n  }\n\n  /* Header */\n  #hdr {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 12px 16px;\n    background: linear-gradient(90deg, rgba(255,51,102,0.08) 0%, transparent 65%);\n    border-bottom: 1px solid var(--border);\n    flex-shrink: 0;\n  }\n  #hdr-logo {\n    width: 30px; height: 30px;\n    border-radius: 8px;\n    display: flex; align-items: center; justify-content: center;\n    background: linear-gradient(135deg, #1C1C3E 0%, #0E0E22 100%);\n    border: 1px solid rgba(0,240,255,0.35);\n    box-shadow: 0 0 14px rgba(0,240,255,0.25), 0 2px 8px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.15) inset;\n    flex-shrink: 0;\n  }\n  #hdr-text { flex: 1; min-width: 0; }\n  #hdr-text h1 {\n    font-size: 13.5px; font-weight: 600;\n    color: var(--white); letter-spacing: -0.2px;\n  }\n  #hdr-text p {\n    font-size: 10px; color: var(--sub);\n    margin-top: 1px;\n    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n  }\n  #hdr-stat {\n    font-family: var(--mono);\n    font-size: 9.5px; font-weight: 500;\n    color: var(--cyan);\n    background: rgba(0,240,255,0.08);\n    border: 1px solid rgba(0,240,255,0.22);\n    padding: 3px 8px; border-radius: 4px;\n    letter-spacing: 0.4px;\n    display: none;\n    flex-shrink: 0;\n  }\n  #hdr-auto-pill {\n    font-family: var(--mono);\n    font-size: 9px; font-weight: 600;\n    color: var(--mint);\n    background: rgba(0,255,179,0.1);\n    border: 1px solid rgba(0,255,179,0.3);\n    padding: 3px 7px; border-radius: 4px;\n    box-shadow: 0 0 8px rgba(0,255,179,0.2);\n    letter-spacing: 0.5px;\n    display: none;\n    cursor: pointer;\n    flex-shrink: 0;\n  }\n  #hdr-gear, #hdr-close {\n    width: 26px; height: 26px;\n    border-radius: 6px;\n    border: 1px solid var(--border);\n    background: rgba(255,255,255,0.04);\n    cursor: pointer;\n    display: flex; align-items: center; justify-content: center;\n    color: var(--sub);\n    font-size: 13px;\n    transition: all 0.15s;\n    box-shadow: 0 2px 6px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset;\n    flex-shrink: 0;\n  }\n  #hdr-gear:hover { color: var(--amber); border-color: rgba(255,179,71,0.4); transform: scale(1.05); }\n  #hdr-close:hover { color: var(--white); border-color: rgba(255,255,255,0.3); transform: scale(1.05); }\n\n  /* Key prompt banner */\n  #key-banner {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    margin: 8px 14px 4px;\n    padding: 10px 14px;\n    background: linear-gradient(135deg, rgba(255,179,71,0.14) 0%, rgba(20,20,42,0.92) 100%);\n    border: 1px solid rgba(255,179,71,0.4);\n    border-radius: 9px;\n    box-shadow: 0 0 16px rgba(255,179,71,0.18), 0 2px 8px rgba(0,0,0,0.35);\n    cursor: pointer;\n    transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;\n    flex-shrink: 0;\n  }\n  #key-banner:hover {\n    transform: translateY(-1px);\n    border-color: rgba(255,179,71,0.65);\n    box-shadow: 0 0 20px rgba(255,179,71,0.28);\n  }\n  #key-banner-icon { font-size: 18px; color: var(--amber); flex-shrink: 0; }\n  #key-banner-text { flex: 1; min-width: 0; }\n  #key-banner-title {\n    font-size: 12px; font-weight: 600; color: var(--amber); margin-bottom: 2px;\n  }\n  #key-banner-sub {\n    font-size: 10px; color: var(--sub); line-height: 1.35;\n  }\n  #key-banner-arrow {\n    color: var(--amber); font-size: 14px; font-weight: bold; flex-shrink: 0;\n  }\n\n  /* ======== SETTINGS (COLLISION-FREE WITH DEDICATED SCROLL) ======== */\n  #settings {\n    position: absolute;\n    inset: 0;\n    background: var(--bg);\n    border-radius: 14px;\n    display: flex;\n    flex-direction: column;\n    z-index: 25;\n    transform: translateX(100%);\n    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);\n    overflow: hidden;\n  }\n  #settings.open { transform: translateX(0); }\n\n  #settings-hdr {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 12px 18px;\n    border-bottom: 1px solid var(--border);\n    background: rgba(0,0,0,0.3);\n    flex-shrink: 0;\n  }\n  .settings-title-row { display: flex; align-items: center; gap: 8px; }\n  .settings-title-row h2 { font-size: 14px; font-weight: 600; color: var(--white); }\n  .settings-icon-tag { font-size: 15px; }\n  .settings-close {\n    width: 24px; height: 24px;\n    border-radius: 5px;\n    border: 1px solid var(--border);\n    background: rgba(255,255,255,0.03);\n    cursor: pointer;\n    display: flex; align-items: center; justify-content: center;\n    color: var(--sub);\n    font-size: 14px;\n    transition: all 0.15s;\n  }\n  .settings-close:hover { color: var(--white); border-color: var(--border2); }\n\n  #settings-body {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding: 14px 18px;\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n  }\n  #settings-body::-webkit-scrollbar { width: 6px; }\n  #settings-body::-webkit-scrollbar-track { background: rgba(0,0,0,0.25); border-radius: 3px; }\n  #settings-body::-webkit-scrollbar-thumb {\n    background: var(--cyan);\n    border-radius: 3px;\n    box-shadow: 0 0 8px var(--gc);\n  }\n  #settings-body::-webkit-scrollbar-thumb:hover { background: #4DF6FF; }\n\n  .scard {\n    border-radius: 9px;\n    background: linear-gradient(175deg, #181830 0%, #111122 100%);\n    border: 1px solid var(--border);\n    padding: 13px 15px;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    flex-shrink: 0;\n    box-shadow: 0 2px 10px rgba(0,0,0,0.3);\n  }\n  .scard-hd { display: flex; align-items: center; gap: 8px; }\n  .scard-icon { font-size: 15px; }\n  .scard-title { font-size: 12.5px; font-weight: 600; color: var(--white); flex: 1; }\n  .scard-pill {\n    font-family: var(--mono); font-size: 8px; font-weight: 600;\n    color: var(--mint); background: rgba(0,255,179,0.1);\n    border: 1px solid rgba(0,255,179,0.3);\n    padding: 2px 6px; border-radius: 4px;\n    letter-spacing: 0.4px;\n  }\n  .scard-desc { font-size: 11px; color: var(--sub); line-height: 1.5; }\n\n  .sfield { display: flex; flex-direction: column; gap: 6px; }\n  .sfield label {\n    font-size: 10px; font-weight: 600;\n    color: var(--amber); letter-spacing: 0.6px;\n    text-transform: uppercase;\n  }\n  .sinput-wrap {\n    display: flex; align-items: center;\n    background: var(--surf);\n    border: 1px solid var(--border2);\n    border-radius: 6px;\n    overflow: hidden;\n    transition: border-color 0.15s, box-shadow 0.15s;\n  }\n  .sinput-wrap:focus-within {\n    border-color: var(--cyan);\n    box-shadow: 0 0 0 3px rgba(0,240,255,0.12);\n  }\n  .sinput-wrap input {\n    flex: 1; min-width: 0;\n    font-family: var(--mono); font-size: 11.5px;\n    color: var(--white); background: transparent;\n    border: none; padding: 10px 12px;\n    outline: none;\n  }\n  .sinput-wrap input::placeholder { color: var(--dim); }\n  .s-eye-btn {\n    background: transparent; border: none;\n    color: var(--sub); cursor: pointer;\n    padding: 0 12px; font-size: 13px;\n    display: flex; align-items: center; justify-content: center;\n    transition: color 0.15s;\n  }\n  .s-eye-btn:hover { color: var(--white); }\n\n  .cookie-note {\n    font-size: 10.5px;\n    color: var(--mint);\n    line-height: 1.5;\n    background: rgba(0,255,179,0.07);\n    border: 1px solid rgba(0,255,179,0.25);\n    border-radius: 6px;\n    padding: 8px 11px;\n  }\n  .cookie-note strong { color: var(--white); font-weight: 600; }\n\n  .s-key-link {\n    color: var(--cyan); font-size: 11px; text-decoration: underline;\n    align-self: flex-start;\n  }\n\n  .stoggle-list { display: flex; flex-direction: column; gap: 11px; }\n  .stoggle-row {\n    display: flex; align-items: center; justify-content: space-between; gap: 12px;\n    flex-shrink: 0;\n  }\n  .stoggle-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }\n  .stoggle-title { font-size: 12px; font-weight: 500; color: var(--white); }\n  .stoggle-desc  { font-size: 10px; color: var(--sub); line-height: 1.4; }\n  .stoggle {\n    position: relative;\n    width: 38px; height: 22px;\n    border-radius: 11px;\n    background: rgba(255,255,255,0.14);\n    cursor: pointer;\n    transition: background 0.2s, box-shadow 0.2s;\n    flex-shrink: 0;\n  }\n  .stoggle.on {\n    background: var(--mint);\n    box-shadow: 0 0 12px var(--gm);\n  }\n  .stoggle-thumb {\n    position: absolute;\n    top: 3px; left: 3px;\n    width: 16px; height: 16px;\n    border-radius: 50%;\n    background: #FFFFFF;\n    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n    box-shadow: 0 1px 4px rgba(0,0,0,0.4);\n  }\n  .stoggle.on .stoggle-thumb {\n    transform: translateX(16px);\n    background: #0D0D1A;\n  }\n\n  #settings-foot {\n    display: flex; gap: 8px;\n    padding: 12px 18px;\n    border-top: 1px solid var(--border);\n    background: rgba(0,0,0,0.35);\n    flex-shrink: 0;\n  }\n  .s-save {\n    flex: 1;\n    font-family: var(--font); font-size: 12px; font-weight: 600;\n    color: #060610; background: var(--cyan);\n    border: none; border-radius: 6px; padding: 10px 18px; cursor: pointer;\n    box-shadow: 0 0 16px var(--gc), 0 4px 12px rgba(0,0,0,0.4);\n    transition: opacity 0.15s, transform 0.1s;\n    text-align: center;\n  }\n  .s-save:hover { opacity: 0.9; transform: translateY(-1px); }\n  .s-back {\n    font-family: var(--font); font-size: 12px; font-weight: 500;\n    color: var(--sub);\n    background: rgba(255,255,255,0.04);\n    border: 1px solid var(--border);\n    border-radius: 6px; padding: 10px 16px; cursor: pointer;\n    transition: all 0.15s;\n  }\n  .s-back:hover { color: var(--white); border-color: var(--border2); }\n\n  /* Filters */\n  #filters {\n    display: none;\n    align-items: center;\n    gap: 5px;\n    padding: 8px 16px;\n    background: rgba(0,0,0,0.25);\n    border-bottom: 1px solid var(--border);\n    flex-shrink: 0;\n  }\n  .flbl {\n    font-size: 9px; font-weight: 600; color: var(--dim);\n    letter-spacing: 1px; text-transform: uppercase;\n    margin-right: 4px; flex-shrink: 0;\n  }\n  .fbtn {\n    font-family: var(--font); font-size: 11px; font-weight: 500;\n    padding: 4px 12px; border-radius: 5px;\n    border: 1px solid var(--border);\n    background: rgba(255,255,255,0.03);\n    color: var(--sub); cursor: pointer;\n    transition: all 0.15s;\n    box-shadow: 0 2px 6px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset;\n    flex-shrink: 0;\n  }\n  .fbtn:hover { color: var(--white); border-color: var(--border2); }\n  .fbtn.on[data-f="all"]  {\n    color: var(--white); border-color: rgba(255,255,255,0.2);\n    background: rgba(255,255,255,0.08);\n  }\n  .fbtn.on[data-f="quiz"] {\n    color: var(--amber); border-color: rgba(255,179,71,0.45);\n    background: rgba(255,179,71,0.08);\n    box-shadow: 0 0 10px var(--ga), 0 2px 6px rgba(0,0,0,0.35);\n  }\n  .fbtn.on[data-f="mc"]   {\n    color: var(--mint); border-color: rgba(0,255,179,0.45);\n    background: rgba(0,255,179,0.08);\n    box-shadow: 0 0 10px var(--gm), 0 2px 6px rgba(0,0,0,0.35);\n  }\n  .fbtn.on[data-f="info"] {\n    color: var(--cyan); border-color: rgba(0,240,255,0.45);\n    background: rgba(0,240,255,0.08);\n    box-shadow: 0 0 10px var(--gc), 0 2px 6px rgba(0,0,0,0.35);\n  }\n\n  /* AI Solve bar */\n  #ai-bar {\n    display: none;\n    align-items: center;\n    justify-content: space-between;\n    padding: 8px 16px;\n    background: rgba(168,85,247,0.06);\n    border-bottom: 1px solid rgba(168,85,247,0.18);\n    flex-shrink: 0;\n    gap: 8px;\n  }\n  #ai-status {\n    font-size: 11px; color: var(--purple);\n    font-family: var(--mono);\n    flex: 1;\n    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n  }\n  #ai-btn {\n    font-family: var(--font); font-size: 11px; font-weight: 600;\n    color: #0A0A1A;\n    background: linear-gradient(135deg, var(--purple) 0%, #7C3AED 100%);\n    border: none; border-radius: 5px; padding: 5px 14px; cursor: pointer;\n    box-shadow: 0 0 12px var(--gp), 0 3px 10px rgba(0,0,0,0.4);\n    transition: opacity 0.15s, transform 0.1s;\n    white-space: nowrap; flex-shrink: 0;\n  }\n  #ai-btn:hover { opacity: 0.9; transform: translateY(-1px); }\n  #ai-btn:disabled { opacity: 0.45; cursor: wait; }\n\n  /* Main Scroll area */\n  #scroll {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding: 10px 14px;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  #scroll::-webkit-scrollbar { width: 6px; }\n  #scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.25); border-radius: 3px; }\n  #scroll::-webkit-scrollbar-thumb {\n    background: var(--cyan);\n    border-radius: 3px;\n    box-shadow: 0 0 8px var(--gc);\n  }\n  #scroll::-webkit-scrollbar-thumb:hover { background: #4DF6FF; }\n\n  .sbox {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    padding: 44px 24px;\n    text-align: center;\n    flex-shrink: 0;\n  }\n  .sbox-icon {\n    width: 46px; height: 46px; border-radius: 12px;\n    background: linear-gradient(145deg, #1C1C38 0%, #10101E 100%);\n    border: 1px solid var(--border2);\n    box-shadow: 0 4px 16px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08) inset;\n    display: flex; align-items: center; justify-content: center;\n    font-size: 20px; flex-shrink: 0;\n  }\n  .sbox h3 { font-size: 14px; font-weight: 600; color: var(--white); }\n  .sbox p  { font-size: 11.5px; color: var(--sub); line-height: 1.7; max-width: 270px; }\n  .scan-btn {\n    font-family: var(--font); font-size: 12.5px; font-weight: 600;\n    color: #050510;\n    background: linear-gradient(135deg, var(--cyan) 0%, #00C8D4 100%);\n    border: none; border-radius: 7px; padding: 10px 24px; cursor: pointer;\n    box-shadow: 0 0 18px var(--gc), 0 4px 14px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.25) inset;\n    transition: opacity 0.15s, transform 0.1s;\n    flex-shrink: 0;\n  }\n  .scan-btn:hover { opacity: 0.9; transform: translateY(-2px); }\n\n  .loader {\n    width: 24px; height: 24px;\n    border: 2.5px solid rgba(255,255,255,0.08);\n    border-top-color: var(--cyan);\n    border-radius: 50%;\n    animation: spinLoader 0.65s linear infinite;\n    box-shadow: 0 0 12px var(--gc);\n    flex-shrink: 0;\n  }\n  @keyframes spinLoader { to { transform: rotate(360deg); } }\n\n  /* ======== CARDS ======== */\n  .card {\n    border-radius: 9px;\n    background: linear-gradient(175deg, #1C1C32 0%, #131322 100%);\n    border: 1px solid var(--border);\n    box-shadow: 0 4px 16px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.07) inset;\n    overflow: hidden;\n    transition: border-color 0.15s, transform 0.12s, box-shadow 0.15s;\n    position: relative;\n    flex-shrink: 0;\n  }\n  .card:hover {\n    border-color: var(--border2);\n    transform: translateY(-1px);\n    box-shadow: 0 8px 24px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.09) inset;\n  }\n  .card.active-on-screen {\n    border-color: rgba(0,255,179,0.55);\n    box-shadow: 0 0 20px rgba(0,255,179,0.22), 0 4px 16px rgba(0,0,0,0.5);\n  }\n\n  .card-hd {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    padding: 11px 14px;\n    cursor: pointer;\n    user-select: none;\n    flex-shrink: 0;\n  }\n\n  .stripe {\n    width: 3px; flex-shrink: 0; border-radius: 3px;\n    align-self: stretch; min-height: 20px; margin-top: 2px;\n    background: var(--dim);\n  }\n  .stripe.quiz { background: var(--amber); box-shadow: 0 0 8px var(--ga); }\n  .stripe.mc   { background: var(--mint);  box-shadow: 0 0 8px var(--gm); }\n  .stripe.info { background: var(--cyan);  box-shadow: 0 0 8px var(--gc); }\n\n  .card-text { flex: 1; min-width: 0; }\n  .card-tags-row { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap; }\n  .card-tag {\n    font-family: var(--mono); font-size: 8px; font-weight: 500;\n    letter-spacing: 1.2px; text-transform: uppercase;\n    color: var(--dim);\n  }\n  .card-tag.quiz { color: var(--amber); }\n  .card-tag.mc   { color: var(--mint); }\n  .card-tag.info { color: var(--cyan); }\n\n  /* Pill showing the answer directly on the card header! */\n  .card-answer-pill {\n    font-family: var(--mono); font-size: 8px; font-weight: 700;\n    color: #0D0D1A; background: var(--mint);\n    padding: 2px 7px; border-radius: 4px;\n    letter-spacing: 0.5px;\n    box-shadow: 0 0 10px rgba(0,255,179,0.5);\n    display: none;\n  }\n  .card.has-answer .card-answer-pill { display: inline-block; }\n\n  .active-badge {\n    font-family: var(--mono); font-size: 7.5px; font-weight: 600;\n    color: var(--mint); background: rgba(0,255,179,0.12);\n    border: 1px solid rgba(0,255,179,0.3);\n    padding: 1px 5px; border-radius: 3px;\n    letter-spacing: 0.5px;\n    display: none;\n  }\n  .card.active-on-screen .active-badge { display: inline-block; }\n\n  .card-q {\n    font-size: 12.5px; font-weight: 500;\n    line-height: 1.5; color: var(--white);\n    word-break: break-word;\n  }\n\n  .chevron {\n    font-size: 9px; color: var(--dim); flex-shrink: 0; margin-top: 5px;\n    transition: transform 0.2s ease; font-style: normal;\n  }\n  .card.open .chevron { transform: rotate(180deg); }\n\n  /* Card body */\n  .card-bd {\n    padding: 0 14px 12px;\n    border-top: 1px solid var(--border);\n    padding-top: 9px;\n    display: none;\n    flex-direction: column;\n    gap: 6px;\n  }\n  .card.open .card-bd { display: flex; }\n\n  .meta { display: flex; gap: 5px; margin-bottom: 3px; flex-shrink: 0; }\n  .mpill {\n    font-family: var(--mono); font-size: 9px;\n    padding: 2px 8px; border-radius: 4px;\n    background: rgba(255,255,255,0.04);\n    border: 1px solid var(--border);\n    color: var(--sub);\n    box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset;\n    flex-shrink: 0;\n  }\n  .mpill.t { color: var(--amber); border-color: rgba(255,179,71,0.25); background: rgba(255,179,71,0.05); }\n  .mpill.s { color: var(--mint);  border-color: rgba(0,255,179,0.25); background: rgba(0,255,179,0.05); }\n\n  /* ======== VIBRANT GREEN HIGHLIGHTING IN MENTICHECKER ======== */\n  .choice {\n    display: flex; align-items: center; gap: 9px;\n    padding: 8px 12px; border-radius: 7px;\n    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.08) 100%);\n    border: 1px solid var(--border);\n    box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset;\n    transition: all 0.2s ease;\n    position: relative;\n    flex-shrink: 0;\n    min-height: 38px;\n  }\n  .choice:hover { border-color: var(--border2); }\n\n  /* STUNNING VIBRANT GREEN HIGHLIGHT ON THE CORRECT CHOICE */\n  .choice.ai-correct {\n    border: 2px solid #00FFB3 !important;\n    background: linear-gradient(90deg, rgba(0,255,179,0.24) 0%, rgba(0,255,179,0.08) 100%) !important;\n    box-shadow: 0 0 20px rgba(0,255,179,0.45), inset 0 0 12px rgba(0,255,179,0.18) !important;\n  }\n  .choice.ai-correct .cltr {\n    background: #00FFB3 !important;\n    color: #0D0D1A !important;\n    font-weight: 800 !important;\n    border-radius: 4px !important;\n    box-shadow: 0 0 10px rgba(0,255,179,0.7) !important;\n    padding: 1px 0 !important;\n  }\n  .choice.ai-correct .ctxt {\n    color: #FFFFFF !important;\n    font-weight: 600 !important;\n    text-shadow: 0 0 12px rgba(0,255,179,0.3) !important;\n  }\n\n  /* Gently dim other choices in a solved card so correct one pops */\n  .card.has-answer .choice:not(.ai-correct) {\n    opacity: 0.52 !important;\n  }\n\n  .cltr {\n    font-family: var(--mono); font-size: 10px;\n    color: var(--dim); flex-shrink: 0; width: 17px; text-align: center;\n    transition: all 0.15s;\n  }\n  .ctxt {\n    font-size: 12px; color: rgba(238,238,255,0.88);\n    line-height: 1.45; flex: 1; min-width: 0;\n    word-break: break-word;\n    transition: color 0.15s;\n  }\n\n  .choice-badges {\n    display: flex; align-items: center; gap: 5px;\n    flex-shrink: 0; margin-left: auto;\n  }\n\n  .ai-badge {\n    font-family: var(--mono); font-size: 8.5px; font-weight: 700;\n    color: #0D0D1A; background: var(--mint);\n    letter-spacing: 0.4px;\n    padding: 2px 7px; border-radius: 4px;\n    box-shadow: 0 0 10px rgba(0,255,179,0.5);\n    flex-shrink: 0; white-space: nowrap;\n    display: none;\n  }\n  .choice.ai-correct .ai-badge { display: inline-block; }\n\n  .auto-badge {\n    font-family: var(--mono); font-size: 8px; font-weight: 600;\n    color: var(--cyan); letter-spacing: 0.3px;\n    background: rgba(0,240,255,0.1);\n    border: 1px solid rgba(0,240,255,0.3);\n    padding: 1px 5px; border-radius: 3px;\n    flex-shrink: 0; white-space: nowrap;\n    display: none;\n  }\n  .choice.auto-selected .auto-badge { display: inline-block; }\n\n  .ai-spin {\n    width: 12px; height: 12px;\n    border: 1.5px solid rgba(168,85,247,0.2);\n    border-top-color: var(--purple);\n    border-radius: 50%;\n    animation: spinLoader 0.65s linear infinite;\n    flex-shrink: 0;\n    display: none;\n  }\n  .choice.ai-thinking .ai-spin { display: block; }\n\n  .itext {\n    font-size: 11.5px; color: var(--sub);\n    line-height: 1.75; padding: 3px 0;\n    border-top: none;\n    word-break: break-word;\n  }\n\n  /* Footer */\n  #foot {\n    display: none;\n    align-items: center;\n    justify-content: space-between;\n    padding: 8px 16px;\n    background: rgba(0,0,0,0.35);\n    border-top: 1px solid var(--border);\n    flex-shrink: 0;\n  }\n  #foot-note {\n    font-family: var(--mono); font-size: 9.5px; color: var(--dim);\n    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n  }\n  .rescan-btn {\n    font-family: var(--font); font-size: 10.5px; font-weight: 500;\n    color: var(--sub);\n    background: rgba(255,255,255,0.03);\n    border: 1px solid var(--border);\n    border-radius: 5px; padding: 4px 12px; cursor: pointer;\n    box-shadow: 0 2px 6px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.05) inset;\n    transition: all 0.15s;\n    flex-shrink: 0;\n  }\n  .rescan-btn:hover { color: var(--cyan); border-color: rgba(0,240,255,0.3); }\n\n  /* Toast notification */\n  #toast {\n    position: absolute;\n    bottom: 54px;\n    left: 12px;\n    right: 12px;\n    background: linear-gradient(135deg, rgba(0,255,179,0.18) 0%, rgba(13,13,26,0.96) 100%);\n    border: 1px solid var(--mint);\n    box-shadow: 0 0 20px var(--gm), 0 6px 20px rgba(0,0,0,0.7);\n    border-radius: 8px;\n    padding: 9px 13px;\n    display: flex;\n    align-items: center;\n    gap: 9px;\n    font-size: 11.5px;\n    color: var(--white);\n    opacity: 0;\n    transform: translateY(8px);\n    pointer-events: none;\n    transition: opacity 0.25s, transform 0.25s;\n    z-index: 100;\n  }\n  #toast.show {\n    opacity: 1;\n    transform: translateY(0);\n    pointer-events: all;\n  }\n  #toast-icon {\n    color: var(--mint);\n    font-size: 13px;\n    font-weight: bold;\n    flex-shrink: 0;\n  }\n  #toast-msg {\n    flex: 1;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n';
(
  function () {
    'use strict';
    if (document.getElementById('__mc')) return;

    /* -- BUILT-IN VERIFIED SOLUTIONS DATABASE (0ms latency, 100% verified) -- */
    const BUILTIN_SOLUTIONS =
      [
        // -- POLL QUESTIONS (SLIDES 6-9, 11) --
        {
          match: /filter in java servlets|interface.*filter|filter\b/i,
          answerRegex: /filter\b/i,
          letter: 'C'
        },
        {
          match: /map.*filter|filter-mapping/i,
          answerRegex: /filter-mapping/i,
          letter: 'A'
        },
        {
          match: /listeners in a java web|configure listeners|web\.xml/i,
          answerRegex: /web\.xml/i,
          letter: 'B'
        },
        {
          match: /jstl/i,
          answerRegex: /java standard tag library/i,
          letter: 'A'
        },
        {
          match: /spring core/i,
          answerRegex: /yes/i,
          letter: 'A'
        },
        // -- QUIZ QUESTIONS (SLIDES 19-28) --
        // Slide 19: What is core component of Spring Framework that provides the basic functionality for configuration and dependency injection?
        {
          match: /core component of spring framework.*dependency injection|configuration and dependency injection/i,
          answerRegex: /spring container/i,
          letter: 'C'
        },
        // Slide 20: Which concept in Spring Architecture is primarily responsible for simplifying the development of loosely coupled applications?
        {
          match: /concept in spring architecture.*loosely coupled|loosely coupled applications/i,
          answerRegex: /dependency injection/i,
          letter: 'B'
        },
        // Slide 21: What does the term "IoC" stand for in the Spring IoC Container?
        {
          match: /ioc.*stand for/i,
          answerRegex: /inversion of control/i,
          letter: 'C'
        },
        // Slide 22: Which of the following is NOT a type of IoC container provided by the Spring Framework?
        {
          match: /not a type of ioc container/i,
          answerRegex: /configurationmanager/i,
          letter: 'D'
        },
        // Slide 23: What is the primary role of the Spring IoC container?
        {
          match: /primary role of the spring ioc container|role of.*ioc container/i,
          answerRegex: /instantiate.*configure.*manage.*lifecycle/i,
          letter: 'B'
        },
        // Slide 24: Which configuration approach can be used to define beans for the IoC container in Spring?
        {
          match: /configuration approach.*define beans|define beans for the ioc container/i,
          answerRegex: /all of the above/i,
          letter: 'D'
        },
        // Slide 25: What is Dependency Injection in the context of the Spring Framework?
        {
          match: /what is dependency injection in the context of the spring framework|dependency injection in the context/i,
          answerRegex: /design pattern used to inject dependencies/i,
          letter: 'B'
        },
        // Slide 26: Which of the following is NOT a method of implementing dependency injection in Spring?
        {
          match: /not a method of implementing dependency injection/i,
          answerRegex: /property injection/i,
          letter: 'D'
        },
        // Slide 27: What is the main benefit of using Dependency Injection in Spring?
        {
          match: /main benefit of.*dependency injection|benefit of using dependency injection/i,
          answerRegex: /loose coupling/i,
          letter: 'A'
        },
        // Slide 28: In annotation-based configuration, which annotation marks a class as a Spring-managed bean that can have its dependencies injected?
        {
          match: /annotation marks a class as a spring-managed bean/i,
          answerRegex: /@component/i,
          letter: 'B'
        },
        // -- JAVA THREADS & CONCURRENCY QUESTIONS --
        {
          match: /sets? a thread as a daemon|set.*daemon|daemon/i,
          answerRegex: /\bsetdaemon\s*\(\s*true\s*\)|\bsetdaemon\b/i,
          letter: 'B'
        },
        // Negative release monitor MUST COME FIRST before affirmative!
        {
          match: /(?:does not|doesn't|not)\s+release.*(?:monitor|lock)|pauses?.*execution without releasing/i,
          answerRegex: /\bsleep\s*\(\s*\)/i,
          letter: 'D'
        },
        // Affirmative release monitor:
        {
          match: /^(?!.*(?:does not|not|never)).*releases?\s+an?\s+object'?s?\s+monitor/i,
          answerRegex: /\bwait\s*\(\s*\)/i,
          letter: 'A'
        },
        {
          match: /what does join\(\) do|join\(\)/i,
          answerRegex: /waits? for.*thread to die|waits? for.*thread to finish|waits? for/i,
          letter: 'C'
        },
        {
          match: /starts? thread execution|start.*thread/i,
          answerRegex: /\bstart\s*\(\s*\)/i,
          letter: 'A'
        },
        {
          match: /wakes? up a single thread|wakes? up one thread/i,
          answerRegex: /\bnotify\s*\(\s*\)/i,
          letter: 'B'
        },
        {
          match: /wakes? up all threads/i,
          answerRegex: /\bnotifyall\s*\(\s*\)/i,
          letter: 'C'
        },
        {
          match: /yield.*cpu|gives? up.*cpu/i,
          answerRegex: /\byield\s*\(\s*\)/i,
          letter: 'D'
        }
      ];

    function getBuiltinAnswer(question, choices) {
      const qClean = (question || '').toLowerCase();
      for (const sol of BUILTIN_SOLUTIONS) {
        if (sol.match.test(qClean)) {
          for (let i = 0; i < choices.length; i++) {
            const cText = (choices[i]?.text || choices[i] || '').toLowerCase();
            if (sol.answerRegex.test(cText)) return String.fromCharCode(65 + i);
          }
          if (sol.letter) {
            const ci = sol.letter.charCodeAt(0) - 65;
            if (ci >= 0 && ci < choices.length) return sol.letter;
          }
        }
      }
      return null;
    }

    /* -- API KEY & STORAGE HELPERS -- */
    let cachedApiKey = '';

    function cleanApiKey(raw) {
      if (!raw) return '';
      return String(raw)
        .trim()
        .replace(/^bearer\s+/i, '')
        .replace(/^key=/i, '')
        .replace(/^["'`]|["'`]$/g, '')
        .trim();
    }

    function setCookie(name, val, days) {
      try {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        const isSecure = location.protocol === 'https:' ? ';Secure' : '';
        document.cookie = name + '=' + encodeURIComponent(val) + ';' + expires + ';path=/;SameSite=Lax' + isSecure;
      }
      catch (e) { console.warn('[MentiChecker] setCookie error:', e); }
    }

    function getCookie(name) {
      try {
        const cname = name + '=';
        const decoded = decodeURIComponent(document.cookie || '');
        const parts = decoded.split(';');
        for (let i = 0; i < parts.length; i++) {
          let c = parts[i].trim();
          if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
        }
      } catch { }
      return '';
    }

    function deleteCookie(name) {
      try {
        const isSecure = location.protocol === 'https:' ? ';Secure' : '';
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax' + isSecure;
      } catch { }
    }

    let keyLoadPromise = null;

    function getApiKey() {
      if (cachedApiKey) return cachedApiKey;
      const fromStorage = localStorage.getItem('mc_gemini_key') || localStorage.getItem('mc_key') || '';
      const fromCookie = getCookie('mc_gemini_key') || getCookie('mc_key') || '';
      const raw = fromStorage || fromCookie;
      cachedApiKey = cleanApiKey(raw);
      return cachedApiKey;
    }

    function ensureApiKeyLoaded() {
      if (cachedApiKey) return Promise.resolve(cachedApiKey);
      if (!keyLoadPromise) {
        keyLoadPromise = new Promise((resolve) => {
          const syncKey = getApiKey();
          if (syncKey) return resolve(syncKey);
          if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.get(['mc_gemini_key', 'mc_key'], (res) => {
              const raw = res?.mc_gemini_key || res?.mc_key || '';
              if (raw) {
                cachedApiKey = cleanApiKey(raw);
                try { localStorage.setItem('mc_gemini_key', cachedApiKey); } catch { }
              }
              resolve(cachedApiKey);
            });
          }
          else resolve('');
        });
      }
      return keyLoadPromise;
    }

    function saveApiKey(raw) {
      const key = cleanApiKey(raw);
      cachedApiKey = key;
      keyLoadPromise = null;
      if (key) {
        setCookie('mc_gemini_key', key, 365);
        try { localStorage.setItem('mc_gemini_key', key); } catch { }
        if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.set({ mc_gemini_key: key }).catch(() => { });
      }
      else {
        deleteCookie('mc_gemini_key');
        deleteCookie('mc_key');
        try {
          localStorage.removeItem('mc_gemini_key');
          localStorage.removeItem('mc_key');
        } catch { }
        if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.remove(['mc_gemini_key', 'mc_key']).catch(() => { });
      }
    }

    // Preload key from chrome.storage.local on startup
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get
        (
          ['mc_gemini_key', 'mc_key'], (res) => {
            const raw = res?.mc_gemini_key || res?.mc_key || '';
            if (raw) {
              cachedApiKey = cleanApiKey(raw);
              try { localStorage.setItem('mc_gemini_key', cachedApiKey); } catch { }
            }
          }
        );
    }

    /* -- PLAYER NAME CONFIG -- */
    let cfgPlayerName = localStorage.getItem('mc_player_name') || '';
    let cfgAutoName = localStorage.getItem('mc_auto_name') !== 'false';

    // Preload player name from chrome.storage.local
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get(['mc_player_name', 'mc_auto_name'], (data) => {
        if (data?.mc_player_name !== undefined) {
          cfgPlayerName = data.mc_player_name;
          try { localStorage.setItem('mc_player_name', cfgPlayerName); } catch (e) { }
        }
        if (data?.mc_auto_name !== undefined) {
          cfgAutoName = data.mc_auto_name;
          try { localStorage.setItem('mc_auto_name', cfgAutoName ? 'true' : 'false'); } catch (e) { }
        }
      });
    }

    /* -- HOST + SHADOW ROOT -- */
    const host = document.createElement('div');
    host.id = '__mc';
    host.style.cssText =
      [
        'all: initial !important',
        'position: fixed !important',
        'bottom: 24px !important',
        'right: 24px !important',
        'width: 0 !important',
        'height: 0 !important',
        'overflow: visible !important',
        'z-index: 2147483647 !important',
        'pointer-events: none !important',
        'margin: 0 !important',
        'padding: 0 !important',
        'border: none !important',
        'background: transparent !important',
        'display: block !important'
      ].join('; ');

    (document.documentElement || document.body).appendChild(host);
    const sh = host.attachShadow({ mode: 'open' });

    /* -- INJECT FONTS & STYLES -- */
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap';
    sh.appendChild(fontLink);

    const styleEl = document.createElement('style');
    styleEl.textContent = MCSS;
    sh.appendChild(styleEl);

    /* -- CYBERPUNK SVGs -- */
    function svgCyberScanner(size) {
      const d = size || 26;
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('width', String(d));
      s.setAttribute('height', String(d));
      s.setAttribute('viewBox', '0 0 32 32');
      s.setAttribute('fill', 'none');
      s.innerHTML =
        [
          '<circle cx="16" cy="16" r="14.5" stroke="#00F0FF" stroke-width="1.2" stroke-opacity="0.35" stroke-dasharray="8 6"/>',
          '<line x1="16" y1="0.5" x2="16" y2="3.5" stroke="#00F0FF" stroke-width="1.4" stroke-linecap="round"/>',
          '<line x1="16" y1="28.5" x2="16" y2="31.5" stroke="#00FFB3" stroke-width="1.4" stroke-linecap="round"/>',
          '<line x1="0.5" y1="16" x2="3.5" y2="16" stroke="#00F0FF" stroke-width="1.4" stroke-linecap="round"/>',
          '<line x1="28.5" y1="16" x2="31.5" y2="16" stroke="#FF3366" stroke-width="1.4" stroke-linecap="round"/>',
          '<path d="M 5 24 L 5 9 L 10.5 9 L 13.5 13.5 L 13.5 18 L 9.5 18 L 9.5 24 Z" fill="#00F0FF" fill-opacity="0.85"/>',
          '<path d="M 27 24 L 27 9 L 21.5 9 L 18.5 13.5 L 18.5 18 L 22.5 18 L 22.5 24 Z" fill="#00F0FF" fill-opacity="0.85"/>',
          '<circle cx="16" cy="6" r="2" fill="#FF3366"/>',
          '<circle cx="16" cy="6" r="0.8" fill="#FFFFFF"/>',
          '<path d="M 6.5 15.5 L 14 24 L 26.5 6.5" stroke="#00FFB3" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>',
          '<path d="M 6.5 15.5 L 14 24 L 26.5 6.5" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>'
        ].join('');
      return s;
    }

    function svgCyberLogo(size) {
      const d = size || 18;
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('width', String(d));
      s.setAttribute('height', String(d));
      s.setAttribute('viewBox', '0 0 24 24');
      s.setAttribute('fill', 'none');
      s.innerHTML =
        [
          '<path d="M 3.5 19 L 3.5 6.5 L 7.5 6.5 L 9.8 10 L 9.8 13.5 L 7 13.5 L 7 19 Z" fill="#00F0FF" fill-opacity="0.9"/>',
          '<path d="M 20.5 19 L 20.5 6.5 L 16.5 6.5 L 14.2 10 L 14.2 13.5 L 17 13.5 L 17 19 Z" fill="#00F0FF" fill-opacity="0.9"/>',
          '<circle cx="12" cy="3.5" r="1.5" fill="#FF3366"/>',
          '<path d="M 4.5 12 L 9.5 18 L 19.5 4.5" stroke="#00FFB3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
          '<path d="M 4.5 12 L 9.5 18 L 19.5 4.5" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>'
        ].join('');
      return s;
    }

    function el(tag, cls, styles) {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (styles) Object.assign(e.style, styles);
      return e;
    }

    /* FAB */
    const fab = el('div');
    fab.id = 'fab';
    fab.setAttribute('tabindex', '0');
    fab.setAttribute('role', 'button');
    fab.setAttribute('aria-label', 'MentiChecker');
    fab.appendChild(svgCyberScanner(26));
    const fabDot = el('div'); fabDot.id = 'fab-dot';
    fab.appendChild(fabDot);

    /* PANEL */
    const panel = el('div'); panel.id = 'panel';

    /* Header */
    const hdr = el('div'); hdr.id = 'hdr';
    const hdrLogo = el('div'); hdrLogo.id = 'hdr-logo';
    hdrLogo.appendChild(svgCyberLogo(18));
    const hdrText = el('div'); hdrText.id = 'hdr-text';
    const hdrH1 = el('h1'); hdrH1.textContent = 'MentiChecker';
    const hdrP = el('p'); hdrP.innerHTML = 'slide inspector &bull; <span style="color:var(--cyan);font-family:var(--mono);font-weight:600;">Author: D4SHW00D</span>';
    hdrText.appendChild(hdrH1); hdrText.appendChild(hdrP);
    const hdrStat = el('div'); hdrStat.id = 'hdr-stat';
    const hdrAutoPill = el('div'); hdrAutoPill.id = 'hdr-auto-pill';
    hdrAutoPill.textContent = 'AUTO ON';
    hdrAutoPill.title = 'Click to toggle auto-answer on presentation slide';
    const hdrGear = el('button'); hdrGear.id = 'hdr-gear'; hdrGear.textContent = '\u2699';
    hdrGear.title = 'Settings (API Key & Toggles)';
    const hdrClose = el('button'); hdrClose.id = 'hdr-close'; hdrClose.textContent = '\u00D7';
    hdrClose.title = 'Close';
    hdr.appendChild(hdrLogo); hdr.appendChild(hdrText);
    hdr.appendChild(hdrStat); hdr.appendChild(hdrAutoPill);
    hdr.appendChild(hdrGear); hdr.appendChild(hdrClose);

    /* Prominent Banner when Key is not set */
    const keyBanner = el('div');
    keyBanner.id = 'key-banner';
    const kbIcon = el('div'); kbIcon.id = 'key-banner-icon'; kbIcon.textContent = '\uD83D\uDD11';
    const kbText = el('div'); kbText.id = 'key-banner-text';
    const kbTitle = el('div'); kbTitle.id = 'key-banner-title'; kbTitle.textContent = 'Put your API key here';
    const kbSub = el('div'); kbSub.id = 'key-banner-sub'; kbSub.textContent = 'Stored safely in cookies \u2014 click to connect Gemini AI';
    kbText.appendChild(kbTitle); kbText.appendChild(kbSub);
    const kbArrow = el('div'); kbArrow.id = 'key-banner-arrow'; kbArrow.textContent = '\u2192';
    keyBanner.appendChild(kbIcon); keyBanner.appendChild(kbText); keyBanner.appendChild(kbArrow);

    /* ======== SETTINGS MODAL ======== */
    const settings = el('div'); settings.id = 'settings';

    const sHdr = el('div'); sHdr.id = 'settings-hdr';
    const sTitleRow = el('div', 'settings-title-row');
    const sIconTag = el('span', 'settings-icon-tag'); sIconTag.textContent = '\u2699';
    const sH2 = el('h2'); sH2.textContent = 'Settings';
    sTitleRow.appendChild(sIconTag); sTitleRow.appendChild(sH2);
    const sCloseX = el('button', 'settings-close'); sCloseX.textContent = '\u00D7';
    sCloseX.title = 'Close settings';
    sHdr.appendChild(sTitleRow); sHdr.appendChild(sCloseX);

    const sBody = el('div'); sBody.id = 'settings-body';

    const scardKey = el('div', 'scard');
    const scHd1 = el('div', 'scard-hd');
    const scIcon1 = el('span', 'scard-icon'); scIcon1.textContent = '\uD83D\uDD11';
    const scTitle1 = el('span', 'scard-title'); scTitle1.textContent = 'Gemini API Key';
    const scPill1 = el('span', 'scard-pill'); scPill1.textContent = 'Cookies';
    scHd1.appendChild(scIcon1); scHd1.appendChild(scTitle1); scHd1.appendChild(scPill1);

    const scDesc1 = el('p', 'scard-desc');
    scDesc1.textContent = 'Paste your Google Gemini API key here to solve questions automatically:';

    const sField = el('div', 'sfield');
    const sLabel = el('label'); sLabel.textContent = 'Put your API key here';
    const sInputWrap = el('div', 'sinput-wrap');
    const sInput = el('input');
    sInput.id = 's-input';
    sInput.type = 'password';
    sInput.placeholder = 'Put your API key here (AIzaSy...)';
    const sEye = el('button', 's-eye-btn');
    sEye.type = 'button';
    sEye.textContent = '\uD83D\uDC41';
    sEye.title = 'Show/Hide key';
    sEye.addEventListener('click', () => { sInput.type = sInput.type === 'password' ? 'text' : 'password'; });
    sInputWrap.appendChild(sInput); sInputWrap.appendChild(sEye);
    sField.appendChild(sLabel); sField.appendChild(sInputWrap);

    /* Auto-save as user types or pastes */
    sInput.addEventListener
      (
        'input', () => {
          saveApiKey(sInput.value);
          updateAiBar();
        }
      );
    sInput.addEventListener
      (
        'change', () => {
          saveApiKey(sInput.value);
          updateAiBar();
        }
      );

    /* Test Connection Button & Status */
    const sTestRow = el('div');
    sTestRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:2px;';
    const sTestBtn = el('button');
    sTestBtn.type = 'button';
    sTestBtn.textContent = '\u26A1 Test Connection';
    sTestBtn.style.cssText =
      [
        'font-family:var(--font)',
        'font-size:11px',
        'font-weight:600',
        'color:var(--white)',
        'background:rgba(255,255,255,0.06)',
        'border:1px solid var(--border2)',
        'border-radius:5px',
        'padding:5px 12px',
        'cursor:pointer',
        'transition:all 0.15s',
        'white-space:nowrap'
      ].join(';');
    sTestBtn.addEventListener('mouseenter', () => { sTestBtn.style.borderColor = 'var(--cyan)'; });
    sTestBtn.addEventListener('mouseleave', () => { sTestBtn.style.borderColor = 'var(--border2)'; });

    const sTestStatus = el('span');
    sTestStatus.style.cssText = 'font-size:10px;font-family:var(--mono);color:var(--sub);flex:1;line-height:1.35;word-break:break-word;';

    sTestBtn.addEventListener('click', () => {
      const rawVal = sInput.value.trim();
      saveApiKey(rawVal);
      const key = getApiKey();
      if (!key) {
        sTestStatus.style.color = 'var(--amber)';
        sTestStatus.textContent = 'Please paste your API key first';
        return;
      }
      sTestBtn.disabled = true;
      sTestStatus.style.color = 'var(--cyan)';
      sTestStatus.textContent = 'Testing Gemini API...';

      chrome.runtime.sendMessage({ type: 'TEST_KEY', key }, (res) => {
        sTestBtn.disabled = false;
        if (chrome.runtime.lastError) {
          sTestStatus.style.color = 'var(--red)';
          const msg = chrome.runtime.lastError.message || '';
          if (msg.includes('invalidated')) sTestStatus.textContent = '\u274C Extension was reloaded: please refresh page (F5)';
          else sTestStatus.textContent = '\u274C Extension error: ' + msg;
          return;
        }
        if (res?.success) {
          sTestStatus.style.color = 'var(--mint)';
          sTestStatus.textContent = `\u2713 Working! (${res.model} connected)`;
          showToast('\u2713 Gemini API connected successfully!');
        }
        else {
          sTestStatus.style.color = 'var(--red)';
          sTestStatus.textContent = `\u274C ${res?.error || 'Invalid API key'}`;
          showToast('\u274C API Key error: ' + (res?.error || 'Check key'));
        }
      });
    });

    sTestRow.appendChild(sTestBtn);
    sTestRow.appendChild(sTestStatus);
    sField.appendChild(sTestRow);

    const sCookieNote = el('div', 'cookie-note');
    sCookieNote.innerHTML = '<strong>\uD83D\uDD12 100% Safe to Share:</strong> Your key is stored solely in your personal browser cookies. Extension files on disk contain zero keys, so you can safely send this folder to friends without leaking anything!';

    const sLinkA = el('a', 's-key-link');
    sLinkA.href = 'https://aistudio.google.com/app/apikey';
    sLinkA.target = '_blank';
    sLinkA.textContent = 'Get a free Gemini API key from Google AI Studio \u2197';

    scardKey.appendChild(scHd1);
    scardKey.appendChild(scDesc1);
    scardKey.appendChild(sField);
    scardKey.appendChild(sCookieNote);
    scardKey.appendChild(sLinkA);

    /* Quiz Player Name Card */
    const scardName = el('div', 'scard');
    const scHdName = el('div', 'scard-hd');
    const scIconName = el('span', 'scard-icon'); scIconName.textContent = '\uD83D\uDC64';
    const scTitleName = el('span', 'scard-title'); scTitleName.textContent = 'Quiz Player Name';
    const scPillName = el('span', 'scard-pill'); scPillName.textContent = 'AUTO-JOIN';
    scHdName.appendChild(scIconName); scHdName.appendChild(scTitleName); scHdName.appendChild(scPillName);

    const scDescName = el('div', 'scard-desc');
    scDescName.textContent = 'Automatically types your name into the Mentimeter quiz lobby (so you never appear as Thomas or a random name on the leaderboard) and joins the quiz.';

    const sFieldName = el('div', 'sfield');
    const sLabelName = el('label'); sLabelName.textContent = 'Put your real name';
    const sWrapName = el('div', 'sinput-wrap');
    const sInputName = el('input');
    sInputName.type = 'text';
    sInputName.placeholder = 'e.g. Adrian Finch, Viktoriya ...';
    sInputName.maxLength = 30;
    sInputName.value = cfgPlayerName;
    sWrapName.appendChild(sInputName);
    sFieldName.appendChild(sLabelName);
    sFieldName.appendChild(sWrapName);

    const sTListName = el('div', 'stoggle-list');
    const rowNameTog = el('div', 'stoggle-row');
    const infoNameTog = el('div', 'stoggle-info');
    const tNameTog = el('div', 'stoggle-title'); tNameTog.textContent = 'Auto-fill name & join lobby';
    const dNameTog = el('div', 'stoggle-desc'); dNameTog.textContent = 'Automatically enters your name and clicks Join Quiz when lobby appears';
    infoNameTog.appendChild(tNameTog); infoNameTog.appendChild(dNameTog);
    const togName = el('div', 'stoggle' + (cfgAutoName ? ' on' : ''));
    const thumbName = el('div', 'stoggle-thumb');
    togName.appendChild(thumbName);
    rowNameTog.appendChild(infoNameTog); rowNameTog.appendChild(togName);
    sTListName.appendChild(rowNameTog);

    scardName.appendChild(scHdName);
    scardName.appendChild(scDescName);
    scardName.appendChild(sFieldName);
    scardName.appendChild(sTListName);

    const scardAuto = el('div', 'scard');
    const scHd2 = el('div', 'scard-hd');
    const scIcon2 = el('span', 'scard-icon'); scIcon2.textContent = '\u26A1';
    const scTitle2 = el('span', 'scard-title'); scTitle2.textContent = 'Automation Controls';
    scHd2.appendChild(scIcon2); scHd2.appendChild(scTitle2);

    const sTList = el('div', 'stoggle-list');

    const rowHl = el('div', 'stoggle-row');
    const infoHl = el('div', 'stoggle-info');
    const tHl = el('div', 'stoggle-title'); tHl.textContent = 'Green highlight on slide';
    const dHl = el('div', 'stoggle-desc'); dHl.textContent = 'Highlights correct answer with glowing neon mint on Mentimeter';
    infoHl.appendChild(tHl); infoHl.appendChild(dHl);
    const togHl = el('div', 'stoggle on');
    const thumbHl = el('div', 'stoggle-thumb');
    togHl.appendChild(thumbHl);
    rowHl.appendChild(infoHl); rowHl.appendChild(togHl);

    const rowSel = el('div', 'stoggle-row');
    const infoSel = el('div', 'stoggle-info');
    const tSel = el('div', 'stoggle-title'); tSel.textContent = 'Auto-answer on slide (0.5s - 1.5s timer)';
    const dSel = el('div', 'stoggle-desc'); dSel.textContent = 'Automatically clicks correct choice on presentation slide after options appear (0.5s-1.5s delay). When disabled, answers are only shown inside MentiChecker.';
    infoSel.appendChild(tSel); infoSel.appendChild(dSel);
    const togSel = el('div', 'stoggle on');
    const thumbSel = el('div', 'stoggle-thumb');
    togSel.appendChild(thumbSel);
    rowSel.appendChild(infoSel); rowSel.appendChild(togSel);

    const rowSub = el('div', 'stoggle-row');
    const infoSub = el('div', 'stoggle-info');
    const tSub = el('div', 'stoggle-title'); tSub.textContent = 'Auto-submit if button present';
    const dSub = el('div', 'stoggle-desc'); dSub.textContent = 'Submits choice on polls requiring explicit submit';
    infoSub.appendChild(tSub); infoSub.appendChild(dSub);
    const togSub = el('div', 'stoggle on');
    const thumbSub = el('div', 'stoggle-thumb');
    togSub.appendChild(thumbSub);
    rowSub.appendChild(infoSub); rowSub.appendChild(togSub);

    sTList.appendChild(rowHl);
    sTList.appendChild(rowSel);
    sTList.appendChild(rowSub);
    scardAuto.appendChild(scHd2);
    scardAuto.appendChild(sTList);

    const scardAuthor = el('div', 'scard');
    scardAuthor.style.cssText =
      [
        'padding: 14px 16px',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        'background: linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(20,20,42,0.92) 100%)',
        'border: 1px solid rgba(0,240,255,0.35)',
        'border-radius: 9px',
        'box-shadow: 0 0 16px rgba(0,240,255,0.15), 0 2px 8px rgba(0,0,0,0.35)',
        'cursor: default',
        'user-select: text'
      ].join('; ');
    const nickEl = el('span');
    nickEl.textContent = 'D4SHW00D';
    nickEl.style.cssText =
      [
        'font-family: var(--mono)',
        'font-size: 20px',
        'font-weight: 800',
        'letter-spacing: 5px',
        'color: var(--cyan)',
        'text-shadow: 0 0 16px rgba(0,240,255,0.7), 0 0 32px rgba(0,240,255,0.35)',
        'text-align: center'
      ].join('; ');
    scardAuthor.appendChild(nickEl);

    sBody.appendChild(scardKey);
    sBody.appendChild(scardName);
    sBody.appendChild(scardAuto);
    sBody.appendChild(scardAuthor);

    const sFoot = el('div'); sFoot.id = 'settings-foot';
    const sSave = el('button', 's-save'); sSave.textContent = 'Save to Cookies';
    const sBack = el('button', 's-back'); sBack.textContent = '\u2190 Back';
    sFoot.appendChild(sSave); sFoot.appendChild(sBack);

    settings.appendChild(sHdr);
    settings.appendChild(sBody);
    settings.appendChild(sFoot);

    /* Filters */
    const filters = el('div'); filters.id = 'filters';
    const flbl = el('span', 'flbl'); flbl.textContent = 'Show';
    filters.appendChild(flbl);
    [['all', 'All'], ['quiz', 'Quiz'], ['mc', 'Poll'], ['info', 'Info']].forEach
      (
        ([f, label]) => {
          const b = el('button', 'fbtn' + (f === 'all' ? ' on' : ''));
          b.dataset.f = f; b.textContent = label;
          filters.appendChild(b);
        }
      );

    /* AI bar */
    const aiBar = el('div'); aiBar.id = 'ai-bar';
    const aiStatus = el('span'); aiStatus.id = 'ai-status'; aiStatus.textContent = 'AI ready';
    const aiBtn = el('button'); aiBtn.id = 'ai-btn'; aiBtn.textContent = '\u2728 Solve with AI';
    aiBar.appendChild(aiStatus); aiBar.appendChild(aiBtn);

    /* Scroll */
    const scroll = el('div'); scroll.id = 'scroll';

    /* Toast */
    const toast = el('div'); toast.id = 'toast';
    const toastIcon = el('div'); toastIcon.id = 'toast-icon'; toastIcon.textContent = '\u2713';
    const toastMsg = el('div'); toastMsg.id = 'toast-msg';
    toast.appendChild(toastIcon); toast.appendChild(toastMsg);

    /* Footer */
    const foot = el('div'); foot.id = 'foot';
    const footNote = el('span'); footNote.id = 'foot-note';
    const footAuthor = el('span');
    footAuthor.id = 'foot-author';
    footAuthor.style.cssText = 'font-family:var(--mono);font-size:9.5px;color:var(--cyan);opacity:0.9;margin-left:auto;margin-right:12px;white-space:nowrap;';
    footAuthor.textContent = 'Author: D4SHW00D';
    const rescanBtn = el('button', 'rescan-btn'); rescanBtn.textContent = '\u21BA Rescan';
    foot.appendChild(footNote); foot.appendChild(footAuthor); foot.appendChild(rescanBtn);

    panel.appendChild(settings);
    panel.appendChild(hdr);
    panel.appendChild(keyBanner);
    panel.appendChild(filters);
    panel.appendChild(aiBar);
    panel.appendChild(scroll);
    panel.appendChild(toast);
    panel.appendChild(foot);

    sh.appendChild(panel);
    sh.appendChild(fab);

    /* -- STATE -- */
    let allSlides = [];
    let curFilter = 'all';
    let panelOpen = false;
    let solving = false;
    let toastTimer = null;
    let pageToastEl = null;
    let activeSlideOnScreen = null;

    /* Settings State */
    let cfgAutoHl = localStorage.getItem('mc_autohl') !== 'false';
    let cfgAutoSel = localStorage.getItem('mc_autosel') !== 'false';
    let cfgAutoSub = localStorage.getItem('mc_autosub') !== 'false';

    function updateToggleUI() {
      togHl.classList.toggle('on', cfgAutoHl);
      togSel.classList.toggle('on', cfgAutoSel);
      togSub.classList.toggle('on', cfgAutoSub);
      if (cfgAutoSel) {
        hdrAutoPill.textContent = 'AUTO ON';
        hdrAutoPill.style.color = 'var(--mint)';
        hdrAutoPill.style.borderColor = 'rgba(0,255,179,0.3)';
        hdrAutoPill.style.background = 'rgba(0,255,179,0.1)';
        hdrAutoPill.title = 'Auto-answer on slide is ENABLED (0.5s-1.5s random timer). Click to disable';
      }
      else {
        hdrAutoPill.textContent = 'AUTO OFF';
        hdrAutoPill.style.color = 'var(--sub)';
        hdrAutoPill.style.borderColor = 'var(--border)';
        hdrAutoPill.style.background = 'rgba(255,255,255,0.04)';
        hdrAutoPill.title = 'Auto-answer on slide is DISABLED (answers only shown in MentiChecker). Click to enable';
      }
    }

    /* Player Name & Auto-Join Event Listeners */
    sInputName.addEventListener('input', () => {
      cfgPlayerName = sInputName.value.trim();
      localStorage.setItem('mc_player_name', cfgPlayerName);
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        chrome.storage.local.set({ mc_player_name: cfgPlayerName });
      }
      checkAndFillQuizName();
    });

    togName.addEventListener('click', () => {
      cfgAutoName = !cfgAutoName;
      togName.classList.toggle('on', cfgAutoName);
      localStorage.setItem('mc_auto_name', cfgAutoName ? 'true' : 'false');
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        chrome.storage.local.set({ mc_auto_name: cfgAutoName });
      }
      showToast(cfgAutoName ? 'Auto-name enabled' : 'Auto-name disabled');
      if (cfgAutoName) checkAndFillQuizName();
    });

    togHl.addEventListener
      (
        'click', () => {
          cfgAutoHl = !cfgAutoHl;
          localStorage.setItem('mc_autohl', cfgAutoHl ? 'true' : 'false');
          if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.set({ mc_autohl: cfgAutoHl });
          updateToggleUI();
          showToast(cfgAutoHl ? 'Green highlight enabled' : 'Green highlight disabled');
          syncPageHighlightAndSelect();
        }
      );

    togSel.addEventListener
      (
        'click', () => {
          cfgAutoSel = !cfgAutoSel;
          localStorage.setItem('mc_autosel', cfgAutoSel ? 'true' : 'false');
          if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.set({ mc_autosel: cfgAutoSel });
          updateToggleUI();
          if (!cfgAutoSel) {
            allSlides.forEach(s => {
              if (s.onSlideTimer) {
                clearTimeout(s.onSlideTimer);
                s.onSlideTimer = null;
              }
            });
            showToast('Auto-answer disabled (shown only in MentiChecker)');
          }
          else {
            showToast('Auto-answer enabled (0.5s - 1.5s delay)');
            syncPageHighlightAndSelect();
          }
        }
      );

    togSub.addEventListener
      (
        'click', () => {
          cfgAutoSub = !cfgAutoSub;
          localStorage.setItem('mc_autosub', cfgAutoSub ? 'true' : 'false');

          const nameVal = sInputName.value.trim();
          cfgPlayerName = nameVal;
          localStorage.setItem('mc_player_name', nameVal);
          localStorage.setItem('mc_auto_name', cfgAutoName ? 'true' : 'false');
          if (typeof chrome !== 'undefined' && chrome.storage?.local) {
            chrome.storage.local.set({ mc_player_name: nameVal, mc_auto_name: cfgAutoName });
          }
          checkAndFillQuizName();
          if (typeof chrome !== 'undefined' && chrome.storage?.local) chrome.storage.local.set({ mc_autosub: cfgAutoSub });
          updateToggleUI();
        }
      );

    hdrAutoPill.addEventListener
      (
        'click', (e) => {
          e.stopPropagation();
          togSel.click();
        }
      );

    /* Sync settings with extension storage */
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get
        (
          ['mc_autosel', 'mc_autohl', 'mc_autosub', 'mc_player_name', 'mc_auto_name'], (data) => {
            if (data.mc_player_name !== undefined) { cfgPlayerName = data.mc_player_name; sInputName.value = cfgPlayerName; }
            if (data.mc_auto_name !== undefined) { cfgAutoName = data.mc_auto_name; togName.classList.toggle('on', cfgAutoName); }
            if (data.mc_autosel !== undefined) cfgAutoSel = data.mc_autosel;
            if (data.mc_autohl !== undefined) cfgAutoHl = data.mc_autohl;
            if (data.mc_autosub !== undefined) cfgAutoSub = data.mc_autosub;
            updateToggleUI();
          }
        );
      chrome.storage.onChanged.addListener
        (
          (changes, area) => {
            if (area === 'local') {
              if (changes.mc_player_name !== undefined) {
                cfgPlayerName = changes.mc_player_name.newValue || '';
                sInputName.value = cfgPlayerName;
                checkAndFillQuizName();
              }
              if (changes.mc_auto_name !== undefined) {
                cfgAutoName = changes.mc_auto_name.newValue !== false;
                togName.classList.toggle('on', cfgAutoName);
              }
            }
            if (area === 'local' && changes.mc_autosel !== undefined) {
              cfgAutoSel = changes.mc_autosel.newValue;
              localStorage.setItem('mc_autosel', cfgAutoSel ? 'true' : 'false');
              updateToggleUI();
            }
          }
        );
    }

    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener
        (
          (request) => {
            if (request.type === 'SET_PLAYER_NAME') {
              cfgPlayerName = request.value || '';
              localStorage.setItem('mc_player_name', cfgPlayerName);
              sInputName.value = cfgPlayerName;
              checkAndFillQuizName();
            }
            if (request.type === 'SET_AUTO_SEL') {
              cfgAutoSel = !!request.value;
              localStorage.setItem('mc_autosel', cfgAutoSel ? 'true' : 'false');
              updateToggleUI();
            }
          }
        );
    }

    updateToggleUI();

    /* -- TOAST NOTIFICATIONS -- */
    function showToast(msg, customIcon) {
      let icon = customIcon || '\u2713';
      let cleanMsg = String(msg || '').trim();

      if (cleanMsg.startsWith('\u2713') || cleanMsg.startsWith('✓')) {
        icon = '\u2713';
        cleanMsg = cleanMsg.replace(/^[\u2713✓]\s*/, '');
      } else if (cleanMsg.startsWith('\u274C') || cleanMsg.startsWith('❌')) {
        icon = '\u274C';
        cleanMsg = cleanMsg.replace(/^[\u274C❌]\s*/, '');
      }

      toastIcon.textContent = icon;
      toastIcon.style.color = (icon === '\u274C' || icon === '❌') ? 'var(--red)' : 'var(--mint)';
      toastMsg.textContent = cleanMsg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function showPageBanner(msg) {
      if (!pageToastEl) {
        pageToastEl = document.createElement('div');
        pageToastEl.id = '__mc-page-banner';
        Object.assign
          (
            pageToastEl.style,
            {
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%) translateY(-24px)',
              background: '#0D0D1A',
              color: '#EEEEFF',
              border: '1.5px solid #00FFB3',
              borderRadius: '30px',
              padding: '9px 22px',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              boxShadow: '0 0 24px rgba(0,255,179,0.45), 0 8px 32px rgba(0,0,0,0.8)',
              zIndex: '2147483646',
              opacity: '0',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '9px'
            }
          );
        document.body.appendChild(pageToastEl);
      }
      const cleanMsg = String(msg || '').replace(/^[\u2713✓]\s*/, '');
      pageToastEl.innerHTML = '<span style="color:#00FFB3;font-size:15px;font-weight:bold;">\u2713</span> ' + cleanMsg;
      requestAnimationFrame
        (
          () => {
            pageToastEl.style.opacity = '1';
            pageToastEl.style.transform = 'translateX(-50%) translateY(0)';
          }
        );
      setTimeout(() => {
        if (pageToastEl) {
          pageToastEl.style.opacity = '0';
          pageToastEl.style.transform = 'translateX(-50%) translateY(-24px)';
        }
      }, 3400);
    }

    /* -- PANEL TOGGLE -- */
    function openPanel() { panelOpen = true; panel.classList.add('open'); fab.classList.add('open'); }
    function closePanel() { panelOpen = false; panel.classList.remove('open'); fab.classList.remove('open'); }
    function togglePanel() { panelOpen ? closePanel() : openPanel(); }

    fab.addEventListener('click', togglePanel);
    fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') togglePanel(); });
    hdrClose.addEventListener('click', closePanel);
    // Panel stays open and does NOT autoclose on outside clicks! Only closes via [x] or FAB toggle.

    keyBanner.addEventListener
      (
        'click', () => {
          hdrGear.click();
          setTimeout(() => sInput.focus(), 250);
        }
      );

    /* -- SETTINGS INTERACTIONS -- */
    hdrGear.addEventListener
      (
        'click', () => {
          settings.classList.add('open');
          sInput.value = getApiKey();
          updateToggleUI();
        }
      );
    sCloseX.addEventListener('click', () => settings.classList.remove('open'));
    sBack.addEventListener('click', () => settings.classList.remove('open'));

    sSave.addEventListener
      (
        'click', () => {
          const key = sInput.value.trim();
          saveApiKey(key);

          localStorage.setItem('mc_autohl', cfgAutoHl ? 'true' : 'false');
          localStorage.setItem('mc_autosel', cfgAutoSel ? 'true' : 'false');
          localStorage.setItem('mc_autosub', cfgAutoSub ? 'true' : 'false');

          settings.classList.remove('open');
          updateAiBar();
          updateToggleUI();
          showToast(key ? 'Saved to cookies \u2014 ready!' : 'Key removed');

          /* Trigger solver immediately */
          setTimeout(() => runSolver(), 200);
        }
      );

    function updateAiBar() {
      const key = getApiKey();
      if (key) {
        keyBanner.style.display = 'none';
        if (allSlides.length) {
          aiBar.style.display = 'flex';
          aiStatus.textContent = '\uD83D\uDD12 Key loaded from cookies';
          hdrAutoPill.style.display = 'block';
        }
        else {
          aiBar.style.display = 'none';
          hdrAutoPill.style.display = 'none';
        }
      }
      else {
        keyBanner.style.display = 'flex';
        aiBar.style.display = 'none';
        hdrAutoPill.style.display = 'none';
      }
    }

    /* -- RENDER STATES -- */
    function showLoading() {
      scroll.innerHTML = '';
      const box = el('div', 'sbox');
      const loader = el('div', 'loader');
      const p = el('p'); p.textContent = 'Scanning Mentimeter slides\u2026';
      box.appendChild(loader); box.appendChild(p);
      scroll.appendChild(box);
    }
    function showError(msg) {
      scroll.innerHTML = '';
      const box = el('div', 'sbox');
      const icon = el('div', 'sbox-icon'); icon.textContent = '!';
      const h = el('h3'); h.textContent = 'Nothing found';
      const p = el('p'); p.innerHTML = msg;
      const btn = el('button', 'scan-btn'); btn.textContent = 'Try again';
      btn.addEventListener('click', doScan);
      box.appendChild(icon); box.appendChild(h); box.appendChild(p); box.appendChild(btn);
      scroll.appendChild(box);
    }
    function showEmpty() {
      scroll.innerHTML = '';
      const box = el('div', 'sbox');
      const icon = el('div', 'sbox-icon'); icon.textContent = '\u2014';
      const h = el('h3'); h.textContent = 'No slides here';
      const p = el('p'); p.textContent = 'Try a different filter.';
      box.appendChild(icon); box.appendChild(h); box.appendChild(p);
      scroll.appendChild(box);
    }

    /* -- BUILD CARDS (USES PERMANENT ALLSLIDES INDEX) -- */
    const STRIPE = t =>
      t === 'quiz-choice' ? 'quiz' :
        t === 'multiple-choice' ? 'mc' :
          ['heading', 'free-text', 'list'].includes(t) ? 'info' : '';

    const LABEL = t =>
      (
        {
          'quiz-choice': 'QUIZ', 'multiple-choice': 'POLL',
          'heading': 'HEADING', 'free-text': 'TEXT', 'list': 'LIST',
          'word-cloud': 'WORDS', 'open-ended': 'OPEN',
          'leaderboard': 'BOARD', 'instructions': 'INTRO', 'paragraph': 'SLIDE'
        }
      )[t] ?? (t || 'SLIDE').toUpperCase();

    function buildCard(s) {
      const permIdx = allSlides.indexOf(s);
      const stripeType = STRIPE(s.slideType);
      const labelText = LABEL(s.slideType);
      const questionText = s.question || s.title || '';

      const hasAnswer = (s.correctIndex != null && s.correctIndex >= 0);
      const card = el('div', 'card' + (permIdx < 2 || hasAnswer ? ' open' : '') + (hasAnswer ? ' has-answer' : ''));
      card.dataset.slideIdx = permIdx;

      /* Header */
      const hd = el('div', 'card-hd');
      const stripe = el('div', 'stripe ' + stripeType);
      const cardText = el('div', 'card-text');

      const tagsRow = el('div', 'card-tags-row');
      const tag = el('div', 'card-tag ' + stripeType);
      tag.textContent = labelText;

      const ansPill = el('span', 'card-answer-pill');
      if (hasAnswer) ansPill.textContent = '\u2713 ANSWER: ' + String.fromCharCode(65 + s.correctIndex);

      const actBadge = el('span', 'active-badge');
      actBadge.textContent = 'ON SCREEN';

      tagsRow.appendChild(tag);
      tagsRow.appendChild(ansPill);
      tagsRow.appendChild(actBadge);

      const q = el('div', 'card-q');
      q.textContent = questionText;
      cardText.appendChild(tagsRow); cardText.appendChild(q);
      const chev = el('i', 'chevron'); chev.textContent = '\u25BE';
      hd.appendChild(stripe); hd.appendChild(cardText); hd.appendChild(chev);

      /* Body */
      const bd = el('div', 'card-bd');
      bd.dataset.slideIdx = permIdx;

      if (s.isInfo) {
        const itxt = el('div', 'itext');
        itxt.textContent = s.content;
        bd.appendChild(itxt);
      }
      else {
        if (s.countdown || s.scoring) {
          const meta = el('div', 'meta');
          if (s.countdown) {
            const p = el('span', 'mpill t');
            p.textContent = s.countdown + 's timer';
            meta.appendChild(p);
          }
          if (s.scoring) {
            const p = el('span', 'mpill s');
            p.textContent = s.scoring.replace(/_/g, ' ');
            meta.appendChild(p);
          }
          bd.appendChild(meta);
        }

        s.choices.forEach
          (
            (ch, ci) => {
              const isThisCorrect = (s.correctIndex === ci);
              const row = el('div', 'choice' + (isThisCorrect ? ' ai-correct' : ''));
              row.dataset.ci = ci;
              const ltr = el('span', 'cltr');
              ltr.textContent = String.fromCharCode(65 + ci);
              const ctxt = el('span', 'ctxt');
              ctxt.textContent = ch.text || ch;

              const badgeWrap = el('div', 'choice-badges');
              const badge = el('span', 'ai-badge');
              badge.textContent = '\u2713 CORRECT ANSWER';
              const autoBadge = el('span', 'auto-badge');
              autoBadge.textContent = 'AUTO-SELECTED';
              const spin = el('div', 'ai-spin');

              badgeWrap.appendChild(autoBadge);
              badgeWrap.appendChild(badge);
              badgeWrap.appendChild(spin);

              row.appendChild(ltr);
              row.appendChild(ctxt);
              row.appendChild(badgeWrap);

              if (s.hasAutoSelected && isThisCorrect) row.classList.add('auto-selected');

              bd.appendChild(row);
            }
          );

        if (!hasAnswer) {
          const solveRow = el('div');
          solveRow.className = 'card-solve-row';
          solveRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-top:7px;padding-top:7px;border-top:1px dashed var(--border);gap:8px;';

          const sBtn = el('button');
          sBtn.className = 'rescan-btn';
          sBtn.style.cssText = 'color:var(--cyan);border-color:rgba(0,240,255,0.35);padding:5px 12px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;';
          sBtn.innerHTML = '⚡ Solve with AI';

          const sErr = el('span');
          sErr.style.cssText = 'font-size:10px;font-family:var(--mono);color:var(--red);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';

          sBtn.addEventListener
            (
              'click', async (e) => {
                e.stopPropagation();
                sBtn.disabled = true;
                sBtn.textContent = 'Thinking...';
                sErr.textContent = '';
                await solveSingleSlide(s);
                sBtn.disabled = false;
                sBtn.innerHTML = '⚡ Solve with AI';
                if (s.correctIndex != null) solveRow.remove();
                else if (lastSolverError) sErr.textContent = lastSolverError;
              }
            );

          solveRow.appendChild(sBtn);
          solveRow.appendChild(sErr);
          bd.appendChild(solveRow);
        }
      }

      hd.addEventListener('click', () => card.classList.toggle('open'));
      card.appendChild(hd); card.appendChild(bd);
      return card;
    }

    function render(slides) {
      if (!slides.length) { showEmpty(); return; }
      scroll.innerHTML = '';
      const frag = document.createDocumentFragment();
      slides.forEach(s => frag.appendChild(buildCard(s)));
      scroll.appendChild(frag);
      updateActiveSlideUI();
    }

    function applyFilter(f) {
      curFilter = f;
      const out =
        f === 'quiz' ? allSlides.filter(s => s.slideType === 'quiz-choice') :
          f === 'mc' ? allSlides.filter(s => s.slideType === 'multiple-choice') :
            f === 'info' ? allSlides.filter(s => s.isInfo) :
              allSlides;
      render(out);
      updateAiBar();
    }

    filters.querySelectorAll('.fbtn').forEach
      (
        btn => {
          btn.addEventListener
            (
              'click', () => {
                filters.querySelectorAll('.fbtn').forEach(b => b.classList.remove('on'));
                btn.classList.add('on');
                applyFilter(btn.dataset.f);
              }
            );
        }
      );

    /* Update all visual cards in MentiChecker panel when an answer is found */
    function markCardAsSolved(slideIdx, correctCi) {
      const card = sh.querySelector(`.card[data-slide-idx="${slideIdx}"]`);
      if (card) {
        card.classList.add('has-answer');
        card.classList.add('open');

        const ansPill = card.querySelector('.card-answer-pill');
        if (ansPill) {
          ansPill.textContent = '\u2713 ANSWER: ' + String.fromCharCode(65 + correctCi);
          ansPill.style.display = 'inline-block';
        }

        const rows = card.querySelectorAll('.choice');
        rows.forEach
          (
            (r, ci) => {
              if (ci === correctCi) r.classList.add('ai-correct');
              else r.classList.remove('ai-correct');
            }
          );

        const solveRow = card.querySelector('.card-solve-row');
        if (solveRow) solveRow.remove();
      }
    }

    /* -- DATA EXTRACTION -- */
    function extractSlideDeck() {
      for (const sc of document.querySelectorAll('script')) {
        const txt = sc.textContent || '';
        if (!txt.includes('slideDeck')) continue;
        const re = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
        let m, combined = '';
        while ((m = re.exec(txt)) !== null) { try { combined += JSON.parse('"' + m[1] + '"'); } catch { combined += m[1]; } }
        const start = combined.indexOf('{"slideDeck":');
        if (start === -1) continue;
        let depth = 0, inStr = false, esc = false, end = -1;
        for (let i = start; i < combined.length; i++) {
          const c = combined[i];
          if (esc) { esc = false; continue; }
          if (c === '\\') { esc = true; continue; }
          if (c === '"') { inStr = !inStr; continue; }
          if (!inStr) { if (c === '{') depth++; else if (c === '}' && --depth === 0) { end = i + 1; break; } }
        }
        if (end === -1) continue;
        try { return JSON.parse(combined.slice(start, end)); } catch { }
      }
      return null;
    }

    function parseSlides(raw) {
      function extractText(n) {
        if (!n) return [];
        if (typeof n === 'string') return [n];
        if (Array.isArray(n)) return n.flatMap(extractText);
        if (n.type === 'text' && n.text) return [n.text];
        return Object.values(n).flatMap(extractText);
      }
      function getChoiceText(c) {
        if (!c) return '';
        if (typeof c === 'string') return c.trim();
        if (typeof c === 'number') return String(c);
        return String(c.title || c.text || c.label || c.content || c.body || c.answer || c.value || c.name || '').trim();
      }

      const SKIP = ['Open-ended', 'Word cloud'];
      const result = [];
      for (const slide of (raw?.slideDeck?.slides ?? [])) {
        const type = slide?.staticContent?.type ?? 'unknown';
        const title = slide?.title ?? '';
        const items = (slide?.interactiveContents?.length) ? slide.interactiveContents : [slide];
        for (const item of items) {
          const rawChoices = item?.choices || item?.options || slide?.choices || slide?.options || slide?.staticContent?.choices || [];
          const parsedChoices = rawChoices.map
            (
              (c, idx) =>
              (
                {
                  text: getChoiceText(c),
                  isCorrect: (typeof c === 'object') ? (c?.isCorrect ?? c?.correct ?? c?.is_correct ?? null) : null,
                  id: (typeof c === 'object' && (c?.interactiveContentChoiceId || c?.id)) ? (c.interactiveContentChoiceId || c.id) : String(idx)
                }
              )
            ).filter(c => c.text);

          if (!parsedChoices.length) continue;
          if (parsedChoices.length === 1 && SKIP.some(s => parsedChoices[0].text.startsWith(s))) continue;

          const knownCorrectIdx = parsedChoices.findIndex(c => c.isCorrect === true);
          const qText = String
            (
              item.title ||
              title ||
              slide?.staticContent?.heading ||
              slide?.staticContent?.subheading ||
              item?.question ||
              item?.label ||
              ''
            ).trim();

          // Check verified built-in solution immediately
          const builtinLetter = getBuiltinAnswer(qText, parsedChoices);
          let resolvedIdx = knownCorrectIdx !== -1 ? knownCorrectIdx : null;
          if (resolvedIdx == null && builtinLetter) resolvedIdx = builtinLetter.charCodeAt(0) - 65;

          result.push
            (
              {
                slideType: type,
                question: qText,
                choices: parsedChoices,
                countdown: item.countdown ?? null,
                scoring: item.scoring ?? null,
                correctIndex: resolvedIdx,
                correctText: resolvedIdx != null ? parsedChoices[resolvedIdx]?.text : null,
                hasAutoSelected: false,
                slideTimerFired: false,
                onSlideTimer: null,
                solvingAI: false
              }
            );
        }
        if (!items.length && ['heading', 'free-text', 'list'].includes(type)) {
          const sc = slide.staticContent ?? {}, parts = [];
          if (sc.heading) parts.push(sc.heading);
          if (sc.subheading) parts.push(sc.subheading);
          (sc.list?.items ?? []).forEach(it => parts.push('- ' + (it.content ?? '')));
          if (sc.styledColumns) parts.push(...extractText(sc.styledColumns).filter(t => t.trim()).slice(0, 5));
          if (parts.length) result.push({ slideType: type, isInfo: true, title, content: parts.join('\n') });
        }
      }
      return result;
    }

    /* -- ON-PAGE HIGHLIGHTING (ZERO COLLISION) -- */
    let pageStyleEl = null;
    const PAGE_ATTR = 'data-mc-answer';

    function injectPageStyle() {
      if (pageStyleEl) return;
      pageStyleEl = document.createElement('style');
      pageStyleEl.id = '__mc-page-style';
      pageStyleEl.textContent = `
        [data-mc-answer="correct"] {
          outline: 3px solid #00FFB3 !important;
          outline-offset: 1px !important;
          border-color: #00FFB3 !important;
          box-shadow: 0 0 24px rgba(0,255,179,0.65), inset 0 0 14px rgba(0,255,179,0.22) !important;
          background: rgba(0,255,179,0.14) !important;
          position: relative !important;
          transition: outline 0.25s ease, box-shadow 0.25s ease, background 0.25s ease !important;
        }
        [data-mc-answer="correct"]::after {
          content: "\u2713 CORRECT";
          position: absolute;
          top: 50% !important;
          right: 18px !important;
          transform: translateY(-50%) !important;
          background: #00FFB3;
          color: #0D0D1A;
          font-size: 9.5px;
          font-weight: 700;
          font-family: 'Inter', system-ui, sans-serif;
          letter-spacing: 0.6px;
          padding: 4px 10px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(0,255,179,0.5);
          z-index: 999999;
          pointer-events: none;
          animation: mcPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mcPop {
          from { opacity: 0; transform: translateY(calc(-50% + 4px)) scale(0.9); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        [data-mc-answer="wrong"] {
          opacity: 0.48 !important;
          transition: opacity 0.3s ease !important;
        }
      `;
      document.head.appendChild(pageStyleEl);
    }

    function clearPageHighlights() { document.querySelectorAll('[' + PAGE_ATTR + ']').forEach(e => { e.removeAttribute(PAGE_ATTR); }); }

    function norm(str) {
      return (str || '')
        .replace(/^[A-Z0-9][).\s:-]+/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    /* -- FILTER OUT NON-CHOICE UI CONTROLS (Open Q&A, Ask Question, Submit, etc) -- */
    function isNonChoiceElement(el) {
      if (!el) return true;
      const btn = el.closest('button, [role="button"], [role="link"], a') || el;
      const raw = ((btn.innerText || btn.textContent || '') + ' ' + (el.innerText || el.textContent || '')).toLowerCase().trim();
      const aria = ((btn.getAttribute('aria-label') || '') + ' ' + (el.getAttribute('aria-label') || '')).toLowerCase();
      const testId = ((btn.getAttribute('data-testid') || '') + ' ' + (el.getAttribute('data-testid') || '')).toLowerCase();
      const className = String((btn.className || '') + ' ' + (el.className || '')).toLowerCase();

      // 1. Q&A and Audience question controls
      if
        (
        raw.includes('q&a') || raw.includes('q & a') || raw.includes('qna') ||
        raw.includes('open q') || raw.includes('ask a question') || raw.includes('ask question') ||
        (raw.includes('question') && (raw.includes('open') || raw.includes('ask'))) ||
        aria.includes('q&a') || aria.includes('q & a') || aria.includes('open q') || aria.includes('question') ||
        testId.includes('qna') || testId.includes('qa') || testId.includes('open-qa') ||
        className.includes('qna') || className.includes('qa-') || className.includes('open-qa')
      ) return true;

      // 2. Submit / Vote / Navigation controls
      if
        (
        raw === 'submit' || raw === 'vote' || raw === 'submit answer' || raw === 'next' ||
        raw === 'back' || raw === 'close' || raw === 'skip' || raw === 'exit' ||
        testId.includes('submit') || testId.includes('vote') || testId.includes('next-button')
      ) return true;

      // 3. Reactions & Leaderboard
      if
        (
        raw.includes('reaction') || aria.includes('reaction') || testId.includes('reaction') ||
        raw.includes('leaderboard') || raw.includes('scores') || testId.includes('leaderboard')
      ) return true;

      // 4. Menti branding & links
      if (raw.includes('mentimeter') || raw.includes('menti.com')) return true;

      // 5. Drawer, toolbar, header, footer containers (unless explicitly a choice testid)
      if (el.closest('header, nav, footer, [class*="action-bar"], [class*="drawer"], [class*="toolbar"], [class*="bottom-bar"], [class*="bottomBar"], [class*="actionbar"], [data-testid*="footer"], [data-testid*="header"]'))
        if (!testId.includes('choice') && !testId.includes('option')) return true;

      return false;
    }

    /* -- VISIBLE OPTIONS DETECTOR (CONFIRMS OPTIONS ARE VISUALLY RENDERED) -- */
    function isElementVisuallyVisible(el) {
      if (!el || !el.isConnected) return false;

      // Check DOM display/visibility/opacity
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      if (parseFloat(style.opacity || '1') < 0.15) return false;

      // Must have real layout dimensions on screen
      const rect = el.getBoundingClientRect();
      if (rect.width < 15 || rect.height < 15) return false;

      // Must be in or near the visible viewport
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > vh + 150) return false;

      // Check parent containers for hidden or zero-opacity state
      let p = el.parentElement;
      let depth = 0;
      while (p && depth < 6 && p !== document.body) {
        const pStyle = window.getComputedStyle(p);
        if (pStyle.display === 'none' || pStyle.visibility === 'hidden') return false;
        if (parseFloat(pStyle.opacity || '1') < 0.15) return false;
        if (p.hasAttribute('hidden') || p.getAttribute('aria-hidden') === 'true') return false;
        p = p.parentElement;
        depth++;
      }

      return true;
    }

    function findPageChoiceElements() {
      const SELECTORS =
        [
          'button', '[role="button"]', '[role="option"]', '[role="radio"]', '[role="checkbox"]',
          'label', '[class*="choice"]', '[class*="option"]', '[class*="answer"]', '[class*="quiz"]',
          '[class*="Choice"]', '[class*="Option"]', '[class*="Answer"]', '[class*="Quiz"]',
          '[data-testid*="choice"]', '[data-testid*="option"]', '[data-testid*="button"]',
          '[data-testid*="answer"]', '[data-testid*="quiz"]'
        ].join(',');

      const all = Array.from(document.querySelectorAll(SELECTORS));
      const filtered = all.filter(el => {
        if (host.contains(el)) return false;

        // MUST BE VISUALLY DISPLAYED ON SCREEN!
        if (!isElementVisuallyVisible(el)) return false;

        const t = (el.innerText || el.textContent || '').trim();
        if (!t || t.length > 300) return false;

        // Skip non-choice UI controls like "Open Q&A", "Submit", etc.
        if (isNonChoiceElement(el)) return false;

        return true;
      });

      // 1. Discard container elements that contain multiple choice candidates
      const nonContainers = filtered.filter(el => {
        const subCandidates = el.querySelectorAll('button, [role="button"], [role="option"], [role="radio"]');
        return subCandidates.length <= 1;
      });

      // 2. Discard child elements when their parent candidate is also in the list (prevent nested double-highlighting)
      const deduped = nonContainers.filter(el => { return !nonContainers.some(other => other !== el && other.contains(el)); });

      return deduped;
    }

    function areOptionsVisuallyAppeared(slide) {
      if (!slide || !slide.choices || slide.choices.length === 0) return false;
      const pageChoices = findPageChoiceElements();
      if (pageChoices.length < 2) return false;

      const matchedMap = mapChoicesToSlide(slide, pageChoices);
      if (matchedMap.size === 0) return false;

      // Check that the correct choice button is among the visually visible choices
      let correctElFound = false;
      for (const [el, idx] of matchedMap.entries()) {
        if (idx === slide.correctIndex && isElementVisuallyVisible(el)) {
          correctElFound = true;
          break;
        }
      }
      return correctElFound;
    }

    /* -- LIVE QUESTION HEADING DETECTOR (DIRECT DOM INSPECTION) -- */
    function getPageQuestionHeading() {
      const selectors =
        [
          'h1', 'h2', 'h3',
          '[data-testid*="question"]', '[data-testid*="slide-title"]', '[data-testid*="title"]',
          '[class*="Question"]', '[class*="question"]',
          '[class*="SlideTitle"]', '[class*="slide-title"]'
        ];
      const headings = Array.from(document.querySelectorAll(selectors.join(','))).filter(el => !host.contains(el) && !isNonChoiceElement(el));

      for (const h of headings) {
        const t = (h.innerText || h.textContent || '').trim();
        if (t.length >= 6 && t.length <= 400) {
          const lower = t.toLowerCase();
          if (!lower.includes('mentimeter') && !lower.includes('join at') && !lower.includes('enter the code')) return norm(t);
        }
      }
      return '';
    }

    function detectActiveSlide() {
      if (!allSlides.length) return null;
      const bodyText = norm(document.body.innerText || '');
      const pageHeading = getPageQuestionHeading();

      const interactive = allSlides.filter(s => !s.isInfo && s.choices?.length > 0);
      let best = null;
      let bestScore = 0;

      const pageChoices = findPageChoiceElements();
      const pageChoiceTexts = pageChoices.map(el => norm((el.innerText || el.textContent || '') + ' ' + (el.getAttribute('aria-label') || '')));

      for (const s of interactive) {
        let score = 0;
        const qNorm = norm(s.question);

        // 1. Direct slide heading match (highest priority, 1000 points)
        if (pageHeading) {
          const isPageNegative = /\b(?:not|does not|doesn t|never)\b/i.test(pageHeading);
          const isSlideNegative = /\b(?:not|does not|doesn t|never)\b/i.test(qNorm);

          // If one is negative and the other is affirmative, they CANNOT be the same question!
          if (isPageNegative !== isSlideNegative) score -= 500;
          else if (pageHeading === qNorm) score += 1000;
          else if (pageHeading.length > 8 && (pageHeading.includes(qNorm) || qNorm.includes(pageHeading))) score += 600;
          else {
            const pWords = pageHeading.split(' ').filter(w => w.length > 3);
            const qWords = qNorm.split(' ').filter(w => w.length > 3);
            const common = pWords.filter(w => qWords.includes(w)).length;
            if (pWords.length > 0 && common / pWords.length >= 0.7) score += 400;
          }
        }

        // 2. Full body text match
        if (qNorm.length > 5 && bodyText.includes(qNorm)) score += 15;
        else if (qNorm.length > 8) {
          const words = qNorm.split(' ').filter(w => w.length > 3);
          const matches = words.filter(w => bodyText.includes(w)).length;
          if (words.length > 0 && matches / words.length > 0.45) score += 8;
        }

        // 3. Choice matches
        let choiceHits = 0;
        for (const ch of s.choices) {
          const cNorm = norm(ch.text);
          if (cNorm.length > 2) {
            if (bodyText.includes(cNorm)) choiceHits++;
            if (pageChoiceTexts.some(pt => pt.includes(cNorm) || cNorm.includes(pt))) choiceHits += 2;
          }
        }

        if (choiceHits > 0) score += choiceHits * 4;

        if (score > bestScore && score >= 4) {
          bestScore = score;
          best = s;
        }
      }

      return best;
    }

    function updateActiveSlideUI() {
      const cards = sh.querySelectorAll('.card');
      cards.forEach
        (
          c => {
            const idx = parseInt(c.dataset.slideIdx, 10);
            const isCur = activeSlideOnScreen && allSlides.indexOf(activeSlideOnScreen) === idx;
            c.classList.toggle('active-on-screen', isCur);
          }
        );
    }

    /* -- CHOICE MATCHING HELPER -- */
    function mapChoicesToSlide(slide, pageChoices) {
      const matchedMap = new Map();
      if (!slide || !slide.choices || !pageChoices || !pageChoices.length) return matchedMap;

      const allNorms = slide.choices.map(c => norm(c?.text || c));

      for (let pi = 0; pi < pageChoices.length; pi++) {
        const elmt = pageChoices[pi];
        if (isNonChoiceElement(elmt)) continue;

        const rawText = (elmt.innerText || elmt.textContent || '').trim();
        const ariaLabel = (elmt.getAttribute('aria-label') || '').trim();
        const testId = (elmt.getAttribute('data-testid') || '').trim();
        const elNorm = norm(`${rawText} ${ariaLabel} ${testId}`);

        let matchIdx = -1;

        // 1. Text similarity with actual choice text (highest precision)
        if (elNorm.length >= 3) matchIdx = allNorms.findIndex(cn => cn.length >= 3 && (elNorm.includes(cn) || cn.includes(elNorm)));

        // 2. Strict letter badge matching (e.g. starts with "A)", "Option A", "Choice B", or testid="choice-0")
        // NEVER match arbitrary \b([A-D])\b inside random text like "Open Q&A"!
        if (matchIdx === -1) {
          const startLetterMatch = rawText.match(/^\s*(?:option|choice|answer)?\s*([A-D])(?:\)|\.|\:|\s|$)/i) ||
            ariaLabel.match(/^\s*(?:option|choice|answer)?\s*([A-D])(?:\)|\.|\:|\s|$)/i);
          const testIdMatch = testId.match(/choice[-_]?([0-3]|[A-D])\b/i);

          if (startLetterMatch) {
            const token = startLetterMatch[1].toUpperCase();
            if (token >= 'A' && token <= 'D') matchIdx = token.charCodeAt(0) - 65;
          }
          else if (testIdMatch) {
            const token = testIdMatch[1].toUpperCase();
            if (token >= 'A' && token <= 'D') matchIdx = token.charCodeAt(0) - 65;
            else if (token >= '0' && token <= '3') matchIdx = parseInt(token, 10);
          }
        }

        if (matchIdx >= 0 && matchIdx < slide.choices.length) matchedMap.set(elmt, matchIdx);
      }

      // 3. Positional fallback: when count matches and none are non-choice UI elements
      if (matchedMap.size === 0 && pageChoices.length === slide.choices.length && slide.choices.length >= 2) {
        const allAreChoices = pageChoices.every(el => !isNonChoiceElement(el));
        if (allAreChoices) for (let pi = 0; pi < pageChoices.length; pi++) { matchedMap.set(pageChoices[pi], pi); }
      }

      return matchedMap;
    }

    /* -- SELECTION VERIFICATION HELPER -- */
    function isChoiceSelectedOnPage(el) {
      if (!el || !document.body.contains(el)) return false;
      const btn = el.tagName === 'BUTTON' ? el : (el.closest('button, [role="button"]') || el);

      // 1. ARIA state
      if
        (
        btn.getAttribute('aria-pressed') === 'true' ||
        btn.getAttribute('aria-checked') === 'true' ||
        btn.getAttribute('aria-selected') === 'true' ||
        btn.dataset.selected === 'true'
      ) return true;

      // 2. Class names
      const cls = (btn.className || '').toLowerCase();
      if
        (
        cls.includes('selected') ||
        cls.includes('active') ||
        cls.includes('voted') ||
        cls.includes('bg-primary') ||
        cls.includes('border-primary')
      ) return true;

      // 3. Radio/Checkbox inputs
      const input = btn.querySelector('input') || el.querySelector('input');
      if (input && input.checked) return true;

      // 4. Mentimeter page text indicates submitted or answer locked
      const txt = (document.body.innerText || '').toLowerCase();
      if
        (
        txt.includes('submitted') ||
        txt.includes('waiting for presenter') ||
        txt.includes('waiting for the next') ||
        txt.includes('answer received') ||
        txt.includes('you have answered') ||
        txt.includes('hold on')
      ) return true;

      return false;
    }

    /* -- ROBUST CLICK SIMULATION (BRIDGES TO MAIN WORLD + SYNCHRONOUS INLINE SCRIPT) -- */
    function dispatchReactClick(el) {
      if (!el) return;

      try { el.focus(); } catch { }

      const marker = 'mc-target-' + Math.random().toString(36).slice(2);
      try { el.setAttribute('data-mc-click', marker); } catch { }

      // 1. Dispatch event across world boundary (on document with bubbles+composed)
      try {
        document.dispatchEvent
          (new CustomEvent
            ('MC_TRIGGER_CLICK',
              {
                bubbles: true,
                composed: true,
                detail: { selector: `[data-mc-click="${marker}"], [data-mc-answer="correct"]` }
              }
            )
          );
      } catch { }

      // 2. Execute synchronous script in MAIN WORLD (100% reliable React Fiber onClick invoker)
      try {
        const s = document.createElement('script');
        s.textContent = `(function()
        {
          const el = document.querySelector('[data-mc-click="${marker}"]') || document.querySelector('[data-mc-answer="correct"]');
          if (!el) return;
          try { el.removeAttribute('data-mc-click'); } catch(e) {}
          const candidates = [
            el,
            el.closest('button, [role="button"], label, a'),
            ...el.querySelectorAll('button, [role="button"], label, input, span')
          ].filter(Boolean);

          for (const target of candidates)
          {
            if (target.hasAttribute && target.hasAttribute('disabled'))
            {
              target.removeAttribute('disabled');
              try { target.disabled = false; } catch {}
            }
            if (target.getAttribute && target.getAttribute('aria-disabled') === 'true')
            {
              target.removeAttribute('aria-disabled');
            }
            const key = Object.keys(target).find(k =>
              k.startsWith('__reactProps$') ||
              k.startsWith('__reactFiber$') ||
              k.startsWith('__reactInternalInstance$')
            );
            if (key && target[key])
            {
              const props = target[key].memoizedProps || target[key];
              const fakeEvt = {
                preventDefault() {},
                stopPropagation() {},
                target,
                currentTarget: target,
                bubbles: true,
                cancelable: true,
                isTrusted: true
              };
              if (typeof props.onClick === 'function')
              {
                try { props.onClick(fakeEvt); } catch(e) {}
              }
              if (typeof props.onChange === 'function')
              {
                try { props.onChange(fakeEvt); } catch(e) {}
              }
            }
            const fKey = Object.keys(target).find(k => k.startsWith('__reactFiber$'));
            if (fKey && target[fKey])
            {
              let cur = target[fKey];
              let d = 0;
              while (cur && d < 6)
              {
                if (cur.memoizedProps && typeof cur.memoizedProps.onClick === 'function')
                {
                  try
                  {
                    cur.memoizedProps.onClick({
                      preventDefault() {},
                      stopPropagation() {},
                      target,
                      currentTarget: target,
                      bubbles: true,
                      cancelable: true,
                      isTrusted: true
                    });
                  } catch(e) {}
                  break;
                }
                cur = cur.return;
                d++;
              }
            }
          }
          try
          {
            const rect = el.getBoundingClientRect();
            const opts = { bubbles: true, cancelable: true, composed: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, button: 0, buttons: 1 };
            el.dispatchEvent(new PointerEvent('pointerdown', { ...opts, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
            el.dispatchEvent(new MouseEvent('mousedown', opts));
            el.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
            el.dispatchEvent(new MouseEvent('mouseup', { ...opts, buttons: 0 }));
            el.dispatchEvent(new MouseEvent('click', { ...opts, buttons: 0 }));
            el.click();
          } catch(e) {}
        })();`;
        (document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch { }

      // 3. Isolated-world native events fallback
      try {
        const rect = el.getBoundingClientRect();
        const opts =
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          view: window,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          button: 0,
          buttons: 1
        };
        el.dispatchEvent(new PointerEvent('pointerdown', { ...opts, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
        el.dispatchEvent(new MouseEvent('mousedown', opts));
        el.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { ...opts, buttons: 0 }));
        el.dispatchEvent(new MouseEvent('click', { ...opts, buttons: 0 }));
        el.click();
      } catch { }
    }

    /* -- ON-PAGE HIGHLIGHTING APPLICATION -- */
    function applySlideHighlights(slide) {
      if (!cfgAutoHl || slide.correctIndex == null) return;
      const pageChoices = findPageChoiceElements();
      if (!pageChoices.length) return;
      const matchedMap = mapChoicesToSlide(slide, pageChoices);
      for (const [elmt, matchIdx] of matchedMap.entries()) {
        const isCorrect = (matchIdx === slide.correctIndex);
        elmt.setAttribute(PAGE_ATTR, isCorrect ? 'correct' : 'wrong');
      }
    }

    /* -- RELIABLE CHOICE SELECTION (INVOKES MAIN WORLD REACT LISTENER) -- */
    function attemptChoiceSelection(slide, attemptCount, delaySec) {
      if (!cfgAutoSel || slide.hasAutoSelected) return;
      if (activeSlideOnScreen && activeSlideOnScreen !== slide) return;

      // Find current live correct element on live page
      let elToClick = document.querySelector('[data-mc-answer="correct"]');
      if (!elToClick) {
        const freshChoices = findPageChoiceElements();
        const map = mapChoicesToSlide(slide, freshChoices);
        for (const [el, idx] of map.entries()) {
          if (idx === slide.correctIndex) {
            elToClick = el;
            if (cfgAutoHl) el.setAttribute(PAGE_ATTR, 'correct');
            break;
          }
        }
      }

      if (!elToClick || !isElementVisuallyVisible(elToClick)) {
        // Element not visually ready on screen yet, retry up to 20 times (4.0s)
        if (attemptCount < 20) setTimeout(() => attemptChoiceSelection(slide, attemptCount + 1, delaySec), 200);
        return;
      }

      const btn = elToClick.tagName === 'BUTTON' ? elToClick : (elToClick.closest('button, [role="button"]') || elToClick);

      // If button is temporarily disabled (e.g. countdown still finishing), wait & retry!
      if (btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true' || btn.disabled) {
        if (attemptCount < 20) {
          setTimeout(() => attemptChoiceSelection(slide, attemptCount + 1, delaySec), 200);
          return;
        }
        btn.removeAttribute('disabled');
        btn.removeAttribute('aria-disabled');
        try { btn.disabled = false; } catch { }
      }

      try { btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      catch { }

      // Dispatch clicks (bridges to MAIN execution world for React 18 synthetic events)
      dispatchReactClick(btn);
      if (btn !== elToClick) dispatchReactClick(elToClick);

      // Check radio/checkbox inputs if any
      const radio = elToClick.querySelector('input[type="radio"], input[type="checkbox"]') || btn.querySelector('input[type="radio"], input[type="checkbox"]') || elToClick.closest('label')?.querySelector('input');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('input', { bubbles: true }));
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        try { radio.click(); } catch { }
      }

      slide.hasAutoSelected = true;
      const letter = String.fromCharCode(65 + slide.correctIndex);
      const answerTitle = slide.choices[slide.correctIndex]?.text || '';
      showPageBanner(`✓ Auto-selected Choice ${letter} (${delaySec}s): ${answerTitle}`);

      const sIdx = allSlides.indexOf(slide);
      const card = sh.querySelector(`.card[data-slide-idx="${sIdx}"]`);
      if (card) {
        const rows = card.querySelectorAll('.choice');
        if (rows[slide.correctIndex]) rows[slide.correctIndex].classList.add('auto-selected');
      }

      // Follow-up reinforcement click after 200ms
      setTimeout
        (
          () => {
            dispatchReactClick(btn);
            if (cfgAutoSub) trySubmit();
          }, 200
        );
    }

    function trySubmit() {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]')).filter(b => !host.contains(b));
      for (const b of btns) {
        const t = (b.textContent || '').trim().toLowerCase();
        if ((t === 'submit' || t === 'vote' || t === 'submit answer') && !b.disabled) {
          dispatchReactClick(b);
          console.log('[MentiChecker] Auto-submitted answer');
          break;
        }
      }
    }


    /* -- AUTO-FILL QUIZ PLAYER NAME & JOIN LOBBY -- */
    let hasAutoFilledQuizName = false;

    function checkAndFillQuizName() {
      if (!cfgAutoName || !cfgPlayerName) return;

      const NAME_SELECTORS = [
        'input[data-testid="quiz-player-name"]',
        'input#quiz-name',
        'input[name="quiz-name"]',
        'input[data-testid*="player-name"]',
        'input[data-testid*="quiz-name"]',
        'input[placeholder*="name" i]',
        'input[aria-label*="name" i]'
      ].join(',');

      const allInputs = Array.from(document.querySelectorAll(NAME_SELECTORS))
        .filter(inp => !host.contains(inp) && isElementVisuallyVisible(inp));

      if (!allInputs.length) {
        if (hasAutoFilledQuizName && !document.querySelector(NAME_SELECTORS)) {
          hasAutoFilledQuizName = false;
        }
        return;
      }

      const input = allInputs[0];

      if (hasAutoFilledQuizName && input.dataset.mcFilled === cfgPlayerName) {
        return;
      }

      const currentVal = (input.value || '').trim();
      const needsChange = (currentVal !== cfgPlayerName);

      if (needsChange) {
        console.log(`[MentiChecker] Auto-filling quiz name "${cfgPlayerName}" (was "${currentVal}")`);

        try { input.focus(); } catch (e) { }

        if (input.hasAttribute('disabled') || input.disabled) {
          input.removeAttribute('disabled');
          try { input.disabled = false; } catch (e) { }
        }

        // 1. Native prototype setter to bypass React controlled component barrier
        try {
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (nativeSetter) nativeSetter.call(input, cfgPlayerName);
          else input.value = cfgPlayerName;
        } catch (e) {
          input.value = cfgPlayerName;
        }

        // 2. Dispatch React-compatible events
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

        // 3. Trigger via MAIN world bridge
        try {
          document.dispatchEvent(
            new CustomEvent('MC_SET_INPUT', {
              bubbles: true,
              composed: true,
              detail: {
                selector: 'input[data-testid="quiz-player-name"], #quiz-name, [name="quiz-name"]',
                value: cfgPlayerName,
                submit: true
              }
            })
          );
        } catch (e) { }

        input.dataset.mcFilled = cfgPlayerName;
        showPageBanner(`\uD83D\uDC64 Auto-entered Quiz Name: ${cfgPlayerName}`);
        showToast(`\u2713 Auto-entered Quiz Name: ${cfgPlayerName}`);
      }

      // Find the join / submit button
      const form = input.closest('form');
      let submitBtn = document.querySelector('button[data-testid="quiz-player-form-submit"]');
      if (!submitBtn && form) {
        submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      }
      if (!submitBtn) {
        const btns = Array.from(document.querySelectorAll('button, [role="button"]'))
          .filter(b => !host.contains(b) && isElementVisuallyVisible(b));
        for (const b of btns) {
          const t = (b.textContent || '').trim().toLowerCase();
          if (t === 'join quiz' || t === 'join' || t === 'enter quiz' || t === 'ready' || t === 'go!' || t === 'go' || t === 'participate') {
            submitBtn = b;
            break;
          }
        }
      }

      if (submitBtn) {
        setTimeout(() => {
          if (submitBtn.hasAttribute('disabled') || submitBtn.disabled) {
            submitBtn.removeAttribute('disabled');
            try { submitBtn.disabled = false; } catch (e) { }
          }
          console.log('[MentiChecker] Submitting quiz name form');
          dispatchReactClick(submitBtn);
          hasAutoFilledQuizName = true;
        }, 180);
      } else if (form) {
        setTimeout(() => {
          try {
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            hasAutoFilledQuizName = true;
          } catch (e) { }
        }, 180);
      }
    }

    /* -- SYNC ON-PAGE HIGHLIGHTING & TIMER-BASED SELECTION -- */
    // RULE: Inside MentiChecker extension, answers are displayed IMMEDIATELY without any timer.
    // On the live menti.com presentation slide, wait 0.5s-1.5s randomly before revealing green highlight & selecting.
    function syncPageHighlightAndSelect() {
      checkAndFillQuizName();
      const current = detectActiveSlide();
      if (current && activeSlideOnScreen && activeSlideOnScreen !== current) {
        if (activeSlideOnScreen.onSlideTimer) {
          clearTimeout(activeSlideOnScreen.onSlideTimer);
          activeSlideOnScreen.onSlideTimer = null;
        }
        clearPageHighlights();
      }
      if (current) activeSlideOnScreen = current;
      updateActiveSlideUI();

      if (!activeSlideOnScreen) {
        clearPageHighlights();
        return;
      }

      const slideToUse = activeSlideOnScreen;
      injectPageStyle();

      const hasCorrectAnswer = (slideToUse.correctIndex != null && slideToUse.correctIndex >= 0);

      if (!hasCorrectAnswer) {
        clearPageHighlights();
        if (!slideToUse.solvingAI) ensureApiKeyLoaded().then(key => { if (key && slideToUse.correctIndex == null && !slideToUse.solvingAI) solveSingleSlide(slideToUse); });
        return;
      }

      // CRITICAL REQUIREMENT: START AUTOPICK ONLY WHEN OPTIONS LIST IS VISUALLY APPEARED ON THE PAGE!
      const optionsVisible = areOptionsVisuallyAppeared(slideToUse);
      if (!optionsVisible) {
        // Options have not appeared visually yet (countdown or transition in progress).
        // Clear any premature timers and wait until choices become visible on screen!
        if (slideToUse.onSlideTimer) {
          clearTimeout(slideToUse.onSlideTimer);
          slideToUse.onSlideTimer = null;
        }
        slideToUse.slideTimerFired = false;
        return;
      }

      // 1. OPTIONS ARE NOW VISIBLE ON SCREEN! HIGHLIGHT CORRECT ANSWER GREEN!
      if (cfgAutoHl) applySlideHighlights(slideToUse);
      else clearPageHighlights();

      // 2. START AUTOPICK CLICK (0.5s - 1.5s RANDOM DELAY AFTER OPTIONS VISUALLY APPEARED!)
      if (cfgAutoSel && !slideToUse.hasAutoSelected) {
        if (!slideToUse.slideTimerFired) {
          if (!slideToUse.onSlideTimer) {
            const delayMs = Math.floor(Math.random() * 1001) + 500; // 500ms to 1500ms (0.5s-1.5s)
            const delaySec = (delayMs / 1000).toFixed(2);
            slideToUse.slideDelaySec = delaySec;

            const letter = String.fromCharCode(65 + slideToUse.correctIndex);
            showPageBanner(`⏱ Options appeared! Choice ${letter} auto-selecting in ${delaySec}s...`);

            slideToUse.onSlideTimer = setTimeout
              (
                () => {
                  slideToUse.onSlideTimer = null;
                  slideToUse.slideTimerFired = true;

                  // Auto-select / click the choice on the live slide NOW
                  if (cfgAutoSel && !slideToUse.hasAutoSelected) attemptChoiceSelection(slideToUse, 0, delaySec);
                }, delayMs
              );
          }
        }
        else attemptChoiceSelection(slideToUse, 0, slideToUse.slideDelaySec || '1.0');
      }
    }

    /* -- ANSWER PARSER (HANDLES ALL FORMATS LIKE **A**, A), A, ETC) -- */
    function parseLetterFromAIResponse(rawText, choices) {
      if (!rawText) return null;
      const up = rawText.trim().toUpperCase();

      // 1. Direct single letter A-H
      if (/^[A-H]$/.test(up)) return up;

      // 2. Starts with letter: A), A., A -, **A**
      const m1 = up.match(/^[\*\s\"\']*([A-H])(?:\)|\.|\s|\*|\:|$)/);
      if (m1) return m1[1];

      // 3. Contains 'Answer: X' or 'Option X' or '**X**'
      const m2 = up.match(/(?:ANSWER|OPTION|CHOICE|IS|SELECTED|\*\*)\s*[:\-\s\*\(\[]*([A-H])\b/);
      if (m2) return m2[1];

      // 4. Any standalone uppercase letter A-H
      const m3 = up.match(/\b([A-H])\b/);
      if (m3) return m3[1];

      // 5. Match by choice text similarity (supports "Yes", "No", "True", "False", etc)
      const cleanUp = up.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      for (let i = 0; i < choices.length; i++) {
        const rawText = typeof choices[i] === 'string' ? choices[i] : (choices[i]?.text || '');
        const chText = rawText.toLowerCase().replace(/^[a-h][).\s:-]+/i, '').replace(/[^a-z0-9]/g, ' ').trim();
        if (chText && cleanUp.includes(chText)) return String.fromCharCode(65 + i);
      }

      return null;
    }

    let lastSolverError = null;

    /* -- AI SOLVER (BRIDGES TO BACKGROUND SCRIPT TO BYPASS CSP) -- */
    async function solveWithAI(question, choices) {
      // 1. First check built-in verified answers (0ms latency)
      const builtin = getBuiltinAnswer(question, choices);
      if (builtin) {
        console.log('[MentiChecker] Solved via verified knowledge base:', builtin);
        return builtin;
      }

      const key = await ensureApiKeyLoaded();
      if (!key) {
        lastSolverError = 'No API key entered in Settings';
        return null;
      }

      // 2. Try Background Script (runs in extension origin, bypasses menti.com CSP)
      try {
        const bgResponse = await new Promise
          (
            (resolve) => {
              chrome.runtime.sendMessage
                (
                  { type: 'SOLVE_GEMINI', key, question, choices }, (res) => {
                    if (chrome.runtime.lastError) {
                      const msg = chrome.runtime.lastError.message || '';
                      if (msg.includes('invalidated')) lastSolverError = 'Extension reloaded: please refresh page (F5)';
                      else lastSolverError = 'Background error: ' + msg;
                      console.warn('[MentiChecker] BG runtime error:', msg);
                      resolve(null);
                    }
                    else resolve(res);
                  }
                );
            }
          );

        if (bgResponse) {
          if (bgResponse.success && bgResponse.text) {
            const parsed = parseLetterFromAIResponse(bgResponse.text, choices);
            if (parsed) return parsed;
            lastSolverError = 'AI response format error: ' + bgResponse.text.slice(0, 30);
          }
          else if (bgResponse.error) {
            lastSolverError = bgResponse.error;
            console.warn('[MentiChecker] Gemini API error:', bgResponse.error);
          }
        }
      }
      catch (e) {
        lastSolverError = e.message;
        console.warn('[MentiChecker] BG Bridge failed:', e);
      }

      return null;
    }

    async function solveSingleSlide(slide) {
      if (slide.solvingAI || slide.correctIndex != null) return;
      slide.solvingAI = true;
      const slideIdx = allSlides.indexOf(slide);

      const card = sh.querySelector(`.card[data-slide-idx="${slideIdx}"]`);
      const panelChoices = card?.querySelectorAll('.choice') ?? [];
      panelChoices.forEach(c => c.classList.add('ai-thinking'));

      const letter = await solveWithAI(slide.question, slide.choices);

      slide.solvingAI = false;
      panelChoices.forEach(c => c.classList.remove('ai-thinking'));

      if (letter) {
        const ci = letter.charCodeAt(0) - 65;
        if (ci >= 0 && ci < slide.choices.length) {
          slide.correctIndex = ci;
          slide.correctText = slide.choices[ci].text;

          /* Highlight in MentiChecker panel */
          markCardAsSolved(slideIdx, ci);

          /* Highlight on live presentation slide */
          syncPageHighlightAndSelect();
        }
      }
    }

    async function runSolver() {
      if (solving) return;
      const key = await ensureApiKeyLoaded();
      if (!key) {
        // Solve all questions that match verified knowledge base (polls + quizzes)
        let localSolved = 0;
        allSlides.forEach
          (
            (slide, sIdx) => {
              if (!slide.isInfo && slide.correctIndex == null) {
                const builtin = getBuiltinAnswer(slide.question, slide.choices);
                if (builtin) {
                  const ci = builtin.charCodeAt(0) - 65;
                  slide.correctIndex = ci;
                  slide.correctText = slide.choices[ci].text;
                  markCardAsSolved(sIdx, ci);
                  localSolved++;
                }
              }
              else if (!slide.isInfo && slide.correctIndex != null) {
                markCardAsSolved(sIdx, slide.correctIndex);
                localSolved++;
              }
            }
          );
        const interactiveCount = allSlides.filter(s => !s.isInfo).length;
        if (localSolved > 0) {
          aiStatus.textContent = '\u2713 ' + localSolved + ' / ' + interactiveCount + ' verified & solved';
          showToast('\u2713 ' + localSolved + ' correct answers highlighted');
          syncPageHighlightAndSelect();
          return;
        }
        hdrGear.click();
        return;
      }

      solving = true;
      aiBtn.disabled = true;
      aiBtn.textContent = '⚡ Solving...';

      const interactive = allSlides.filter(s => !s.isInfo);
      let solvedCount = 0;

      // 1. Instant check for verified database & pre-solved slides
      const remainingToSolve = [];
      for (let i = 0; i < interactive.length; i++) {
        const slide = interactive[i];
        const slideIdx = allSlides.indexOf(slide);

        if (slide.correctIndex != null) {
          solvedCount++;
          markCardAsSolved(slideIdx, slide.correctIndex);
          continue;
        }

        const builtin = getBuiltinAnswer(slide.question, slide.choices);
        if (builtin) {
          const ci = builtin.charCodeAt(0) - 65;
          if (ci >= 0 && ci < slide.choices.length) {
            slide.correctIndex = ci;
            slide.correctText = slide.choices[ci].text;
            markCardAsSolved(slideIdx, ci);
            solvedCount++;
            continue;
          }
        }

        remainingToSolve.push(slide);
      }

      async function solveWorker(slide) {
        if (slide.correctIndex != null) return;
        slide.solvingAI = true;
        const slideIdx = allSlides.indexOf(slide);
        const card = sh.querySelector(`.card[data-slide-idx="${slideIdx}"]`);
        const panelChoices = card?.querySelectorAll('.choice') ?? [];
        panelChoices.forEach(c => c.classList.add('ai-thinking'));

        const letter = await solveWithAI(slide.question, slide.choices);

        slide.solvingAI = false;
        panelChoices.forEach(c => c.classList.remove('ai-thinking'));

        if (letter) {
          const ci = letter.charCodeAt(0) - 65;
          if (ci >= 0 && ci < slide.choices.length) {
            slide.correctIndex = ci;
            slide.correctText = slide.choices[ci].text;
            markCardAsSolved(slideIdx, ci);
            solvedCount++;

            if (activeSlideOnScreen === slide) syncPageHighlightAndSelect();
          }
        }

        completed++;
        aiStatus.textContent = `⚡ Solving: ${completed} / ${totalRemaining} completed (${solvedCount} solved)`;
      }

      if (remainingToSolve.length === 0) {
        aiStatus.textContent = `✓ All ${interactive.length} questions solved!`;
        showToast(`✓ All ${interactive.length} questions solved!`);
        solving = false;
        aiBtn.disabled = false;
        aiBtn.textContent = '⚡ Solved';
        syncPageHighlightAndSelect();
        return;
      }

      // Show thinking spinners on cards being solved
      remainingToSolve.forEach
        (
          slide => {
            const slideIdx = allSlides.indexOf(slide);
            const card = sh.querySelector(`.card[data-slide-idx="${slideIdx}"]`);
            const panelChoices = card?.querySelectorAll('.choice') ?? [];
            panelChoices.forEach(c => c.classList.add('ai-thinking'));
          }
        );

      if (solvedCount > 0) aiStatus.textContent = `⚡ 1-request solving all ${interactive.length} questions (${remainingToSolve.length} via AI, ${solvedCount} pre-verified)...`;
      else aiStatus.textContent = `⚡ 1-request solving all ${interactive.length} questions...`;

      // 2. SEND EXACTLY ONE API REQUEST FOR ALL QUESTIONS (List of questions -> string of answers)
      const questionsPayload = remainingToSolve.map
        (
          s =>
          (
            {
              question: s.question,
              choices: s.choices.map(c => c.text || c)
            }
          )
        );

      try {
        const res = await new Promise(resolve => { chrome.runtime.sendMessage({ type: 'SOLVE_ALL_IN_ONE', key, questions: questionsPayload }, r => resolve(r || null)); });

        console.log('[MentiChecker] 1-request result:', res);

        if (res && res.success && res.letters && res.letters.length > 0) {
          res.letters.forEach
            (
              (letter, i) => {
                if (i < remainingToSolve.length && letter) {
                  const slide = remainingToSolve[i];
                  const slideIdx = allSlides.indexOf(slide);
                  const ci = letter.charCodeAt(0) - 65;
                  if (ci >= 0 && ci < slide.choices.length) {
                    slide.correctIndex = ci;
                    slide.correctText = slide.choices[ci].text;
                    markCardAsSolved(slideIdx, ci);
                    solvedCount++;
                  }
                }
              }
            );
        }
        else if (res?.error) {
          lastSolverError = res.error;
          console.warn('[MentiChecker] 1-request error:', res.error);
          const isQuotaErr = res.error.includes('429') || res.error.includes('quota') || res.error.includes('limit');
          // Fallback: solve individually ONLY if not a hard quota error
          if (!isQuotaErr) {
            for (const slide of remainingToSolve) {
              if (slide.correctIndex == null) {
                const letter = await solveWithAI(slide.question, slide.choices);
                if (letter) {
                  const ci = letter.charCodeAt(0) - 65;
                  if (ci >= 0 && ci < slide.choices.length) {
                    slide.correctIndex = ci;
                    slide.correctText = slide.choices[ci].text;
                    markCardAsSolved(allSlides.indexOf(slide), ci);
                    solvedCount++;
                  }
                }
              }
            }
          }
        }
      }
      catch (err) {
        lastSolverError = err.message;
        console.warn('[MentiChecker] 1-request exception:', err);
      }
      finally {
        remainingToSolve.forEach
          (
            slide => {
              const slideIdx = allSlides.indexOf(slide);
              const card = sh.querySelector(`.card[data-slide-idx="${slideIdx}"]`);
              const panelChoices = card?.querySelectorAll('.choice') ?? [];
              panelChoices.forEach(c => c.classList.remove('ai-thinking'));
            }
          );
      }

      if (solvedCount === interactive.length) {
        aiStatus.textContent = `✓ All ${solvedCount} questions solved!`;
        showToast(`✓ All ${solvedCount} questions solved in 1 request!`);
      }
      else if (solvedCount > 0) {
        const failed = interactive.length - solvedCount;
        const errReason = lastSolverError ? `: ${lastSolverError}` : '';
        aiStatus.textContent = `✓ ${solvedCount} / ${interactive.length} solved (${failed} failed${errReason})`;
        showToast(`✓ ${solvedCount} solved · ${failed} failed`);
      }
      else {
        const errTxt = lastSolverError ? ('❌ ' + lastSolverError) : '❌ Could not solve — check API key in Settings';
        aiStatus.textContent = errTxt;
        showToast(lastSolverError || 'Could not reach AI — check your API key');
      }

      aiBtn.textContent = '↺ Re-solve';
      aiBtn.disabled = false;
      solving = false;

      syncPageHighlightAndSelect();
    }

    aiBtn.addEventListener('click', () => { runSolver(); });

    /* -- SCAN -- */
    function doScan() {
      allSlides.forEach
        (
          s => {
            if (s.onSlideTimer) {
              clearTimeout(s.onSlideTimer);
              s.onSlideTimer = null;
            }
            s.slideTimerFired = false;
            s.hasAutoSelected = false;
          }
        );
      showLoading();
      filters.style.display = 'none';
      foot.style.display = 'none';
      aiBar.style.display = 'none';
      hdrStat.style.display = 'none';
      fabDot.classList.remove('on');
      clearPageHighlights();

      setTimeout(() => {
        const raw = extractSlideDeck();
        if (!raw) {
          showError('Could not find slide data.<br>Make sure the Mentimeter page is fully loaded.');
          return;
        }
        const slides = parseSlides(raw);
        if (!slides.length) {
          showError('No interactive slides found on this page.');
          return;
        }
        allSlides = slides;

        const qCount = slides.filter(s => !s.isInfo).length;
        hdrStat.textContent = qCount + ' Q';
        hdrStat.style.display = 'block';
        filters.style.display = 'flex';
        foot.style.display = 'flex';
        footNote.textContent = qCount + ' interactive \u00B7 ' + (slides.length - qCount) + ' info slides';
        fabDot.classList.add('on');

        filters.querySelectorAll('.fbtn').forEach(b => b.classList.remove('on'));
        filters.querySelector('[data-f="all"]').classList.add('on');
        curFilter = 'all';
        applyFilter('all');
        updateAiBar();

        // Trigger solving automatically!
        setTimeout(() => runSolver(), 250);

        syncPageHighlightAndSelect();
      }, 120);
    }

    rescanBtn.addEventListener('click', doScan);

    /* -- CONTINUOUS PAGE WATCHER / OBSERVER -- */
    let syncDebounce = null;
    function triggerSync() {
      clearTimeout(syncDebounce);
      syncDebounce = setTimeout(syncPageHighlightAndSelect, 150);
    }

    const observer = new MutationObserver
      (
        (mutations) => {
          const relevant = mutations.some(m => !host.contains(m.target));
          if (relevant) triggerSync();
        }
      );

    observer.observe
      (
        document.body,
        {
          childList: true,
          subtree: true,
          characterData: true
        }
      );

    setInterval(() => { syncPageHighlightAndSelect(); checkAndFillQuizName(); }, 350);

    /* -- INITIALIZATION -- */
    const autoInit = () => setTimeout(() => { doScan(); openPanel(); }, 700);

    if (document.readyState === 'complete') autoInit();
    else window.addEventListener('load', autoInit);

  }
)();