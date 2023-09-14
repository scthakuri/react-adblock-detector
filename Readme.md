# Ad Block Detector

CHPADBLOCK is the adblock detector package for react. Our package detects most of the adblock extension such as ublock, adblock plus and many more.

[![NPM](https://img.shields.io/npm/v/@scthakuri/adblock-detector.svg)](https://www.npmjs.com/package/@scthakuri/adblock-detector)
[![NPM](https://img.shields.io/npm/dm/@scthakuri/adblock-detector)](https://www.npmjs.com/package/@scthakuri/adblock-detector)
[![TypeScript](https://img.shields.io/badge/TypeScript-.d.ts-blue.svg)](https://github.com/scthakuri/react-adblock-detector/blob/master/lib/index.d.ts)
[![Known Vulnerabilities](https://snyk.io/test/github/scthakuri/react-adblock-detector/badge.svg)](https://snyk.io/test/github/scthakuri/react-adblock-detector)

## Features

- ✅ Adblock Detector Modal
- ✅ Ease of use
- ✅ Well-tested
- ✅ Lightweight
- ✅ MIT license 

### Installation

```bash
# Via npm:
npm i @scthakuri/adblock-detector

# Via yarn:
yarn add @scthakuri/adblock-detector
```

### Usage:
```javascript

import { DetectAdblock } from '@scthakuri/adblock-detector';

DetectAdblock((detected) => {
    if( detected ){
        // Adblock is detected
    }else{
        // Adblock is not detected
    }
});
```

## Example

```javascript
import { useState, useEffect } from 'react';
import './App.css';
import DetectorModal, { DetectAdblock } from '@scthakuri/adblock-detector'

function App() {

    const [startDetect, setStartDetect] = useState(true);
    const [detected, setDetected] = useState(false);

    useEffect(() => {
        if( startDetect ){
            DetectAdblock((enable) => {
                setStartDetect(false);
                setDetected(enable);
            });
        }
    }, [startDetect])

    return (
        <div className="App">
            <header className="App-header">
                {
                    startDetect ? "Detecting . . ." :
                    detected ? "Detected" : "Not Detected"
                }
            </header>

            { detected && <DetectorModal /> }
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