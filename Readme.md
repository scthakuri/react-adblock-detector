# AdblockDetector

CHPADBLOCK is the adblock detector package for react. Our package detects most of the adblock extension such as ublock, adblock plus and many more.

![npm version](https://img.shields.io/npm/v/@scthakuri/adblock-detector.svg)
[![](https://data.jsdelivr.com/v1/package/npm/@scthakuri/adblock-detector/badge)](https://www.jsdelivr.com/package/npm/@scthakuri/adblock-detector)

## Features

- ✅ Ease of use
- 🔧 Well-tested
- 📦 Lightweight
- 📝 MIT license 

### Installation

```bash
# Via npm:
npm i @scthakuri/adblock-detector

# Via yarn:
yarn add @scthakuri/adblock-detector
```

### Usage:
```javascript

import AdblockDetector from '@scthakuri/adblock-detector';

AdblockDetector.detect((detected) => {
    if( detected ){
        // Adblock is detected
    }else{
        // Adblock is not detected
    }
});
```

## Example

```javascript
import './App.css';
import React from 'react';
import AdblockDetector from '@scthakuri/adblock-detector';

function App() {

    const [checking, setChecking] = React.useState(true);
    const [detected, setDetected] = React.useState(false);

    React.useEffect(() => {
        AdblockDetector.detect((detected) => {
            setChecking(false);
            setDetected(detected);
        });
    })

    return (
        <div className="App">
            <header className="App-header">
                {
                    checking ? (
                        detected ? "Adblock Detected" : "No Adblock Detected"
                    ) : "Checking for Adblocker..."
                }
            </header>
        </div>
    );
}

export default App;

```

### Tested With

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