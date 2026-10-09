const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs'); const assert=require('node:assert/strict');
const out=process.cwd()+'/docs/qa/2026-10-09-campaign-briefs';
(async()=>{
 const browser=await chromium.launch();const results=[];const errors=[];
 for(const slug of ['dermatology-clinic','skin-treatments','hair-treatment','laser-hair-removal']){
  for(const width of [390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/hydration|hydrated|React error/.test(m.text()))errors.push(m.text())});
   const payloads=[];let succeed=false;
   await page.route('**/api/lead-intake',async r=>{payloads.push(r.request().postDataJSON());await r.fulfill({status:succeed?200:503,contentType:'application/json',body:JSON.stringify(succeed?{ok:true,leadId:'qa-mocked-lead'}:{ok:false,message:'QA simulated service failure. Please retry.'})})});
   await page.route('**/thank-you?*',r=>r.fulfill({status:200,contentType:'text/html',body:'<h1>Confirmed mocked success redirect</h1>'}));
   await page.goto('http://localhost:3107/'+slug+'?utm_source=qa&utm_medium=preview&utm_campaign=campaign-briefs',{waitUntil:'domcontentloaded'});
   const chips=page.locator('button[aria-pressed]');const concern=await chips.nth(1).innerText();
   await chips.nth(1).click();assert.equal(await page.locator('#lp-concern').inputValue(),concern);assert.equal(await chips.nth(1).getAttribute('aria-pressed'),'true');
   await page.locator('#lp-concern').selectOption({index:3});const dropdownConcern=await page.locator('#lp-concern').inputValue();assert.equal(await page.getByRole('button',{name:dropdownConcern,exact:true}).getAttribute('aria-pressed'),'true');
   await page.locator('#services a').first().click();const serviceConcern=await page.locator('#lp-concern').inputValue();assert.ok(serviceConcern);
   const top=await page.locator('#book').evaluate(e=>e.getBoundingClientRect().top);assert.ok(top>=0,`book anchor hidden: ${top}`);
   await page.locator('#lp-name').fill('QA Preview');await page.locator('#lp-phone').fill('123');await page.locator('#lp-clinic').selectOption('Not sure, help me choose');
   await page.locator('#book button[type=submit]').click();await page.getByRole('alert').filter({hasText:'valid 10-digit'}).waitFor();assert.equal(payloads.length,0);
   await page.locator('#lp-phone').fill('9876543210');await page.locator('#book button[type=submit]').click();await page.getByRole('alert').filter({hasText:'QA simulated'}).waitFor();assert.equal(payloads[0].concern,serviceConcern);assert.equal(payloads[0].utm_campaign,'campaign-briefs');assert.equal(await page.locator('#lp-name').inputValue(),'QA Preview');assert.ok(page.url().includes(slug));
   await page.locator('#faq summary').first().click();assert.equal(await page.locator('#faq details').first().getAttribute('open'),'');
   await page.locator('#results').scrollIntoViewIfNeeded();
   const count=await page.locator('.lp-result-card').count();
   if(width<1024&&count>1){await page.getByRole('button',{name:'Next result',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.lp-results-track').scrollLeft>100);await page.getByRole('button',{name:'Previous result',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.lp-results-track').scrollLeft<=2);}
   await page.locator('#results').screenshot({path:out+'/'+slug+'-results-'+width+'.png'});
   if(width<1024){
    await page.getByRole('button',{name:'Book Now',exact:true}).click();const sheet=page.locator('[data-sheet]');await sheet.waitFor({state:'visible'});
    assert.equal(await sheet.getByLabel('Primary concern').inputValue(),serviceConcern);
    await sheet.getByLabel('Primary concern').selectOption({index:2});const stickyConcern=await sheet.getByLabel('Primary concern').inputValue();assert.equal(await page.locator('#lp-concern').inputValue(),stickyConcern);
    await sheet.getByLabel('Full name').fill('QA Mobile Preview');await sheet.getByLabel('Mobile number').fill('9876543210');await sheet.getByLabel('Preferred clinic').selectOption('Edapally, Kochi');
    await sheet.getByRole('button',{name:'Book My Consultation',exact:true}).click();await sheet.getByRole('alert').waitFor();assert.equal(payloads.at(-1).concern,stickyConcern);assert.ok(payloads.at(-1).source.endsWith('sticky-bar'));
    await page.screenshot({path:out+'/'+slug+'-mobile-booking.png'});
    await page.getByRole('button',{name:'Close booking form'}).click();await sheet.waitFor({state:'hidden'});await page.getByRole('button',{name:'Book Now',exact:true}).click();assert.equal(await sheet.getByLabel('Full name').inputValue(),'QA Mobile Preview');
    succeed=true;await sheet.getByRole('button',{name:'Book My Consultation',exact:true}).click();
   }else{succeed=true;await page.locator('#book button[type=submit]').click();}
   await page.waitForURL('**/thank-you?*');assert.ok(page.url().endsWith('p='+slug));results.push({slug,width,concernSync:true,servicePrefill:true,validation:true,failureRetainsValues:true,attribution:true,faq:true,carousel:count>1?'passed':'single supplied case',successRedirect:'mocked',requestCount:payloads.length});
   await context.close();
  }
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/interaction-checks.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({passed:results.length,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
