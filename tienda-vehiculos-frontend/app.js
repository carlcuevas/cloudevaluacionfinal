const fmtCLP=new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});
async function checkStatus(){const el=document.getElementById('status');try{
const r=await fetch('/api/health');const d=await r.json();
if(d.status==='ok'){el.textContent='● Backend OK · BD conectada';el.style.color='#7CFC9A';}
else{el.textContent='● Backend arriba · BD no disponible';el.style.color='#f5b301';}
}catch{el.textContent='● Sin conexión al backend';el.style.color='#ff6b6b';}}
async function cargarMarcas(){try{const r=await fetch('/api/marcas');const m=await r.json();
const s=document.getElementById('filtroMarca');m.forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x;s.appendChild(o);});}catch(e){}}
async function cargarVehiculos(){
const marca=document.getElementById('filtroMarca').value;
const categoria=document.getElementById('filtroCategoria').value;
const p=new URLSearchParams();if(marca)p.append('marca',marca);if(categoria)p.append('categoria',categoria);
const c=document.getElementById('catalogo');const msg=document.getElementById('msg');
msg.textContent='';c.innerHTML='Cargando...';
try{const r=await fetch('/api/vehiculos?'+p.toString());if(!r.ok)throw new Error('HTTP '+r.status);
const data=await r.json();c.innerHTML='';
if(!data.length){msg.textContent='No hay vehículos que coincidan.';return;}
data.forEach(v=>{const sb=v.stock<=2?'bajo':'';const card=document.createElement('div');card.className='card';
card.innerHTML='<div class="banner">🚙</div><div class="body"><div class="marca">'+v.marca+'</div>'+
'<h3>'+v.modelo+' ('+v.anio+')</h3><div class="precio">'+fmtCLP.format(v.precio)+'</div>'+
'<div class="tags"><span class="tag">'+v.categoria+'</span><span class="tag">'+v.transmision+'</span><span class="tag">'+v.combustible+'</span></div>'+
'<div class="stock '+sb+'">'+(v.stock>0?'Stock: '+v.stock+' unidad(es)':'Sin stock')+'</div></div>';
c.appendChild(card);});
}catch(e){c.innerHTML='';msg.textContent='Error al cargar: '+e.message;}}
checkStatus();cargarMarcas();cargarVehiculos();setInterval(checkStatus,15000);
