// HQ engine: renders hq.zayviana.com into one root element.
// Plain DOM on purpose (fast on phones, no extra libraries). Data:
//   /api/hq/state  tasks, cards you add, edits (synced across devices)
//   /api/hq/live   money and sessions from both hubs, GitHub push dates
/* eslint-disable */
export function mount(root) {
root.innerHTML = '<div class="wrap" id="hq-app"></div>';

const BASE = [
 {id:"csl",name:"CornerStone Labs",status:"Building",blurb:"AI workflows and tech consulting for small and mid-sized businesses.",
  links:[["cstonelabs.com","https://cstonelabs.com"],["GitHub","https://github.com/zayvianas/cornerstone-labs"],["Vercel","https://vercel.com/zayvianas-projects/cornerstone-labs"]],
  children:[
   {id:"csl-site",repo:"cornerstone-labs",name:"Client-facing site",status:"Live",blurb:"cstonelabs.com, the storefront people buy from.",links:[["cstonelabs.com","https://cstonelabs.com"]]},
   {id:"csl-hub",repo:"cornerstone-labs",name:"CornerStone Hub",status:"Private",blurb:"Client profiles, revenue, demos and the nightly leads list.",links:[["hub.cstonelabs.com","https://hub.cstonelabs.com"],["Leads","https://hub.cstonelabs.com/leads"]]},
   {id:"csl-cp",name:"Community Projects",status:"Group",blurb:"Apps built for real people first, sold later.",group:true,children:[
     {id:"nest",repo:"nestegg-app",name:"Nest Egg",status:"Building",blurb:"Your whole financial life in one place, with an AI money guide.",links:[["nestegg.cstonelabs.com","https://nestegg.cstonelabs.com"],["GitHub","https://github.com/zayvianas/nestegg-app"]]},
     {id:"home",name:"Cornerstone Home",status:"Building",blurb:"Chores, upkeep and family events. Built for Mom first.",links:[["home.cstonelabs.com","https://home.cstonelabs.com"]]},
     {id:"loop",repo:"loop-timer",name:"Loop Timer",status:"Live",blurb:"Interval timer that calls out switches over your music.",links:[["looptimer.cstonelabs.com","https://looptimer.cstonelabs.com"],["GitHub","https://github.com/zayvianas/loop-timer"]]},
     {id:"shelf",repo:"zayviana.com",name:"Study Shelf",status:"Live",blurb:"Plain-English study guides on any device.",links:[["learn.zayviana.com","https://learn.zayviana.com"]]},
     {id:"steady",repo:"steady-trader",name:"Steady Trader",status:"Invite only",blurb:"Options-trading mindset course, agent and journal.",links:[["steadytrader.cstonelabs.com","https://steadytrader.cstonelabs.com"],["GitHub","https://github.com/zayvianas/steady-trader"]]},
     {id:"ballot",name:"Ballot Match",status:"Live",blurb:"Nonpartisan voter quiz. Florida first.",links:[["vote.cstonelabs.com","https://vote.cstonelabs.com"]]}
   ]}
  ]},
 {id:"tgt",name:"TGT Academy",status:"Earning",blurb:"Tutoring across Tampa Bay and online.",
  links:[["learnwithtgt.com","https://learnwithtgt.com"],["GitHub","https://github.com/zayvianas/the-good-tutor"]],
  children:[
   {id:"tgt-site",repo:"the-good-tutor",name:"Public site",status:"Live",blurb:"Pricing, booking requests and the student portal.",links:[["learnwithtgt.com","https://learnwithtgt.com"],["Student notes","https://learnwithtgt.com/notes"]]},
   {id:"tgt-hub",repo:"the-good-tutor",name:"TGT Hub",status:"Private",blurb:"Bookings, families, students, notes and reminders.",links:[["hub.learnwithtgt.com","https://hub.learnwithtgt.com"]]},
   {id:"tgt-asvab",repo:"tgt-asvab",name:"TGT ASVAB",status:"Live",blurb:"ASVAB practice tool for students.",links:[["asvab.learnwithtgt.com","https://asvab.learnwithtgt.com"]]},
   {id:"tgt-students",name:"Students",status:"Group",blurb:"One card per student. Add new students here.",group:true,children:[
     {id:"ari",name:"Ari",status:"Active",blurb:"ASVAB prep. $50 a session."},
     {id:"zariya",name:"Zariya",status:"Active",blurb:"Cambridge Pure Math 1. Beginner-style lessons."},
     {id:"tegan",name:"Teaghan",status:"Active",blurb:"AP Stats. Plain-language formulas, detailed steps."}
   ]}
  ]},
 {id:"ca",name:"Christians Anonymous",status:"Building",blurb:"Christian events and community for Tampa Bay.",
  links:[["joincacommunity.com","https://www.joincacommunity.com"],["GitHub","https://github.com/zayvianas/christian-anonymous"]],
  children:[
   {id:"ca-app",repo:"christian-anonymous",name:"The app",status:"Building",blurb:"Event calendar, church finder, org accounts and RSVPs.",links:[["joincacommunity.com","https://www.joincacommunity.com"]]},
   {id:"m25",name:"M25",status:"Idea",blurb:"The Matthew 25 Project. Serve people in need, stand against injustice, point people to Jesus."}
  ]},
 {id:"nearby",name:"NearBy",status:"Waitlist",blurb:"AI local discovery app.",
  links:[["nearbyapp.io","https://nearbyapp.io"],["GitHub","https://github.com/zayvianas/nearby-landing"]],
  children:[{id:"nearby-landing",repo:"nearby-landing",name:"Landing page + waitlist",status:"Live",blurb:"nearbyapp.io",links:[["nearbyapp.io","https://nearbyapp.io"]]}]},
 {id:"zen",name:"Zenpest",status:"Client",blurb:"Tampa pest control. You run admin, the site, AI workflows, calls and socials.",
  links:[["zenpestsolutions.com","https://zenpestsolutions.com"]],
  children:[
   {id:"zen-site",name:"Website",status:"Inherited",blurb:"zenpestsolutions.com, built by another developer."},
   {id:"zen-ai",name:"AI search visibility",status:"Idea",blurb:"Show up when people ask ChatGPT, Gemini and others for pest control."},
   {id:"zen-social",name:"Calls and socials",status:"Active",blurb:"Phones, posts and reviews."}
  ]},
 {id:"th",name:"Theophany House",status:"Idea",blurb:"The fashion house behind your three clothing labels.",
  children:[
   {id:"ophir",name:"Ophir",status:"Idea",blurb:"Streetwear. Bold, youthful, subtle faith."},
   {id:"lutrotes",name:"CHRISTOS LUTROTES",status:"Idea",blurb:"Luxury. Christ the Redeemer. Craft, heritage and story."},
   {id:"ruah",name:"Ruah",status:"Idea",blurb:"Activewear and cozy wear for men and women."},
   {id:"th-app",name:"The app",status:"Idea",blurb:"Not defined yet."}
  ]},
 {id:"zc",name:"zayviana.com",status:"Live",blurb:"Your front door. Believer, Builder, Creator.",
  links:[["zayviana.com","https://zayviana.com"],["GitHub","https://github.com/zayvianas/zayviana.com"]],
  children:[
   {id:"zc-site",repo:"zayviana.com",name:"Personal site + Testaments",status:"Live",blurb:"Portfolio, ventures and your newsletter-style posts.",links:[["zayviana.com","https://zayviana.com"]]},
   {id:"zc-ig",name:"Instagram",status:"Idea",blurb:"Personal brand. Faith, style, service, Florida life."},
   {id:"zc-hq",repo:"zayviana.com",name:"HQ",status:"Private",blurb:"This page.",links:[["hq.zayviana.com","https://hq.zayviana.com"]]}
  ]}
];

const SEED = {
 csl:[["Set first packages and prices"]],
 "csl-hub":[["Work the overdue intro calls and emails on the leads list"]],
 nest:[["Resume the paused database before testing again"]],
 shelf:[["Add Study Shelf to the portfolio"]],
 steady:[["Decide if it's ready for the portfolio"]],
 tgt:[["Finish TGT Instagram, Google Business and Yelp setup"]],
 "tgt-hub":[["Decide on a backup tutor login"]],
 "tgt-asvab":[["Add TGT ASVAB to the portfolio"]],
 zariya:[["Get her new-client form filled out"]],
 m25:[["Write a one-page vision"]],
 zen:[["Get access to the site's hosting, Search Console and Google Business"]],
 "zen-site":[["Audit the site before changing anything"]],
 th:[["Trademark and domain checks for Ophir, CHRISTOS LUTROTES and Ruah"]],
 "th-app":[["Decide what the app is for"]],
 "zc-site":[["Point zayviana.xyz at zayviana.com"],["Fix the Army National Guard line on the portfolio"]],
 "zc-ig":[["Pick your first-week post"]],
 later:[["Reimagine one personal daily app (replaces Life OS and Ship Ready)"],["Learn trading and investing, slowly"]]
};

let LIVE=null, LIVE_ERR=false, LIVE_BUSY=false;

const KEY="hq-cache-v1";
function curTheme(){return root.dataset.theme==="dark"?"dark":"light"}
function setTheme(v){root.dataset.theme=v;try{localStorage.setItem("hq-theme",v)}catch(e){}}
(function(){let v="light";try{v=localStorage.getItem("hq-theme")||"light"}catch(e){}root.dataset.theme=v})();
let uid=0; const nid=()=>"t"+Date.now().toString(36)+(uid++);
function seedState(){const tasks={};for(const k in SEED){tasks[k]=SEED[k].map(([t,due,star])=>({id:nid(),t,due:due||"",star:!!star,done:false}))}return{tasks,touched:{},showDone:{}}}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
if(!S||!S.tasks)S=seedState();
let SYNC="loading", saveTimer=null, LOADED=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
  if(!LOADED)return;SYNC="saving";paintSync();clearTimeout(saveTimer);saveTimer=setTimeout(push,700)}
async function push(){try{const r=await fetch("/api/hq/state",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:S})});
  if(r.status===401){location.reload();return}SYNC=r.ok?"saved":"error"}catch(e){SYNC="error";clearTimeout(saveTimer);saveTimer=setTimeout(push,8000)}paintSync()}
function paintSync(){const el=root.querySelector("#hq-sync");if(el)el.textContent={loading:"Loading…",saving:"Saving…",saved:"Synced",error:"Not saved yet. Retrying…"}[SYNC]||""}
async function pull(){try{const r=await fetch("/api/hq/state",{cache:"no-store"});if(r.status===401){location.reload();return}const j=await r.json();
  if(j.state&&j.state.tasks){S=j.state}else{LOADED=true;await push()}
  if(!S.custom)S.custom=[];if(!S.edits)S.edits={};if(!S.touched)S.touched={};if(!S.showDone)S.showDone={};
  LOADED=true;SYNC="saved";try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}buildTree();render()}catch(e){SYNC="error";paintSync()}}
async function loadLive(fresh){LIVE_BUSY=true;if(LOADED)render();try{const r=await fetch("/api/hq/live"+(fresh?"?fresh=1":""),{cache:"no-store"});if(r.status===401){location.reload();return}LIVE=await r.json();LIVE_ERR=false}catch(e){LIVE_ERR=true}LIVE_BUSY=false;render()}

let TREE=[],NODES={},PARENT={};
if(!S.custom)S.custom=[];if(!S.edits)S.edits={};if(!S.removed)S.removed=[];
function buildTree(){
  TREE=JSON.parse(JSON.stringify(BASE));NODES={};PARENT={};
  const idx={};(function w(l){for(const n of l){idx[n.id]=n;if(n.children)w(n.children)}})(TREE);
  for(const c of S.custom){const n={id:c.id,name:c.name,blurb:c.blurb,status:c.status,custom:true,touched:c.created};
    if(c.status==="Group"){n.group=true;n.children=[]}
    if(c.link)n.links=[[c.link.replace(/^https?:\/\//,"").replace(/\/$/,""),/^https?:/.test(c.link)?c.link:"https://"+c.link]];
    idx[n.id]=n;const par=c.parent&&idx[c.parent];
    if(par){(par.children||(par.children=[])).push(n)}else TREE.push(n)}
  for(const id in S.edits){const n=idx[id];if(!n)continue;const e=S.edits[id];Object.assign(n,e);if(e.status==="Group"){n.group=true;n.children=n.children||[]}else if(e.status)n.group=false}
  (function w(list,p){for(const n of list){NODES[n.id]=n;PARENT[n.id]=p;if(n.children)w(n.children,n.id)}})(TREE,null);
  NODES.later={id:"later",name:"Later"};NODES.general={id:"general",name:"General"};
}
buildTree();
let UI={form:null};
const STATUSES=["Idea","Building","Live","Earning","Active","Client","Waitlist","Invite only","Private","Paused","Group"];
function initials(name){const w=name.replace(/[^A-Za-z0-9 ]/g,"").trim().split(/\s+/);return (w.length>1?w[0][0]+w[1][0]:w[0].slice(0,2)).toUpperCase()}
function nodeForm(mode,target){const isEdit=mode==="edit";const n=isEdit?NODES[target]:null;const fid="nf";
  const where=isEdit?"":(target?`inside ${esc(NODES[target].name)}`:"as a new venture");
  return `<form class="panel nodeform" data-node-form="${mode}:${target||""}">
   <div class="phead"><h2>${isEdit?"Edit "+esc(n.name):"Add a card"}</h2><small>${where}</small></div>
   <div class="nf-grid">
    <label>Name<input id="${fid}-name" type="text" required value="${isEdit?esc(n.name):""}" placeholder="${target?"e.g. Instagram, a new student, an app":"e.g. My next big venture"}"></label>
    <label>Status<select id="${fid}-status">${STATUSES.map(x=>`<option value="${x}" ${(isEdit?n.status:"Idea")===x?"selected":""}>${x==="Group"?"Group (holds other cards)":x}</option>`).join("")}</select></label>
    <label class="wide">Short description<input id="${fid}-blurb" type="text" value="${isEdit?esc(n.blurb||""):""}" placeholder="One line on what it is"></label>
    ${isEdit?"":`<label class="wide">Link (optional)<input id="${fid}-link" type="text" placeholder="e.g. cstonelabs.com"></label>`}
   </div>
   <div class="nf-btns"><button class="btn" type="submit">${isEdit?"Save":"Add card"}</button><button class="btn ghost" type="button" data-act="formclose">Cancel</button></div></form>`}
function addTile(parent){return `<button class="card addtile" type="button" data-act="formopen" data-mode="new" data-target="${parent||""}"><span class="plus">+</span><span>${parent?"Add a card":"New venture"}</span></button>`}

const DAY=864e5;
const parseD=s=>{const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
const today0=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const fmtD=s=>parseD(s).toLocaleDateString("en-US",{month:"short",day:"numeric"});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function sub(id){const n=NODES[id],out=[id];if(n&&n.children)for(const c of n.children)out.push(...sub(c.id));return out}
function tasksOf(id){return S.tasks[id]||(S.tasks[id]=[])}
// Lesson plans: every upcoming TGT booking adds "Make lesson plan" to that student's card,
// due the day before the session. Cancelled or declined sessions drop off on their own.
function studentNode(who){const first=String(who||"").trim().split(/\s+/)[0].toLowerCase();const g=NODES["tgt-students"];
  const kids=(g&&g.children)||[];const hit=kids.find(n=>n.name.trim().split(/\s+/)[0].toLowerCase()===first);return hit?hit.id:"tgt-students"}
function lessonTasks(){const out={};const t=LIVE&&LIVE.tgt&&LIVE.tgt.ok?LIVE.tgt.data:null;if(!t||!t.upcoming)return out;if(!S.lessonDone)S.lessonDone={};
  for(const x of t.upcoming){const node=studentNode(x.who);const d=new Date(x.start);const day=new Date(d.toLocaleString("en-US",{timeZone:"America/New_York"}));day.setDate(day.getDate()-1);
    const due=day.getFullYear()+"-"+String(day.getMonth()+1).padStart(2,"0")+"-"+String(day.getDate()).padStart(2,"0");
    const when=d.toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZone:"America/New_York"});
    const label=`Make lesson plan for ${node==="tgt-students"?x.who:x.who.split(/\s+/)[0]} · ${when}${x.subject?" · "+x.subject:""}${x.status==="requested"?" (not approved yet)":""}`;
    (out[node]||(out[node]=[])).push({id:"lp-"+x.id,sid:x.id,t:label,due,star:false,done:!!S.lessonDone[x.id],auto:true})}
  return out}
let LT={};
function allTasks(id){return (S.tasks[id]||[]).concat(LT[id]||[])}
function openIn(id,deep=true){return (deep?sub(id):[id]).reduce((a,k)=>a+allTasks(k).filter(t=>!t.done).length,0)}
function touchedMs(id){let best=0;const gh=(LIVE&&LIVE.github&&LIVE.github.pushed)||{};for(const k of sub(id)){const n=NODES[k];if(n.touched)best=Math.max(best,parseD(n.touched).getTime());if(n.repo&&gh[n.repo])best=Math.max(best,new Date(gh[n.repo]).getTime());if(S.touched[k])best=Math.max(best,S.touched[k])}return best}
function daysAgo(ms){return Math.max(0,Math.floor((today0()-new Date(new Date(ms).setHours(0,0,0,0)))/DAY))}
function touchedLabel(id){const ms=touchedMs(id);if(!ms)return{txt:"No activity yet",q:false};const d=daysAgo(ms);const q=d>=14;
  return{txt:q?`Quiet ${d} days`:d===0?"Updated today":d===1?"Updated yesterday":`Updated ${d} days ago`,q}}
function nextTask(id){for(const k of sub(id)){const t=allTasks(k).find(t=>!t.done);if(t)return{t,k}}return null}
function pathOf(id){const p=[];let c=PARENT[id];while(c){p.unshift(NODES[c].name);c=PARENT[c]}return p}
function quietKids(id){return sub(id).slice(1).filter(k=>!NODES[k].group&&touchedMs(k)&&daysAgo(touchedMs(k))>=14).length}

const CHIP={Earning:"good",Live:"good",Active:"good",Building:"accent",Client:"accent",Waitlist:"pink","Invite only":"pink",Inherited:"warn",Idea:"pink"};
const IC0={csl:["CL",0],tgt:["tgt",2],ca:["CA",1],nearby:["NB",2],zen:["ZP",0],th:["TH",1],zc:["Z.",0]};
const chip=s=>s==="Group"?"":`<span class="chip ${CHIP[s]||""}">${esc(s)}</span>`;

function icFor(n){if(IC0[n.id])return IC0[n.id];if(n.custom&&!PARENT[n.id]){const i=TREE.indexOf(n);return [initials(n.name),i%3]}return null}
function card(n){
  const nx=nextTask(n.id), tl=touchedLabel(n.id), open=openIn(n.id), qk=quietKids(n.id);
  const nextHtml=nx?`<div class="next"><span class="lbl">Next</span>${esc(nx.t.t)}${nx.k!==n.id?` <span class="where" style="display:inline;color:var(--muted);font-size:12px">· ${esc(NODES[nx.k].name)}</span>`:""}</div>`
                  :`<div class="next none"><span class="lbl">Next</span>Nothing planned yet. Open it to add a step.</div>`;
  const kids=n.children?`<div class="kids">${n.children.map(c=>`<span class="kid">${esc(c.name)}</span>`).join("")}</div>`:"";
  return `<a class="card" href="#v-${n.id}" data-go="${n.id}">
    <div class="card-top"><div class="card-id">${icFor(n)?`<span class="vicon c${icFor(n)[1]}">${icFor(n)[0]}</span>`:""}<h3>${esc(n.name)}</h3></div>${chip(n.status)}</div>
    <p class="blurb">${esc(n.blurb||"")}</p>${nextHtml}${kids}
    <div class="meta"><span>${open} open</span>${n.group?"":`<span class="${tl.q?"q":""}">${tl.txt}</span>`}${qk?`<span class="q">${qk} quiet inside</span>`:""}</div></a>`;
}

function taskList(id,{placeholder="Add a task"}={}){
  const all=allTasks(id), open=all.filter(t=>!t.done), done=all.filter(t=>t.done), show=S.showDone[id];
  const rows=[...open,...(show?done:[])].map(t=>taskRow(t,id)).join("");
  return `<ul class="tasks">${rows||`<li class="empty">No tasks here yet.</li>`}</ul>
   ${done.length?`<button class="showdone" data-act="showdone" data-node="${id}">${show?"Hide":"Show"} ${done.length} done</button>`:""}
   <form class="add" data-add="${id}"><input type="text" id="add-${id}" placeholder="${placeholder}" aria-label="New task"><input type="date" id="due-${id}" aria-label="Due date"><button class="btn" type="submit">Add</button></form>`;
}
function taskRow(t,id,where){
  const late=t.due&&!t.done&&parseD(t.due)<today0();
  return `<li class="task ${t.done?"done":""}">
   <button class="box" data-act="toggle" data-node="${id}" data-task="${t.id}" aria-label="${t.done?"Mark not done":"Mark done"}"></button>
   <span class="txt">${esc(t.t)}${where?`<span class="where">${esc(where)}</span>`:""}</span>
   <span class="tools">${t.due?`<span class="due ${late?"late":""}">${late?"Late · ":""}${fmtD(t.due)}</span>`:""}
    ${t.auto?`<span class="autotag" title="Added automatically from a TGT booking">Auto</span>`:`<button class="icon ${t.star?"on":""}" data-act="star" data-node="${id}" data-task="${t.id}" title="${t.star?"Remove from Today":"Add to Today"}" aria-label="Toggle Today">★</button>
    <button class="icon" data-act="del" data-node="${id}" data-task="${t.id}" title="Delete" aria-label="Delete task">×</button>`}</span></li>`;
}

function todayItems(){const out=[],t0=today0();
  const keys=new Set([...Object.keys(S.tasks),...Object.keys(LT)]);for(const k of keys){if(!NODES[k])continue;for(const t of allTasks(k)){if(t.done)continue;const due=t.due&&parseD(t.due)<=t0;if(t.star||due)out.push({t,k})}}
  return out.sort((a,b)=>(a.t.due||"9")<(b.t.due||"9")?-1:1)}

const VERSES=[
["Habakkuk 2:2","And the LORD answered me, and said, Write the vision, and make it plain upon tables, that he may run that readeth it."],
["Proverbs 16:3","Commit thy works unto the LORD, and thy thoughts shall be established."],
["Colossians 3:23","And whatsoever ye do, do it heartily, as to the Lord, and not unto men."],
["Philippians 4:13","I can do all things through Christ which strengtheneth me."],
["Isaiah 40:31","But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint."],
["Proverbs 3:5-6","Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."],
["Joshua 1:9","Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."],
["Psalm 118:24","This is the day which the LORD hath made; we will rejoice and be glad in it."],
["Matthew 6:33","But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."],
["Galatians 6:9","And let us not be weary in well doing: for in due season we shall reap, if we faint not."],
["Lamentations 3:22-23","It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."],
["Psalm 37:5","Commit thy way unto the LORD; trust also in him; and he shall bring it to pass."],
["2 Timothy 1:7","For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."],
["Romans 8:28","And we know that all things work together for good to them that love God, to them who are the called according to his purpose."],
["Psalm 46:5","God is in the midst of her; she shall not be moved: God shall help her, and that right early."],
["Proverbs 31:25","Strength and honour are her clothing; and she shall rejoice in time to come."],
["Matthew 5:16","Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."],
["Philippians 4:6","Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."],
["Isaiah 41:10","Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."],
["Psalm 90:17","And let the beauty of the LORD our God be upon us: and establish thou the work of our hands upon us; yea, the work of our hands establish thou it."],
["1 Corinthians 15:58","Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord."],
["Hebrews 11:1","Now faith is the substance of things hoped for, the evidence of things not seen."],
["Micah 6:8","He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?"],
["Matthew 25:40","Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me."],
["James 1:5","If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him."],
["Psalm 23:1","The LORD is my shepherd; I shall not want."],
["Proverbs 21:5","The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want."],
["Jeremiah 29:11","For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."]
];
let vOffset=0;
function verseIdx(){const d=new Date();const start=new Date(d.getFullYear(),0,0);const doy=Math.floor((d-start)/DAY);return ((doy+vOffset)%VERSES.length+VERSES.length)%VERSES.length}
function isoToday(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function doneToday(){const t=isoToday();let n=0;for(const k in S.tasks)for(const x of S.tasks[k])if(x.done&&x.doneAt===t)n++;return n}
function gardenSvg(n){const st=Math.min(n,5);const H=[6,20,32,42,50,54][st];const top=88-H;
  let g=`<svg viewBox="20 10 60 108" aria-hidden="true"><path class="g-stem" d="M50 88 Q${st>2?46:50} ${88-H/2} 50 ${top}"/>`;
  if(st>=1)g+=`<ellipse class="g-leaf" cx="${st>=2?40:45}" cy="${88-Math.max(6,H*0.38)}" rx="${st>=2?10:5}" ry="${st>=2?4.5:2.5}" transform="rotate(-28 ${st>=2?40:45} ${88-Math.max(6,H*0.38)})"/>`;
  if(st>=1)g+=`<ellipse class="g-leaf" cx="${st>=3?60:55}" cy="${88-Math.max(8,H*0.6)}" rx="${st>=3?10:5}" ry="${st>=3?4.5:2.5}" transform="rotate(28 ${st>=3?60:55} ${88-Math.max(8,H*0.6)})"/>`;
  if(st===3)g+=`<circle class="g-bud" cx="50" cy="${top}" r="3.5"/>`;
  if(st===4)g+=`<ellipse class="g-bud" cx="50" cy="${top-2}" rx="5.5" ry="7.5"/>`;
  if(st===5){for(let i=0;i<6;i++){const a=i*Math.PI/3;g+=`<circle class="g-pet" cx="${(50+Math.cos(a)*9).toFixed(1)}" cy="${(top+Math.sin(a)*9).toFixed(1)}" r="7"/>`}g+=`<circle class="g-mid" cx="50" cy="${top}" r="5.5"/>`}
  g+=`<rect class="g-soil" x="30" y="86" width="40" height="5" rx="2"/><rect class="g-rim" x="26" y="88" width="48" height="8" rx="3"/><path class="g-pot" d="M30 96 H70 L65 116 H35 Z"/></svg>`;return g}
const GMSG=["Finish a task to plant something.","A little sprout. Keep going.","It's growing.","Look at that.","Almost blooming.","In full bloom. Well done today."];
function hero(items,paid,owed){const h=new Date().getHours();const part=h<12?"morning":h<17?"afternoon":"evening";
  const [ref,txt]=VERSES[verseIdx()];const n=doneToday();
  const d=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  return `<section class="hero" aria-label="Welcome">
   <div><span class="eyebrow">${esc(d)}</span>
    <h1 class="hello">Good ${part}, Zayviana<span class="dot">.</span></h1>
    <div class="words"><span>Believer</span><span>Builder</span><span>Creator</span></div>
    <div class="pills"><span class="pill"><b>${items.length+liveToday(LIVE&&LIVE.tgt&&LIVE.tgt.ok?LIVE.tgt.data:null,LIVE&&LIVE.csl&&LIVE.csl.ok?LIVE.csl.data:null).length}</b> for today</span><span class="pill"><b>$${paid}</b> in this month</span>${owed?`<span class="pill"><b>$${owed}</b> still owed</span>`:""}</div>
    <div class="garden">${gardenSvg(n)}<div><b>Today's flower · ${n} done</b><span>${GMSG[Math.min(n,5)]}</span></div></div></div>
   <aside class="verse" aria-label="Verse of the day"><span class="lbl">Verse of the day</span>
    <blockquote>${esc(txt)}</blockquote>
    <div class="ref"><span><b>${esc(ref)}</b> · KJV</span><div class="vbtns"><button data-act="vprev" aria-label="Previous verse">‹</button><button data-act="vnext" aria-label="Next verse">›</button></div></div>
    <div class="ref"><a href="https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=KJV" target="_blank" rel="noopener">Read the whole chapter ↗</a></div></aside></section>`}
function pickList(){const opts=[`<option value="general">General</option>`];
  (function walk(list,depth){for(const n of list){if(!n.group)opts.push(`<option value="${n.id}">${" ".repeat(depth)}${esc(n.name)}</option>`);if(n.children)walk(n.children,n.group?depth:depth+1)}})(TREE,0);
  return opts.join("")}
const usd=n=>"$"+Number(n||0).toLocaleString("en-US",{maximumFractionDigits:2});
const tm=iso=>new Date(iso).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:"America/New_York"});
const dshort=iso=>new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"America/New_York"});
function ago(iso){const m=Math.round((Date.now()-new Date(iso))/60000);return m<1?"just now":m<60?m+" min ago":Math.round(m/60)+" hr ago"}
function liveToday(tgt,csl){const out=[];
  if(tgt){for(const s of tgt.today||[])out.push(hubRow(`${esc(s.who)} · ${tm(s.start)} · ${esc(s.mode)}${s.subject?" · "+esc(s.subject):""}`,s.status==="requested"?"Session today, not approved yet":"Session today","TGT Hub","https://hub.learnwithtgt.com"));
    for(const s of tgt.unpaid||[])out.push(hubRow(`Collect ${usd(s.amount)} from ${esc(s.who)} (${dshort(s.start)})`,s.status==="requested"?"Approve once it's paid":"Not paid yet","TGT Hub","https://hub.learnwithtgt.com"))}
  if(csl){for(const o of csl.owed||[])out.push(hubRow(`Collect ${usd(o.amount)} from ${esc(o.who)}`,"Still owed","CornerStone Hub","https://hub.cstonelabs.com"))}
  return out}
function hubRow(txt,sub,src,url){return `<li class="task hub"><span class="hubdot" aria-hidden="true"></span><span class="txt">${txt}<span class="where">${esc(sub)} · from ${esc(src)}</span></span><span class="tools"><a class="open" href="${url}" target="_blank" rel="noopener">Open ↗</a></span></li>`}
function srcBlock(name,res,rowsHtml){const url=res&&res.url?res.url:"#";
  if(!res)return `<div class="msrc"><span>${name}</span></div><p class="empty">Checking…</p>`;
  if(!res.ok)return `<div class="msrc"><a href="${url}" target="_blank" rel="noopener">${name} ↗</a></div><p class="empty">${res.reason==="not_connected"?"Not connected yet.":res.reason==="locked"?"HQ's key doesn't match this hub.":"Couldn't reach it just now."}</p>`;
  return `<div class="msrc"><span>${name}</span></div>${rowsHtml}`}
function moneyPanel(tgt,csl,paid,owed){
  if(!LIVE&&!LIVE_ERR)return `<p class="empty">Checking your hubs…</p>`;
  if(LIVE_ERR&&!LIVE)return `<p class="empty">Couldn't reach your hubs. Tap Refresh to try again.</p>`;
  const month=new Date().toLocaleDateString("en-US",{month:"long",timeZone:"America/New_York"});
  const tgtRows=tgt?((tgt.paid.length||tgt.unpaid.length)?`<ul class="rows">${tgt.paid.map(s=>`<li><span>${esc(s.who)} · ${dshort(s.start)} <span class="st">· Paid</span></span><span>${usd(s.amount)}</span></li>`).join("")}${tgt.unpaid.map(s=>`<li><span>${esc(s.who)} · ${dshort(s.start)} <span class="st owe">· Not paid yet</span></span><span>${usd(s.amount)}</span></li>`).join("")}</ul>`:`<p class="empty">Nothing paid yet in ${month}.</p>`):"";
  const cslRows=csl?((csl.paid.length||csl.owed.length)?`<ul class="rows">${csl.paid.map(p=>`<li><span>${esc(p.who)} · ${dshort(p.date+"T12:00:00Z")} <span class="st">· Paid</span></span><span>${usd(p.amount)}</span></li>`).join("")}${csl.owed.map(o=>`<li><span>${esc(o.who)} <span class="st owe">· Still owed</span></span><span>${usd(o.amount)}</span></li>`).join("")}</ul>`:`<p class="empty">No payments yet in ${month}. ${csl.activeClients} active client${csl.activeClients===1?"":"s"}, ${csl.leads} leads.</p>`)+(csl.monthly?`<p class="empty">${usd(csl.monthly)} a month signed.</p>`:""):"";
  return `<div class="money-total">${usd(paid)}</div><span class="lbl">Came in this ${month}</span>${owed?` <span class="lbl" style="color:var(--warn)">· ${usd(owed)} still owed</span>`:""}
   ${srcBlock("TGT Academy",LIVE.tgt,tgtRows)}${srcBlock("CornerStone Labs",LIVE.csl,cslRows)}
   <p class="checked">Checked ${ago(LIVE.checkedAt)}</p>`}
function home(q){
  const items=todayItems();
  const quiet=Object.keys(NODES).filter(k=>!NODES[k].children&&PARENT[k]!==undefined&&touchedMs(k)&&daysAgo(touchedMs(k))>=14)
     .sort((a,b)=>touchedMs(a)-touchedMs(b)).slice(0,5);
  const tgt=LIVE&&LIVE.tgt&&LIVE.tgt.ok?LIVE.tgt.data:null, csl=LIVE&&LIVE.csl&&LIVE.csl.ok?LIVE.csl.data:null;
  const paid=(tgt?tgt.paidTotal:0)+(csl?csl.paidTotal:0), owed=(tgt?tgt.owedTotal:0)+(csl?csl.owedTotal:0);
  const hubItems=liveToday(tgt,csl);
  const d=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  let ventures;
  if(q){const ql=q.toLowerCase();const hits=Object.values(NODES).filter(n=>n.id!=="later"&&(n.name+" "+(n.blurb||"")).toLowerCase().includes(ql));
    ventures=`<div class="section-h"><h2>Results</h2><small>${hits.length} match${hits.length===1?"":"es"}</small></div>
     <div class="grid">${hits.map(card).join("")||`<p class="empty">Nothing matches “${esc(q)}”.</p>`}</div>`;}
  else ventures=`<div class="section-h" id="sec-ventures"><h2>Ventures</h2><small>${TREE.length} homes · ${TREE.reduce((a,n)=>a+openIn(n.id),0)} open tasks</small></div>
     ${UI.form==="new:"?nodeForm("new",""):""}<div class="grid">${TREE.map(card).join("")}${addTile("")}</div>`;
  return `${topbar(d,q)}${q?"":hero(items,paid,owed)}
   <section class="summary" aria-label="Summary" id="sec-today">
    <div class="panel"><div class="phead"><h2>Today</h2><small>Starred or due</small></div>
     ${hubItems.length?`<ul class="tasks hubitems">${hubItems.join("")}</ul>`:""}
     ${items.length?`<ul class="tasks">${items.slice(0,8).map(({t,k})=>taskRow(t,k,[...pathOf(k),NODES[k].name].join(" › "))).join("")}</ul>`:(hubItems.length?"":`<p class="empty">Nothing for today yet.</p>`)}
     <form class="add" data-add="today"><input type="text" id="add-today" placeholder="Add something for today" aria-label="Add something for today">
      <select id="for-today" aria-label="Which venture">${pickList()}</select><button class="btn" type="submit">Add</button></form></div>
    <div class="panel"><div class="phead"><h2>Money</h2><button class="refresh" data-act="refresh" ${LIVE_BUSY?"disabled":""} aria-label="Refresh money">${LIVE_BUSY?"Checking…":"↻ Refresh"}</button></div>
     ${moneyPanel(tgt,csl,paid,owed)}</div>
    <div class="panel"><div class="phead"><h2>Gone quiet</h2><small>14+ days untouched</small></div>
     ${quiet.length?`<ul class="rows">${quiet.map(k=>`<li class="quiet-row"><a href="#v-${k}" data-go="${k}"><span><b style="font-weight:500">${esc(NODES[k].name)}</b> <span class="st">· ${esc(pathOf(k)[0]||"")}</span></span><span style="color:var(--warn)">${daysAgo(touchedMs(k))}d</span></a></li>`).join("")}</ul>`:`<p class="empty">${LIVE&&LIVE.github&&LIVE.github.connected?"Everything's been touched in the last two weeks.":"Nothing's gone quiet yet. This fills in as you work, and from GitHub once it's connected."}</p>`}</div>
   </section>
   ${ventures}
   <section class="panel" aria-label="Later" id="sec-later"><div class="phead"><h2>Later</h2><small>Parked so it stops pulling focus</small></div>${taskList("later",{placeholder:"Park an idea"})}</section>
   <details class="oneoffs"><summary>One-offs</summary><ul><li>HBD Alex · <a href="https://hbdalex.zayviana.com">hbdalex.zayviana.com</a></li></ul></details>
   ${sitefoot()}`;
}

function topbar(sub,q){const th=curTheme();return `<nav class="nav" aria-label="HQ"><div class="nav-in">
  <a class="brand" href="#" data-go=""><span class="mark"><svg viewBox="0 0 1500 1500" aria-hidden="true"><rect width="1500" height="1500" fill="#000"/><g transform="translate(526.97,958.41)" fill="#fff"><path d="M 437.703125 -118.671875 L 437.703125 0 L 20.75 0 L 20.75 -94.03125 L 228.25 -335.25 L 27.234375 -335.25 L 27.234375 -453.90625 L 427.328125 -453.90625 L 427.328125 -359.890625 L 219.828125 -118.671875 Z"/></g></svg></span><b>HQ<i>.</i></b></a>
  <div class="navlinks"><a href="#" data-scroll="today">Today</a><a href="#" data-scroll="ventures">Ventures</a><a href="#" data-scroll="later">Later</a></div>
  <div class="right"><div class="search"><input id="q" type="search" placeholder="Find a venture, app or student" value="${esc(q||"")}" aria-label="Search"></div>
  <div class="theme" role="group" aria-label="Theme"><button data-act="theme" data-v="light" aria-pressed="${th==="light"}">Light</button><button data-act="theme" data-v="dark" aria-pressed="${th==="dark"}">Dark</button></div></div></div></nav>`}
function sitefoot(){return `<footer class="sitefoot"><a class="brand" href="#" data-go=""><span class="mark"><svg viewBox="0 0 1500 1500" aria-hidden="true"><rect width="1500" height="1500" fill="#000"/><g transform="translate(526.97,958.41)" fill="#fff"><path d="M 437.703125 -118.671875 L 437.703125 0 L 20.75 0 L 20.75 -94.03125 L 228.25 -335.25 L 27.234375 -335.25 L 27.234375 -453.90625 L 427.328125 -453.90625 L 427.328125 -359.890625 L 219.828125 -118.671875 Z"/></g></svg></span><b>HQ<i>.</i></b></a><span>A believer who builds. <span id="hq-sync" class="sync"></span> · <button class="linkbtn" data-act="signout">Sign out</button></span></footer>`}

function page(id){
  const n=NODES[id]; if(!n) return home();
  const crumbs=['<a href="#" data-go="">HQ</a>'];let c=PARENT[id];const chain=[];while(c){chain.unshift(c);c=PARENT[c]}
  for(const k of chain)crumbs.push(`<a href="#v-${k}" data-go="${k}">${esc(NODES[k].name)}</a>`);
  const tl=touchedLabel(id),qk=quietKids(id);
  const links=n.links?`<div class="links">${n.links.map(([l,u])=>`<a href="${u}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>`:"";
  return `${topbar([...chain.map(k=>NODES[k].name),n.name].join(" › "))}
   <nav class="crumbs" aria-label="Breadcrumb">${crumbs.join("<span>/</span>")}</nav>
   <section class="vhead"><div class="row"><h2>${esc(n.name)}</h2>${chip(n.status)}<span class="vtools"><button class="btn ghost sm" data-act="formopen" data-mode="edit" data-target="${id}">Edit</button>${n.custom?(UI.form==="del:"+id?`<span class="confirm">Remove this card${n.children&&n.children.length?" and everything inside it":""}? <button class="btn sm danger" data-act="remove" data-target="${id}">Yes, remove</button><button class="btn ghost sm" data-act="formclose">Cancel</button></span>`:`<button class="btn ghost sm" data-act="askremove" data-target="${id}">Remove</button>`):""}</span></div>
   ${UI.form==="edit:"+id?nodeForm("edit",id):""}<p>${esc(n.blurb||"")}</p>
    <div class="stats"><span>${openIn(id,false)} open here</span>${n.children?`<span>${openIn(id)} open in total</span>`:""}${n.group?"":`<span class="${tl.q?"q":""}">${tl.txt}</span>`}${qk?`<span class="q">${qk} quiet inside</span>`:""}</div>${links}</section>
   <section class="panel"><div class="phead"><h2>${n.children?"Big-picture tasks":"Tasks"}</h2><small>${esc(n.name)}</small></div>${taskList(id)}</section>
   <div class="section-h"><h2>Inside ${esc(n.name)}</h2><small>${(n.children||[]).length} card${(n.children||[]).length===1?"":"s"}</small></div>
   ${UI.form==="new:"+id?nodeForm("new",id):""}<div class="grid">${(n.children||[]).map(card).join("")}${addTile(id)}</div>${sitefoot()}`;
}

let Q="";
let ROUTE=(location.hash||"").slice(1);
function go(id){UI.form=null;ROUTE=id?"v-"+id:"";if(id)Q="";try{history.replaceState(null,"",ROUTE?"#"+ROUTE:location.pathname+location.search)}catch(e){}render();root.scrollTo(0,0)}
function render(keepFocus){
  LT=lessonTasks();
  const h=ROUTE, app=root.querySelector("#hq-app");
  app.innerHTML=h.startsWith("v-")?page(h.slice(2)):home(Q);
  paintSync();
  if(keepFocus){const el=document.getElementById(keepFocus);if(el){el.focus();if(el.setSelectionRange&&el.value)el.setSelectionRange(el.value.length,el.value.length)}}
}
function touch(id){S.touched[id]=Date.now()}

const onClick=e=>{
  const sc=e.target.closest("[data-scroll]");if(sc){e.preventDefault();if(ROUTE)go("");const el=document.getElementById("sec-"+sc.dataset.scroll);if(el)root.scrollTo({top:el.getBoundingClientRect().top+root.scrollTop-80,behavior:"smooth"});return}
  const g=e.target.closest("[data-go]");if(g){e.preventDefault();go(g.dataset.go);return}
  const b=e.target.closest("[data-act]");if(!b)return;
  if(b.dataset.act==="theme"){setTheme(b.dataset.v);render();return}
  if(b.dataset.act==="refresh"){loadLive(true);return}
  if(b.dataset.act==="signout"){fetch("/api/hq/login",{method:"DELETE"}).then(()=>location.reload());return}
  if(b.dataset.act==="formopen"){UI.form=b.dataset.mode+":"+b.dataset.target;render();const f=document.getElementById("nf-name");if(f){f.focus();f.closest("form").scrollIntoView({behavior:"smooth",block:"center"})}return}
  if(b.dataset.act==="formclose"){UI.form=null;render();return}
  if(b.dataset.act==="askremove"){UI.form="del:"+b.dataset.target;render();return}
  if(b.dataset.act==="remove"){const id=b.dataset.target;const gone=new Set(sub(id));S.custom=S.custom.filter(c=>!gone.has(c.id));for(const k of gone){delete S.tasks[k];delete S.edits[k]}
    const par=PARENT[id];UI.form=null;save();buildTree();go(par||"");return}
  const id=b.dataset.node,act=b.dataset.act,list=tasksOf(id),t=list.find(x=>x.id===b.dataset.task);
  if(act==="toggle"&&!t&&String(b.dataset.task).startsWith("lp-")){const sid=b.dataset.task.slice(3);if(!S.lessonDone)S.lessonDone={};
    if(S.lessonDone[sid])delete S.lessonDone[sid];else S.lessonDone[sid]=isoToday();touch(id);save();render();return}
  if(act==="toggle"&&t){t.done=!t.done;t.doneAt=t.done?isoToday():"";touch(id)}
  else if(act==="vnext"||act==="vprev"){vOffset+=act==="vnext"?1:-1;render();return}
  else if(act==="star"&&t){t.star=!t.star}
  else if(act==="del"&&t){list.splice(list.indexOf(t),1);touch(id)}
  else if(act==="showdone"){S.showDone[id]=!S.showDone[id]}
  save();render();
};
const onSubmit=e=>{
  const nf=e.target.closest("[data-node-form]");
  if(nf){e.preventDefault();const [mode,target]=nf.dataset.nodeForm.split(":");const v=k=>{const el=document.getElementById("nf-"+k);return el?el.value.trim():""};
    const name=v("name");if(!name)return;
    if(mode==="edit"){S.edits[target]={name,blurb:v("blurb"),status:v("status")};touch(target)}
    else{const id="c"+Date.now().toString(36);S.custom.push({id,parent:target||null,name,blurb:v("blurb"),status:v("status"),link:v("link"),created:isoToday()});touch(id)}
    UI.form=null;save();buildTree();render();return}
  const f=e.target.closest("[data-add]");if(!f)return;e.preventDefault();
  const id=f.dataset.add,inp=document.getElementById("add-"+id),due=document.getElementById("due-"+id);
  const txt=inp.value.trim();if(!txt)return;
  if(id==="today"){const to=document.getElementById("for-today").value;const d=new Date();const iso=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    tasksOf(to).push({id:nid(),t:txt,due:iso,star:true,done:false});touch(to);save();render("add-today");return}
  tasksOf(id).push({id:nid(),t:txt,due:due.value||"",star:false,done:false});touch(id);save();render("add-"+id);
};
const onInput=e=>{if(e.target.id==="q"){Q=e.target.value;if(ROUTE){ROUTE="";try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}}render("q")}};
const onHash=()=>{ROUTE=(location.hash||"").slice(1);if(ROUTE)Q="";render();root.scrollTo(0,0)};
const onVis=()=>{if(document.visibilityState==="visible"&&SYNC!=="saving"){pull();loadLive(false)}};
root.addEventListener("click",onClick);root.addEventListener("submit",onSubmit);root.addEventListener("input",onInput);
window.addEventListener("hashchange",onHash);document.addEventListener("visibilitychange",onVis);
const clock=setInterval(()=>{if(LIVE&&!UI.form&&document.activeElement&&!root.contains(document.activeElement))render()},60000);
render();pull();loadLive(false);
return ()=>{root.removeEventListener("click",onClick);root.removeEventListener("submit",onSubmit);root.removeEventListener("input",onInput);
  window.removeEventListener("hashchange",onHash);document.removeEventListener("visibilitychange",onVis);clearInterval(clock);clearTimeout(saveTimer)};

}
