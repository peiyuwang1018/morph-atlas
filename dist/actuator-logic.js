import {translateText} from './i18n-core.js?v=0.2.2-cm20261103-r2';
const bilingualSearch=values=>values.flatMap(v=>[String(v??''),translateText(v,'en')]).join(' ').toLowerCase();
/** Metric semantics remain explicit: peak and stall torque never substitute rated torque. */
export const metricDefinitions={ratedPower:['厂商额定功率','W'],backdriveTorque:['反驱扭矩','N·m'],backlashArcmin:['回程间隙','arcmin'],kv:['电机 KV','rpm/V'],hollowBoreMm:['中空孔径','mm'],ratedTorque:['额定输出扭矩','N·m'],peakTorque:['峰值输出扭矩','N·m'],stallTorque:['堵转输出扭矩','N·m'],ratio:['减速比',':1'],massKg:['记录对象质量','kg'],voltage:['额定 / 测试电压','V'],ratedRpm:['额定输出转速','rpm'],noLoadRpm:['空载输出转速','rpm'],peakRpm:['最大输出转速','rpm'],diameterMm:['外径 / 宽度','mm'],lengthMm:['轴向长度 / 高度','mm'],encoderInputBits:['输入端编码器','bit'],encoderOutputBits:['输出端编码器','bit'],ratedCurrent:['额定电流','A'],peakCurrent:['峰值电流','A']};
export const parameterSide=p=>p.parameterSide||(p.integration==='motor'?'motor':'output');
export const integrationLabel=p=>({motor:'电机本体（轴端）',geared:'电机＋减速器（输出端）',module:parameterSide(p)==='motor'?'含驱动直驱单元（轴端）':'完整驱动模组（输出端）'}[p.integration||'module']||'集成层级待核');
export const driverLabel=p=>({yes:'含驱动器',no:'外配驱动器',optional:'驱动器可选',unknown:'驱动器状态待核'}[p.driverIncluded||'unknown']);
export const metricValue=(p,key)=>Number.isFinite(p.metrics?.[key]?.value)?p.metrics[key].value:null;
export function formatMetric(m){if(!m||!Number.isFinite(m.value))return '—';const q={'约':'≈','>=':'≥','<=':'≤'}[m.qual]??(['>','<','≥','≤','≈'].includes(m.qual)?m.qual:'');return q+m.value.toLocaleString('en-US',{maximumFractionDigits:6});}
export function filterActuators(records,s={}){const term=(s.query??'').trim().toLowerCase();return records.filter(p=>{
 if(s.integration&&s.integration!=='all'&&(p.integration||'module')!==s.integration)return false;
 if(s.family&&s.family!=='all'&&p.productFamily!==s.family)return false;
 if(s.driver&&s.driver!=='all'&&(p.driverIncluded||'unknown')!==s.driver)return false;
 if(s.europeOnly&&!p.europeResearch)return false;
 if(s.brands?.size&&!s.brands.has(p.brand))return false;
 if(s.categories?.size&&!s.categories.has(p.category))return false;
 if(s.encoder&&s.encoder!=='all'&&p.encoder!==s.encoder)return false;
 if(term&&!bilingualSearch([p.model,p.brand,p.series,p.id,p.position,p.encoderDetail,p.notes,p.origin,p.category,p.encoder,p.adoption?.summary,...(p.aliases??[]),...(p.robotProducts??[]).map(r=>typeof r==='string'?r:r.name)]).includes(term))return false;
 for(const [key,limit,comparison]of [[s.torqueKind||'ratedTorque',s.torqueMin,'min'],[s.torqueKind||'ratedTorque',s.torqueMax,'max'],['ratio',s.ratioMin,'min'],['ratio',s.ratioMax,'max'],['massKg',s.massMax,'max'],['ratedPower',s.powerMin,'min'],['ratedPower',s.powerMax,'max'],['ratedRpm',s.rpmMin,'min'],['ratedRpm',s.rpmMax,'max']]){
  if(limit===null||limit===undefined||limit==='')continue;const n=metricValue(p,key);if(n===null||(comparison==='min'?n<Number(limit):n>Number(limit)))return false;
 }
 return true;
});}
export function sortActuators(records,sort='featured'){
 const result=[...records];if(sort==='name')return result.sort((a,b)=>a.model.localeCompare(b.model));
 const keys={ratedDesc:'ratedTorque',peakDesc:'peakTorque',massAsc:'massKg',ratioAsc:'ratio'};
 if(keys[sort])return result.sort((a,b)=>{const x=metricValue(a,keys[sort]),y=metricValue(b,keys[sort]);if(x===null)return y===null?0:1;if(y===null)return-1;return sort.endsWith('Asc')?x-y:y-x;});
 // Interleave brands for a useful overview instead of presenting one catalogue first.
 const groups=new Map();for(const p of result){if(!groups.has(p.brand))groups.set(p.brand,[]);groups.get(p.brand).push(p);}
 const out=[];while([...groups.values()].some(g=>g.length))for(const group of groups.values())if(group.length)out.push(group.shift());return out;
}
export function csvForActuators(records){const keys=Object.keys(metricDefinitions);const headers=['ID','品牌','型号','类别','编码器方案','编码器说明','集成层级','参数端口','驱动器配置','产品系列','品牌地区','供货状态','科研采用',...keys.map(k=>metricDefinitions[k].join('_')),'通讯','机器人关联','参数条件与出处'];const rows=records.map(p=>[p.id,p.brand,p.model,p.category,p.encoder,p.encoderDetail,integrationLabel(p),parameterSide(p)==='motor'?'电机轴端':'减速器输出端',driverLabel(p),p.productFamily||p.series,p.origin,p.availability,p.adoption?.summary,...keys.map(k=>metricValue(p,k)),(p.protocol??[]).join(';'),(p.robotProducts??[]).map(r=>typeof r==='string'?r:r.name+' ['+r.status+']').join(';'),Object.entries(p.metrics).map(([k,m])=>`${metricDefinitions[k]?.[0]??k}: ${m.qual??''} ${m.condition??''} [${m.source}${m.page?' PDF p.'+m.page:''}]`).join(' | ')]);const safe=v=>{const t=String(v??'');return /^[=+@-]/.test(t)?'\''+t:t;};return '\uFEFF'+[headers,...rows].map(r=>r.map(v=>'"'+safe(v).replaceAll('"','""')+'"').join(',')).join('\r\n');}
