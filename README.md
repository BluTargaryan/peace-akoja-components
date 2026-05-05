# Peace Akoja Components

A playground of custom React components by Peace Akoja, built with Next.js 16, React 19, Tailwind CSS v4 and Framer Motion. Each component is presented as a card on the home page and gets its own detail page with a live preview, the source code, a usage example, and a short note on the problem it solves and the motion behind it.

Live preview: <https://peaceakoja-portfolio-v2.vercel.app/>

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/postcss`)
- [Framer Motion 12](https://www.framer.com/motion/) for spring physics, layout animation and drag/reorder
- [Radix UI Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) as a headless primitive
- [react-icons](https://react-icons.github.io/react-icons/) for the icon set
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) for class composition
- TypeScript 5, ESLint 9 (`eslint-config-next`)

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to view the playground.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
├── layout.tsx              # Root layout: fonts (Geist + Funnel Display), Nav, Footer
├── page.tsx                # Home — heading + ComponentGrid
├── globals.css             # Design tokens, typography scale, keyframes
├── icon.png                # Favicon
├── [componentId]/
│   └── page.tsx            # Detail page (preview + code + description) for a single entry
├── data/
│   └── componentList.tsx   # Source of truth: every component's preview, code, usage and write-up
└── components/
    ├── sections/
    │   ├── Nav.tsx         # Top nav with logo and GreetingModule
    │   ├── Footer.tsx      # Footer with contact links
    │   └── ComponentGrid.tsx
    └── atoms/
        ├── SpringButton.tsx
        ├── Accordion.tsx
        ├── StaggeredList.tsx        / StaggeredListPreview.tsx
        ├── SortableList.tsx         / SortableListPreview.tsx
        ├── Skeleton.tsx             / CardSkeleton.tsx
        ├── ToasterPreview.tsx
        ├── greetingModule.tsx       # Typewriter clock/greeting in the nav
        ├── ComponentCard.tsx        # Card used by ComponentGrid
        ├── Button.tsx               # Shared button primitive
        ├── CodeModule.tsx           # Code block with copy + fullscreen overlay
        ├── CodeToggle.tsx           # Show/hide the code + usage example
        └── toast/
            ├── Toaster.tsx
            ├── ToastItem.tsx
            ├── useToast.ts
            └── types.ts
public/
└── logo.png
```

## How it works

- `app/data/componentList.tsx` exports `componentList`, an array of `ComponentEntry` items. Each entry has an `id`, `name`, a `preview()` render function, a `description` (problem / motion / push), the raw `code` string, and a `usageExample` string.
- `app/page.tsx` renders `ComponentGrid`, which maps `componentList` into `ComponentCard`s. Each card shows the live `preview()`, a clamped description and a "Details" link to `/[id]`.
- `app/[componentId]/page.tsx` is a dynamic route that looks up the entry by id, renders the preview at full size, and uses `CodeToggle` → `CodeModule` to expose the component code and a usage example with copy-to-clipboard and a fullscreen overlay.

## Adding a new component

1. Build the component under `app/components/atoms/` (and a `*Preview.tsx` wrapper if it needs local state for the demo).
2. Open `app/data/componentList.tsx` and append a new `ComponentEntry`:

```tsx
{
  id: "7",
  name: "My Component",
  preview: () => <MyComponent />,
  description: (
    <>
      <p>Problem — …</p>
      <p>Motion — …</p>
      <p>Push — …</p>
    </>
  ),
  code: `// paste the component source here as a string`,
  usageExample: `// paste a minimal import-and-use example here`,
}
```

3. The new entry will show up automatically on the home grid and at `/<id>`.

## Components included

| # | Name             | Built with                               |
| - | ---------------- | ---------------------------------------- |
| 1 | Spring Button    | Framer Motion spring on `whileTap`       |
| 2 | Smooth Accordion | Radix Accordion + animated height keyframes |
| 3 | Staggered List   | Framer Motion variants + `useInView`     |
| 4 | Toaster          | `useToast` hook + `AnimatePresence`      |
| 5 | Card Skeleton    | Tailwind `animate-shimmer` / `animate-wave` |
| 6 | Sortable List    | Framer Motion `Reorder` + drag controls  |

## Design tokens

Defined in `app/globals.css`:

- `--background` `#F2F2F2`
- `--text` `#0D0D0D`
- `--accent` `#DF6C06`
- Fonts: `--font-sans` (Geist), `--font-funnel-display` (Funnel Display) — both loaded via `next/font/google`
- Custom keyframes: `accordion-down` / `accordion-up`, `shimmer`, `wave`
- Responsive typography scale at base, `≥744px` and `≥1440px` breakpoints, plus an `.ourMaxWidth` container utility

## Notes for agents

This repo pins **Next.js 16**. APIs, conventions and file structure may differ from older training data — see `AGENTS.md` and consult `node_modules/next/dist/docs/` before writing Next.js code.

## Credits

Created by [Peace Akoja](https://peaceakoja-portfolio-v2.vercel.app/) — [peaceakoja00@gmail.com](mailto:peaceakoja00@gmail.com).
