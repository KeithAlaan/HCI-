/* ===== EDIT YOUR DETAILS HERE ===== */
const ME = {
  first:"Keith", full:"Keith Marten Alaan", email:"keithalaan7@gmail.com",
  tagline:"I like figuring out how things work, then making them work better.",
  about:"I’m a student who enjoys building things on the web. I learn by trying, breaking and fixing, and I care about making things that feel good to use.",
  // The page loads the first of these files it finds next to index.html:
  photos:["photo.jpg","photo.jpeg","photo.png","photo.webp","me.jpg","me.png","keith.jpg","keith.png"],
  greetings:["Hello","Kumusta","Hola","Bonjour","Konnichiwa","Hi there"],
  marquee:["Coding","Gaming","Music","Design","Tech","Teamwork","Curiosity"],
  skills:[{n:"HTML & CSS",v:80},{n:"JavaScript",v:65},{n:"Problem solving",v:85},{n:"Teamwork",v:90}],
  interests:[
    {n:"Coding",t:"Turning a blank file into something that runs never gets old."},
    {n:"Gaming",t:"Co-op games are my favorite. Winning together beats winning alone."},
    {n:"Music",t:"I always have a playlist going while I work."},
    {n:"Design",t:"Good design feels invisible. I’m learning how to build that."}
  ],
  truths:[
    {t:"I have stayed up all night to finish a project I was proud of.",lie:false},
    {t:"I can solve a Rubik’s Cube in under 20 seconds.",lie:true},
    {t:"I enjoy learning new tools just to see what they can do.",lie:false}
  ],
  facts:[
    "I get my best ideas when I’m not looking for them.",
    "I’d rather build a rough version today than plan a perfect one for weeks.",
    "I learn fastest by breaking things and fixing them.",
    "Type my first name anywhere on this page for a surprise."
  ],
  timeline:[
    {w:"Past",t:"Started exploring computers",x:"Curiosity turned into a habit of tinkering."},
    {w:"Recently",t:"Learning web development",x:"HTML, CSS and JavaScript, one project at a time."},
    {w:"Now",t:"Building this website",x:"A class project: impress you in 45 seconds."},
    {w:"Next",t:"Bigger projects",x:"Apps, games and tools people actually use."}
  ]
};
/* =================================== */
const $=id=>document.getElementById(id), reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

// text
$("tag").textContent=ME.tagline; $("about").textContent=ME.about;
["mail","mail2"].forEach(i=>{$(i).href="mailto:"+ME.email});
$("mail2").textContent=ME.email;
$("mq").innerHTML=(ME.marquee.map(m=>m+"<b>✦</b>").join("")).repeat(6);

// photo: loads automatically
function show(src){const p=$("photo");p.src=src;p.hidden=false;$("ini").hidden=true}
(function find(list){const f=list[0];if(!f)return;const i=new Image();i.onload=()=>show(f);i.onerror=()=>find(list.slice(1));i.src=f})(ME.photos);
$("arch").onclick=()=>$("file").click();
$("file").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>show(r.result);r.readAsDataURL(f)};

// 3D tilt + spotlight
const stage=$("stage"),arch=$("arch");
addEventListener("mousemove",e=>{
  $("hero").style.setProperty("--mx",e.clientX+"px");$("hero").style.setProperty("--my",e.clientY+"px");
  if(reduce)return;const r=stage.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  if(Math.abs(x)<1&&Math.abs(y)<1)arch.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg)`;else arch.style.transform="";
});

// greeting typing
(function(){const el=$("greet");let g=0,c=0,d=false;
 if(reduce){el.textContent=ME.greetings[0]+"!";return}
 (function t(){const w=ME.greetings[g];el.textContent=w.slice(0,c)+(c===w.length&&!d?"!":"");
  let ms=d?45:110;if(!d&&c===w.length){d=true;ms=1400}else if(d&&c===0){d=false;g=(g+1)%ME.greetings.length;ms=250}else c+=d?-1:1;
  setTimeout(t,ms)})()})();

// toast / copy
let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2400)}
async function copy(){try{await navigator.clipboard.writeText(ME.email);toast("Email copied")}catch{toast("Copy this email: "+ME.email)}}
$("copy").onclick=copy;$("copy2").onclick=copy;
$("party").onclick=()=>{confetti(200);toast("Surprise! Thanks for visiting.")};

// live clock (celebrates 45 seconds)
let sec=0;setInterval(()=>{sec++;$("clock").textContent=Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0");
 if(sec===45){confetti(220);toast("45 seconds! Thanks for staying.")}},1000);

// rings
const rg=$("rings");
ME.skills.forEach(s=>rg.insertAdjacentHTML("beforeend",`<div class="ring"><svg viewBox="0 0 92 92"><circle class="bg" cx="46" cy="46" r="42"/><circle class="fg" cx="46" cy="46" r="42" data-v="${s.v}"/></svg><em>${s.v}%</em><p>${s.n}</p></div>`));
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll(".fg").forEach(c=>c.style.strokeDashoffset=264*(1-c.dataset.v/100));o.unobserve(e.target)}}),{threshold:.4}).observe(rg);

// flip cards
ME.interests.forEach(i=>{const b=document.createElement("button");b.className="flip";b.setAttribute("aria-pressed","false");
 b.innerHTML=`<span class="fi"><span class="fa">${i.n}</span><span class="fb">${i.t}</span></span>`;
 b.onclick=()=>b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true");$("flips").appendChild(b)});

// truths
let done=false;ME.truths.forEach(t=>{const b=document.createElement("button");b.className="opt";b.textContent=t.t;
 b.onclick=()=>{if(done)return;done=true;document.querySelectorAll("#opts .opt").forEach((o,i)=>{o.disabled=true;o.classList.add(ME.truths[i].lie?"right":"wrong")});
  $("fb").textContent=t.lie?"Correct! You found the lie.":"Not quite. The green one is the lie.";if(t.lie)confetti()};$("opts").appendChild(b)});

// facts + timeline
let fi=-1;$("nf").onclick=()=>{fi=(fi+1)%ME.facts.length;$("fact").textContent=ME.facts[fi]};
ME.timeline.forEach(t=>$("tl").insertAdjacentHTML("beforeend",`<li><b>${t.t}</b> <small>(${t.w})</small><br>${t.x}</li>`));

// star game
let sc=0,best=0,left=15,tm=null,play=false;const star=$("star"),ar=$("arena");
const mv=()=>{star.style.left=Math.random()*(ar.clientWidth-56)+"px";star.style.top=Math.random()*(ar.clientHeight-56)+"px"};
$("start").onclick=()=>{if(play)return;play=true;sc=0;left=15;$("score").textContent=0;$("time").textContent=left;star.style.display="block";mv();$("start").textContent="Playing...";
 tm=setInterval(()=>{left--;$("time").textContent=left;if(left<=0){clearInterval(tm);play=false;star.style.display="none";
  if(sc>best){best=sc;$("best").textContent=best;if(sc>0)confetti()}$("start").textContent="Play again";toast("Time’s up! You caught "+sc+" stars.")}},1000)};
star.onclick=()=>{if(!play)return;sc++;$("score").textContent=sc;mv()};

// easter egg
let ty="";addEventListener("keydown",e=>{if(e.key.length!==1)return;ty=(ty+e.key.toLowerCase()).slice(-ME.first.length);
 if(ty===ME.first.toLowerCase()){confetti(260);toast("You found the secret. Nice one!");ty=""}});

// confetti
const cv=$("fx"),cx=cv.getContext("2d");let ps=[],run=false;
const sz=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener("resize",sz);sz();
function confetti(n=90){if(reduce)return;const cols=["#1F4BFF","#FF8A3D","#7DF0C4","#ffffff","#0E1330"];
 for(let i=0;i<n;i++)ps.push({x:innerWidth/2,y:innerHeight*.55,vx:(Math.random()-.5)*17,vy:-Math.random()*15-4,s:Math.random()*8+4,c:cols[i%5],r:Math.random()*6,l:110});
 if(!run){run=true;requestAnimationFrame(loop)}}
function loop(){cx.clearRect(0,0,cv.width,cv.height);ps=ps.filter(p=>p.l>0);
 ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.r+=.2;p.l--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.strokeStyle="#0E1330";cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});
 if(ps.length)requestAnimationFrame(loop);else run=false}
