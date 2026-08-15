# AirWaste Design System

Shared brand tokens and component libraries for the AirWaste platform, so the
Next.js admin dashboard and the Expo/React-Native apps look identical and stay in
sync.

This repo publishes **two** npm packages (to the GitHub Packages / GHCR npm
registry, scoped `@airwaste`):

| Package | For | Stack |
|---|---|---|
| `@airwaste/design-system-web` | Admin dashboard (Next.js) | React + Tailwind CSS |
| `@airwaste/design-system-mobile` | Client & collector apps (Expo) | React Native |

The brand palette is derived from the AirWaste logo/icon SVGs in `assets/`.

## Packages

- `packages/tokens` — **internal** (not published). Single source of truth for
  colors, spacing, radii, typography, shadows, and status mappings. Both web and
  mobile import from here.
- `packages/web` — Tailwind preset (`airwastePreset`) + React components.
- `packages/mobile` — RN `theme` object + React Native components.

## Consuming the web package

```ts
// tailwind.config.ts
import { airwastePreset } from '@airwaste/design-system-web';

export default {
  presets: [airwastePreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

```tsx
import { Button, StatusPill } from '@airwaste/design-system-web';

<Button variant="primary">Save</Button>
<StatusPill status="VERIFIED" />
```

## Consuming the mobile package

```tsx
import { Button, StatusPill, theme } from '@airwaste/design-system-mobile';

<Button variant="primary">Save</Button>
<StatusPill status="VERIFIED" />
```

## Development

```bash
npm ci
npm run build --workspaces
```

## Publishing

Tag a release and push it:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The `publish.yml` workflow builds all workspaces and publishes both packages at
the tag version. Consumers authenticate to `npm.pkg.github.com` with a token that
has `read:packages`.
