// Vencord eaca14bb
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var mr=Object.create;var pe=Object.defineProperty;var Ir=Object.getOwnPropertyDescriptor;var yr=Object.getOwnPropertyNames;var Ar=Object.getPrototypeOf,Cr=Object.prototype.hasOwnProperty;var ge=(e,t)=>()=>(e&&(t=e(e=0)),t);var Y=(e,t)=>{for(var r in t)pe(e,r,{get:t[r],enumerable:!0})},it=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of yr(t))!Cr.call(e,i)&&i!==r&&pe(e,i,{get:()=>t[i],enumerable:!(n=Ir(t,i))||n.enumerable});return e};var wr=(e,t,r)=>(r=e!=null?mr(Ar(e)):{},it(t||!e||!e.__esModule?pe(r,"default",{value:e,enumerable:!0}):r,e)),Sr=e=>it(pe({},"__esModule",{value:!0}),e);var c=ge(()=>{"use strict"});var ie=ge(()=>{"use strict";c()});function oe(e){return async function(){try{return{ok:!0,value:await e(...arguments)}}catch(t){return{ok:!1,error:t instanceof Error?{...t}:t}}}}var ot=ge(()=>{"use strict";c()});var Dr={};function J(...e){let t={cwd:lt};return De?Ee("flatpak-spawn",["--host","git",...e],t):Ee("git",e,t)}async function Tr(){return(await J("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function xr(){await J("fetch");let e=(await J("branch","--show-current")).stdout.trim();if(!((await J("ls-remote","origin",e)).stdout.length>0))return[];let n=(await J("log",`HEAD...origin/${e}`,"--pretty=format:%an/%h/%s")).stdout.trim();return n?n.split(`
`).map(i=>{let[a,o,...s]=i.split("/");return{hash:o,author:a,message:s.join("/").split(`
`)[0]}}):[]}async function br(){return(await J("pull")).stdout.includes("Fast-forward")}async function Er(){return!(await Ee(De?"flatpak-spawn":"node",De?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:lt})).stderr.includes("Build failed")}var at,ae,st,ct,lt,Ee,De,ut=ge(()=>{"use strict";c();ie();at=require("child_process"),ae=require("electron"),st=require("path"),ct=require("util");ot();lt=(0,st.join)(__dirname,".."),Ee=(0,ct.promisify)(at.execFile),De=!1;ae.ipcMain.handle("VencordGetRepo",oe(Tr));ae.ipcMain.handle("VencordGetUpdates",oe(xr));ae.ipcMain.handle("VencordUpdate",oe(br));ae.ipcMain.handle("VencordBuild",oe(Er))});c();var F=require("electron"),fr=require("path");c();c();ut();c();ie();var Ue=require("electron");c();var Pe={};Y(Pe,{fetchTrackData:()=>Rr});c();var pt=require("child_process"),gt=require("util"),dt=(0,gt.promisify)(pt.execFile);async function Re(e){let{stdout:t}=await dt("osascript",e.map(r=>["-e",r]).flat());return t}function ft(e,t){let r=new URL("https://tools.applemediaservices.com/api/apple-media/music/US/search.json");return r.searchParams.set("types",e),r.searchParams.set("limit","1"),r.searchParams.set("term",t),r}var ht={headers:{"user-agent":"Mozilla/5.0 (Windows NT 10.0; rv:125.0) Gecko/20100101 Firefox/125.0"}},E=null;async function kr({id:e,name:t,artist:r,album:n}){if(e===E?.id){if("data"in E)return E.data;if("failures"in E&&E.failures>=5)return null}try{let[i,a]=await Promise.all([fetch(ft("songs",r+" "+n+" "+t),ht).then(f=>f.json()),fetch(ft("artists",r.split(/ *[,&] */)[0]),ht).then(f=>f.json())]),o=i?.songs?.data[0]?.attributes.url,s=i?.songs?.data[0]?.id?`https://song.link/i/${i?.songs?.data[0]?.id}`:void 0,u=i?.songs?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512"),h=a?.artists?.data[0]?.attributes.artwork.url.replace("{w}","512").replace("{h}","512");return E={id:e,data:{appleMusicLink:o,songLink:s,albumArtwork:u,artistArtwork:h}},E.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),E={id:e,failures:(e===E?.id&&"failures"in E?E.failures:0)+1},null}}async function Rr(){try{await dt("pgrep",["^Music$"])}catch{return null}if(await Re(['tell application "Music"',"get player state","end tell"]).then(f=>f.trim())!=="playing")return null;let t=await Re(['tell application "Music"',"get player position","end tell"]).then(f=>Number.parseFloat(f.trim())),r=await Re(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[n,i,a,o,s]=r.split(`
`).filter(f=>!!f),u=Number.parseFloat(s),h=await kr({id:n,name:i,artist:o,album:a});return{name:i,album:a,artist:o,playerPosition:t,duration:u,...h}}var Oe={};Y(Oe,{initDevtoolsOpenEagerLoad:()=>Pr});c();function Pr(e){let t=()=>e.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");e.sender.isDevToolsOpened()?t():e.sender.once("devtools-opened",()=>t())}var wt={};c();c();ie();c();var se=class{pathListeners=new Map;globalListeners=new Set;constructor(t,r={}){this.plain=t,this.store=this.makeProxy(t),Object.assign(this,r)}makeProxy(t,r=t,n=""){let i=this;return new Proxy(t,{get(a,o){let s=a[o];return!(o in a)&&i.getDefaultValue&&(s=i.getDefaultValue({target:a,key:o,root:r,path:n})),typeof s=="object"&&s!==null&&!Array.isArray(s)?i.makeProxy(s,r,`${n}${n&&"."}${o}`):s},set(a,o,s){if(a[o]===s)return!0;Reflect.set(a,o,s);let u=`${n}${n&&"."}${o}`;return i.globalListeners.forEach(h=>h(s,u)),i.pathListeners.get(u)?.forEach(h=>h(s)),!0}})}setData(t,r){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=t,this.store=this.makeProxy(t),r){let n=t,i=r.split(".");for(let a of i){if(!n){console.warn(`Settings#setData: Path ${r} does not exist in new data. Not dispatching update`);return}n=n[a]}this.pathListeners.get(r)?.forEach(a=>a(n))}this.markAsChanged()}addGlobalChangeListener(t){this.globalListeners.add(t)}addChangeListener(t,r){let n=this.pathListeners.get(t)??new Set;n.add(r),this.pathListeners.set(t,n)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}removeChangeListener(t,r){let n=this.pathListeners.get(t);!n||(n.delete(r),n.size||this.pathListeners.delete(t))}markAsChanged(){this.globalListeners.forEach(t=>t(this.plain,""))}};c();function Ge(e,t){for(let r in t){let n=t[r];typeof n=="object"&&!Array.isArray(n)?(e[r]??={},Ge(e[r],n)):e[r]??=n}return e}var me=require("electron"),U=require("fs");c();var vt=require("electron"),L=require("path"),de=process.env.VENCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,L.join)(process.env.DISCORD_USER_DATA_DIR,"..","VencordData"):(0,L.join)(vt.app.getPath("userData"),"..","Vencord")),X=(0,L.join)(de,"settings"),_=(0,L.join)(de,"themes"),ve=(0,L.join)(X,"quickCss.css"),Me=(0,L.join)(X,"settings.json"),Ve=(0,L.join)(X,"native-settings.json"),mt=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:","itunes:"];(0,U.mkdirSync)(X,{recursive:!0});function yt(e,t){try{return JSON.parse((0,U.readFileSync)(t,"utf-8"))}catch(r){return r?.code!=="ENOENT"&&console.error(`Failed to read ${e} settings`,r),{}}}var x=new se(yt("renderer",Me));x.addGlobalChangeListener(()=>{try{(0,U.writeFileSync)(Me,JSON.stringify(x.plain,null,4))}catch(e){console.error("Failed to write renderer settings",e)}});me.ipcMain.handle("VencordGetSettingsDir",()=>X);me.ipcMain.on("VencordGetSettings",e=>e.returnValue=x.plain);me.ipcMain.handle("VencordSetSettings",(e,t,r)=>{x.setData(t,r)});var Or={plugins:{}},At=yt("native",Ve);Ge(At,Or);var It=new se(At);It.addGlobalChangeListener(()=>{try{(0,U.writeFileSync)(Ve,JSON.stringify(It.plain,null,4))}catch(e){console.error("Failed to write native settings",e)}});var Ct=require("electron");Ct.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://open.spotify.com/embed/")){let i=x.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;n.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})});var Tt={};c();var St=require("electron");St.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{if(n.url.startsWith("https://www.youtube.com/")){if(!x.store.plugins?.FixYoutubeEmbeds?.enabled)return;n.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})});var ze={};Y(ze,{resolveRedirect:()=>Mr});c();var xt=require("https"),Gr=/^https:\/\/(spotify\.link|s\.team)\/.+$/;function bt(e){return new Promise((t,r)=>{let n=(0,xt.request)(new URL(e),{method:"HEAD"},i=>{t(i.headers.location?bt(i.headers.location):e)});n.on("error",r),n.end()})}async function Mr(e,t){return Gr.test(t)?bt(t):t}var Le={};Y(Le,{makeDeeplTranslateRequest:()=>Vr});c();async function Vr(e,t,r,n){let i=t?"https://api.deepl.com/v2/translate":"https://api-free.deepl.com/v2/translate";try{let a=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`DeepL-Auth-Key ${r}`},body:n}),o=await a.text();return{status:a.status,data:o}}catch(a){return{status:-1,data:String(a)}}}var Ne={};Y(Ne,{readRecording:()=>zr});c();var Et=require("electron"),Dt=require("fs/promises"),ce=require("path");async function zr(e,t){t=(0,ce.normalize)(t);let r=(0,ce.basename)(t),n=(0,ce.normalize)(Et.app.getPath("userData")+"/");if(console.log(r,n,t),r!=="recording.ogg"||!t.startsWith(n))return null;try{let i=await(0,Dt.readFile)(t);return new Uint8Array(i.buffer)}catch{return null}}var _e={};Y(_e,{sendToOverlay:()=>Lr});c();var Rt=require("dgram"),kt;function Lr(e,t){t.messageType=t.type;let r=JSON.stringify(t);kt??=(0,Rt.createSocket)("udp4"),kt.send(r,42069,"127.0.0.1")}var Gt={};c();var Ot=require("electron");c();var Pt=`/* eslint-disable */

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
});`;Ot.app.on("browser-window-created",(e,t)=>{t.webContents.on("frame-created",(r,{frame:n})=>{n.once("dom-ready",()=>{!x.store.plugins?.YoutubeAdblock?.enabled||(n.url.includes("youtube.com/embed/")||n.url.includes("discordsays")&&n.url.includes("youtube.com"))&&n.executeJavaScript(Pt)})})});var Mt={AppleMusicRichPresence:Pe,ConsoleShortcuts:Oe,FixSpotifyEmbeds:wt,FixYoutubeEmbeds:Tt,OpenInApp:ze,Translate:Le,VoiceMessages:Ne,XSOverlay:_e,YoutubeAdblock:Gt};var Vt={};for(let[e,t]of Object.entries(Mt)){let r=Object.entries(t);if(!r.length)continue;let n=Vt[e]={};for(let[i,a]of r){let o=`VencordPluginNative_${e}_${i}`;Ue.ipcMain.handle(o,a),n[i]=o}}Ue.ipcMain.on("VencordGetPluginIpcMethodMap",e=>{e.returnValue=Vt});c();ie();var m=require("electron");c();var zt="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICAgIDxoZWFkPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgICAgIDx0aXRsZT5WZW5jb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICAgICAgPGxpbmsKICAgICAgICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgICAgICAgICBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9lZGl0b3IvZWRpdG9yLm1haW4uY3NzIgogICAgICAgICAgICBpbnRlZ3JpdHk9InNoYTI1Ni10aUpQUTJPMDR6L3BaL0F3ZHlJZ2hyT016ZXdmK1BJdkVsMVlLYlF2c1prPSIKICAgICAgICAgICAgY3Jvc3NvcmlnaW49ImFub255bW91cyIKICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIgogICAgICAgIC8+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICBodG1sLAogICAgICAgICAgICBib2R5LAogICAgICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGlkPSJjb250YWluZXIiPjwvZGl2PgogICAgICAgIDxzY3JpcHQKICAgICAgICAgICAgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9sb2FkZXIuanMiCiAgICAgICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IgogICAgICAgICAgICBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgICAgICByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiCiAgICAgICAgPjwvc2NyaXB0PgoKICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgICAgICBwYXRoczogewogICAgICAgICAgICAgICAgICAgIHZzOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMiLAogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CgogICAgICAgICAgICByZXF1aXJlKFsidnMvZWRpdG9yL2VkaXRvci5tYWluIl0sICgpID0+IHsKICAgICAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoCiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb250YWluZXIiKSwKICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNzcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKGVkaXRvci5nZXRWYWx1ZSgpKQogICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBtb25hY28gcmUtbGF5b3V0CiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoKTsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9KTsKICAgICAgICA8L3NjcmlwdD4KICAgIDwvYm9keT4KPC9odG1sPgo=";var le=require("fs"),$=require("fs/promises"),q=require("path");c();var Nr=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,_r=/^\\@/;function je(e,t={}){return{fileName:e,name:t.name??e.replace(/\.css$/i,""),author:t.author??"Unknown Author",description:t.description??"A Discord Theme.",version:t.version,license:t.license,source:t.source,website:t.website,invite:t.invite}}function Lt(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Nt(e,t){if(!e)return je(t);let r=e.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!r)return je(t);let n={},i="",a="";for(let o of r.split(Nr))if(o.length!==0)if(o.charAt(0)==="@"&&o.charAt(1)!==" "){n[i]=a.trim();let s=o.indexOf(" ");i=o.substring(1,s),a=o.substring(s+1)}else a+=" "+o.replace("\\n",`
`).replace(_r,"@");return n[i]=a.trim(),delete n[""],je(t,n)}c();var _t=require("electron");function Ut(e){e.webContents.setWindowOpenHandler(({url:t})=>{switch(t){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:r}=new URL(t)}catch{return{action:"deny"}}switch(r){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":_t.shell.openExternal(t)}return{action:"deny"}})}(0,le.mkdirSync)(_,{recursive:!0});function Fe(e,t){let r=(0,q.normalize)(e),n=(0,q.join)(e,t),i=(0,q.normalize)(n);return i.startsWith(r)?i:null}function Ur(){return(0,$.readFile)(ve,"utf-8").catch(()=>"")}async function jr(){let e=await(0,$.readdir)(_).catch(()=>[]),t=[];for(let r of e){if(!r.endsWith(".css"))continue;let n=await jt(r).then(Lt).catch(()=>null);n!=null&&t.push(Nt(n,r))}return t}function jt(e){e=e.replace(/\?v=\d+$/,"");let t=Fe(_,e);return t?(0,$.readFile)(t,"utf-8"):Promise.reject(`Unsafe path ${e}`)}m.ipcMain.handle("VencordOpenQuickCss",()=>m.shell.openPath(ve));m.ipcMain.handle("VencordOpenExternal",(e,t)=>{try{var{protocol:r}=new URL(t)}catch{throw"Malformed URL"}if(!mt.includes(r))throw"Disallowed protocol.";m.shell.openExternal(t)});m.ipcMain.handle("VencordGetQuickCss",()=>Ur());m.ipcMain.handle("VencordSetQuickCss",(e,t)=>(0,le.writeFileSync)(ve,t));m.ipcMain.handle("VencordGetThemesDir",()=>_);m.ipcMain.handle("VencordGetThemesList",()=>jr());m.ipcMain.handle("VencordGetThemeData",(e,t)=>jt(t));m.ipcMain.handle("VencordGetThemeSystemValues",()=>({"os-accent-color":`#${m.systemPreferences.getAccentColor?.()||""}`}));m.ipcMain.handle("VencordOpenMonacoEditor",async()=>{let e="Vencord QuickCSS Editor",t=m.BrowserWindow.getAllWindows().find(n=>n.title===e);if(t&&!t.isDestroyed()){t.focus();return}let r=new m.BrowserWindow({title:e,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,q.join)(__dirname,"vencordDesktopPreload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});Ut(r),await r.loadURL(`data:text/html;base64,${zt}`)});c();var cr=require("electron");c();var Bt=require("module"),Fr=(0,Bt.createRequire)("/"),ye,Zr=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{ye=Fr("worker_threads").Worker}catch{}var Br=ye?function(e,t,r,n,i){var a=!1,o=new ye(e+Zr,{eval:!0}).on("error",function(s){return i(s,null)}).on("message",function(s){return i(null,s)}).on("exit",function(s){s&&!a&&i(new Error("exited with code "+s),null)});return o.postMessage(r,n),o.terminate=function(){return a=!0,ye.prototype.terminate.call(o)},o}:function(e,t,r,n,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}},C=Uint8Array,j=Uint16Array,Wt=Int32Array,We=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ke=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Kt=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ht=function(e,t){for(var r=new j(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var i=new Wt(r[30]),n=1;n<30;++n)for(var a=r[n];a<r[n+1];++a)i[a]=a-r[n]<<5|n;return{b:r,r:i}},Yt=Ht(We,2),He=Yt.b,Wr=Yt.r;He[28]=258,Wr[258]=28;var Jt=Ht(Ke,0),Xt=Jt.b,yi=Jt.r,we=new j(32768);for(p=0;p<32768;++p)M=(p&43690)>>1|(p&21845)<<1,M=(M&52428)>>2|(M&13107)<<2,M=(M&61680)>>4|(M&3855)<<4,we[p]=((M&65280)>>8|(M&255)<<8)>>1;var M,p,Q=function(e,t,r){for(var n=e.length,i=0,a=new j(t);i<n;++i)e[i]&&++a[e[i]-1];var o=new j(t);for(i=1;i<t;++i)o[i]=o[i-1]+a[i-1]<<1;var s;if(r){s=new j(1<<t);var u=15-t;for(i=0;i<n;++i)if(e[i])for(var h=i<<4|e[i],f=t-e[i],l=o[e[i]-1]++<<f,v=l|(1<<f)-1;l<=v;++l)s[we[l]>>u]=h}else for(s=new j(n),i=0;i<n;++i)e[i]&&(s[i]=we[o[e[i]-1]++]>>15-e[i]);return s},ue=new C(288);for(p=0;p<144;++p)ue[p]=8;var p;for(p=144;p<256;++p)ue[p]=9;var p;for(p=256;p<280;++p)ue[p]=7;var p;for(p=280;p<288;++p)ue[p]=8;var p,qt=new C(32);for(p=0;p<32;++p)qt[p]=5;var p;var $t=Q(ue,9,1);var Qt=Q(qt,5,1),Ae=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},b=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Ce=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},er=function(e){return(e+7)/8|0},Se=function(e,t,r){return(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length),new C(e.subarray(t,r))};var tr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],A=function(e,t,r){var n=new Error(t||tr[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,A),!r)throw n;return n},rr=function(e,t,r,n){var i=e.length,a=n?n.length:0;if(!i||t.f&&!t.l)return r||new C(0);var o=!r,s=o||t.i!=2,u=t.i;o&&(r=new C(i*3));var h=function(tt){var rt=r.length;if(tt>rt){var nt=new C(Math.max(rt*2,tt));nt.set(r),r=nt}},f=t.f||0,l=t.p||0,v=t.b||0,k=t.l,Z=t.d,O=t.m,w=t.n,S=i*8;do{if(!k){f=b(e,l,1);var V=b(e,l+1,3);if(l+=3,V)if(V==1)k=$t,Z=Qt,O=9,w=5;else if(V==2){var te=b(e,l,31)+257,fe=b(e,l+10,15)+4,N=te+b(e,l+5,31)+1;l+=14;for(var T=new C(N),W=new C(19),I=0;I<fe;++I)W[Kt[I]]=b(e,l+I*3,7);l+=fe*3;for(var re=Ae(W),hr=(1<<re)-1,pr=Q(W,re,1),I=0;I<N;){var Xe=pr[b(e,l,hr)];l+=Xe&15;var y=Xe>>4;if(y<16)T[I++]=y;else{var K=0,he=0;for(y==16?(he=3+b(e,l,3),l+=2,K=T[I-1]):y==17?(he=3+b(e,l,7),l+=3):y==18&&(he=11+b(e,l,127),l+=7);he--;)T[I++]=K}}var qe=T.subarray(0,te),z=T.subarray(te);O=Ae(qe),w=Ae(z),k=Q(qe,O,1),Z=Q(z,w,1)}else A(1);else{var y=er(l)+4,G=e[y-4]|e[y-3]<<8,B=y+G;if(B>i){u&&A(0);break}s&&h(v+G),r.set(e.subarray(y,B),v),t.b=v+=G,t.p=l=B*8,t.f=f;continue}if(l>S){u&&A(0);break}}s&&h(v+131072);for(var gr=(1<<O)-1,dr=(1<<w)-1,Te=l;;Te=l){var K=k[Ce(e,l)&gr],H=K>>4;if(l+=K&15,l>S){u&&A(0);break}if(K||A(2),H<256)r[v++]=H;else if(H==256){Te=l,k=null;break}else{var $e=H-254;if(H>264){var I=H-257,ne=We[I];$e=b(e,l,(1<<ne)-1)+He[I],l+=ne}var xe=Z[Ce(e,l)&dr],be=xe>>4;xe||A(3),l+=xe&15;var z=Xt[be];if(be>3){var ne=Ke[be];z+=Ce(e,l)&(1<<ne)-1,l+=ne}if(l>S){u&&A(0);break}s&&h(v+131072);var Qe=v+$e;if(v<z){var et=a-z,vr=Math.min(z,Qe);for(et+v<0&&A(3);v<vr;++v)r[v]=n[et+v]}for(;v<Qe;++v)r[v]=r[v-z]}}t.l=k,t.p=Te,t.b=v,t.f=f,k&&(f=1,t.m=O,t.d=Z,t.n=w)}while(!f);return v!=r.length&&o?Se(r,0,v):r.subarray(0,v)};var Kr=new C(0);var Hr=function(e,t){var r={};for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];return r},Ft=function(e,t,r){for(var n=e(),i=e.toString(),a=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var s=n[o],u=a[o];if(typeof s=="function"){t+=";"+u+"=";var h=s.toString();if(s.prototype)if(h.indexOf("[native code]")!=-1){var f=h.indexOf(" ",8)+1;t+=h.slice(f,h.indexOf("(",f))}else{t+=h;for(var l in s.prototype)t+=";"+u+".prototype."+l+"="+s.prototype[l].toString()}else t+=h}else r[u]=s}return t},Ie=[],Yr=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},Jr=function(e,t,r,n){if(!Ie[r]){for(var i="",a={},o=e.length-1,s=0;s<o;++s)i=Ft(e[s],i,a);Ie[r]={c:Ft(e[o],i,a),e:a}}var u=Hr({},Ie[r].e);return Br(Ie[r].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,u,Yr(u),n)},Xr=function(){return[C,j,Wt,We,Ke,Kt,He,Xt,$t,Qt,we,tr,Q,Ae,b,Ce,er,Se,A,rr,Ye,nr,ir]};var nr=function(e){return postMessage(e,[e.buffer])},ir=function(e){return e&&{out:e.size&&new C(e.size),dictionary:e.dictionary}},qr=function(e,t,r,n,i,a){var o=Jr(r,n,i,function(s,u){o.terminate(),a(s,u)});return o.postMessage([e,t],t.consume?[e.buffer]:[]),function(){o.terminate()}};var R=function(e,t){return e[t]|e[t+1]<<8},D=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Ze=function(e,t){return D(e,t)+D(e,t+4)*4294967296};function $r(e,t,r){return r||(r=t,t={}),typeof r!="function"&&A(7),qr(e,t,[Xr],function(n){return nr(Ye(n.data[0],ir(n.data[1])))},1,r)}function Ye(e,t){return rr(e,{i:2},t&&t.out,t&&t.dictionary)}var Be=typeof TextDecoder<"u"&&new TextDecoder,Qr=0;try{Be.decode(Kr,{stream:!0}),Qr=1}catch{}var en=function(e){for(var t="",r=0;;){var n=e[r++],i=(n>127)+(n>223)+(n>239);if(r+i>e.length)return{s:t,r:Se(e,r-1)};i?i==3?(n=((n&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|e[r++]&63):t+=String.fromCharCode((n&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(n)}};function tn(e,t){if(t){for(var r="",n=0;n<e.length;n+=16384)r+=String.fromCharCode.apply(null,e.subarray(n,n+16384));return r}else{if(Be)return Be.decode(e);var i=en(e),a=i.s,r=i.r;return r.length&&A(8),a}}var rn=function(e,t){return t+30+R(e,t+26)+R(e,t+28)},nn=function(e,t,r){var n=R(e,t+28),i=tn(e.subarray(t+46,t+46+n),!(R(e,t+8)&2048)),a=t+46+n,o=D(e,t+20),s=r&&o==4294967295?on(e,a):[o,D(e,t+24),D(e,t+42)],u=s[0],h=s[1],f=s[2];return[R(e,t+10),u,h,i,a+R(e,t+30)+R(e,t+32),f]},on=function(e,t){for(;R(e,t)!=1;t+=4+R(e,t+2));return[Ze(e,t+12),Ze(e,t+4),Ze(e,t+20)]};var Zt=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function or(e,t,r){r||(r=t,t={}),typeof r!="function"&&A(7);var n=[],i=function(){for(var w=0;w<n.length;++w)n[w]()},a={},o=function(w,S){Zt(function(){r(w,S)})};Zt(function(){o=r});for(var s=e.length-22;D(e,s)!=101010256;--s)if(!s||e.length-s>65558)return o(A(13,0,1),null),i;var u=R(e,s+8);if(u){var h=u,f=D(e,s+16),l=f==4294967295||h==65535;if(l){var v=D(e,s-12);l=D(e,v)==101075792,l&&(h=u=D(e,v+32),f=D(e,v+48))}for(var k=t&&t.filter,Z=function(w){var S=nn(e,f,l),V=S[0],y=S[1],G=S[2],B=S[3],te=S[4],fe=S[5],N=rn(e,fe);f=te;var T=function(I,re){I?(i(),o(I,null)):(re&&(a[B]=re),--u||o(null,a))};if(!k||k({name:B,size:y,originalSize:G,compression:V}))if(!V)T(null,Se(e,N,N+y));else if(V==8){var W=e.subarray(N,N+y);if(G<524288||y>.8*G)try{T(null,Ye(W,{out:new C(G)}))}catch(I){T(I,null)}else n.push($r(W,{size:G},T))}else T(A(14,"unknown compression type "+V,1),null);else T(null,null)},O=0;O<h;++O)Z(O)}else o(null,{});return i}var lr=require("fs"),P=require("fs/promises"),ee=require("path");c();function ar(e){function t(o,s,u,h){let f=0;return f+=o<<0,f+=s<<8,f+=u<<16,f+=h<<24>>>0,f}if(e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4)return e;if(e[0]!==67||e[1]!==114||e[2]!==50||e[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let r=e[4]===3,n=e[4]===2;if(!n&&!r||e[5]||e[6]||e[7])throw new Error("Unexpected crx format version number.");if(n){let o=t(e[8],e[9],e[10],e[11]),s=t(e[12],e[13],e[14],e[15]),u=16+o+s;return e.subarray(u,e.length)}let a=12+t(e[8],e[9],e[10],e[11]);return e.subarray(a,e.length)}c();var sr=wr(require("https"));function Je(e,t={}){return new Promise((r,n)=>{sr.default.get(e,t,i=>{let{statusCode:a,statusMessage:o,headers:s}=i;if(a>=400)return void n(`${a}: ${o} - ${e}`);if(a>=300)return void r(Je(s.location,t));let u=[];i.on("error",n),i.on("data",h=>u.push(h)),i.once("end",()=>r(Buffer.concat(u)))})})}var an=(0,ee.join)(de,"ExtensionCache");async function sn(e,t){return await(0,P.mkdir)(t,{recursive:!0}),new Promise((r,n)=>{or(e,(i,a)=>{if(i)return void n(i);Promise.all(Object.keys(a).map(async o=>{if(o.startsWith("_metadata/"))return;if(o.endsWith("/"))return void(0,P.mkdir)((0,ee.join)(t,o),{recursive:!0});let s=o.split("/"),u=s.pop(),h=s.join("/"),f=(0,ee.join)(t,h);h&&await(0,P.mkdir)(f,{recursive:!0}),await(0,P.writeFile)((0,ee.join)(f,u),a[o])})).then(()=>r()).catch(o=>{(0,P.rm)(t,{recursive:!0,force:!0}),n(o)})})})}async function ur(e){let t=(0,ee.join)(an,`${e}`);try{await(0,P.access)(t,lr.constants.F_OK)}catch{let n=e==="fmkadmapgofadopljbjfkapdkoienihi"?"https://raw.githubusercontent.com/Vendicated/random-files/f6f550e4c58ac5f2012095a130406c2ab25b984d/fmkadmapgofadopljbjfkapdkoienihi.zip":`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${e}%26uc&prodversion=32`,i=await Je(n,{headers:{"User-Agent":"Vencord (https://github.com/Vendicated/Vencord)"}});await sn(ar(i),t).catch(console.error)}cr.session.defaultSession.loadExtension(t)}F.app.whenReady().then(()=>{F.protocol.registerFileProtocol("vencord",({url:i},a)=>{let o=i.slice(10);if(o.endsWith("/")&&(o=o.slice(0,-1)),o.startsWith("/themes/")){let s=o.slice(8),u=Fe(_,s);if(!u){a({statusCode:403});return}a(u.replace(/\?v=\d+$/,""));return}switch(o){case"renderer.js.map":case"vencordDesktopRenderer.js.map":case"preload.js.map":case"vencordDesktopPreload.js.map":case"patcher.js.map":case"vencordDesktopMain.js.map":a((0,fr.join)(__dirname,o));break;default:a({statusCode:403})}});try{x.store.enableReactDevtools&&ur("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Vencord] Installed React Developer Tools")).catch(i=>console.error("[Vencord] Failed to install React Developer Tools",i))}catch{}let e=(i,a)=>Object.keys(i).find(o=>o.toLowerCase()===a),t=i=>{let a={};return i.split(";").forEach(o=>{let[s,...u]=o.trim().split(/\s+/g);s&&!Object.prototype.hasOwnProperty.call(a,s)&&(a[s]=u)}),a},r=i=>Object.entries(i).filter(([,a])=>a?.length).map(a=>a.flat().join(" ")).join("; "),n=i=>{let a=e(i,"content-security-policy");if(a){let o=t(i[a][0]);for(let s of["style-src","connect-src","img-src","font-src","media-src","worker-src"])o[s]??=[],o[s].push("*","blob:","data:","vencord:","'unsafe-inline'");o["script-src"]??=[],o["script-src"].push("'unsafe-eval'","https://unpkg.com","https://cdnjs.cloudflare.com"),i[a]=[r(o)]}};F.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:i,resourceType:a},o)=>{if(i&&(a==="mainFrame"&&n(i),a==="stylesheet")){let s=e(i,"content-type");s&&(i[s]=["text/css"])}o({cancel:!1,responseHeaders:i})}),F.session.defaultSession.webRequest.onHeadersReceived=()=>{}});
//# sourceURL=VencordDesktopMain
//# sourceMappingURL=vencord://vencordDesktopMain.js.map
/*! For license information please see vencordDesktopMain.js.LEGAL.txt */
