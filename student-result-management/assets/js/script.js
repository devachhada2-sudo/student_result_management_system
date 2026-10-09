document.querySelectorAll('[data-count]').forEach(el=>{const n=+el.dataset.count;let i=0;const t=setInterval(()=>{i+=Math.max(1,Math.ceil(n/30));if(i>=n){i=n;clearInterval(t)}el.textContent=i},30)});
document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{delId.value=b.dataset.del;delName.textContent=b.dataset.name;new bootstrap.Modal(delModal).show()});
const mk=document.querySelectorAll('.mk');
function calc(){let t=0;mk.forEach(i=>t+=Math.min(100,Math.max(0,+i.value||0)));const p=t/5,g=p>=90?'A+':p>=80?'A':p>=70?'B+':p>=60?'B':p>=50?'C':p>=40?'D':'F';
pTot.textContent=t+' / 500';pPer.textContent=p.toFixed(2)+'%';pBar.style.width=p+'%';pGr.textContent=g;pRes.textContent=p>=40?'PASS':'FAIL';prev.classList.toggle('fail',p<40)}
mk.forEach(i=>i.addEventListener('input',calc));if(mk.length)calc();
setTimeout(()=>document.querySelectorAll('.toast-box').forEach(t=>t.remove()),4000);
