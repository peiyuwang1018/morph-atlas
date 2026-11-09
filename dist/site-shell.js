import {applyLanguage} from './i18n.js?v=morph-20261109';
export const SITE_TITLE='MorphAtlas';
export const SITE_VERSION='v0.2.2';
const section=document.body.dataset.section||'actuators';
const nav=[['actuators','./','关节驱动器'],['quadrupeds','quadrupeds.html','四足机器人'],['humanoids','humanoids.html','人形机器人'],['arms','arms.html','机械臂'],['hands','hands.html','灵巧手']];
const mark='<svg class="brand-mark" width="37" height="37" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#20342e"/><circle cx="20" cy="20" r="10" stroke="#d8e6dd" stroke-width="1.5"/><circle cx="20" cy="20" r="4" stroke="#d9a574" stroke-width="2"/><path d="M20 5v5m0 20v5M5 20h5m20 0h5" stroke="#d8e6dd" stroke-width="2"/></svg>';
const target=document.querySelector('#siteHeader');
if(target)target.innerHTML=`<a class="brand atlas-brand" href="./" aria-label="${SITE_TITLE}首页">${mark}<span data-no-translate>${SITE_TITLE}<em class="site-release">${SITE_VERSION}</em><small>Robot Body Catalogue</small></span></a><nav class="top-nav atlas-nav" aria-label="本体图鉴分栏">${nav.map(([key,url,label])=>`<a href="${url}" class="${key===section?'active':''}" ${key===section?'aria-current="page"':''}>${label}${key==='quadrupeds'?'<span id="navCount" class="nav-count">61</span>':''}${['arms'].includes(key)?'<i class="nav-pending">筹备</i>':''}</a>`).join('')}</nav><div class="header-right"><div class="language-switch" role="group" aria-label="Language / 语言" data-no-translate><button type="button" data-language="zh" lang="zh-CN" aria-label="切换到中文" aria-pressed="true">中文</button><button type="button" data-language="en" lang="en" aria-label="Switch to English" aria-pressed="false">EN</button></div><button type="button" id="methodButton" class="header-method">指标口径</button>${['actuators','quadrupeds','humanoids','hands'].includes(section)?'<button type="button" class="button button-outline" id="exportButton" aria-label="导出结果">↓ <span class="export-label">导出</span></button>':''}</div>`;
if(['arms'].includes(section))document.querySelector('#methodButton')?.addEventListener('click',()=>location.href='docs/handoff.html');


const main=document.querySelector('main');if(main){const note=document.createElement('p');note.className='language-source-note';note.textContent='Interface and catalogue summaries are translated. Source-specific notes, original documents and research data retain their original language.';note.hidden=true;main.prepend(note);}
applyLanguage();
