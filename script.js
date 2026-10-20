(()=>{
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 $('#year').textContent=new Date().getFullYear();
 const menu=$('.menu-toggle'),nav=$('#navigation');
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');nav.classList.toggle('open',open);menu.textContent=open?'×':'☰'});
 $$('a[href^="#"]',nav).forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰';nav.classList.remove('open')}));
 let categories=[];
 $$('[data-category]').forEach(card=>card.addEventListener('click',()=>{const category=card.dataset.category;categories=categories.includes(category)?categories:[...categories,category];const input=$(`input[name="categories"][value="${category}"]`);if(input)input.checked=true}));
 const form=$('#donation-form'),error=$('.error',form),button=$('.submit',form),success=$('.form-success');
 form.addEventListener('change',e=>{if(e.target.name==='categories')categories=$$('input[name="categories"]:checked',form).map(i=>i.value)});
 form.addEventListener('submit',async event=>{event.preventDefault();error.hidden=true;if(!categories.length){error.textContent='Please select at least one type of item.';error.hidden=false;$('.checks').scrollIntoView({behavior:'smooth',block:'center'});return}
 const data=new FormData(form);button.disabled=true;button.innerHTML='Sending your offer… <span class="busy">◌</span>';
 try{const response=await fetch('https://prayer-and-purpose-ministry.bonnysky9.chatgpt.site/api/donations',{method:'POST',mode:'cors',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),name:data.get('name'),email:data.get('email'),phone:data.get('phone'),area:data.get('area'),categories,details:data.get('details'),consent:data.get('consent')==='on',website:data.get('website')||''})});const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error||'Your offer could not be sent. Please try again.');form.hidden=true;success.hidden=false;success.focus();}
 catch(err){error.textContent=err instanceof Error&&err.message?err.message:'Your offer could not be sent right now. Please try again in a moment.';error.hidden=false;button.disabled=false;button.innerHTML='Send my donation offer <span>→</span>'}
 });
})();
