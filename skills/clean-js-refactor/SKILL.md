---
name: clean-js-refactor
description: Use when refactoring a small or medium JavaScript codebase to improve readability and maintainability without intentionally changing behavior. Best for staged clean-code refactors, naming improvements, function extraction, reducing hidden globals, and moving from DOM-driven logic to state-driven rendering.
---

# Clean JS Refactor Skill

Use this skill when the user wants a JavaScript codebase cleaned up according to project conventions and clean-code principles.

## Required inputs

Before changing code, read:

1. `AGENTS.md`
2. `docs/javascript-clean-code.md`
3. The files directly involved in the target behavior

## Main goal

Improve readability and maintainability while preserving behavior.

## Workflow

### 1. Understand current behavior first

Write a short summary of:

- entry point
- important state fields
- event flow
- render flow
- known risks

### 2. Choose one small refactor slice

Good slices:

- rename confusing variables
- extract one helper function
- remove one hidden cross-file dependency
- make one rendering path state-driven
- centralize one reset path

Avoid mixing multiple behavior changes into one slice.

### 3. Prefer these refactor directions

- explicit parameters over hidden globals
- state-driven rendering over DOM re-parsing
- focused functions over multi-purpose handlers
- guard clauses over deep nesting
- project-level helpers over duplicated inline logic

### 4. Avoid these mistakes

- do not add a framework or build tooling
- do not introduce classes without clear benefit
- do not over-generalize a very small app
- do not rewrite the whole file when a local refactor is enough
- do not silently change labels, storage keys, or flow timing unless asked

### 5. After each slice, verify behavior

Report:

- what changed
- what stayed the same
- what manual checks should be run

At minimum, mention:

- initial load
- picking start/stop
- last-ball flow
- restart flow
- settings apply flow
- picked-ball return flow

## Refactor heuristics for this repository type

For small browser-only JavaScript apps:

- a plain object `state` is usually enough
- a plain object `elements` is usually enough
- helper functions are preferred over large abstractions
- comments should explain why, not restate what the code obviously says
- dead commented-out code should usually be removed

## Output style

Keep the report practical. Use this order:

1. current issue or target
2. minimal refactor performed
3. behavior preserved
4. next safe step
