# @scthakuri/adblock-detector

Lightweight, dependency-free adblock detector for React. Detects most adblock extensions (uBlock Origin, AdBlock Plus, AdGuard, Brave's built-in blocker, and more) and gives you a ready-made, customizable modal to prompt visitors to disable them.

[![NPM](https://img.shields.io/npm/v/@scthakuri/adblock-detector.svg)](https://www.npmjs.com/package/@scthakuri/adblock-detector)
[![NPM Downloads](https://img.shields.io/npm/dm/@scthakuri/adblock-detector)](https://www.npmjs.com/package/@scthakuri/adblock-detector)
[![TypeScript](https://img.shields.io/badge/TypeScript-.d.ts-blue.svg)](https://github.com/scthakuri/react-adblock-detector/blob/master/lib/index.d.ts)
[![Known Vulnerabilities](https://snyk.io/test/github/scthakuri/react-adblock-detector/badge.svg)](https://snyk.io/test/github/scthakuri/react-adblock-detector)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Demo

**[Live demo: try it yourself](https://sureshchand.com.np/projects/chpadblock/react-demo)**

Open the demo, enable an adblock extension in your browser, then reload the page. The detector modal appears live.

## Features

- ✅ **Zero runtime dependencies**. No crypto-js, no polyfills, nothing else installed alongside React.
- ✅ Detects most popular adblock extensions (see [Tested With](#tested-with))
- ✅ Ships a ready-made, themeable modal component, or use the raw detection function and build your own UI
- ✅ Fully typed (`.d.ts` included, no `@types` package needed)
- ✅ Small footprint. No bundled crypto library; class-name obfuscation uses a tiny inline hash instead.

## Installation

```bash
# npm
npm i @scthakuri/adblock-detector

# yarn
yarn add @scthakuri/adblock-detector

# pnpm
pnpm add @scthakuri/adblock-detector
```

Requires React ≥16.8 (uses hooks internally).

## Quick Start

Simplest usage, detects and shows the modal automatically:

```tsx
import { AutoDetectorModal } from '@scthakuri/adblock-detector';

function App() {
  return (
    <div className="App">
      <AutoDetectorModal closeBtn />
    </div>
  );
}

export default App;
```

If you need to control visibility yourself (custom trigger logic, analytics on detection, etc.), use the hook and `DetectorModal` directly:

```tsx
import { useState } from 'react';
import DetectorModal, { useAdblockDetector } from '@scthakuri/adblock-detector';

function App() {
  const { detected } = useAdblockDetector();
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="App">
      {detected && !dismissed && (
        <DetectorModal
          closeBtn
          onModalClose={() => setDismissed(true)}
        />
      )}
    </div>
  );
}

export default App;
```

## API Reference

### `<AutoDetectorModal />`

Combines `useAdblockDetector` and `DetectorModal` into one drop-in component: detects on mount, renders nothing while loading or when no adblocker is found, and shows the modal automatically otherwise. Dismissing it (via `closeBtn`) hides it for the rest of the session. Accepts the same props as `DetectorModal` below, minus needing `onModalClose` (it's handled internally, though you can still pass one for a side effect on close).

```tsx
<AutoDetectorModal closeBtn theme="#4f46e5" />
```

### `useAdblockDetector()`

React hook: the recommended way to consume detection state. Runs the check once on mount and is unmount-safe (won't call `setState` after the component using it is gone).

| Returns | Type | Description |
|---|---|---|
| `detected` | `boolean` | Whether an adblocker was detected. |
| `loading` | `boolean` | `true` until the check resolves. |

```tsx
const { detected, loading } = useAdblockDetector();
```

### `detectAdblock(callback)`

Imperative version of the same check, for use outside React (vanilla JS, class components, one-off checks). `useAdblockDetector` is built on top of this.

| Param | Type | Description |
|---|---|---|
| `callback` | `(detected: boolean) => void` | Called once with the detection result. |

```tsx
import { detectAdblock } from '@scthakuri/adblock-detector';

detectAdblock((detected) => {
  if (detected) {
    // an adblocker is active
  }
});
```

### `detectByGoogleAd(callback)`

Lower-level probe used internally by `detectAdblock`. Checks connectivity, requests a real Google Ads script, and inspects both the network response and whether the global it sets survives. Exported in case you want to compose your own detection flow (e.g. skip the fair-adblock check, or add your own probes alongside it).

| Param | Type | Description |
|---|---|---|
| `callback` | `(detected: boolean) => void` | Called once with the detection result. |

> `DetectAdblock` / `DetectByGoogleAd` (PascalCase) remain exported as deprecated aliases for existing code. New code should use the camelCase names above.

### `<DetectorModal />`

Pre-built modal shown when an adblocker is detected. The component always renders its markup, so mount/unmount it based on your own detection state (see Quick Start above).

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `string` | `"#ff0000"` | Any valid CSS color. Accents the icon, border, and footer. |
| `title` | `string` | `"Adblock Detected!!!"` | Modal heading. |
| `message` | `string` | _(default message)_ | Modal body text. |
| `reloadBtnText` | `string` | `"I've Disable Adblock"` | Text for the reload button. |
| `closeBtn` | `boolean` | `false` | Show a close (×) button. |
| `onModalClose` | `() => void` | `() => {}` | Called when the close button is clicked. The modal does **not** unmount itself; call this to update your own state. |

```tsx
<DetectorModal
  theme="#4f46e5"
  title="Please disable your ad blocker"
  message="This site is supported by ads. Please whitelist us to continue."
  reloadBtnText="Refresh page"
  closeBtn
  onModalClose={() => setDismissed(true)}
/>
```

## Tested With

- ☞ Adblock Plus
- ☞ Adblock
- ☞ Adguard
- ☞ Adremover
- ☞ Adblock for Chrome™
- ☞ Brave
- ☞ Ghostery
- ☞ uBlocker
- ☞ uBlock
- ☞ Ultrablock
- ☞ Privacy Badger
- ☞ DuckDuckGo
- ☞ Disconnect
- ☞ Microsoft Edge AdBlock extension
- ☞ Firefox Tracking Protection
- ☞ uBlock Origin
- ☞ Fair AdBlocker
- ☞ Hola ad remover
- ☞ Comodo AdBlocker
- ☞ Opera Built-in AdBlock extension

## Local Development

```bash
git clone https://github.com/scthakuri/react-adblock-detector.git
cd react-adblock-detector
npm install       # also runs the build via the `prepare` script
npm run build      # compile src/ -> lib/
```

Type-check without emitting:

```bash
npx tsc --noEmit
```

## Contributing

Issues and PRs welcome at [github.com/scthakuri/react-adblock-detector](https://github.com/scthakuri/react-adblock-detector/issues).

## License

MIT © [Suresh Chand](https://sureshchand.com.np)
