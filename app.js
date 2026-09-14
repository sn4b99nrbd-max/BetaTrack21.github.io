// Configuration Supabase à renseigner pour activer les contenus en ligne.
const SUPABASE_URL=''; const SUPABASE_ANON_KEY='';
const LEBONCOIN_URL='#';
const sb=(SUPABASE_URL&&SUPABASE_ANON_KEY)?window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;
const $=s=>document.querySelector(s); const menu=$('#menu');
$('#menuBtn').onclick=()=>menu.classList.toggle('open');
menu.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{menu.classList.remove('open');document.getElementById(b.dataset.go).scrollIntoView({behavior:'smooth'})});
$('#lbc').href=LEBONCOIN_URL;
function card(x,type){if(type==='tuto')return `<article class="card"><video controls src="${x.video_url}"></video><div class="cardBody"><h3>${esc(x.title)}</h3><p>${esc(x.description||'')}</p></div></article>`;return `<article class="card">${x.image_url?`<img src="${x.image_url}" alt="">`:''}<div class="cardBody"><h3>${esc(x.title)}</h3><p>${esc(x.description||'')}</p>${x.price!=null?`<div class="price">${x.price} €</div>`:''}</div></article>`}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
async function load(){if(!sb)return;let {data:p}=await sb.from('pieces').select('*').order('created_at',{ascending:false});let {data:s}=await sb.from('services').select('*').order('created_at',{ascending:false});let {data:t}=await sb.from('tutos').select('*').order('created_at',{ascending:false});if(p?.length)$('#piecesGrid').innerHTML=p.map(x=>card(x,'piece')).join('');if(s?.length)$('#servicesGrid').innerHTML=s.map(x=>card(x,'service')).join('');if(t?.length)$('#tutosGrid').innerHTML=t.map(x=>card(x,'tuto')).join('')}
load();
