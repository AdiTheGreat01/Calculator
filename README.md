# Doodle Calculator

A hand-drawn, sketchbook-style calculator built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

## Overview

Most calculator tutorials look identical: flat gray buttons, a monospace display, zero personality. I wanted to build one from scratch that actually felt fun to use, while still handling the edge cases a "real" calculator has to deal with — chained operations, decimals, division by zero, keyboard input, and formatting large or tiny numbers without breaking the layout.

The goal was less about the math (that part's simple) and more about writing clean, readable vanilla JS for state management and UI updates without reaching for a framework, and pairing it with a distinct, illustrated visual style instead of a generic UI kit look.

## Features

- Standard operations: addition, subtraction, multiplication, division, and percentage
- Chained calculations (e.g. `5 + 3 × 2` evaluates left to right as entered)
- Live expression preview above the result display
- Full keyboard support (digits, `+ - * /`, `Enter`, `Backspace`, `Escape`)
- Clear (`C`) and single-character delete (`⌫`)
- Graceful error handling for invalid operations like division by zero
- Smart number formatting for very large/very small results (falls back to exponential notation)
- Input length capping to prevent overflow in the display
- Subtle animations: button press feedback and a "pop" effect on the result
- Fully responsive layout with a dedicated small-screen breakpoint
- Accessible markup (`aria-label`, `aria-live` region for screen readers)

## Tech Stack

- **HTML5** — semantic structure, accessibility attributes
- **CSS3** — custom properties (CSS variables), Flexbox, CSS Grid, keyframe animations, media queries
- **JavaScript (ES6+)** — no libraries or frameworks, DOM APIs only
- **Google Fonts** — 'Caveat' for the hand-drawn aesthetic

No build tools, package managers, or external JS dependencies are required. It runs directly in the browser.

## Project Architecture

The project follows a simple separation of concerns:

- `index.html` — static markup for the calculator layout and button grid, using `data-action` / `data-value` attributes so JS doesn't need to hardcode button logic per key
- `style.css` — all visual styling, driven by CSS custom properties in `:root` so the color scheme can be swapped in one place
- `script.js` — application logic, split into small single-purpose functions:
  - Input handling (`handleNumber`, `handleDot`, `handleOperator`, `handleEqual`, `handleDelete`, `handleClear`)
  - Calculation (`calculate`, `formatNumber`)
  - Display updates (`updateDisplay`, `buildExpression`, `popResult`)
  - Event binding for both click (event delegation on `.btn-grid`) and keyboard input

State (`currentInput`, `previousInput`, `operator`, `justEvaluated`) is kept in a few top-level variables rather than a class or state object, since the app is small enough that this stays readable. Click and keyboard events both route through the same handler functions, so there's one source of truth for calculator behavior regardless of input method.

## Installation

No build step needed — this is a static site.

```bash
# Clone the repository
git clone https://github.com/[your-username]/[your-repo-name].git

# Navigate into the project folder
cd [your-repo-name]

# Open index.html directly in your browser
# or serve it locally, e.g.:
npx serve .
```

## Usage

1. Open `index.html` in any modern browser (or run a local server as shown above).
2. Click buttons or use your keyboard to enter numbers and operators.
3. Press `=` or `Enter` to evaluate the expression.
4. Press `C` / `Escape` to clear, or `Backspace` to delete the last character.

## Screenshots

> _[Add a screenshot of the calculator's default state here]_
> Default view showing the display and button grid.

> _[Add a screenshot of an active calculation with the expression preview]_
> Example of a chained calculation in progress.

> _[Add a screenshot of the error state, e.g. division by zero]_
> Error handling when dividing by zero.

## Folder Structure

```
doodle-calculator/
├── index.html      # Markup and button layout
├── style.css       # Styling, theming via CSS variables
├── script.js       # Calculator logic and event handling
└── README.md
```

## Challenges & Learnings

- **Chained operations without a parser.** Handling something like `5 + 3 × 2` without building a full expression parser meant evaluating operations sequentially as they're entered, rather than respecting standard order of operations. This was a deliberate tradeoff for simplicity — worth noting as a known limitation rather than a bug.
- **Number formatting edge cases.** Floating-point results (e.g. `0.1 + 0.2`) needed rounding via `toPrecision` before display, and very large or very small numbers needed a fallback to exponential notation so the display wouldn't overflow or show long strings of floating-point noise.
- **Keeping click and keyboard input in sync.** Both input methods needed to trigger the same visual "pressed" feedback and the same underlying logic, which meant funneling both through shared handler functions instead of duplicating logic in two event listeners.
- **Managing calculator state without a framework.** Tracking `currentInput`, `previousInput`, `operator`, and `justEvaluated` correctly across edge cases (pressing an operator twice, starting a new calculation after `=`, deleting mid-input) required careful thought about state transitions that a framework's state management would normally simplify.

## Future Improvements

- [Add: proper operator precedence / expression parsing]
- [Add: calculation history panel]
- [Add: unit or memory (M+/M-) functions]
- [Add: theme switcher / dark mode]
- [Add: unit tests for `calculate()` and `formatNumber()`]

## Why This Project Matters

- Demonstrates the ability to manage application state cleanly in vanilla JavaScript without relying on a framework
- Shows attention to edge cases (division by zero, floating-point precision, input overflow) rather than just the happy path
- Reflects an understanding of accessible, semantic HTML and responsive CSS
- Illustrates a consistent, single-source-of-truth approach to handling multiple input methods (mouse and keyboard) for the same actions
- Shows an eye for UI/UX polish beyond default styling, including custom theming via CSS variables
- Highlights the ability to organize a small project into clear, maintainable files with a logical separation of concerns

## License

This project is licensed under the [MIT License](LICENSE).
