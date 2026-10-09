const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');
const out=process.cwd()+'/docs/qa/2026-10-09-campaign-briefs';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/hydration|hydrated|React error/.test(m.text()))errors.push(m.text())});
 await page.route('**/api/lead-intake',r=>r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({ok:false,message:'QA simulated unavailable service. Please retry.'})}));
 const checks=[];
 const slugs=['dermatology-clinic','skin-treatments','hair-treatment','laser-hair-removal','hydrafacial','glutathione-treatment','vaser-liposuction'];
 for(const slug of slugs){
  for(const width of [320,375,390,430,768,1440]){
   await page.setViewportSize({width,height:width>900?1000:844});
   console.log(slug,width);
   const response=await page.goto('http://localhost:3107/'+slug,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelector('section img')?.naturalWidth>0,{},{timeout:10000}).catch(async e=>{console.log(await page.locator('section img').first().evaluate(i=>({url:location.href,src:i.currentSrc,complete:i.complete,width:i.naturalWidth})));throw e});
   await page.evaluate(()=>document.fonts.ready);
   const facts=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('h1').textContent,formFields:document.querySelectorAll('#book input,#book select').length,serviceColumns:getComputedStyle(document.querySelector('#services h3').closest('a').parentElement).gridTemplateColumns,hero:document.querySelector('section img')?.currentSrc,heroLoaded:document.querySelector('section img')?.naturalWidth>0,designNotes:/\(Design|\(Keep the|\[X sessions/.test(document.body.innerText),smallChips:[...document.querySelectorAll('button[aria-pressed]')].filter(e=>e.getBoundingClientRect().height<44).length}));
   checks.push({slug,status:response.status(),...facts});
   if(width===390&&slugs.indexOf(slug)<4){await page.screenshot({path:out+'/'+slug+'-mobile.png'});await page.locator('#services').screenshot({path:out+'/'+slug+'-services-mobile.png'});}
   if(width===1440&&slugs.indexOf(slug)<4){await page.screenshot({path:out+'/'+slug+'-desktop.png'});await page.locator('#services').screenshot({path:out+'/'+slug+'-services-desktop.png'});}
  }
 }
 fs.writeFileSync(out+'/responsive-checks.json',JSON.stringify({checks,errors},null,2));
 console.log(JSON.stringify({checks:checks.length,failures:checks.filter(c=>c.scrollWidth>c.width||!c.heroLoaded||c.status!==200||c.designNotes||c.smallChips),errors}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
