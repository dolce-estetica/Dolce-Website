// Run with BASE_URL, QA_OUT and PLAYWRIGHT_MODULE as needed. Lead requests are intercepted.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs'); const path=require('node:path'); const assert=require('node:assert/strict');
const expected=require('./content-expectations.json');
const base=process.env.BASE_URL || 'http://localhost:3107';
const out=process.env.QA_OUT || '/tmp/dolce-oct10-local';fs.mkdirSync(out,{recursive:true});
const labels={'hydrafacial':'Book My Session','glutathione-treatment':'Book My Assessment','vaser-liposuction':'Book Surgeon Consultation'};
const normalize=s=>s.replace(/\s+/g,' ').trim();
const allSlugs=[...Object.keys(expected),'dermatology-clinic','hair-treatment','skin-treatments','laser-hair-removal'];
async function ready(page){await page.locator('.lp-hero img').evaluate(i=>i.decode());await page.locator('header img').evaluate(i=>i.decode());await page.evaluate(()=>document.fonts.ready);}
async function decodeSection(page,selector){for(const img of await page.locator(selector+' img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());}}
(async()=>{
 const browser=await chromium.launch();const checks=[];const interactions=[];const errors=[];
 function collect(page){page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));page.on('console',m=>{if(m.type()==='error'&&/hydration|hydrated|React error/.test(m.text()))errors.push({url:page.url(),message:m.text()})});}
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();collect(page);
 await page.route('**/api/lead-intake',r=>r.abort());
 for(const slug of allSlugs){
  console.log('Responsive',slug);
  for(const width of [320,375,390,430,768,1440]){
   await page.setViewportSize({width,height:width>900?1000:844});
   const response=await page.goto(base+'/'+slug,{waitUntil:'load'});await ready(page);
   const facts=await page.evaluate(()=>{
    const cards=[...document.querySelectorAll('#services h3')].map(e=>e.closest('a').getBoundingClientRect());
    const submit=document.querySelector('#book button[type=submit]');
    const results=[...document.querySelectorAll('.lp-result-card')].map(e=>{const box=e.firstElementChild.getBoundingClientRect();const img=e.querySelector('img');return{width:box.width,height:box.height,fit:getComputedStyle(img).objectFit}});
    return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('h1').textContent,formHeading:document.querySelector('#book h2').textContent,submitLabel:submit.textContent,submitHeight:submit.getBoundingClientRect().height,submitFullWidth:Math.abs(submit.getBoundingClientRect().width-submit.parentElement.getBoundingClientRect().width)<2,formFields:document.querySelectorAll('#book input,#book select').length,singleMobileServiceColumn:cards.every(c=>Math.abs(c.x-cards[0].x)<2),serviceCtaHeights:[...document.querySelectorAll('.lp-service-cta')].map(e=>e.getBoundingClientRect().height),phoneType:document.querySelector('#lp-phone').type,phoneInputMode:document.querySelector('#lp-phone').inputMode,hero:document.querySelector('.lp-hero img').currentSrc,heroLoaded:document.querySelector('.lp-hero img').naturalWidth>0,designNotes:/\(Design|\(Keep the|\[X sessions/.test(document.body.innerText),smallChips:[...document.querySelectorAll('button[aria-pressed]')].filter(e=>e.getBoundingClientRect().height<44).length,locations:document.querySelectorAll('#locations a').length,results};
   });
   assert.equal(response.status(),200);assert.ok(facts.scrollWidth<=width);assert.equal(facts.designNotes,false);assert.equal(facts.smallChips,0);assert.equal(facts.formFields,5);assert.equal(facts.locations,4);assert.equal(facts.phoneType,'tel');assert.equal(facts.phoneInputMode,'tel');assert.ok(facts.submitFullWidth);assert.ok(facts.submitHeight>=44);assert.ok(facts.serviceCtaHeights.every(h=>h>=44));if(width<640)assert.ok(facts.singleMobileServiceColumn);
   if(expected[slug]){
    const e=expected[slug];assert.equal(facts.h1,e.hero.heading);assert.equal(facts.formHeading,e.campaign.formHeading);assert.equal(facts.submitLabel,labels[slug]);
    const content=normalize(await page.locator('body').textContent());
    const strings=[...Object.values(e.campaign),...Object.values(e.hero),...e.impact.flatMap(Object.values),...e.why.flatMap(Object.values),e.services.heading,e.services.intro,...e.services.items.flatMap(Object.values),...Object.values(e.results),...e.concerns,...e.faqs.flatMap(Object.values)];
    for(const s of strings)assert.ok(content.includes(normalize(s)),`${slug} missing copy: ${s}`);
    if(width===390||width===1440){
     await page.screenshot({path:path.join(out,slug+'-hero-'+width+'.png')});
     await decodeSection(page,'#services');await page.locator('#services').screenshot({path:path.join(out,slug+'-services-'+width+'.png'),style:'header, .fixed {visibility:hidden !important}'});
     await decodeSection(page,'#results');await page.locator('.lp-results-track').evaluate(e=>e.scrollTo({left:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('.lp-results-track').scrollLeft<=2);await page.locator('#results').screenshot({path:path.join(out,slug+'-results-'+width+'.png'),style:'header, .fixed {visibility:hidden !important}'});
    }
   }
   checks.push({slug,status:response.status(),...facts});
  }
 }
 await context.close();
 fs.writeFileSync(path.join(out,'responsive-checks.json'),JSON.stringify({base,checks,errors},null,2));
 for(const [slug,e] of Object.entries(expected)){
  for(const width of [390,1440]){
   console.log('Interactions',slug,width);
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();collect(page);const payloads=[];let succeed=false;
   await page.route('**/api/lead-intake',async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:succeed?200:503,contentType:'application/json',body:JSON.stringify(succeed?{ok:true,leadId:'qa-mocked-lead'}:{ok:false,message:'QA simulated service failure. Please retry.'})})});
   await page.route('**/thank-you?*',r=>r.fulfill({status:200,contentType:'text/html',body:'<h1>Confirmed mocked success redirect</h1>'}));
   await page.goto(base+'/'+slug+'?utm_source=qa&utm_medium=preview&utm_campaign=oct10-content',{waitUntil:'load'});await ready(page);
   const chips=page.locator('button[aria-pressed]');assert.equal(await page.locator('#lp-concern').inputValue(),'');
   const concern=await chips.nth(1).innerText();await chips.nth(1).click();await page.waitForFunction(v=>document.querySelector('#lp-concern').value===v,concern);assert.equal(await chips.nth(1).getAttribute('aria-pressed'),'true');
   await page.locator('#lp-concern').selectOption({index:3});const dropdownConcern=await page.locator('#lp-concern').inputValue();assert.equal(await page.getByRole('button',{name:dropdownConcern,exact:true}).getAttribute('aria-pressed'),'true');
   for(const [index,item] of e.services.items.entries()){
    await page.locator('#services a').nth(index).click();await page.waitForFunction(v=>document.querySelector('#lp-concern').value===v,item.concern);
   }
   const serviceConcern=await page.locator('#lp-concern').inputValue();assert.ok(await page.locator('#book').evaluate(el=>el.getBoundingClientRect().top>=0));
   await page.locator('#lp-name').fill('QA Preview');await page.locator('#lp-phone').fill('123');await page.locator('#lp-clinic').selectOption('Not sure, help me choose');await page.locator('#book button[type=submit]').click();await page.getByRole('alert').filter({hasText:'valid 10-digit'}).waitFor();assert.equal(payloads.length,0);
   await page.locator('#lp-phone').fill('9876543210');await page.locator('#book button[type=submit]').click();await page.getByRole('alert').filter({hasText:'QA simulated'}).waitFor();assert.equal(payloads[0].concern,serviceConcern);assert.equal(payloads[0].utm_campaign,'oct10-content');assert.equal(await page.locator('#lp-name').inputValue(),'QA Preview');
   for(const detail of await page.locator('#faq details').all()){await detail.locator('summary').click();assert.equal(await detail.getAttribute('open'),'');}
   const count=await page.locator('.lp-result-card').count();
   if(width<1024&&count>1){
    for(let index=1;index<count;index++){await page.getByRole('button',{name:'Next result',exact:true}).click();await page.waitForFunction(value=>document.querySelector('#results [aria-live]').textContent===value,`${index+1} / ${count}`);}
    assert.ok(await page.getByRole('button',{name:'Next result',exact:true}).isDisabled());
    await page.locator('.lp-results-track').focus();await page.keyboard.press('ArrowLeft');await page.waitForFunction(value=>document.querySelector('#results [aria-live]').textContent===value,`${count-1} / ${count}`);
   }
   if(width<1024){
    await page.getByRole('button',{name:'Book Now',exact:true}).click();const sheet=page.locator('[data-sheet]');await sheet.waitFor({state:'visible'});assert.equal(await sheet.getByLabel('Primary concern').inputValue(),serviceConcern);
    await sheet.getByLabel('Primary concern').selectOption({index:2});const stickyConcern=await sheet.getByLabel('Primary concern').inputValue();assert.equal(await page.locator('#lp-concern').inputValue(),stickyConcern);
    await sheet.getByLabel('Full name').fill('QA Mobile Preview');await sheet.getByLabel('Mobile number').fill('9876543210');await sheet.getByLabel('Preferred clinic').selectOption('Edapally, Kochi');
    assert.equal(await sheet.getByLabel('Mobile number').getAttribute('inputmode'),'tel');
    await sheet.getByRole('button',{name:labels[slug],exact:true}).click();await sheet.getByRole('alert').waitFor();assert.equal(payloads.at(-1).concern,stickyConcern);assert.ok(payloads.at(-1).source.endsWith('sticky-bar'));
    await page.screenshot({path:path.join(out,slug+'-mobile-booking.png')});
    await page.getByRole('button',{name:'Close booking form'}).click();await sheet.waitFor({state:'hidden'});await page.getByRole('button',{name:'Book Now',exact:true}).click();assert.equal(await sheet.getByLabel('Full name').inputValue(),'QA Mobile Preview');succeed=true;await sheet.getByRole('button',{name:labels[slug],exact:true}).click();
   }else{succeed=true;await page.locator('#book button[type=submit]').click();}
   await page.waitForURL('**/thank-you?*');assert.ok(page.url().endsWith('p='+slug));interactions.push({slug,width,concernSync:true,allServicePrefills:true,phoneValidation:true,failureRetainsValues:true,attribution:true,allFaqs:true,carousel:count,successRedirect:'mocked',requestCount:payloads.length});await context.close();
  }
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'interaction-checks.json'),JSON.stringify({base,interactions,errors},null,2));console.log(JSON.stringify({responsive:checks.length,interactions:interactions.length,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
