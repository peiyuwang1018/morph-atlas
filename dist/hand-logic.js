import {translateText} from './i18n-core.js?v=0.2.2-cm20261103-r2';
const bilingualSearch=values=>values.flatMap(v=>[String(v??''),translateText(v,'en')]).join(' ').toLowerCase();
export const metricDefinitions={fingers:['手指数','指'],activeDof:['主动 / 独立驱动自由度','DOF'],mechanicalDof:['机械自由度（含被动）','DOF'],reportedDof:['厂商标称 DOF（定义待核）','DOF'],jointCount:['物理 / 运动关节数','个'],actuators:['驱动器 / 电机数','个'],massKg:['记录质量','kg'],lengthMm:['长度 / 高度','mm'],widthMm:['宽度','mm'],gripForceN:['抓握力','N'],fingertipForceN:['指尖力','N'],payloadKg:['抓持负载','kg'],repeatabilityMm:['重复精度','mm'],sensorCount:['触觉单元 / 触点数','个'],sensorGroupCount:['触觉传感器组数','组']};
export const metricValue=(p,k)=>Number.isFinite(p.metrics?.[k]?.value)?p.metrics[k].value:null;
export const formatMetric=m=>Number.isFinite(m?.value)?`${['≥','≤','<','>','±','≈'].includes(m.qual)?m.qual:m.qual==='约'?'≈':''}${m.value}`:'—';
export const isChina=p=>/中国|China/i.test(p.origin||'');
export const tactileLabels={yes:'标配触觉',optional:'可选 / 依版本',no:'无触觉',unknown:'触觉待核'};
const within=(v,min,max)=>min==null&&max==null||v!==null&&(min==null||v>=min)&&(max==null||v<=max);
export function filterHands(products,s={}){return products.filter(p=>{
 if(s.brands?.size&&!s.brands.has(p.brand))return false;
 if(s.origin&&s.origin!=='all'&&(s.origin==='china')!==isChina(p))return false;
 for(const key of ['status','category'])if(s[key]&&s[key]!=='all'&&p[key]!==s[key])return false;
 if(s.drive&&s.drive!=='all'&&p.driveGroup!==s.drive)return false;
 if(s.tactile&&s.tactile!=='all'&&(p.tactileStatus||'unknown')!==s.tactile)return false;
 if(s.fingers&&s.fingers!=='all'&&metricValue(p,'fingers')!==Number(s.fingers))return false;
 if(!within(metricValue(p,s.dofKind||'activeDof'),s.dofMin,s.dofMax))return false;
 if(!within(metricValue(p,'massKg'),null,s.massMax))return false;
 const terms=(s.query||'').trim().toLowerCase().split(/\s+/).filter(Boolean);
 const text=bilingualSearch([p.brand,p.model,p.origin,p.position,p.drive,p.transmission,p.notes,p.category,p.driveGroup,...(p.aliases||[]),JSON.stringify(p.research||[])]);
 return terms.every(t=>text.includes(t));
 });}
export function sortHands(ps,sort='featured'){const out=[...ps];if(sort==='name')out.sort((a,b)=>a.model.localeCompare(b.model));if(sort==='activeDesc'||sort==='massAsc'){const key=sort==='activeDesc'?'activeDof':'massKg';out.sort((a,b)=>{const x=metricValue(a,key),y=metricValue(b,key);return x===null?y===null?0:1:y===null?-1:sort==='activeDesc'?y-x:x-y;});}return out;}
export function csvForHands(ps,sources={}){const keys=Object.keys(metricDefinitions);const safe=v=>'"'+String(v??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';const rows=[['ID','品牌','型号','地区','类型','属性','驱动形式','传动','触觉配置','触觉说明',...keys.flatMap(k=>[metricDefinitions[k][0]+' ('+metricDefinitions[k][1]+')',k+'限定符',k+'条件',k+'来源']),'边界说明','原始资料']];for(const p of ps)rows.push([p.id,p.brand,p.model,p.origin,p.category,p.status,p.drive,p.transmission,tactileLabels[p.tactileStatus||'unknown'],p.tactile,...keys.flatMap(k=>[metricValue(p,k)??'',p.metrics[k]?.qual||'',p.metrics[k]?.condition||'',sources[p.metrics[k]?.source]?.url||p.metrics[k]?.source||'']),p.notes,(p.sourceIds||[]).map(id=>sources[id]?.url||id).join(' | ')]);return '\uFEFF'+rows.map(row=>row.map(safe).join(',')).join('\r\n');}
