(function(){
const C=window.SITE_CONFIG,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const waLink=t=>`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* links centralizados */
$$('[data-wa]').forEach(a=>{a.href=waLink(a.dataset.wa);a.target='_blank';a.rel='noopener'});
['#igBtn','#igFoot'].forEach(s=>{const a=$(s);if(a)a.href=C.instagram});

/* sobre */
$('#aboutPhoto').src=C.about.photo;$('#aboutTitle').textContent=C.about.title;
$('#aboutText').innerHTML=C.about.text.map(t=>`<p>${esc(t)}</p>`).join('');
$('#aboutChips').innerHTML=C.about.highlights.map(t=>`<li>${esc(t)}</li>`).join('');

/* header, menu, progresso */
const header=$('#header'),nav=$('#nav'),burger=$('#burger'),bar=$('.progress i');
const setMenu=o=>{nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')};
burger.onclick=()=>setMenu(!nav.classList.contains('open'));
nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
const secs=$$('main section[id]'),links=$$('.nav a:not(.btn)');
function onScroll(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  header.classList.toggle('solid',y>40);
  bar.style.width=(h>0?y/h*100:0)+'%';
  let cur='';secs.forEach(s=>{if(s.offsetTop-120<=y)cur=s.id});
  links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));
  if(!reduce)$$('.parallax').forEach(p=>{const r=p.parentElement.getBoundingClientRect();p.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*-.12}px)`});
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* reveal */

/* vídeos: respeita movimento reduzido e economia de dados */
const saver=reduce||(navigator.connection&&navigator.connection.saveData);
const hv=$('#heroVideo');if(saver){hv.removeAttribute('autoplay');hv.pause();hv.style.display='none'}
const pv=$('#procVideo');
if(!saver){new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){pv.querySelectorAll('source').forEach(s=>s.src=s.dataset.src);pv.load();pv.play().catch(()=>{});o.disconnect()}},{rootMargin:'200px'}).observe(pv)}else pv.style.display='none';

/* portfólio */
const items=C.portfolio;let view=[],idx=0;
const cats=['Todos',...C.categories.filter(c=>items.some(i=>i.category===c))];
const filters=$('#filters'),gal=$('#gallery');
filters.innerHTML=cats.map((c,i)=>`<button role="tab" aria-selected="${i===0}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
gal.innerHTML=items.map((it,i)=>`<button class="card" data-i="${i}" data-c="${esc(it.category)}" aria-label="Ampliar: ${esc(it.title)}"><img src="${esc(it.type==='video'?it.poster:it.src)}" alt="${esc(it.title)}" loading="lazy">${it.type==='video'?'<span class="play"></span>':''}<span class="cap">${esc(it.title)}</span></button>`).join('');
filters.onclick=e=>{const b=e.target.closest('button');if(!b)return;
  $$('#filters button').forEach(x=>x.setAttribute('aria-selected',x===b));
  $$('.card').forEach(c=>c.classList.toggle('hide',b.dataset.c!=='Todos'&&c.dataset.c!==b.dataset.c))};

/* lightbox */
const lb=$('#lightbox'),media=$('#lbMedia'),cap=$('#lbCap');let lastFocus;
function show(){
  const it=items[view[idx]];
  media.innerHTML=it.type==='video'?`<video src="${esc(it.src)}" poster="${esc(it.poster||'')}" controls autoplay playsinline></video>`:`<img src="${esc(it.src)}" alt="${esc(it.title)}">`;
  cap.innerHTML=`${esc(it.title)}<small>${esc(it.category)}${it.desc?' · '+esc(it.desc):''}</small>`;
}
function openLb(i){lastFocus=document.activeElement;view=$$('.card:not(.hide)').map(c=>+c.dataset.i);idx=view.indexOf(i);lb.hidden=false;document.body.style.overflow='hidden';show();$('#lbClose').focus()}
function closeLb(){lb.hidden=true;media.innerHTML='';document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
const step=d=>{idx=(idx+d+view.length)%view.length;show()};
gal.onclick=e=>{const c=e.target.closest('.card');if(c)openLb(+c.dataset.i)};
$('#lbClose').onclick=closeLb;$('#lbPrev').onclick=()=>step(-1);$('#lbNext').onclick=()=>step(1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)step(d>0?-1:1)});

/* estilos + formulário */
const sel=$('#f-estilo');
sel.innerHTML='<option value="">Selecione</option>'+C.styles.map(s=>`<option>${esc(s.id)}</option>`).join('')+'<option>Outro / ainda não sei</option>';
$('#styleGrid').innerHTML=C.styles.map(s=>`<article class="scard reveal"><img src="${esc(s.image)}" alt="Exemplo de ${esc(s.id)}" loading="lazy"><h3>${esc(s.id)}</h3><p>${esc(s.text)}</p><button class="btn btn-sm" data-style="${esc(s.id)}">Orçamento neste estilo</button></article>`).join('');
$('#styleGrid').addEventListener('click',e=>{const b=e.target.closest('[data-style]');if(!b)return;sel.value=b.dataset.style;$('#agendamento').scrollIntoView({behavior:reduce?'auto':'smooth'});setTimeout(()=>$('#f-nome').focus({preventScroll:true}),600)});
$('#f-data').min=new Date().toISOString().slice(0,10);

const form=$('#quoteForm'),modal=$('#confirm');
const rules={nome:v=>v.trim().length>=2||'Informe seu nome.',wpp:v=>v.replace(/\D/g,'').length>=10||'Informe um WhatsApp com DDD.',estilo:v=>!!v||'Escolha um estilo.',regiao:v=>v.trim().length>=2||'Informe a região do corpo.',tamanho:v=>v.trim().length>=1||'Informe o tamanho aproximado.',ideia:v=>v.trim().length>=10||'Descreva sua ideia em pelo menos 10 caracteres.',ref:v=>!v||/^https?:\/\/\S+\.\S+/.test(v)||'Use um link completo, começando com https://'};
function check(el){const r=rules[el.name];if(!r)return true;const m=r(el.value),f=el.closest('.field');f.classList.toggle('bad',m!==true);f.querySelector('.err').textContent=m===true?'':m;el.setAttribute('aria-invalid',m!==true);return m===true}
form.addEventListener('blur',e=>{if(e.target.name)check(e.target)},true);
form.addEventListener('submit',e=>{e.preventDefault();
  const bad=[...form.elements].filter(el=>el.name&&!check(el));
  if(bad.length){bad[0].focus();return}
  const d=Object.fromEntries(new FormData(form));
  const dt=d.data?d.data.split('-').reverse().join('/'):'Sem preferência';
  const msg=`Olá, Corleone! Vim pelo site e quero um orçamento.\n\n*Nome:* ${d.nome.trim()}\n*WhatsApp:* ${d.wpp.trim()}\n*Estilo:* ${d.estilo}\n*Região do corpo:* ${d.regiao.trim()}\n*Tamanho aproximado:* ${d.tamanho.trim()}\n*Preferência de data:* ${dt}\n*Ideia:* ${d.ideia.trim()}\n*Referência:* ${d.ref||'Não informada'}`;
  $('#cfText').textContent=msg;$('#cfSend').href=waLink(msg);modal.hidden=false;document.body.style.overflow='hidden';$('#cfSend').focus()});
const closeModal=()=>{modal.hidden=true;document.body.style.overflow=''};
$('#cfEdit').onclick=closeModal;$('#cfSend').addEventListener('click',()=>setTimeout(closeModal,300));
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});

/* contato: só mostra o que foi informado */
const rows=[['WhatsApp','<a href="#" data-wa="Olá, Corleone!">'+esc(C.whatsapp.replace(/^55(\d\d)(\d{5})(\d{4})$/,'($1) $2-$3'))+'</a>'],['Instagram',`<a href="${esc(C.instagram)}" target="_blank" rel="noopener">${esc(C.instagramHandle)}</a>`]];
if(C.contact.address)rows.push(['Endereço',esc(C.contact.address)]);
if(C.contact.hours)rows.push(['Horários',esc(C.contact.hours)]);
$('#contactList').innerHTML=`<li><span>Nome artístico</span>${esc(C.brand.name)}</li>`+rows.map(r=>`<li><span>${r[0]}</span>${r[1]}</li>`).join('');
$$('#contactList [data-wa]').forEach(a=>{a.href=waLink(a.dataset.wa);a.target='_blank';a.rel='noopener'});
if(C.contact.mapEmbed){const m=$('#mapBox');m.hidden=false;m.innerHTML=`<iframe src="${esc(C.contact.mapEmbed)}" loading="lazy" title="Mapa do estúdio"></iframe>`}
/* reveal (depois de montar todo o conteúdo dinâmico) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.05});
$$('.reveal').forEach(el=>io.observe(el));
setTimeout(()=>$$('.reveal:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in')}),1500);
})();
