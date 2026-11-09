import messages from './i18n-messages.js?v=0.2.2-cm20261103-r2';
export const supportedLanguages=['zh','en'];
export function resolveLanguage(query='',stored=''){const q=new URLSearchParams(query).get('lang');return supportedLanguages.includes(q)?q:supportedLanguages.includes(stored)?stored:'zh';}
const dynamic=[
 [/^(.+) \/ (ACTUATOR PROFILE|PLATFORM PROFILE)$/,m=>translateText(m[1],'en')+' / '+m[2]],
 [/^(收藏|取消收藏) (.+)$/,m=>(m[1]==='收藏'?'Save ':'Remove from favorites: ')+m[2]],
 [/^([\d.≥≤<>≈–—]+) (个|指|组)$/,m=>m[1]+' '+({'个':'units','指':'fingers','组':'groups'}[m[2]])],
 [/^(.+) \/ (中国|美国|德国|瑞士|英国|韩国|意大利|加拿大|波兰)$/,m=>translateText(m[1],'en')+' / '+translateText(m[2],'en')],
 [/^([A-Za-z]+)(限定符|证据级别|条件|来源)$/,m=>m[1]+' '+({'限定符':'qualifier','证据级别':'evidence level','条件':'original conditions','来源':'source'}[m[2]])],
 [/^(\d+) 个待比较$/,m=>`${m[1]} selected`],
 [/^已选 (\d+) \/ 4$/,m=>`Selected ${m[1]} / 4`],
 [/^(\d+) 条配置记录$/,m=>`${m[1]} configuration records`],
 [/^(\d+(?:\/\d+)?) ?配置$/,m=>`${m[1]} variants`],
 [/^(\d+) 项已选$/,m=>`${m[1]} selected`],
 [/^(\d+) 项数值$/,m=>`${m[1]} metrics`],
 [/^(\d+)项数值证据$/,m=>`${m[1]} numeric evidence items`],
 [/^(\d+) 项已记录数值的详细出处$/,m=>`Detailed evidence for ${m[1]} recorded metrics`],
 [/^(\d+) 条记录$/,m=>`${m[1]} records`],
 [/^已导出 (\d+) 条记录，包含参数条件与来源$/,m=>`Exported ${m[1]} records with conditions and sources`],
 [/^已导出 (\d+) 条型号，包含参数条件与出处$/,m=>`Exported ${m[1]} variants with conditions and sources`],
 [/^已导出 (\d+) 条匹配配置，保留具体版本$/,m=>`Exported ${m[1]} matching configurations with version detail`],
 [/^搜索：(.*)$/,m=>`Search: ${m[1]}`],
 [/^查看 (.+) 详情$/,m=>`View ${translateText(m[1],'en')} profile`],
 [/^(移除|加入)(.+)参数对比$/,m=>`${m[1]==='加入'?'Add':'Remove'} ${translateText(m[2],'en')} ${m[1]==='加入'?'to':'from'} comparison`],
 [/^移除筛选 (.+)$/,m=>`Remove filter ${translateText(m[1],'en')}`],
 [/^资料核查 (.+)$/,m=>`Reviewed ${m[1]}`],
 [/^核查于 (.+)$/,m=>`Reviewed ${m[1]}`],
 [/^(质量|高度|自由度|移动速度|续航|减速比|公开载重|披露速度|续航下值|整机 \/ 双臂搬运负载|单臂负载|记录质量|机械自由度（含被动）|主动 \/ 独立驱动自由度) ([≥≤]) (.+)$/,m=>`${translateText(m[1],'en')} ${m[2]} ${m[3]}`],
 [/^(当前配置 \/ 资料版本|切换配置 \/ 资料版本) · (\d+) 条记录$/,m=>`${translateText(m[1],'en')} · ${m[2]} records`],
 [/^基底原始记录 · (.+)$/,m=>`Original reference record · ${m[1]}`]
];
const fragments={'额定 / 连续':'Rated / continuous','质量':'Mass','整机质量':'Robot mass','尺寸':'Dimensions','高度':'Height','续航':'Runtime','峰值':'Peak','堵转':'Stall','条记录':'records','配置记录':'configuration records','数值证据':'numeric evidence','关节 / 传动':'joints / transmissions','原始资料':'original sources'};
export function translateText(value,language='en'){
 const text=String(value??'');if(language!=='en')return text;
 const trimmed=text.trim();if(!trimmed)return text;
 const exact=messages[trimmed];if(exact!==undefined)return text.replace(trimmed,exact);
 for(const [pattern,fn]of dynamic){const match=trimmed.match(pattern);if(match)return text.replace(trimmed,fn(match));}
 // Split only on presentation separators. Untranslated source notes remain verbatim.
 if(/ · | ≥ | ≤ |：/.test(trimmed)){
  const pieces=trimmed.split(/( · | ≥ | ≤ |：)/);let changed=false;
  const result=pieces.map(x=>{const v=messages[x]||fragments[x];if(v){changed=true;return v;}return x==='：'?': ':x;}).join('');if(changed)return text.replace(trimmed,result);
 }
 const parenthesized=trimmed.match(/^(.+?) \(([^()]+)\)$/);if(parenthesized&&messages[parenthesized[1]])return text.replace(trimmed,messages[parenthesized[1]]+' ('+translateText(parenthesized[2],'en')+')');
 const unit=trimmed.match(/^(.+?)( (?:kg|N·m|m\/s|h|m|Wh|DOF|rpm|mm|V|A))$/);if(unit&&messages[unit[1]])return text.replace(trimmed,messages[unit[1]]+unit[2]);
 return text;
}
export function languageUrl(raw,language,base='https://atlas.example/'){const u=new URL(raw,base);u.searchParams.set('lang',supportedLanguages.includes(language)?language:'zh');return u;}
export function localizeCsv(csv,language){if(language!=='en')return csv;return csv.replace(/"((?:[^"]|"")*)"/g,(_,cell)=>'"'+translateText(cell.replaceAll('""','"'),'en').replaceAll('"','""')+'"');}
export {messages};
