export default class AdblockDetector {

    constructor() {}

    /**
     * Check status of network connection
     * 
     * @returns boolean
     */
    private is_connected() : boolean {
        return window.navigator.onLine;
    }

    /**
     * Check For Fair Adblock Extension
     * 
     * @returns boolean
     */
    private fairAdblock() : boolean {
        let fairAdblockStyle = document.getElementById('stndz-style');
        return null !== fairAdblockStyle;
    }


    /**
     * Check for all adblock extension using googlead request
     * 
     * @param callback Function
     * @returns 
     */
    private googleAd(callback: (enable: boolean) => void): void {
        let head = document.getElementsByTagName('head')[0];
        let script:any = document.createElement('script');
        let done:boolean = false;

        if (!this.is_connected()) {
            callback(false);
            return;
        }

        const reqURL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.setAttribute("src", reqURL);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("charset", "utf-8");

        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                done = true;
                script.onload = script.onreadystatechange = null;

                if (typeof (window as any).adsbygoogle == 'undefined') {
                    callback(true);
                } else {
                    callback(false);
                }

                script.parentNode?.removeChild(script);
            }
        };

        /** On Error. */
        script.onerror = function () {
            callback(true);
        };

        /** Async */
        let callbacked = false;
        const request = new XMLHttpRequest();
        request.open('GET', reqURL, true);
        request.onreadystatechange = function () {
            if (this.status === 0 || (this.status >= 200 && this.status < 400)) {
                if (
                    this.responseText.toLowerCase().indexOf("ublock") > -1
                    || this.responseText.toLowerCase().indexOf("height:1px") > -1
                ) {
                    if (callbacked) {
                        callback(true);
                    }
                    callbacked = true;
                }
            }

            if (!callbacked) {
                callback(request.responseURL !== reqURL);
                callbacked = true;
            }
        };

        request.send();
        head.insertBefore(script, head.firstChild);
    }

    check(callback : (enable : boolean) => void){
        if( this.fairAdblock() ){
            callback(true);
        }else{
            this.googleAd(function(blocked){
                if ( blocked ) {
                    callback(true);
                }else{
                    callback(false);
                }
            });
        }
    }

}