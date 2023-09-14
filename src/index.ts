import DetectorModal from "./DetectorModal";
import { WindowElementType } from "./types";
import * as CryptoJS from 'crypto-js';

/**
 * Check status of network connection
 *
 * @returns boolean
 */
const is_connected = () => {
    return window.navigator.onLine;
}

/**
 * Check For Fair Adblock Extension
 *
 * @returns boolean
 */
const fairAdblockRequest = () => {
    let fairAdblockStyle = document.getElementById('stndz-style');
    return null !== fairAdblockStyle;
}

/**
 * Check for all adblock extension using googlead request
 *
 * @param callback Required: Function that will receive the adblock detected or not
 *
 * @example
 *
```javascript
DetectByGoogleAd((enable) => {
    //code
});
```
 */
export const DetectByGoogleAd = (callback: (enable: boolean) => void) => {
    let head = document.getElementsByTagName('head')[0] as HTMLElement;
    let script = document.createElement('script') as HTMLScriptElement;
    let done = false;
    let windowElement: WindowElementType

    if (!is_connected()) {
        callback(false);
        return;
    }

    const reqURL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.setAttribute("src", reqURL);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", "utf-8");

    let alreadyDetectedByAdd = false;
    script.onload = () => {
        if (!done) {
            done = true;
            script.onload = null;

            if (windowElement?.adsbygoogle == 'undefined') {
                callback(true);
                alreadyDetectedByAdd = true;
            }
            script.parentNode?.removeChild(script);
        }
    };

    /** On Error. */
    script.onerror = function () {
        callback(true);
    };

    /** If Already Detectecd by adding scripts */
    if (alreadyDetectedByAdd) {
        return;
    }

    /** Async */
    let callbacked = false;
    const request = new XMLHttpRequest();
    request.open('GET', reqURL, true);
    request.onreadystatechange = () => {
        if (request.status === 0 || (request.status >= 200 && request.status < 400)) {
            if (
                request.responseText.toLowerCase().indexOf("ublock") > -1
                || request.responseText.toLowerCase().indexOf("height:1px") > -1
            ) {
                if (callbacked) {
                    callback(true);
                    return;
                }
                callbacked = true;
            }
        }

        if (!callbacked) {
            callback(request.responseURL !== reqURL);
            return;
        }
    };

    request.send();
    head.insertBefore(script, head.firstChild);
}

/**
 * Check for all adblock extension using googlead request
 *
 * @param callback Required: Function that will receive the adblock detected or not
 *
 * @example
 *
```javascript
DetectAdblock((enable) => {
    //code
});
```
 */
export const DetectAdblock = (callback: (enable: boolean) => void) => {

    /** Check for Fair Adblock */
    if (fairAdblockRequest()) {
        callback(true);
    } else {

        /** Check Other Adblock Extensions with the help of googlead */
        DetectByGoogleAd(function (blocked) {
            if (blocked) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}

const removeLeadingNumbers = (inputString) => {
    while (/^\d/.test(inputString)) {
        inputString = inputString.slice(1);
    }
    return inputString;
}

/**
 * Used to decode the class
 * 
 * @param className string
 * @return string
 */
export const decode_class = (className: string, sessionKey : string) => {
    const newClassName = className + sessionKey + className;
    return removeLeadingNumbers(CryptoJS.SHA256(newClassName).toString());
}

export default DetectorModal;