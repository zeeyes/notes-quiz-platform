/* Local demo data. In production, replace the persistence layer with Supabase. */
window.SG = {
  config: { brand:"StudyGaurav" },
  settings: JSON.parse(localStorage.getItem("sg_settings") || "null") || {
    primary:"#2563eb", secondary:"#7c3aed", bg:"#f6f8fc", text:"#111827",
    font:"Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    radius:18, shadow:"0 14px 40px rgba(15,23,42,.08)"
  },
  subjects: JSON.parse(localStorage.getItem("sg_subjects") || "null") || [
    {id:"history",name:"History",icon:"📜",desc:"Chapter-wise History Markdown notes."},
    {id:"polity",name:"Polity",icon:"⚖️",desc:"Chapter-wise Polity Markdown notes."}
  ],
  chapters: JSON.parse(localStorage.getItem("sg_chapters") || "null") || [
    {id:"h-0-1",subject:"history",title:"गुप्त साम्राज्य",md:"# गुप्त साम्राज्य\n\n- राजनीतिक एकता का पतन\n- स्थिरता के प्रयास\n- गुप्त राजवंश का उदय\n\n## गुप्तों की उत्पत्ति एवं विभिन्न विद्वानों के मत\n\nयहाँ आपकी पूरी Markdown note दिखाई देगी।\n\n### उदाहरण\n\n| विषय | विवरण |\n|---|---|\n| काल | गुप्त काल |\n| स्रोत | शिलालेख एवं साहित्य |"},
    {id:"h-0-2",subject:"history",title:"गुप्त वंश के आदिपुरुष (प्रारम्भिक शासक)",md:"# गुप्त वंश के आदिपुरुष\n\nअपनी `.md` file Admin → Notes से upload करें।"},
    {id:"h-0-3",subject:"history",title:"चन्द्रगुप्त प्रथम (319 ई. – 350 ई.)",md:"# चन्द्रगुप्त प्रथम\n\nयहाँ chapter note आएगी।"}
  ],
  quizzes: JSON.parse(localStorage.getItem("sg_quizzes") || "null") || [
    {id:"q1",subject:"history",title:"History Demo Quiz",questions:[
      {q:"गुप्त काल को किस नाम से भी जाना जाता है?",options:["स्वर्ण युग","लौह युग","आधुनिक युग","वैदिक युग"],answer:0,explanation:"यह demo question है।"}
    ]}
  ],
  users: JSON.parse(localStorage.getItem("sg_users") || "null") || [
    {name:"Demo Student",email:"student@example.com",score:84,attempts:8,status:"Active"},
    {name:"Sample User",email:"user@example.com",score:72,attempts:5,status:"Active"}
  ],
  save(){
    localStorage.setItem("sg_settings",JSON.stringify(this.settings));
    localStorage.setItem("sg_subjects",JSON.stringify(this.subjects));
    localStorage.setItem("sg_chapters",JSON.stringify(this.chapters));
    localStorage.setItem("sg_quizzes",JSON.stringify(this.quizzes));
    localStorage.setItem("sg_users",JSON.stringify(this.users));
  }
};