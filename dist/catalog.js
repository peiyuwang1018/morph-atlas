import {translateText} from './i18n-core.js?v=0.2.2-cm20261103-r2';
const bilingualSearch=values=>values.flatMap(v=>[String(v??''),translateText(v,'en')]).join(' ').toLowerCase();
/** Pure catalogue logic. All filters operate on configuration records before family grouping. */
export function brandGroup(p){if(p.brand.startsWith('ODRI'))return 'ODRI';if(p.brand==='ETH / ANYbotics')return 'ANYbotics';return p.brand;}
export function familyKey(p){if(p.id==='AN-ORIG')return 'anymal-early';if(p.id==='AN-W')return 'anymal-wheeled';return brandGroup(p)+'::'+p.family;}
export function value(p,key){return p.metrics[key]?.value??null;}
export function speedValue(p){return value(p,'speedPeak')??value(p,'speed');}
export function isResearch(p){return /研究|开源/.test(p.phase)||['MIT','IIT','ETH Zurich','ETH / ANYbotics','ODRI','ODRI / MPI / NYU'].includes(p.brand);}
export const representativeIds=['UT-G24','BD-SP2','AN-D','UT-B2','MIT-MC','IIT-KYONW','UT-AS4','UT-A21','UT-G2W','UT-ASW2','UT-A2W1','UT-B2W','DR-M201','DR-X301','DR-L31','GH-V60','MIT-C3','OD-S12','AN-X0','UT-G13'];
export function filterRecords(records,state){
 const term=(state.query??'').trim().toLowerCase();
 return records.filter(p=>{
  if(state.brands?.size&&!state.brands.has(brandGroup(p)))return false;
  if(state.type&&state.type!=='all'&&p.type!==state.type)return false;
  if(state.categories?.size&&!state.categories.has(isResearch(p)?'research':'commercial'))return false;
  if(term&&!bilingualSearch([p.family,p.variant,p.brand,p.position,p.notes,p.id,p.access,p.type,...(p.aliases||[])]).includes(term))return false;
  for(const[key,num,op]of [['mass',state.massMin,'min'],['mass',state.massMax,'max'],['payload',state.payloadMin,'min'],['runtimeMin',state.runtimeMin,'min']]){
   if(num===null||num===undefined||num==='')continue;
   const n=value(p,key);if(n===null||(op==='min'?n<Number(num):n>Number(num)))return false;
  }
  if(state.speedMin!==null&&state.speedMin!==undefined&&state.speedMin!==''){const n=speedValue(p);if(n===null||n<Number(state.speedMin))return false;}
  return true;
 });
}
export function groupRecords(records,scope='families'){
 if(scope==='records')return records.map(p=>({record:p,variants:[p]}));
 const groups=new Map();for(const p of records){const key=familyKey(p);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
 return [...groups.values()].map(variants=>({record:representativeIds.map(id=>variants.find(p=>p.id===id)).find(Boolean)??variants[0],variants}));
}
export function sortItems(items,sort='featured'){
 const list=[...items];
 if(sort==='name')return list.sort((a,b)=>(a.record.family+' '+a.record.variant).localeCompare(b.record.family+' '+b.record.variant,'en'));
 const keys={massAsc:'mass',massDesc:'mass',payloadDesc:'payload',runtimeDesc:'runtimeMin'};
 if(keys[sort]||sort==='speedDesc')return list.sort((a,b)=>{const av=sort==='speedDesc'?speedValue(a.record):value(a.record,keys[sort]),bv=sort==='speedDesc'?speedValue(b.record):value(b.record,keys[sort]);if(av===null)return bv===null?0:1;if(bv===null)return-1;return sort==='massAsc'?av-bv:bv-av;});
 return list.sort((a,b)=>{const ai=representativeIds.indexOf(a.record.id),bi=representativeIds.indexOf(b.record.id);return(ai<0?999:ai)-(bi<0?999:bi);});
}
export function numberText(n){return n===null||n===undefined?'—':Number(n).toLocaleString('en-US',{maximumFractionDigits:3});}
export function boundText(m){if(!m)return '—';return(['>','≥','<','≤'].includes(m.qual)?m.qual:m.qual==='约'?'≈':'')+numberText(m.value);}
export function runtimeText(p){const lo=p.metrics.runtimeMin,hi=p.metrics.runtimeMax;if(!lo)return '—';return hi&&hi.value!==lo.value?`${numberText(lo.value)}–${numberText(hi.value)}`:boundText(lo);}

