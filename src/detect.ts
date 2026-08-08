import { WindowElementType } from "./types";

const isConnected = (): boolean => {
    return window.navigator.onLine;
}

const fairAdblockRequest = (): boolean => {
    const fairAdblockStyle = document.getElementById('stndz-style');
    return null !== fairAdblockStyle;
}

/**
 * Probes for an adblocker by requesting a real Google Ads script and
 * checking both the network response and whether `window.adsbygoogle`
 * survives the load — some blockers let the script load but strip the
 * global afterward instead of blocking the request outright.
 *
 * The XHR handler latches `callbacked` on every branch it resolves through:
 * `readystatechange` fires multiple times per request, so without that an
 * early low-signal readyState would report a result before the real
 * keyword match on a later readyState ever gets a chance to run.
 */
export const detectByGoogleAd = (callback: (enable: boolean) => void): void => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    let done = false;

    if (!isConnected()) {
        callback(false);
        return;
    }

    const reqURL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.setAttribute("src", reqURL);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", "utf-8");

    script.onload = () => {
        if (!done) {
            done = true;
            script.onload = null;

            const win = window as WindowElementType;
            if (typeof win.adsbygoogle === 'undefined') {
                callback(true);
            }
            script.parentNode?.removeChild(script);
        }
    };

    script.onerror = function () {
        callback(true);
    };

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
            callbacked = true;
            return;
        }
    };

    request.send();
    head.insertBefore(script, head.firstChild);
}

/**
 * Runs the full detection sequence: a fair-adblock style check first, then
 * falls back to `detectByGoogleAd`. Calls `callback` exactly once.
 */
export const detectAdblock = (callback: (enable: boolean) => void): void => {
    if (fairAdblockRequest()) {
        callback(true);
    } else {
        detectByGoogleAd(function (blocked) {
            callback(blocked);
        });
    }
}

/** @deprecated use `detectByGoogleAd` */
export const DetectByGoogleAd = detectByGoogleAd;

/** @deprecated use `detectAdblock` */
export const DetectAdblock = detectAdblock;
