const q=(s,c=document)=>c.querySelector(s);
q('#year')&&(q('#year').textContent=new Date().getFullYear());

const form=q('#contact-form');
if(form){
  const params=new URLSearchParams(location.search);
  const interest=params.get('interest');
  const interestField=q('#interest');
  if(interest&&interestField) interestField.value=interest;

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=q('#form-status');
    const button=q('button[type=submit]',form);
    if(!form.reportValidity()) return;

    button.disabled=true;
    button.textContent='Submitting…';
    form.setAttribute('aria-busy','true');
    status.className='form-status';
    status.textContent='';

    try{
      const response=await fetch(form.action,{
        method:'POST',
        body:new FormData(form),
        headers:{Accept:'application/json'}
      });

      if(response.ok){
        form.reset();
        if(interest&&interestField) interestField.value=interest;
        status.className='form-status success';
        status.textContent='Thank you. Your request was submitted successfully.';
      }else{
        let data=null;
        try{data=await response.json()}catch{}
        const message=data?.errors?.map(x=>x.message).filter(Boolean).join(' ');
        if(response.status===429) throw new Error('Too many requests. Please wait a moment and try again.');
        throw new Error(message||'Submission failed. Please try again.');
      }
    }catch(err){
      status.className='form-status error';
      status.textContent=err?.message||'We could not submit your request. Please try again.';
    }finally{
      button.disabled=false;
      button.textContent='Submit request';
      form.removeAttribute('aria-busy');
    }
  });
}