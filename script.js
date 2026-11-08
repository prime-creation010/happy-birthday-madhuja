const $ = (s) => document.querySelector(s);
const target = new Date("2026-11-28T00:00:00+05:30").getTime();
function updateCountdown(){
  const now=Date.now(), diff=target-now;
  if(diff<=0){
    $("#countdown").innerHTML='<div class="celebration-live">♡ &nbsp; IT’S YOUR DAY, BUNU! &nbsp; ♡</div>';
    $("#countdownCaption").textContent="November 28 is here. Let the little celebration begin!";
    return;
  }
  const units=[Math.floor(diff/86400000),Math.floor(diff%86400000/3600000),Math.floor(diff%3600000/60000),Math.floor(diff%60000/1000)];
  ["#days","#hours","#minutes","#seconds"].forEach((s,i)=>$(s).textContent=String(units[i]).padStart(2,"0"));
}
updateCountdown();setInterval(updateCountdown,1000);

const gift=$("#giftButton"), reveal=$("#revealMessage");
gift.addEventListener("click",()=>{
  reveal.hidden=false;
  gift.textContent="A little love, just for you ♡";
  gift.disabled=true;
  reveal.scrollIntoView({behavior:"smooth",block:"center"});
  for(let i=0;i<24;i++){const star=document.createElement("span");star.textContent=["✦","✧","♡","✿"][i%4];star.style.cssText=`position:fixed;z-index:25;left:${Math.random()*100}vw;top:-20px;color:${["#c58b73","#e3b85d","#bd8e9d"][i%3]};font-size:${12+Math.random()*18}px;pointer-events:none;animation:fall ${2+Math.random()*2}s linear forwards`;document.body.appendChild(star);setTimeout(()=>star.remove(),4200)}
});
const style=document.createElement("style");style.textContent="@keyframes fall{to{transform:translateY(110vh) rotate(540deg);opacity:0}}.celebration-live{font:500 clamp(18px,4vw,28px) 'Playfair Display',serif;color:#aa6f64;letter-spacing:.06em}";document.head.appendChild(style);

const lightbox=$("#lightbox"), lbImg=$("#lightboxImage"), lbCap=$("#lightboxCaption");
document.querySelectorAll(".polaroid").forEach(card=>card.addEventListener("click",()=>{
  const img=card.querySelector("img");lbImg.src=img.src;lbImg.alt=img.alt;lbCap.textContent=card.querySelector("figcaption").textContent;
  lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");
}));
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");lbImg.src=""}
$("#lightboxClose").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

const music=$("#bgMusic"), musicBtn=$("#musicToggle");
music.volume=.22;
musicBtn.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();musicBtn.innerHTML="♫ <span>Music on</span>"}catch(e){musicBtn.innerHTML="♫ <span>Tap again</span>"}}
  else{music.pause();musicBtn.innerHTML="♫ <span>Music</span>"}
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.animation="fadeUp .8s both";observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".intro,.section-heading,.reason-grid article,.letter-card,.surprise-box,.polaroid").forEach(el=>observer.observe(el));
