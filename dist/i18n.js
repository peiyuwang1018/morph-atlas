import {resolveLanguage,translateText,languageUrl,localizeCsv} from './i18n-core.js?v=morph-20261109';
// The new key adopts the English-first release once; later choices remain saved.
let saved='';try{saved=localStorage.getItem('atlas-language-v2')||'';}catch{}
let language=resolveLanguage(location.search,saved);
const texts=new WeakMap(),attributes=new WeakMap();
let observer,scheduled=false;
export const getLanguage=()=>language;
export const t=value=>translateText(value,language);
export const csvInLanguage=csv=>localizeCsv(csv,language);
function updateText(node){
 if(!node.parentElement||node.parentElement.closest('script,style,code,[data-no-translate]'))return;
 const current=node.nodeValue;let saved=texts.get(node);
 if(!saved||current!==saved.output)saved={original:current};
 const output=translateText(saved.original,language);saved.output=output;texts.set(node,saved);if(current!==output)node.nodeValue=output;
}
function updateAttribute(el,key){const current=el.getAttribute(key);if(current===null)return;let slots=attributes.get(el);if(!slots){slots={};attributes.set(el,slots);}let saved=slots[key];if(!saved||current!==saved.output)saved={original:current};const output=translateText(saved.original,language);saved.output=output;slots[key]=saved;if(current!==output)el.setAttribute(key,output);}
function updateLinks(){for(const a of document.querySelectorAll('a[href]')){const raw=a.getAttribute('href');if(!raw||raw.startsWith('#')||a.hasAttribute('download')||a.hasAttribute('data-original-doc'))continue;let u;try{u=new URL(raw,location.href);}catch{continue;}if(u.origin!==location.origin||!/\/(?:$|[^/.]+(?:\.html)?)$/.test(u.pathname)||/\/(?:assets|data|sources)\//.test(u.pathname))continue;
 if(u.pathname.includes('/docs/')){u.pathname=language==='en'?u.pathname.replace('/docs/','/docs/en/').replace('/en/en/','/en/'):u.pathname.replace('/docs/en/','/docs/');}
 u.searchParams.set('lang',language);const href=u.pathname+u.search+u.hash;if(raw!==href)a.setAttribute('href',href);
}}

function normalizeLanguageButtons(){for(const group of document.querySelectorAll('.language-switch:not(button)')){const button=document.createElement('button');button.type='button';button.className='language-switch language-toggle';button.setAttribute('data-language-toggle','');button.setAttribute('data-no-translate','');button.innerHTML='<span data-locale="zh" lang="zh-CN">中文</span><span data-locale="en" lang="en">EN</span>';group.replaceWith(button);}}

export function applyLanguage(){
 observer?.disconnect();normalizeLanguageButtons();document.documentElement.lang=language==='en'?'en':'zh-CN';document.documentElement.dataset.language=language;
 // Freeze option identity before translating a label whose value was implicit.
 for(const el of document.querySelectorAll('option')){if(!el.hasAttribute('value'))el.setAttribute('value',el.value);if(!el.hasAttribute('data-label-zh'))el.setAttribute('data-label-zh',el.textContent);}
 const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode()))updateText(node);
 for(const el of document.querySelectorAll('[placeholder],[aria-label],[title],[alt],meta[name=description]'))if(!el.closest('[data-no-translate]'))for(const key of ['placeholder','aria-label','title','alt','content'])updateAttribute(el,key);
 for(const button of document.querySelectorAll('button[data-language]')){const active=button.dataset.language===language;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
 for(const button of document.querySelectorAll('[data-language-toggle]')){button.setAttribute('aria-label',language==='zh'?'切换到英文':'Switch to Chinese');button.title=language==='zh'?'点击任意位置切换到英文':'Click anywhere to switch to Chinese';button.querySelectorAll('[data-locale]').forEach(el=>el.classList.toggle('active',el.dataset.locale===language));}
 for(const dialog of document.querySelectorAll('dialog[open]'))if(!dialog.querySelector('.language-source-note')){const note=document.createElement('p');note.className='language-source-note dialog-language-note';note.textContent='Source-specific conditions and technical notes may remain in the original language. Check the cited document for the exact hardware version.';const top=dialog.querySelector('.dialog-top');if(top)top.after(note);else dialog.prepend(note);}
 document.querySelectorAll('.language-source-note').forEach(el=>el.hidden=language!=='en');updateLinks();
 observer?.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt','content']});
}
export function setLanguage(next){if(!['zh','en'].includes(next))return;language=next;try{localStorage.setItem('atlas-language-v2',language);}catch{}
 const u=languageUrl(location.href,language,location.href);if(document.body.dataset.docLocale&&document.body.dataset.docLocale!==language){u.pathname=language==='en'?u.pathname.replace('/docs/','/docs/en/').replace('/en/en/','/en/'):u.pathname.replace('/docs/en/','/docs/');location.assign(u.href);return;}history.replaceState(null,'',u.pathname+u.search+u.hash);applyLanguage();document.dispatchEvent(new CustomEvent('atlas:languagechange',{detail:{language}}));
}
document.addEventListener('click',event=>{if(event.target.closest('[data-language-toggle]')){setLanguage(language==='zh'?'en':'zh');return;}const button=event.target.closest('button[data-language]');if(button)setLanguage(button.dataset.language);});
window.addEventListener('storage',event=>{if(event.key==='atlas-language-v2'&&['zh','en'].includes(event.newValue)){language=event.newValue;applyLanguage();}});
function start(){if(document.body.dataset.docLocale&&document.body.dataset.docLocale!==language){setLanguage(language);return;}observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;applyLanguage();});});applyLanguage();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
