(() => {
  const root=document.getElementById("site");
  const apply=()=>{document.documentElement.style.setProperty("--primary",SG.settings.primary);document.documentElement.style.setProperty("--secondary",SG.settings.secondary);document.documentElement.style.setProperty("--bg",SG.settings.bg);document.documentElement.style.setProperty("--text",SG.settings.text);document.documentElement.style.setProperty("--radius",SG.settings.radius+"px");document.documentElement.style.setProperty("--shadow",SG.settings.shadow);document.documentElement.style.setProperty("--font",SG.settings.font)};
  apply();
  const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  function md(src){
    let s=esc(src).replace(/\r/g,"");
    const blocks=[]; s=s.replace(/```([\s\S]*?)```/g,(_,x)=>{blocks.push("<pre><code>"+x.trim()+"</code></pre>");return `@@B${blocks.length-1}@@`});
    s=s.replace(/^###### (.*)$/gm,"<h6>$1</h6>").replace(/^##### (.*)$/gm,"<h5>$1</h5>").replace(/^#### (.*)$/gm,"<h4>$1</h4>").replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>");
    s=s.replace(/^\> (.*)$/gm,"<blockquote>$1</blockquote>").replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img alt="$1" src="$2">').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
    s=s.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/__(.+?)__/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code>$1</code>");
    s=s.replace(/((?:^\|.*\|\n?)+)/gm, tableBlock);
    s=s.replace(/(?:^|\n)(- .*(?:\n- .*)*)/g,(_,x)=>"\n<ul>"+x.split("\n").map(v=>"<li>"+v.slice(2)+"</li>").join("")+"</ul>");
    s=s.replace(/(?:^|\n)((?:\d+\. .*(?:\n\d+\. .*)*))/g,(_,x)=>"\n<ol>"+x.split("\n").map(v=>"<li>"+v.replace(/^\d+\.\s/,"")+"</li>").join("")+"</ol>");
    return s.split(/\n{2,}/).map(x=>/^<(h\d|ul|ol|blockquote|pre|table|img)/.test(x.trim())||/^@@B\d+@@$/.test(x.trim())?x:"<p>"+x.replace(/\n/g,"<br>")+"</p>").join("\n").replace(/@@B(\d+)@@/g,(_,i)=>blocks[i]);
  }
  function tableBlock(txt){
    const rows=txt.trim().split("\n").filter(Boolean); if(rows.length<2)return txt;
    const parse=r=>r.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(c=>c.trim());
    if(!/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(rows[1]))return txt;
    const head=parse(rows[0]), body=rows.slice(2).map(parse);
    return "<table><thead><tr>"+head.map(x=>"<th>"+x+"</th>").join("")+"</tr></thead><tbody>"+body.map(r=>"<tr>"+r.map(x=>"<td>"+x+"</td>").join("")+"</tr>").join("")+"</tbody></table>";
  }
  const header=(back="")=>`<div class="nav"><div class="container nav-inner"><a class="brand" href="index.html"><span class="logo">S</span>${SG.config.brand}</a><div class="nav-links"><a href="index.html">Home</a><a href="?page=subject&id=history">History</a><a href="?page=subject&id=polity">Polity</a><a href="?page=quizzes">Quizzes</a></div><div class="nav-actions"><a class="btn" href="admin.html">🔐 Admin</a></div></div></div>`;
  const footer=`<footer class="footer"><div class="container">© ${new Date().getFullYear()} StudyGaurav · Built for fast, responsive learning.</div></footer>`;
  function home(){
    root.innerHTML=header()+`<main><section class="hero"><div class="container hero-grid"><div><span class="badge">📚 Notes • Quizzes • Progress</span><h1>अपनी पढ़ाई को <span>simple & smart</span> बनाओ.</h1><p>Subject चुनो → chapter चुनो → notes पढ़ो. आगे quizzes, login और secure content management इसी platform में रहेगा.</p><div class="hero-actions"><a class="btn primary" href="?page=subject&id=history">Explore History →</a><a class="btn" href="?page=quizzes">Try a Quiz</a></div><div class="stats"><div class="stat"><strong>${SG.subjects.length}+</strong><small>Subjects</small></div><div class="stat"><strong>${SG.chapters.length}+</strong><small>Chapters</small></div><div class="stat"><strong>100%</strong><small>Responsive</small></div></div></div><div class="dashboard-card"><div class="dash-head"><strong>📊 Your Study Dashboard</strong><span class="preview-pill">Preview</span></div><div class="progress-box">Overall progress <b style="float:right">72%</b><div class="progress-track"><i></i></div></div><div class="metric-grid"><div class="metric">📝 Quizzes<b>18</b><span>Attempts</span></div><div class="metric">🎯 Avg. score<b>84%</b><span>Performance</span></div><div class="metric">📚 Notes read<b>${SG.chapters.length}</b><span>Chapters</span></div><div class="metric">🔥 Streak<b>7 days</b><span>Study</span></div></div></div></div></section><section class="section"><div class="container"><div class="section-head"><div><h2>Choose your study area</h2><p>हर section का अपना chapter/content flow.</p></div></div><div class="cards">${SG.subjects.map(s=>`<a class="card" href="?page=subject&id=${s.id}"><div class="card-icon">${s.icon}</div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><b style="color:var(--primary)">Open ${esc(s.name)} →</b></a>`).join("")}<a class="card" href="?page=quizzes"><div class="card-icon">📝</div><h3>Quizzes</h3><p>Chapter-wise MCQs, scores और practice.</p><b style="color:var(--primary)">Open Quizzes →</b></a></div></div></section></main>${footer}`;
  }
  function subject(id){
    const s=SG.subjects.find(x=>x.id===id); const cs=SG.chapters.filter(x=>x.subject===id);
    root.innerHTML=header()+`<main class="page"><div class="container"><span class="badge">${s?.icon||"📚"} ${esc(s?.name||"Subject")}</span><h1 class="page-title">${esc(s?.name||"Subject")} Chapters</h1><p class="muted">Chapter चुनो और अगली screen पर पूरा formatted note पढ़ो.</p><div class="chapter-list">${cs.map(c=>`<a class="chapter" href="?page=note&id=${c.id}"><div><b>${esc(c.title)}</b><small>Markdown chapter</small></div><strong style="color:var(--primary)">Read →</strong></a>`).join("")||`<div class="card">अभी कोई chapter publish नहीं है। Admin Panel से add करें.</div>`}</div></div></main>${footer}`;
  }
  function note(id){
    const c=SG.chapters.find(x=>x.id===id); root.innerHTML=header()+`<main class="page"><div class="container"><a class="btn small" href="?page=subject&id=${c?.subject||"history"}">← Chapters</a><div class="note-shell" style="margin-top:15px"><article class="markdown">${c?md(c.md):"<h1>Note not found</h1>"}</article></div></div></main>${footer}`;
  }
  function quizzes(){
    root.innerHTML=header()+`<main class="page"><div class="container"><span class="badge">📝 Quizzes</span><h1 class="page-title">Practice & Score</h1><p class="muted">Admin panel से quizzes create और publish करें.</p><div class="chapter-list">${SG.quizzes.map(q=>`<a class="chapter" href="?page=quiz&id=${q.id}"><div><b>${esc(q.title)}</b><small>${q.questions.length} questions</small></div><strong style="color:var(--primary)">Start →</strong></a>`).join("")}</div></div></main>${footer}`;
  }
  function quiz(id){
    const q=SG.quizzes.find(x=>x.id===id); let state=Array(q?.questions.length||0).fill(-1);
    const render=()=>root.innerHTML=header()+`<main class="page"><div class="container"><a class="btn small" href="?page=quizzes">← Quizzes</a><div class="note-shell" style="margin-top:15px"><h1>${esc(q.title)}</h1>${q.questions.map((x,i)=>`<div class="quiz-question"><h3>${i+1}. ${esc(x.q)}</h3>${x.options.map((o,j)=>`<button class="option ${state[i]===j?"selected":""}" data-i="${i}" data-j="${j}">${String.fromCharCode(65+j)}. ${esc(o)}</button>`).join("")}</div>`).join("")}<button class="btn primary" id="submitQuiz">Submit Quiz</button><div id="result"></div></div></div></main>${footer}`;
    root.querySelectorAll(".option").forEach(b=>b.onclick=()=>{state[+b.dataset.i]=+b.dataset.j;render()});
    const sub=root.querySelector("#submitQuiz"); if(sub)sub.onclick=()=>{let score=0;q.questions.forEach((x,i)=>score+=state[i]===x.answer);root.querySelector("#result").innerHTML=`<div class="result"><h3>Score: ${score}/${q.questions.length}</h3><p>आपका result calculate हो गया। ${q.questions.map((x,i)=>state[i]===x.answer?"":"<br>❌ "+esc(x.explanation||"Explanation available in admin.")).join("")}</p></div>`};
  }
  const p=new URLSearchParams(location.search), page=p.get("page");
  if(!page)home(); else if(page==="subject")subject(p.get("id")); else if(page==="note")note(p.get("id")); else if(page==="quizzes")quizzes(); else if(page==="quiz")quiz(p.get("id")); else home();
})();