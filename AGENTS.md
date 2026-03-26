# AGENTS.md

## Project identity

- This repository is a small browser-only JavaScript app with no bundler and no framework.
- The app must keep working by opening `index.html` directly in a browser.
- Preserve existing behavior unless the task explicitly asks for a behavior change.

## Primary goals for Codex

1. Keep the app working while improving readability and maintainability.
2. Prefer small, reversible refactors over large rewrites.
3. Make state transitions easier to understand.
4. Reduce hidden coupling between files.

## Project-wide refactoring rules

- Treat `state` as the main source of truth.
- Do not use DOM text or DOM layout as the source of application state when a state field can represent it clearly.
- Prefer explicit parameter passing over hidden cross-file globals.
- Keep side effects near the edges of the app:
  - DOM writes
  - `localStorage`
  - timers
  - audio playback
- Prefer pure helper functions for parsing, normalization, and simple transformations.
- Use guard clauses to reduce nesting when they make behavior clearer.
- Do not introduce a framework, build tool, module system, or dependency unless explicitly requested.
- Do not add abstractions that are larger than the app needs.
- If a cleanup changes behavior, separate that change from pure refactoring.

## JavaScript clean code policy

Read and follow `docs/javascript-clean-code.md` before large refactors.
Apply those rules as guidance, not as rigid doctrine. Favor clarity and behavior preservation.

## Suggested architecture direction

When improving code, prefer moving toward this shape:

- `script.js`: app state ownership, initialization, storage integration, top-level wiring
- `setupModal.js`: modal-specific UI binding only
- `picking.js`: picking flow, state transitions, render helpers for picked balls

## Naming and function rules

- Prefer intention-revealing names over short names.
- Keep functions focused on one job.
- If a function both changes state and renders UI, consider splitting those steps unless that makes the flow harder to follow.
- Avoid boolean flag arguments when a clearer function split is possible.
- Prefer data objects with stable shapes.

## State and rendering rules

- Centralize state resets in one place.
- Rendering functions should derive UI from state as directly as possible.
- Avoid reading back from the DOM to reconstruct state.
- If UI must be cleared, use helper functions rather than ad hoc DOM queries spread across files.

## Safety rules for refactors

- Change one concern at a time.
- Before applying any code change, present the intended diff or patch summary to the user and wait for confirmation.
- Do not modify repository files until the user has explicitly approved the proposed change.
- After each non-trivial refactor, report:
  - what changed
  - what should behave the same
  - what manual checks should be performed
- Preserve user-facing labels unless the task asks to change them.
- Preserve storage keys unless the task asks to migrate them.

## Manual smoke checks

After meaningful changes, verify these flows manually in a browser:

1. Initial load works with empty `localStorage`.
2. Start/stop picking still works.
3. Last-ball flow still works.
4. `다시` restarts the app from the configured pool.
5. Settings modal opens, closes, and applies values.
6. Excluded numbers are respected.
7. Clicked picked balls return to the pool correctly.
8. Initialization clears timers, current selection, and picked-ball rendering.

## Output expectations

When making changes, summarize results in this order:

1. behavior preserved
2. code quality improvements
3. remaining risks or follow-up ideas

## Optional workflow skill

If the task is specifically about staged JavaScript clean-code refactoring, you may use:

- `skills/clean-js-refactor/SKILL.md`
