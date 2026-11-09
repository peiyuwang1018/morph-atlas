/* Apply saved appearance before styles paint; catalogue state stays independent. */
(() => {
 const key='atlas-appearance-v2',colors=['blue','red','green','yellow'];
 const read=raw=>{try{const value=JSON.parse(raw||'{}');return {color:colors.includes(value?.color)?value.color:'blue',mode:value?.mode==='dark'?'dark':'light'};}catch{return {color:'blue',mode:'light'};}};
 let saved='';try{saved=localStorage.getItem(key)||'';}catch{}
 let state=read(saved),picker;
 function apply(){
  const root=document.documentElement;root.dataset.theme=state.color;root.dataset.mode=state.mode;root.style.colorScheme=state.mode;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=state.mode==='dark'?'#1b2026':'#f6f7f8';
 }
 apply();
 const icons={palette:'<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2a8 8 0 1 0 0 16h1a2 2 0 0 0 1.5-3.3.9.9 0 0 1 .7-1.5H15a3 3 0 0 0 3-3A8.2 8.2 0 0 0 10 2Z" stroke="currentColor" stroke-width="1.4"/><circle cx="5.7" cy="8" r="1" fill="currentColor"/><circle cx="9" cy="5.5" r="1" fill="currentColor"/><circle cx="13" cy="6" r="1" fill="currentColor"/><circle cx="5.8" cy="12" r="1" fill="currentColor"/></svg>',chevron:'<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
 const copy={zh:{theme:'主题',settings:'外观设置',remember:'自动记忆选择',color:'主题色',blue:'蓝色',red:'红色',green:'绿色',yellow:'黄色',night:'暗夜模式',nightHint:'深灰黑背景，柔和对比',open:'选择主题'},en:{theme:'Theme',settings:'Appearance',remember:'Preferences saved',color:'Accent color',blue:'Blue',red:'Red',green:'Green',yellow:'Yellow',night:'Dark mode',nightHint:'Charcoal background, softer contrast',open:'Choose theme'}};
 function labels(){
  if(!picker)return;const text=copy[document.documentElement.lang==='en'?'en':'zh'];
  picker.querySelectorAll('[data-theme-label]').forEach(el=>el.textContent=text[el.dataset.themeLabel]);
  const toggle=picker.querySelector('.theme-trigger');toggle.setAttribute('aria-label',text.open);toggle.title=text.open;
  picker.querySelector('.theme-current').textContent=text[state.color];
  picker.querySelectorAll('input[name="atlasTheme"]').forEach(el=>el.checked=el.value===state.color);
  picker.querySelector('#themeNight').checked=state.mode==='dark';
 }
 function set(next){state=next;apply();try{localStorage.setItem(key,JSON.stringify(state));}catch{}labels();document.dispatchEvent(new CustomEvent('atlas:appearancechange',{detail:{...state}}));}
 function close(restore=false){if(!picker)return;const trigger=picker.querySelector('.theme-trigger');picker.querySelector('.theme-panel').hidden=true;trigger.setAttribute('aria-expanded','false');if(restore)trigger.focus();}
 function mount(){
  apply();
  const right=document.querySelector('#siteHeader .header-right');if(!right||right.querySelector('.theme-picker'))return;
  picker=document.createElement('div');picker.className='theme-picker';picker.setAttribute('data-no-translate','');
  picker.innerHTML=`<button type="button" class="theme-trigger" aria-expanded="false" aria-controls="appearancePanel">${icons.palette}<span data-theme-label="theme"></span><i class="theme-current-dot" aria-hidden="true"></i><span class="theme-current"></span><span class="theme-chevron">${icons.chevron}</span></button><div class="theme-panel" id="appearancePanel" hidden><div class="theme-panel-title"><strong data-theme-label="settings"></strong><small data-theme-label="remember"></small></div><fieldset><legend data-theme-label="color"></legend><div class="theme-swatches">${colors.map(color=>`<label class="theme-choice" data-color="${color}"><input type="radio" name="atlasTheme" value="${color}"><span class="theme-swatch" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="m4 8 2.5 2.5L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span data-theme-label="${color}"></span></label>`).join('')}</div></fieldset><label class="theme-night-row" for="themeNight"><span><strong data-theme-label="night"></strong><small data-theme-label="nightHint"></small></span><input type="checkbox" role="switch" id="themeNight"><span class="theme-switch" aria-hidden="true"></span></label></div>`;
  right.prepend(picker);labels();
  picker.querySelector('.theme-trigger').addEventListener('click',()=>{const panel=picker.querySelector('.theme-panel');panel.hidden=!panel.hidden;picker.querySelector('.theme-trigger').setAttribute('aria-expanded',String(!panel.hidden));});
  picker.addEventListener('change',event=>{const input=event.target;if(input.name==='atlasTheme')set({...state,color:input.value});else if(input.id==='themeNight')set({...state,mode:input.checked?'dark':'light'});});
  document.addEventListener('click',event=>{if(!picker.contains(event.target))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!picker.querySelector('.theme-panel').hidden){event.preventDefault();close(true);}});
 }
 document.addEventListener('atlas:languagechange',labels);
 window.addEventListener('storage',event=>{if(event.key===key){state=read(event.newValue);apply();labels();}});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
