# ProofLoop Frontend

ProofLoop frontend built with Next.js, TypeScript, and Tailwind CSS.

## Implemented screens

- `/signup` onboarding and account creation flow
- `/dashboard` proof feed with coach note, side navigation, and add-proof actions
- `/dashboard/proof/[id]` detailed proof page
- `/:username` public profile page

## Design system highlights

- Teal (`#0F766E`) and coral (`#EA6A47`) tokenized via CSS variables
- Shared reusable UI primitives in `components/ui`
- Accessible focus states, skip link, semantic headings, and reduced-motion support

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```
