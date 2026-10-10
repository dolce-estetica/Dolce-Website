const {chromium}=require(process.env.PLAYWRIGHT_MODULE);const fs=require('node:fs');const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://localhost:3107';const out=process.env.QA_OUT||'/tmp/dolce-oct10-local';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const checks=[];const errors=[];p.on('pageerror',e=>errors.push(e.message));
for(const slug of ['hydrafacial','glutathione-treatment','vaser-liposuction','dermatology-clinic','hair-treatment','skin-treatments','laser-hair-removal']){
 for(const width of [390,1440]){
  await p.setViewportSize({width,height:900});const r=await p.goto(base+'/'+slug,{waitUntil:'load'});assert.equal(r.status(),200);
  for(const img of await p.locator('#results img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode())}
  await p.locator('.lp-results-track').evaluate(e=>e.scrollTo({left:0,behavior:'instant'}));await p.waitForFunction(()=>document.querySelector('.lp-results-track').scrollLeft<=2);
  const count=await p.locator('.lp-result-card').count();
  const facts=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.querySelectorAll('#results img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,fit:getComputedStyle(i).objectFit,frameRatio:i.parentElement.clientWidth/i.parentElement.clientHeight})),cards:[...document.querySelectorAll('.lp-result-card')].map(c=>({height:c.clientHeight,contentHeight:[...c.children].reduce((s,e)=>s+e.getBoundingClientRect().height,0)}))}));
  assert.ok(facts.scrollWidth<=width);assert.ok(facts.images.every(i=>i.loaded&&i.fit==='contain'));assert.ok(facts.cards.every(c=>Math.abs(c.height-c.contentHeight)<3));
  if(slug==='hydrafacial'){
   assert.ok(facts.images.slice(1).every(i=>Math.abs(i.frameRatio-562/351)<0.02));
   await p.locator('#results').screenshot({path:out+'/hydrafacial-results-final-'+width+'.png',style:'header, .fixed {visibility:hidden !important}'});
  }
  if(width<1024&&count>1){for(let i=1;i<count;i++){await p.getByRole('button',{name:'Next result',exact:true}).click();await p.waitForFunction(v=>document.querySelector('#results [aria-live]').textContent===v,`${i+1} / ${count}`)}assert.ok(await p.getByRole('button',{name:'Next result',exact:true}).isDisabled())}
  checks.push({slug,...facts,carousel:true});
 }
}
assert.deepEqual(errors,[]);fs.writeFileSync(out+'/gallery-final-checks.json',JSON.stringify({base,checks,errors},null,2));console.log(JSON.stringify({galleryChecks:checks.length,errors}));await b.close();})().catch(e=>{console.error(e);process.exit(1)});
