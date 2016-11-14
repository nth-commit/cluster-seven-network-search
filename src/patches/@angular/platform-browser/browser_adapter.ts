// https://github.com/angular/angular/issues/12853
import { __platform_browser_private__ } from '@angular/platform-browser';

const BrowserDomAdapter = __platform_browser_private__.BrowserDomAdapter;
BrowserDomAdapter.prototype.createStyleElement = function (css: string, doc = document) {
    const style = <HTMLStyleElement>doc.createElement('style');
    this.appendChild(style, doc.createTextNode(css));
    return style;
};