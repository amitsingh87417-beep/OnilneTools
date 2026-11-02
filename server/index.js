import express from 'express';
const app = express();
app.use(express.json({limit:'1mb'}));
const allowedOrigin = process.env.FRONTEND_ORIGIN || '';
app.use((req,res,next)=>{
  const origin=req.headers.origin;
  if(!allowedOrigin || origin===allowedOrigin || origin?.startsWith('http://localhost:')) res.setHeader('Access-Control-Allow-Origin',origin||'*');
  res.setHeader('Vary','Origin');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.sendStatus(204);
  next();
});
const hits=new Map();
app.use('/api/ai',(req,res,next)=>{
  const ip=req.headers['x-forwarded-for']?.split(',')[0]||req.socket.remoteAddress||'unknown';
  const now=Date.now(),entry=hits.get(ip)||{start:now,count:0};
  if(now-entry.start>60_000){entry.start=now;entry.count=0;}
  entry.count++;hits.set(ip,entry);
  if(entry.count>20)return res.status(429).json({error:'Rate limit reached. Please wait a minute and try again.'});
  next();
});
app.get('/api/health', (_req,res)=>res.json({ok:true,service:'100K Tools Universe API',version:'3.0.0'}));
app.post('/api/ai', async (req,res)=>{
  try {
    const key=process.env.OPENAI_API_KEY;
    if(!key) return res.status(503).json({error:'AI is not configured yet. Add OPENAI_API_KEY to the Render environment.'});
    const prompt=String(req.body?.prompt||'').trim();
    if(!prompt || prompt.length>12000) return res.status(400).json({error:'Enter a prompt up to 12,000 characters.'});
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',input:prompt,max_output_tokens:1200})});
    const data=await response.json();
    if(!response.ok) return res.status(response.status).json({error:data.error?.message||'AI request failed.'});
    const output=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n');
    res.json({output:output||'No text response was returned.'});
  } catch { res.status(500).json({error:'Server could not complete the AI request.'}); }
});
const port=process.env.PORT||3001;
app.listen(port,()=>console.log(`100K Tools API listening on ${port}`));
