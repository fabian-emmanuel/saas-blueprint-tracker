# SaaS Blueprint Tracker

An interactive Web Component that tracks your SaaS journey from idea to exit — 18 phases, 109 milestones, zero dependencies.

**[Live Demo →](https://fabian-emmanuel.github.io/saas-blueprint-tracker)**

---

## Features

- **18 phases, 109 milestones** — covers the full SaaS lifecycle: Idea → Validation → Planning → Legal → Design → Development → Testing → Launch → Acquisition → Conversion → Revenue → Finance → Analytics → Feedback → Retention → Customer Success → Growth → Scaling
- **Zero dependencies** — pure Web Component, no React, no Vue, no build step
- **Shadow DOM** — fully isolated from your site's styles
- **Dark & Light theme** — toggle via attribute
- **Auto-saved** — progress persists in `localStorage`, survives page refreshes
- **Multi-project** — use the `project` attribute to run separate trackers for different ideas on the same page
- **Custom events** — hook into `item-toggle` and `phase-complete` for analytics or backend sync
- **Responsive** — sidebar collapses on mobile

---

## Quick Start

```html
<!-- 1. Load the component -->
<script src="https://fabian-emmanuel.github.io/saas-blueprint-tracker/saas-blueprint-tracker.js"></script>

<!-- 2. Use it -->
<saas-blueprint-tracker style="height: 700px"></saas-blueprint-tracker>
```

---

## Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `theme` | `"dark"` \| `"light"` | `"dark"` | Color theme |
| `project` | any string | `"default"` | Namespaces localStorage — run multiple independent trackers |
| `style` | CSS string | — | Control dimensions; set `height` to size the tracker |

```html
<saas-blueprint-tracker
  theme="light"
  project="my-startup"
  style="height: 700px"
></saas-blueprint-tracker>
```

---

## Framework Integration

### React / Next.js

```tsx
// Declare the custom element type (TypeScript)
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

// In your component
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
  // ...
})
export class AppModule {}
```

```html
<!-- your.component.html -->
<saas-blueprint-tracker theme="dark" project="my-saas" style="height: 700px">
</saas-blueprint-tracker>
```

```ts
// your.component.ts — listening to events
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({ ... })
export class YourComponent implements AfterViewInit {
  @ViewChild('tracker') trackerRef!: ElementRef;

  ngAfterViewInit() {
    this.trackerRef.nativeElement.addEventListener('phase-complete', (e: CustomEvent) => {
      console.log('Phase complete:', e.detail); // { id, name, project }
    });
  }
}
```

### Plain HTML / WordPress / Webflow

Paste these two lines wherever you want the tracker to appear:

```html
<script src="https://fabian-emmanuel.github.io/saas-blueprint-tracker/saas-blueprint-tracker.js"></script>
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

// Fires when every item in a phase is completed
tracker.addEventListener('phase-complete', e => {
  console.log(e.detail) // { id: 'idea', name: 'Idea', project: 'default' }
  // e.g. unlock a feature, save to your backend, send to analytics
})
```

---

## The Blueprint

The full SaaS lifecycle broken into 18 phases:

| # | Phase | Key Activities |
|---|-------|---------------|
| 1 | **Idea** | Problem discovery, market research, niche selection, competitor analysis |
| 2 | **Validation** | Customer interviews, landing page test, waitlist, pre-sales |
| 3 | **Planning** | Roadmap, MVP scope, tech stack, pricing strategy |
| 4 | **Legal & Compliance** | Business entity, ToS, Privacy Policy, GDPR/CCPA, SOC2 |
| 5 | **Design** | Wireframes, UI design, UX flows, design system |
| 6 | **Development** | Frontend, backend, APIs, database, auth, integrations, infrastructure, docs |
| 7 | **Testing** | Unit, integration, performance, beta testing |
| 8 | **Launch** | Landing page, Product Hunt, beta users, public release |
| 9 | **Acquisition** | SEO, content marketing, cold email, communities, partnerships |
| 10 | **Conversion** | Sales funnel, free trial, freemium, pricing page |
| 11 | **Revenue** | Subscriptions, upsells, add-ons, annual plans, enterprise |
| 12 | **Finance** | Runway, MRR/ARR tracking, payment infrastructure, fundraising |
| 13 | **Analytics** | User tracking, funnel analysis, cohort analysis, A/B testing |
| 14 | **Feedback & Iteration** | User interviews, feature requests, bug reports, public roadmap |
| 15 | **Retention** | Onboarding, email automation, churn reduction, win-back campaigns |
| 16 | **Customer Success** | Health scoring, QBRs, help desk, customer support |
| 17 | **Growth** | Referral programs, community, product-led growth, viral loops |
| 18 | **Scaling** | Automation, hiring, localization, global expansion, exit strategy |

---

## Files

| File | Description |
|------|-------------|
| `saas-blueprint-tracker.js` | The Web Component — this is what you embed |
| `saas-blueprint-tracker.html` | Standalone single-file tracker (open directly in a browser) |
| `saas-blueprint-demo.html` | Demo/landing page with embed code examples |
| `saas-blueprint.md` | The raw blueprint as a folder tree |

---

## License

MIT
