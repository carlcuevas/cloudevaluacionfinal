const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
app.use(cors()); app.use(express.json());
const PORT = process.env.PORT || 3001;
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'alumno',
  password: process.env.DB_PASSWORD || 'alumno123',
  database: process.env.DB_NAME || 'tienda_vehiculos',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true, connectionLimit: 10, queueLimit: 0
};
const pool = mysql.createPool(dbConfig);
app.get('/api/health', async (req, res) => {
  try { const c = await pool.getConnection(); await c.ping(); c.release();
    res.json({ status:'ok', db:'connected', host:dbConfig.host, timestamp:new Date().toISOString() });
  } catch (e) { res.status(503).json({ status:'degraded', db:'unreachable', error:e.message }); }
});
app.get('/api/vehiculos', async (req, res) => {
  try { const { marca, categoria } = req.query;
    let sql='SELECT * FROM vehiculos WHERE 1=1'; const p=[];
    if(marca){sql+=' AND marca=?';p.push(marca);} if(categoria){sql+=' AND categoria=?';p.push(categoria);}
    sql+=' ORDER BY marca, modelo'; const [rows]=await pool.query(sql,p); res.json(rows);
  } catch(e){ res.status(500).json({error:'Error al consultar vehículos'}); }
});
app.get('/api/vehiculos/:id', async (req,res)=>{ try{
  const [r]=await pool.query('SELECT * FROM vehiculos WHERE id=?',[req.params.id]);
  if(!r.length) return res.status(404).json({error:'No encontrado'}); res.json(r[0]);
}catch(e){res.status(500).json({error:'Error'});}});
app.get('/api/marcas', async (req,res)=>{ try{
  const [r]=await pool.query('SELECT DISTINCT marca FROM vehiculos ORDER BY marca');
  res.json(r.map(x=>x.marca));
}catch(e){res.status(500).json({error:'Error'});}});
app.get('/api/stress',(req,res)=>{ const ms=Math.min(Number(req.query.ms)||200,5000);
  const end=Date.now()+ms; let x=0; while(Date.now()<end){x+=Math.sqrt(Math.random()*999999);}
  res.json({done:true,burned_ms:ms,checksum:x});});
app.listen(PORT,'0.0.0.0',()=>console.log('Backend en puerto '+PORT+' -> '+dbConfig.host));
