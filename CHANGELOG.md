# CHANGELOG.md

## 1.0.2 (work in progress, unreleased)

Features:

  - Adds components for new holidays
    - New years
    - Valentine's day

## 1.0.2 (2021-12-16)

Fixing issue with transpiled code.

Fixes:
- Changed tsconfig target from ES5 to ES6

Documentation:
- Added screenshot to examples section

## 1.0.1 (2021-12-15)

First feature release!

Features:

  - Adds support for christmas components.
    - `<Christmas />` renders all christmas components
    - `<Snowman />` An image of a snowman in the bottom right of the viewport.
    - `<Snowflakes />` Gently falling snowflakes from the top of the viewport.
  - Adds options for toggling holiday state on/off
    - `<ToggleButton />` renders default HTML button that toggles the holiday UI
    - `useReactHolidayUI` hook that exposes state/callbacks for building a custom toggle component


## 1.0.0 (2021-12-09)

Initial publish, some initial components, not recommended for use.