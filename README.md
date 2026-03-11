# SaaS Blueprint Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v1.0.0-blue?style=for-the-badge)](https://github.com/fabian-emmanuel/saas-blueprint-tracker/releases)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=for-the-badge)](#)
[![Demo](https://img.shields.io/badge/Live_Demo-→-F0A500?style=for-the-badge)](https://saas-blueprint-tracker.fabian-emmanuel.workers.dev/saas-blueprint-demo.html)

An interactive Web Component that tracks your SaaS journey from idea to exit — **18 phases, 109 milestones, zero dependencies.**

> Drop it into any website with two lines of code. No React. No build step. No backend.

---

## Quick Start

```html
<!-- 1. Load the component -->
<script src="https://saas-blueprint-tracker.fabian-emmanuel.workers.dev/saas-blueprint-tracker.js"></script>

<!-- 2. Use it anywhere -->
<saas-blueprint-tracker style="height: 700px"></saas-blueprint-tracker>
```

That's it. Progress auto-saves to `localStorage`. Works in plain HTML, React, Vue, Angular, Webflow, WordPress — anywhere.

---

## The Blueprint

18 phases covering the full SaaS lifecycle:

**Discover** — Idea · Validation · Planning · Legal & Compliance

**Build** — Design · Development · Testing

**Ship** — Launch

**Grow** — Acquisition · Conversion · Revenue · Finance · Analytics · Feedback & Iteration · Retention · Customer Success · Growth

**Scale** — Scaling

109 milestones across all phases, each with a description guiding what to do and why.

---

## Options

```html
<saas-blueprint-tracker
  theme="dark"           <!-- "dark" (default) | "light" -->
  project="my-startup"   <!-- namespaces localStorage — run multiple trackers independently -->
  style="height: 700px"  <!-- control height -->
></saas-blueprint-tracker>
```

| Attribute | Values | Default |
|-----------|--------|---------|
| `theme` | `"dark"` \| `"light"` | `"dark"` |
| `project` | any string | `"default"` |
| `style` | CSS string | — |

---

## Framework Integration

### React / Next.js

```tsx
// types.d.ts — declare the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'saas-blueprint-tracker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          theme?: 'dark' | 'light'
          project?: string
        },
        HTMLElement
      >
    }
  }
}

// SaasBlueprintTracker.tsx
import { useEffect } from 'react'

export function SaasBlueprintTracker({ theme = 'dark', project = 'default' }) {
  useEffect(() => {
    import('/saas-blueprint-tracker.js')
  }, [])

  return (
    <saas-blueprint-tracker
      theme={theme}
      project={project}
      style={{ height: '700px', display: 'block' }}
    />
  )
}
```

### Vue

```vue
<template>
  <saas-blueprint-tracker theme="dark" project="my-saas" style="height: 700px" />
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => import('/saas-blueprint-tracker.js'))
</script>
```

### Angular

```ts
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'saas-blueprint-tracker';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- your.component.html -->
<saas-blueprint-tracker theme="dark" project="my-saas" style="height: 700px">
</saas-blueprint-tracker>
```

### WordPress / Webflow / Plain HTML

Paste anywhere:

```html
<script src="https://saas-blueprint-tracker.fabian-emmanuel.workers.dev/saas-blueprint-tracker.js"></script>
<saas-blueprint-tracker style="height: 700px"></saas-blueprint-tracker>
```

---

## Events

The tracker dispatches custom DOM events that bubble out of the Shadow DOM:

```js
const tracker = document.querySelector('saas-blueprint-tracker')

// Fires whenever an item is checked or unchecked
tracker.addEventListener('item-toggle', e => {
  console.log(e.detail) // { key: 'idea/Problem Discovery', checked: true, project: 'default' }
})

// Fires when all items in a phase are completed
tracker.addEventListener('phase-complete', e => {
  console.log(e.detail) // { id: 'idea', name: 'Idea', project: 'default' }
})
```

Use these to sync progress to your backend, trigger analytics events, unlock features, or send notifications.

---

## What's Built In

**Progress tracking** — check off milestones as you complete them. Progress auto-saves to `localStorage` and survives refreshes, tab closes, and browser restarts.

**18 phases, 5 stages** — structured around the full SaaS lifecycle from first idea to exit strategy. Every milestone has a description explaining what it is and why it matters.

**Dark & Light theme** — set via the `theme` attribute. Shadow DOM isolates all styles from the host page — zero CSS conflicts.

**Multi-project support** — the `project` attribute namespaces localStorage so you can run independent trackers for different ideas on the same page.

**Custom events** — `item-toggle` and `phase-complete` fire with full detail payloads, compatible with any analytics tool or backend.

**Responsive** — sidebar collapses on mobile. Works on all screen sizes.

**Zero dependencies** — one `.js` file, no npm install required, no build pipeline.

---

## Files

| File | Description |
|------|-------------|
| `saas-blueprint-tracker.js` | The Web Component — this is what you embed |
| `saas-blueprint-tracker.html` | Standalone tracker — open directly in a browser, no server needed |
| `saas-blueprint-demo.html` | Demo/landing page with live preview and embed code examples |
| `saas-blueprint.md` | The raw blueprint as a folder tree |

---

## Changelog

### v1.0.0
- Initial release
- 18 phases, 109 milestones covering the full SaaS lifecycle
- Zero-dependency Web Component with Shadow DOM
- Dark & Light theme support
- Multi-project localStorage namespacing
- Custom events: `item-toggle` and `phase-complete`
- Works in React, Vue, Angular, plain HTML, WordPress, Webflow

---

## License

MIT
