// Vencord eaca14bb
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var tn=Object.create;var Ce=Object.defineProperty;var rn=Object.getOwnPropertyDescriptor;var nn=Object.getOwnPropertyNames;var on=Object.getPrototypeOf,an=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var re=(e,t)=>{for(var r in t)Ce(e,r,{get:t[r],enumerable:!0})},vt=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of nn(t))!an.call(e,i)&&i!==r&&Ce(e,i,{get:()=>t[i],enumerable:!(n=rn(t,i))||n.enumerable});return e};var Ne=(e,t,r)=>(r=e!=null?tn(on(e)):{},vt(t||!e||!e.__esModule?Ce(r,"default",{value:e,enumerable:!0}):r,e)),Ve=e=>vt(Ce({},"__esModule",{value:!0}),e);var c=v(()=>{"use strict"});var pe=v(()=>{"use strict";c()});function ge(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var mt=v(()=>{"use strict";c()});var fn={};function ne(...e){let t={cwd:Ct};return Ge?Me("flatpak-spawn",["--host","git",...e],t):Me("git",e,t)}async function sn(){return(await ne("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function cn(){await ne("fetch");let e=(await ne("branch","--show-current")).stdout.trim();if(!((await ne("ls-remote","origin",e)).stdout.length>0))return[];let n=(await ne("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return n?n.split(`
`).map(i=>{let[o,a,...s]=i.split("/");return{hash:a,author:o,message:s.join("/").split(`
`)[0]}}):[]}async function ln(){return(await ne("pull")).stdout.includes("Fast-forward")}async function un(){return!(await Me(Ge?"flatpak-spawn":"node",Ge?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:Ct})).stderr.includes("Build failed")}var yt,de,It,At,Ct,Me,Ge,wt=v(()=>{"use strict";c();pe();yt=require("child_process"),de=require("electron"),It=require("path"),At=require("util");mt();Ct=(0,It.join)(__dirname,".."),Me=(0,At.promisify)(yt.execFile),Ge=!1;de.ipcMain.handle("VencordGetRepo",ge(sn));de.ipcMain.handle("VencordGetUpdates",ge(cn));de.ipcMain.handle("VencordUpdate",ge(ln));de.ipcMain.handle("VencordBuild",ge(un))});var St=v(()=>{"use strict";c();wt()});var Ue={};re(Ue,{fetchTrackData:()=>pn});async function ze(e){let{stdout:t}=await Et("osascript",e.map(r=>["-e",r]).flat());return t}function Tt(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}async function hn({id:e,name:t,artist:r,album:n}){if(e===R?.id){if("data"in R)return R.data;if("failures"in R&&R.failures>=5)return null}try{let[i,o]=await Promise.all([fetch(Tt("songs",r+" "+n+" "+t),bt).then(f=>f.json()),fetch(Tt("artists",r.split(/ *[,&] */)[0]),bt).then(f=>f.json())]),a=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,l=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),h=o?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return R={id:e,data:{appleMusicLink:a,songLink:s,albumArtwork:l,artistArtwork:h}},R.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),R={id:e,failures:(e===R?.id&&"failures"in R?R.failures:0)+1},null}}async function pn(){try{await Et("pgrep",["^Music$"])}catch{return null}if(await ze(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await ze(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await ze(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[n,i,o,a,s]=r.split(`
`).filter(f=>!!f),l=Number.parseFloat(s),h=await hn({id:n,name:i,artist:a,album:o});return{name:i,album:o,artist:a,playerPosition:t,duration:l,...h}}var xt,Dt,Et,bt,R,kt=v(()=>{"use strict";c();xt=require("child_process"),Dt=require("util"),Et=(0,Dt.promisify)(xt.execFile);bt={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},R=null});var je={};re(je,{initDevtoolsOpenEagerLoad:()=>gn});function gn(e){let t=()=>e.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var Pt=v(()=>{"use strict";c()});var ve,Rt=v(()=>{"use strict";c();ve=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,n=""){let i=this;return new Proxy(t,{get(o,a){let s=o[a];return!(a in o)&&i.getDefaultValue&&(s=i.getDefaultValue({target:o,key:a,root:r,path:n})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,r,`${n}${n&&"."}${a}`):s},set(o,a,s){if(o[a]===s)return!0;Reflect.set(o,a,s);let l=`${n}${n&&"."}${a}`;return i.globalListeners.forEach(h=>h(s,l)),i.pathListeners.get(l)?.forEach(h=>h(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let n=t,i=r.split(".");for(let o of i){if(!n){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}n=n[o]}this.pathListeners.get(r)?.forEach(o=>o(n))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let n=this.pathListeners.get(t)??new Set;n.add(r),this.pathListeners.set(t,n)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let n=this.pathListeners.get(t);!n||(n.delete(r),n.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}}});function Fe(e,t){for(let r in t){let n=t[r];typeof n=="object"&&!Array.isArray(n)?(e[r]??={},Fe(e[r],n)):e[r]??=n}return e}var Ot=v(()=>{"use strict";c()});var _t,j,we,ie,F,oe,Be,Ze,Nt,Se,ae=v(()=>{"use strict";c();_t=require("electron"),j=require("path"),we=process.env.VENCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,j.join)(process.env.DISCORD_USER_DATA_DIR,"..","VencordData"):(0,j.join)(_t.app.getPath("userData"),"..","Vencord")),ie=(0,j.join)(we,"settings"),F=(0,j.join)(we,"themes"),oe=(0,j.join)(ie,"quickCss.css"),Be=(0,j.join)(ie,"settings.json"),Ze=(0,j.join)(ie,"native-settings.json"),Nt=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:","itunes:"],Se=process.argv.includes("--vanilla")});function Mt(e,t){try{return JSON.parse((0,W.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var Te,W,T,dn,Gt,Vt,H=v(()=>{"use strict";c();pe();Rt();Ot();Te=require("electron"),W=require("fs");ae();(0,W.mkdirSync)(ie,{recursive:!0});T=new ve(Mt("renderer",Be));T.addGlobalChangeListener(()=>{try{(0,W.writeFileSync)(Be,JSON.stringify(T.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});Te.ipcMain.handle("VencordGetSettingsDir",()=>ie);Te.ipcMain.on("VencordGetSettings",e=>e.returnValue=T.plain);Te.ipcMain.handle("VencordSetSettings",(e,t,r)=>{T.setData(t,r)});dn={plugins:{}},Gt=Mt("native",Ze);Fe(Gt,dn);Vt=new ve(Gt);Vt.addGlobalChangeListener(()=>{try{(0,W.writeFileSync)(Ze,JSON.stringify(Vt.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}})});var zt={};var Lt,Ut=v(()=>{"use strict";c();H();Lt=require("electron");Lt.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://open.spotify.com/embed/")){let i=T.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;n.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var Ft={};var jt,Bt=v(()=>{"use strict";c();H();jt=require("electron");jt.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://www.youtube.com/")){if(!T.store.plugins?.FixYoutubeEmbeds?.enabled)return;n.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var We={};re(We,{resolveRedirect:()=>mn});function Wt(e){return new Promise((t,r)=>{let n=(0,Zt.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?Wt(i.headers.location):e)});n.on("error",r),n.end()})}async function mn(e,t){return vn.test(t)?Wt(t):t}var Zt,vn,Ht=v(()=>{"use strict";c();Zt=require("https"),vn=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var He={};re(He,{makeDeeplTranslateRequest:()=>yn});async function yn(e,t,r,n){let i=t?"https://api.deepl.com/v2/translate":"https://api-free.deepl.com/v2/translate";try{let o=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`DeepL-Auth-Key ${r}`},body:n}),a=await o.text();return{status:o.status,data:a}}catch(o){return{status:-1,data:String(o)}}}var Kt=v(()=>{"use strict";c()});var Ke={};re(Ke,{readRecording:()=>In});async function In(e,t){t=(0,me.normalize)(t);let r=(0,me.basename)(t),n=(0,me.normalize)(Yt.app.getPath("userData")+"/");if(console.log(r,n,t),r!=="recording.ogg"||!t.startsWith(n))return null;try{let i=await(0,Jt.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var Yt,Jt,me,qt=v(()=>{"use strict";c();Yt=require("electron"),Jt=require("fs/promises"),me=require("path")});var Ye={};re(Ye,{sendToOverlay:()=>An});function An(e,t){t.messageType=t.type;let r=JSON.stringify(t);Xt??=(0,Qt.createSocket)("udp4"),Xt.send(r,42069,"127.0.0.1")}var Qt,Xt,$t=v(()=>{"use strict";c();Qt=require("dgram")});var er,tr=v(()=>{c();er=`/* eslint-disable */

/**
 * This file is part of AdGuard's Block YouTube Ads (https://github.com/AdguardTeam/BlockYouTubeAdsShortcut).
 *
 * Copyright (C) AdGuard Team
 *
 * AdGuard's Block YouTube Ads is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard's Block YouTube Ads is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard's Block YouTube Ads.  If not, see <http://www.gnu.org/licenses/>.
 */

const hiddenCSS = [
    "#__ffYoutube1",
    "#__ffYoutube2",
    "#__ffYoutube3",
    "#__ffYoutube4",
    "#feed-pyv-container",
    "#feedmodule-PRO",
    "#homepage-chrome-side-promo",
    "#merch-shelf",
    "#offer-module",
    '#pla-shelf > ytd-pla-shelf-renderer[class="style-scope ytd-watch"]',
    "#pla-shelf",
    "#premium-yva",
    "#promo-info",
    "#promo-list",
    "#promotion-shelf",
    "#related > ytd-watch-next-secondary-results-renderer > #items > ytd-compact-promoted-video-renderer.ytd-watch-next-secondary-results-renderer",
    "#search-pva",
    "#shelf-pyv-container",
    "#video-masthead",
    "#watch-branded-actions",
    "#watch-buy-urls",
    "#watch-channel-brand-div",
    "#watch7-branded-banner",
    "#YtKevlarVisibilityIdentifier",
    "#YtSparklesVisibilityIdentifier",
    ".carousel-offer-url-container",
    ".companion-ad-container",
    ".GoogleActiveViewElement",
    '.list-view[style="margin: 7px 0pt;"]',
    ".promoted-sparkles-text-search-root-container",
    ".promoted-videos",
    ".searchView.list-view",
    ".sparkles-light-cta",
    ".watch-extra-info-column",
    ".watch-extra-info-right",
    ".ytd-carousel-ad-renderer",
    ".ytd-compact-promoted-video-renderer",
    ".ytd-companion-slot-renderer",
    ".ytd-merch-shelf-renderer",
    ".ytd-player-legacy-desktop-watch-ads-renderer",
    ".ytd-promoted-sparkles-text-search-renderer",
    ".ytd-promoted-video-renderer",
    ".ytd-search-pyv-renderer",
    ".ytd-video-masthead-ad-v3-renderer",
    ".ytp-ad-action-interstitial-background-container",
    ".ytp-ad-action-interstitial-slot",
    ".ytp-ad-image-overlay",
    ".ytp-ad-overlay-container",
    ".ytp-ad-progress",
    ".ytp-ad-progress-list",
    '[class*="ytd-display-ad-"]',
    '[layout*="display-ad-"]',
    'a[href^="http://www.youtube.com/cthru?"]',
    'a[href^="https://www.youtube.com/cthru?"]',
    "ytd-action-companion-ad-renderer",
    "ytd-banner-promo-renderer",
    "ytd-compact-promoted-video-renderer",
    "ytd-companion-slot-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-text-search-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-search-pyv-renderer",
    "ytd-single-option-survey-renderer",
    "ytd-video-masthead-ad-advertiser-info-renderer",
    "ytd-video-masthead-ad-v3-renderer",
    "YTM-PROMOTED-VIDEO-RENDERER",
];
/**
* Adds CSS to the page
*/
const hideElements = () => {
    const selectors = hiddenCSS;
    if (!selectors) {
        return;
    }
    const rule = selectors.join(", ") + " { display: none!important; }";
    const style = document.createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);
};
/**
* Calls the "callback" function on every DOM change, but not for the tracked events
* @param {Function} callback callback function
*/
const observeDomChanges = callback => {
    const domMutationObserver = new MutationObserver(mutations => {
        callback(mutations);
    });
    domMutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};
/**
* This function is supposed to be called on every DOM change
*/
const hideDynamicAds = () => {
    const elements = document.querySelectorAll("#contents > ytd-rich-item-renderer ytd-display-ad-renderer");
    if (elements.length === 0) {
        return;
    }
    elements.forEach(el => {
        if (el.parentNode && el.parentNode.parentNode) {
            const parent = el.parentNode.parentNode;
            if (parent.localName === "ytd-rich-item-renderer") {
                parent.style.display = "none";
            }
        }
    });
};
/**
* This function checks if the video ads are currently running
* and auto-clicks the skip button.
*/
const autoSkipAds = () => {
    // If there's a video that plays the ad at this moment, scroll this ad
    if (document.querySelector(".ad-showing")) {
        const video = document.querySelector("video");
        if (video && video.duration) {
            video.currentTime = video.duration;
            // Skip button should appear after that,
            // now simply click it automatically
            setTimeout(() => {
                const skipBtn = document.querySelector("button.ytp-ad-skip-button");
                if (skipBtn) {
                    skipBtn.click();
                }
            }, 100);
        }
    }
};
/**
* This function overrides a property on the specified object.
*
* @param {object} obj object to look for properties in
* @param {string} propertyName property to override
* @param {*} overrideValue value to set
*/
const overrideObject = (obj, propertyName, overrideValue) => {
    if (!obj) {
        return false;
    }
    let overriden = false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key === propertyName) {
            obj[key] = overrideValue;
            overriden = true;
        } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            if (overrideObject(obj[key], propertyName, overrideValue)) {
                overriden = true;
            }
        }
    }
    return overriden;
};
/**
* Overrides JSON.parse and Response.json functions.
* Examines these functions arguments, looks for properties with the specified name there
* and if it exists, changes it's value to what was specified.
*
* @param {string} propertyName name of the property
* @param {*} overrideValue new value for the property
*/
const jsonOverride = (propertyName, overrideValue) => {
    const nativeJSONParse = JSON.parse;
    JSON.parse = (...args) => {
        const obj = nativeJSONParse.apply(this, args);
        // Override it's props and return back to the caller
        overrideObject(obj, propertyName, overrideValue);
        return obj;
    };
    // Override Response.prototype.json
    Response.prototype.json = new Proxy(Response.prototype.json, {
        async apply(...args) {
            // Call the target function, get the original Promise
            const result = await Reflect.apply(...args);
            // Create a new one and override the JSON inside
            overrideObject(result, propertyName, overrideValue);
            return result;
        },
    });
};
// Removes ads metadata from YouTube XHR requests
jsonOverride("adPlacements", []);
jsonOverride("playerAds", []);
// Applies CSS that hides YouTube ad elements
hideElements();
// Some changes should be re-evaluated on every page change
hideDynamicAds();
autoSkipAds();
observeDomChanges(() => {
    hideDynamicAds();
    autoSkipAds();
});`});var nr={};var rr,ir=v(()=>{"use strict";c();H();rr=require("electron");tr();rr.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{!T.store.plugins?.YoutubeAdblock?.enabled||(n.url.includes("youtube.com/embed/")||n.url.includes("discordsays")&&n.url.includes("youtube.com"))&&n.executeJavaScript(er)})})})});var or,ar=v(()=>{c();kt();Pt();Ut();Bt();Ht();Kt();qt();$t();ir();or={AppleMusicRichPresence:Ue,ConsoleShortcuts:je,FixSpotifyEmbeds:zt,FixYoutubeEmbeds:Ft,OpenInApp:We,Translate:He,VoiceMessages:Ke,XSOverlay:Ye,YoutubeAdblock:nr}});var Je,sr,cr=v(()=>{"use strict";c();pe();Je=require("electron");ar();sr={};for(let[e,t]of Object.entries(or)){let r=Object.entries(t);if(!r.length)continue;let n=sr[e]={};for(let[i,o]of r){let a=`VencordPluginNative_${e}_${i}`;Je.ipcMain.handle(a,o),n[i]=a}}Je.ipcMain.on("VencordGetPluginIpcMethodMap",e=>{e.returnValue=sr})});function qe(e,t=300){let r;return function(...n){clearTimeout(r),r=setTimeout(()=>{e(...n)},t)}}var lr=v(()=>{"use strict";c()});var ur,fr=v(()=>{c();ur="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICAgIDxoZWFkPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgICAgIDx0aXRsZT5WZW5jb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICAgICAgPGxpbmsKICAgICAgICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgICAgICAgICBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9lZGl0b3IvZWRpdG9yLm1haW4uY3NzIgogICAgICAgICAgICBpbnRlZ3JpdHk9InNoYTI1Ni10aUpQUTJPMDR6L3BaL0F3ZHlJZ2hyT016ZXdmK1BJdkVsMVlLYlF2c1prPSIKICAgICAgICAgICAgY3Jvc3NvcmlnaW49ImFub255bW91cyIKICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIgogICAgICAgIC8+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICBodG1sLAogICAgICAgICAgICBib2R5LAogICAgICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGlkPSJjb250YWluZXIiPjwvZGl2PgogICAgICAgIDxzY3JpcHQKICAgICAgICAgICAgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9sb2FkZXIuanMiCiAgICAgICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IgogICAgICAgICAgICBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgICAgICByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiCiAgICAgICAgPjwvc2NyaXB0PgoKICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgICAgICBwYXRoczogewogICAgICAgICAgICAgICAgICAgIHZzOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMiLAogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CgogICAgICAgICAgICByZXF1aXJlKFsidnMvZWRpdG9yL2VkaXRvci5tYWluIl0sICgpID0+IHsKICAgICAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoCiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb250YWluZXIiKSwKICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNzcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKGVkaXRvci5nZXRWYWx1ZSgpKQogICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBtb25hY28gcmUtbGF5b3V0CiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoKTsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9KTsKICAgICAgICA8L3NjcmlwdD4KICAgIDwvYm9keT4KPC9odG1sPgo="});function Xe(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function hr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function pr(e,t){if(!e)return Xe(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return Xe(t);let n={},i="",o="";for(let a of r.split(Cn))if(a.length!==0)if(a.charAt(0)==="@"&&a.charAt(1)!==" "){n[i]=o.trim();let s=a.indexOf(" ");i=a.substring(1,s),o=a.substring(s+1)}else o+=" "+a.replace("\\n",`
`).replace(wn,"@");return n[i]=o.trim(),delete n[""],Xe(t,n)}var Cn,wn,gr=v(()=>{"use strict";c();Cn=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,wn=/^\\@/});function vr(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":dr.shell.openExternal(t)}return{action:"deny"}})}var dr,mr=v(()=>{"use strict";c();dr=require("electron")});function Qe(e,t){let r=(0,se.normalize)(e),n=(0,se.join)(e,t),i=(0,se.normalize)(n);return i.startsWith(r)?i:null}function yr(){return(0,Y.readFile)(oe,"utf-8").catch(()=>"")}async function Sn(){let e=await(0,Y.readdir)(F).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let n=await Ir(r).then(hr).catch(()=>null);n!=null&&t.push(pr(n,r))}return t}function Ir(e){e=e.replace(/\?v=\d+$/,"");let t=Qe(F,e);return t?(0,Y.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}function Ar(e){let t;(0,Y.open)(oe,"a+").then(n=>{n.close(),t=(0,K.watch)(oe,{persistent:!1},qe(async()=>{e.webContents.postMessage("VencordQuickCssUpdate",await yr())},50))}).catch(()=>{});let r=(0,K.watch)(F,{persistent:!1},qe(()=>{e.webContents.postMessage("VencordThemeUpdate",void 0)}));e.once("closed",()=>{t?.close(),r.close()})}var y,K,Y,se,$e=v(()=>{"use strict";c();St();cr();H();lr();pe();y=require("electron");fr();K=require("fs"),Y=require("fs/promises"),se=require("path");gr();ae();mr();(0,K.mkdirSync)(F,{recursive:!0});y.ipcMain.handle("VencordOpenQuickCss",()=>y.shell.openPath(oe));y.ipcMain.handle("VencordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!Nt.includes(r))throw"Disallowed protocol.";y.shell.openExternal(t)});y.ipcMain.handle("VencordGetQuickCss",()=>yr());y.ipcMain.handle("VencordSetQuickCss",(e,t)=>(0,K.writeFileSync)(oe,t));y.ipcMain.handle("VencordGetThemesDir",()=>F);y.ipcMain.handle("VencordGetThemesList",()=>Sn());y.ipcMain.handle("VencordGetThemeData",(e,t)=>Ir(t));y.ipcMain.handle("VencordGetThemeSystemValues",()=>({"os-accent-color":`#${y.systemPreferences.getAccentColor?.()||""}`}));y.ipcMain.handle("VencordOpenMonacoEditor",async()=>{let e="Vencord QuickCSS Editor",t=y.BrowserWindow.getAllWindows().find(n=>n.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new y.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,se.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});vr(r),await r.loadURL(`data:text/html;base64,${ur}`)})});function Zr(e,t,r){let n=t;if(t in e)return void r(e[n]);Object.defineProperty(e,t,{set(i){delete e[n],e[n]=i,r(i)},configurable:!0,enumerable:!1})}var Wr=v(()=>{"use strict";c()});var Wn={};function Bn(e,t){let r=e.slice(4).split(".").map(Number),n=t.slice(4).split(".").map(Number);for(let i=0;i<n.length;i++){if(r[i]>n[i])return!0;if(r[i]<n[i])return!1}return!1}function Zn(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let e=(0,P.dirname)(process.execPath),t=(0,P.basename)(e),r=(0,P.join)(e,".."),n=(0,b.readdirSync)(r).reduce((s,l)=>l.startsWith("app-")&&Bn(l,s)?l:s,t);if(n===t)return;let i=(0,P.join)(r,n,"resources"),o=(0,P.join)(i,"app.asar"),a=(0,P.join)(i,"_app.asar");if(!(0,b.existsSync)(o)||(0,b.statSync)(o).isDirectory())return;console.info("[Vencord] Detected Host Update. Repatching..."),(0,b.renameSync)(o,a),(0,b.mkdirSync)(o),(0,b.writeFileSync)((0,P.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,b.writeFileSync)((0,P.join)(o,"index.js"),`require(${JSON.stringify((0,P.join)(__dirname,"patcher.js"))});`)}catch(e){console.error("[Vencord] Failed to repatch latest host update",e)}}var Hr,b,P,Kr=v(()=>{"use strict";c();Hr=require("electron"),b=require("original-fs"),P=require("path");Hr.app.on("before-quit",Zn)});var Jn={};var A,B,Hn,Kn,st,Yn,Yr=v(()=>{"use strict";c();Wr();A=Ne(require("electron")),B=require("path");$e();H();ae();console.log("[Vencord] Starting up...");Hn=require.main.filename,Kn=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",st=(0,B.join)((0,B.dirname)(Hn),"..",Kn),Yn=require((0,B.join)(st,"package.json"));require.main.filename=(0,B.join)(st,Yn.main);A.app.setAppPath(st);if(Se)console.log("[Vencord] Running in vanilla mode. Not loading Vencord");else{let e=T.store;if(Kr(),e.winCtrlQ){let i=A.Menu.buildFromTemplate;A.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:a}=o[0];Array.isArray(a)&&a.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>A.app.quit()})}return i.call(this,o)}}class t extends A.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let a=o.webPreferences.preload;o.webPreferences.preload=(0,B.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,e.frameless?o.frame=!1:e.winNativeTitleBar&&delete o.frame,e.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),!1&&(o.backgroundColor="#00000000",e.macosVibrancyStyle&&(o.vibrancy=e.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=a,super(o),Ar(this)}else super(o)}}Object.assign(t,A.default.BrowserWindow),Object.defineProperty(t,"name",{value:"BrowserWindow",configurable:!0});let r=require.resolve("electron");delete require.cache[r].exports,require.cache[r].exports={...A.default,BrowserWindow:t},Zr(global,"appSettings",i=>{i.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0),e.disableMinSize?(i.set("MIN_WIDTH",0),i.set("MIN_HEIGHT",0)):(i.set("MIN_WIDTH",940),i.set("MIN_HEIGHT",500))}),process.env.DATA_DIR=(0,B.join)(A.app.getPath("userData"),"..","Vencord");let n=A.app.commandLine.appendSwitch;A.app.commandLine.appendSwitch=function(...i){if(i[0]==="disable-features"){let o=new Set((i[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),i[1]+=[...o].join(",")}return n.apply(this,i)},A.app.commandLine.appendSwitch("disable-renderer-backgrounding"),A.app.commandLine.appendSwitch("disable-background-timer-throttling"),A.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Vencord] Loading original Discord app.asar");require(require.main.filename)});c();var q=require("electron"),Jr=require("path");$e();H();ae();c();var jr=require("electron");c();var Sr=require("module"),Tn=(0,Sr.createRequire)("/"),xe,bn=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{xe=Tn("worker_threads").Worker}catch{}var xn=xe?function(e,t,r,n,i){var o=!1,a=new xe(e+bn,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!o&&i(new Error("exited with code "+s),null)});return a.postMessage(r,n),a.terminate=function(){return o=!0,xe.prototype.terminate.call(a)},a}:function(e,t,r,n,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},S=Uint8Array,J=Uint16Array,Tr=Int32Array,rt=new S([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),nt=new S([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),br=new S([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),xr=function(e,t){for(var r=new J(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var i=new Tr(r[30]),n=1;n<30;++n)for(var o=r[n];o<r[n+1];++o)i[o]=o-r[n]<<5|n;return{b:r,r:i}},Dr=xr(rt,2),it=Dr.b,Dn=Dr.r;it[28]=258,Dn[258]=28;var Er=xr(nt,0),kr=Er.b,ao=Er.r,ke=new J(32768);for(d=0;d<32768;++d)L=(d&43690)>>1|(d&21845)<<1,L=(L&52428)>>2|(L&13107)<<2,L=(L&61680)>>4|(L&3855)<<4,ke[d]=((L&65280)>>8|(L&255)<<8)>>1;var L,d,ce=function(e,t,r){for(var n=e.length,i=0,o=new J(t);i<n;++i)e[i]&&++o[e[i]-1];var a=new J(t);for(i=1;i<t;++i)a[i]=a[i-1]+o[i-1]<<1;var s;if(r){s=new J(1<<t);var l=15-t;for(i=0;i<n;++i)if(e[i])for(var h=i<<4|e[i],f=t-e[i],u=a[e[i]-1]++<<f,m=u|(1<<f)-1;u<=m;++u)s[ke[u]>>l]=h}else for(s=new J(n),i=0;i<n;++i)e[i]&&(s[i]=ke[a[e[i]-1]++]>>15-e[i]);return s},ye=new S(288);for(d=0;d<144;++d)ye[d]=8;var d;for(d=144;d<256;++d)ye[d]=9;var d;for(d=256;d<280;++d)ye[d]=7;var d;for(d=280;d<288;++d)ye[d]=8;var d,Pr=new S(32);for(d=0;d<32;++d)Pr[d]=5;var d;var Rr=ce(ye,9,1);var Or=ce(Pr,5,1),De=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},k=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Ee=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},_r=function(e){return(e+7)/8|0},Pe=function(e,t,r){return(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length),new S(e.subarray(t,r))};var Nr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],w=function(e,t,r){var n=new Error(t||Nr[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,w),!r)throw n;return n},Vr=function(e,t,r,n){var i=e.length,o=n?n.length:0;if(!i||t.f&&!t.l)return r||new S(0);var a=!r,s=a||t.i!=2,l=t.i;a&&(r=new S(i*3));var h=function(pt){var gt=r.length;if(pt>gt){var dt=new S(Math.max(gt*2,pt));dt.set(r),r=dt}},f=t.f||0,u=t.p||0,m=t.b||0,_=t.l,X=t.d,M=t.m,x=t.n,D=i*8;do{if(!_){f=k(e,u,1);var z=k(e,u+1,3);if(u+=3,z)if(z==1)_=Rr,X=Or,M=9,x=5;else if(z==2){var ue=k(e,u,31)+257,Ie=k(e,u+10,15)+4,Z=ue+k(e,u+5,31)+1;u+=14;for(var E=new S(Z),$=new S(19),I=0;I<Ie;++I)$[br[I]]=k(e,u+I*3,7);u+=Ie*3;for(var fe=De($),qr=(1<<fe)-1,Xr=ce($,fe,1),I=0;I<Z;){var ct=Xr[k(e,u,qr)];u+=ct&15;var C=ct>>4;if(C<16)E[I++]=C;else{var ee=0,Ae=0;for(C==16?(Ae=3+k(e,u,3),u+=2,ee=E[I-1]):C==17?(Ae=3+k(e,u,7),u+=3):C==18&&(Ae=11+k(e,u,127),u+=7);Ae--;)E[I++]=ee}}var lt=E.subarray(0,ue),U=E.subarray(ue);M=De(lt),x=De(U),_=ce(lt,M,1),X=ce(U,x,1)}else w(1);else{var C=_r(u)+4,G=e[C-4]|e[C-3]<<8,Q=C+G;if(Q>i){l&&w(0);break}s&&h(m+G),r.set(e.subarray(C,Q),m),t.b=m+=G,t.p=u=Q*8,t.f=f;continue}if(u>D){l&&w(0);break}}s&&h(m+131072);for(var Qr=(1<<M)-1,$r=(1<<x)-1,Re=u;;Re=u){var ee=_[Ee(e,u)&Qr],te=ee>>4;if(u+=ee&15,u>D){l&&w(0);break}if(ee||w(2),te<256)r[m++]=te;else if(te==256){Re=u,_=null;break}else{var ut=te-254;if(te>264){var I=te-257,he=rt[I];ut=k(e,u,(1<<he)-1)+it[I],u+=he}var Oe=X[Ee(e,u)&$r],_e=Oe>>4;Oe||w(3),u+=Oe&15;var U=kr[_e];if(_e>3){var he=nt[_e];U+=Ee(e,u)&(1<<he)-1,u+=he}if(u>D){l&&w(0);break}s&&h(m+131072);var ft=m+ut;if(m<U){var ht=o-U,en=Math.min(U,ft);for(ht+m<0&&w(3);m<en;++m)r[m]=n[ht+m]}for(;m<ft;++m)r[m]=r[m-U]}}t.l=_,t.p=Re,t.b=m,t.f=f,_&&(f=1,t.m=M,t.d=X,t.n=x)}while(!f);return m!=r.length&&a?Pe(r,0,m):r.subarray(0,m)};var En=new S(0);var kn=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},Cr=function(e,t,r){for(var n=e(),i=e.toString(),o=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),a=0;a<n.length;++a){var s=n[a],l=o[a];if(typeof s=="function"){t+=";"+l+"=";var h=s.toString();if(s.prototype)if(h.indexOf("[native code]")!=-1){var f=h.indexOf(" ",8)+1;t+=h.slice(f,h.indexOf("(",f))}else{t+=h;for(var u in s.prototype)t+=";"+l+".prototype."+u+"="+s.prototype[u].toString()}else t+=h}else r[l]=s}return t},be=[],Pn=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Rn=function(e,t,r,n){if(!be[r]){for(var i="",o={},a=e.length-1,s=0;s<a;++s)i=Cr(e[s],i,o);be[r]={c:Cr(e[a],i,o),e:o}}var l=kn({},be[r].e);return xn(be[r].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,l,Pn(l),n)},On=function(){return[S,J,Tr,rt,nt,br,it,kr,Rr,Or,ke,Nr,ce,De,k,Ee,_r,Pe,w,Vr,ot,Mr,Gr]};var Mr=function(e){return postMessage(e,[e.buffer])},Gr=function(e){return e&&{out:e.size&&new S(e.size),dictionary:e.dictionary}},_n=function(e,t,r,n,i,o){var a=Rn(r,n,i,function(s,l){a.terminate(),o(s,l)});return a.postMessage([e,t],t.consume?[e.buffer]:[]),function(){a.terminate()}};var N=function(e,t){return e[t]|e[t+1]<<8},O=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},et=function(e,t){return O(e,t)+O(e,t+4)*4294967296};function Nn(e,t,r){return r||(r=t,t={}),typeof r!="function"&&w(7),_n(e,t,[On],function(n){return Mr(ot(n.data[0],Gr(n.data[1])))},1,r)}function ot(e,t){return Vr(e,{i:2},t&&t.out,t&&t.dictionary)}var tt=typeof TextDecoder<"u"&&new TextDecoder,Vn=0;try{tt.decode(En,{stream:!0}),Vn=1}catch{}var Mn=function(e){for(var t="",r=0;;){var n=e[r++],i=(n>127)+(n>223)+(n>239);if(r+i>e.length)return{s:t,r:Pe(e,r-1)};i?i==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function Gn(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(tt)return tt.decode(e);var i=Mn(e),o=i.s,r=i.r;return r.length&&w(8),o}}var Ln=function(e,t){return t+30+N(e,t+26)+N(e,t+28)},zn=function(e,t,r){var n=N(e,t+28),i=Gn(e.subarray(t+46,t+46+n),!(N(e,t+8)&2048)),o=t+46+n,a=O(e,t+20),s=r&&a==4294967295?Un(e,o):[a,O(e,t+24),O(e,t+42)],l=s[0],h=s[1],f=s[2];return[N(e,t+10),l,h,i,o+N(e,t+30)+N(e,t+32),f]},Un=function(e,t){for(;N(e,t)!=1;t+=4+N(e,t+2));return[et(e,t+12),et(e,t+4),et(e,t+20)]};var wr=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function Lr(e,t,r){r||(r=t,t={}),typeof r!="function"&&w(7);var n=[],i=function(){for(var x=0;x<n.length;++x)n[x]()},o={},a=function(x,D){wr(function(){r(x,D)})};wr(function(){a=r});for(var s=e.length-22;O(e,s)!=101010256;--s)if(!s||e.length-s>65558)return a(w(13,0,1),null),i;var l=N(e,s+8);if(l){var h=l,f=O(e,s+16),u=f==4294967295||h==65535;if(u){var m=O(e,s-12);u=O(e,m)==101075792,u&&(h=l=O(e,m+32),f=O(e,m+48))}for(var _=t&&t.filter,X=function(x){var D=zn(e,f,u),z=D[0],C=D[1],G=D[2],Q=D[3],ue=D[4],Ie=D[5],Z=Ln(e,Ie);f=ue;var E=function(I,fe){I?(i(),a(I,null)):(fe&&(o[Q]=fe),--l||a(null,o))};if(!_||_({name:Q,size:C,originalSize:G,compression:z}))if(!z)E(null,Pe(e,Z,Z+C));else if(z==8){var $=e.subarray(Z,Z+C);if(G<524288||C>.8*G)try{E(null,ot($,{out:new S(G)}))}catch(I){E(I,null)}else n.push(Nn($,{size:G},E))}else E(w(14,"unknown compression type "+z,1),null);else E(null,null)},M=0;M<h;++M)X(M)}else a(null,{});return i}var Fr=require("fs"),V=require("fs/promises"),le=require("path");ae();c();function zr(e){function t(a,s,l,h){let f=0;return f+=a<<0,f+=s<<8,f+=l<<16,f+=h<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,n=e[4]===2;if(!n&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(n){let a=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),l=16+a+s;return e.subarray(l,e.length)}let o=12+t(e[8],e[9],e[10],e[11]);return e.subarray(o,e.length)}c();var Ur=Ne(require("https"));function at(e,t={}){return new Promise((r,n)=>{Ur.default.get(e,t,i=>{let{statusCode:o,statusMessage:a,headers:s}=i;if(o>=400)return void n(`${o}: ${a} - ${e}`);if(o>=300)return void r(at(s.location,t));let l=[];i.on("error",n),i.on("data",h=>l.push(h)),i.once("end",()=>r(Buffer.concat(l)))})})}var jn=(0,le.join)(we,"ExtensionCache");async function Fn(e,t){return await(0,V.mkdir)(t,{recursive:!0}),new Promise((r,n)=>{Lr(e,(i,o)=>{if(i)return void n(i);Promise.all(Object.keys(o).map(async a=>{if(a.startsWith("_metadata/"))return;if(a.endsWith("/"))return void(0,V.mkdir)((0,le.join)(t,a),{recursive:!0});let s=a.split("/"),l=s.pop(),h=s.join("/"),f=(0,le.join)(t,h);h&&await(0,V.mkdir)(f,{recursive:!0}),await(0,V.writeFile)((0,le.join)(f,l),o[a])})).then(()=>r()).catch(a=>{(0,V.rm)(t,{recursive:!0,force:!0}),n(a)})})})}async function Br(e){let t=(0,le.join)(jn,`${e}`);try{await(0,V.access)(t,Fr.constants.F_OK)}catch{let n=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await at(n,{headers:{"User-Agent":"Vencord (https://github.com/Vendicated/Vencord)"}});await Fn(zr(i),t).catch(console.error)}jr.session.defaultSession.loadExtension(t)}Se||q.app.whenReady().then(()=>{q.protocol.registerFileProtocol("vencord",({url:i},o)=>{let a=i.slice(10);if(a.endsWith("/")&&(a=a.slice(0,-1)),a.startsWith("/themes/")){let s=a.slice(8),l=Qe(F,s);if(!l){o({statusCode:403});return}o(l.replace(/\?v=\d+$/,""));return}switch(a){case"renderer.js.map":case"vencordDesktopRenderer.js.map":case"preload.js.map":case"vencordDesktopPreload.js.map":case"patcher.js.map":case"vencordDesktopMain.js.map":o((0,Jr.join)(__dirname,a));break;default:o({statusCode:403})}});try{T.store.enableReactDevtools&&Br("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Vencord] Installed React Developer Tools")).catch(i=>console.error("[Vencord] Failed to install React Developer Tools",i))}catch{}let e=(i,o)=>Object.keys(i).find(a=>a.toLowerCase()===o),t=i=>{let o={};return i.split(";").forEach(a=>{let[s,...l]=a.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(o,s)&&(o[s]=l)}),o},r=i=>Object.entries(i).filter(([,o])=>o?.length).map(o=>o.flat().join(" ")).join("; "),n=i=>{let o=e(i,"content-security-policy");if(o){let a=t(i[o][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])a[s]??=[],a[s].push("*","blob:","data:","vencord:","'unsafe-inline'");a["script-src"]??=[],a["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),i[o]=[r(a)]}};q.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:o},a)=>{if(i&&(o==="mainFrame"&&n(i),o==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}a({cancel:!1,responseHeaders:i})}),q.session.defaultSession.webRequest.onHeadersReceived=()=>{}});Yr();
//# sourceURL=VencordPatcher
//# sourceMappingURL=vencord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
