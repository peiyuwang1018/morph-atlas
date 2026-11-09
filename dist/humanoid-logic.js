import {translateText} from './i18n-core.js?v=0.2.2-cm20261103-r2';
const bilingualSearch=values=>values.flatMap(v=>[String(v??''),translateText(v,'en')]).join(' ').toLowerCase();
export const metricDefinitions={heightM:['高度','m'],massKg:['整机质量','kg'],dof:['全身自由度','DOF'],speedMps:['披露移动速度','m/s'],runtimeH:['披露续航','h'],payloadKg:['整机 / 双臂搬运负载','kg'],singleArmPayloadKg:['单臂负载','kg'],peakJointTorqueNm:['最大关节峰值扭矩','N·m'],batteryWh:['电池能量','Wh']};
export const regionLabels={china:'中国',europe:'欧洲','north-america':'北美','asia-other':'亚洲其他',unknown:'待核'};
export function getMetric(p,k,scope='primary'){if(p.metrics?.[k])return p.metrics[k];if(scope==='includeBase'&&p.baseline?.metrics?.[k])return {...p.baseline.metrics[k],evidence:'secondary'};return null;}
export const metricValue=(p,k,scope='primary')=>getMetric(p,k,scope)?.value??null;
export const formatMetric=m=>Number.isFinite(m?.value)?`${['≥','≤','<','>','±','≈'].includes(m.qual)?m.qual:m.qual==='约'?'≈':''}${Number(m.value.toFixed(3))}`:'—';
export const hasPrimary=p=>(p.sourceIds||[]).some(id=>!id.startsWith('HI-'));
const within=(v,min,max)=>min==null&&max==null||v!==null&&(min==null||v>=min)&&(max==null||v<=max);
export function filterHumanoids(ps,s={}){return ps.filter(p=>{
 if(s.brands?.size&&!s.brands.has(p.brand))return false;
 for(const k of ['region','form','stage'])if(s[k]&&s[k]!=='all'&&p[k]!==s[k])return false;
 if(s.proof==='primary'&&!hasPrimary(p)||s.proof==='pending'&&hasPrimary(p))return false;
 const value=k=>metricValue(p,k,s.scope);
 if(!within(value('heightM'),s.heightMin,s.heightMax)||!within(value('massKg'),null,s.massMax)||!within(value('dof'),s.dofMin,null)||!within(value(s.payloadKind||'payloadKg'),s.payloadMin,null)||!within(value('runtimeH'),s.runtimeMin,null)||!within(value('speedMps'),s.speedMin,null))return false;
 const text=bilingualSearch([p.brand,p.model,p.origin,p.position,p.actuation,p.notes,p.form,p.stage,...(p.baselineNames||[]),...(p.aliases||[])]);
 return (s.query||'').trim().toLowerCase().split(/\s+/).filter(Boolean).every(t=>text.includes(t));
 });}
export function sortHumanoids(ps,sort='featured',scope='primary'){const out=[...ps];if(sort==='name')out.sort((a,b)=>a.model.localeCompare(b.model));if(['heightAsc','massAsc','dofDesc'].includes(sort)){const key={heightAsc:'heightM',massAsc:'massKg',dofDesc:'dof'}[sort];out.sort((a,b)=>{const x=metricValue(a,key,scope),y=metricValue(b,key,scope);return x===null?y===null?0:1:y===null?-1:sort==='dofDesc'?y-x:x-y;});}return out;}
export function csvForHumanoids(ps,sources={},scope='primary'){const keys=Object.keys(metricDefinitions);const safe=v=>'"'+String(v??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';const rows=[['ID','厂商','型号/版本','国家','地区','形态','获取/部署状态','参数视图',...keys.flatMap(k=>[metricDefinitions[k][0]+' ('+metricDefinitions[k][1]+')',k+'限定符',k+'证据级别',k+'条件',k+'来源']),'使用边界','基底原始条目']];for(const p of ps)rows.push([p.id,p.brand,p.model,p.origin,regionLabels[p.region],p.form,p.stage,scope==='primary'?'仅一手参数':'一手优先，缺失项含基底待核',...keys.flatMap(k=>{const m=getMetric(p,k,scope);return [m?.value??'',m?.qual||'',m?m.evidence==='secondary'?'基底待核':'一手资料':'',m?.condition||'',sources[m?.source]?.url||''];}),p.notes,p.baseline?.url||'']);return '\uFEFF'+rows.map(row=>row.map(safe).join(',')).join('\r\n');}
