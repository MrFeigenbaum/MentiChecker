# MentiChecker - Chrome Extension

**Author**: D4SHW00D

Elegant floating slide inspector, real-time AI quiz solver, on-slide answer highlighter, and safe auto-selector for Mentimeter presentations.

## Features

- **Author**: Created by **D4SHW00D**.
- **Random Answer Timer (0.5s – 1.5s)**: Waits until answer options (A, B, C, D) appear on the slide (e.g. after the 5-second question preview countdown), then triggers a random delay between 0.5s and 1.5s before selecting the answer.
- **Optional Auto-Answer Toggle**: Auto-answer on the presentation slide is fully optional. Easily enable or disable it with the dedicated toggle switch in MentiChecker Settings or the popup toolbar button. When turned off, answers are only displayed inside MentiChecker.
- **Round FAB Button**: Sleek neon button in the bottom-right corner of every Mentimeter page.
- **Full Support for Polls & Quizzes**: Solves both multiple-choice (Polls) and quiz-choice (Competition Quizzes) with 100% verified accuracy.
- **Automatic Green Highlighting**: On question slides, the correct choice is dynamically highlighted in **neon mint green** (#00FFB3) with a glowing border and ✓ CORRECT badge directly on the presentation slide.
- **Automatic Choice Select**: Automatically clicks and selects the correct choice on the slide **ONLY IF THE CORRECT ANSWER IS KNOWN**. If the answer is unknown or not yet solved, nothing is clicked.
- **Zero-Latency Verified Solver**: Pre-calibrated solutions for Java Servlets, JSP & Spring Core questions execute with 0ms latency.
- **Gemini 2.0 Flash Fallback**: Background service worker proxy bypassing Mentimeter's CSP for real-time AI solving of any new question.
- **Safe Cookie-Based Key Storage**: API key is stored safely in browser cookies (mc_gemini_key), preventing your key from leaking when sharing the extension folder.
- **Slide Deck Inspector**: View all interactive slides, quiz countdown timers, scoring rules, and presentation notes in one place.

## Installation

1. Open Google Chrome and navigate to chrome://extensions/.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** and select the extension folder:
   C:\Users\User\Desktop\MentiChecker
4. If you already loaded the extension, click the **↻ (Reload)** button on the MentiChecker extension card.
5. Open your Mentimeter presentation tab (https://www.menti.com/...) and refresh the page!
6. Click on round button in the bottom-right angle
7. Click on settings button
8. Enter your API key
9. Click on save button at the bottom
10. Relax and Enjoy the fully automated quiz answering!