// ===== الطلاب =====
const students = [
  {code:"KING1", pass:"1111", name:"يحيى حسين"},
  {code:"KING2", pass:"2222", name:"زياد إيهاب"},
  {code:"KING3", pass:"3333", name:"عمر سعيد"}
];

let current = null;

// ===== حفظ الجلسة عند تحميل الصفحة =====
window.onload = () => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  const savedPage = localStorage.getItem("currentPage");

  if(savedUser){
    current = savedUser;
    document.getElementById("studentName").innerText = "أهلاً " + current.name;
    showPage(savedPage || "dashboard");
  } else {
    showPage("login");
  }

  // load saved theme
  if(localStorage.getItem("theme")==="light") document.body.classList.add("light");
};

// ===== تسجيل الدخول =====
function login() {
  const c = document.getElementById("code").value.trim();
  const p = document.getElementById("pass").value.trim();
  const s = students.find(x=>x.code===c && x.pass===p);
  if(s){
    current = s;
    localStorage.setItem("currentUser", JSON.stringify(current));
    document.getElementById("studentName").innerText = "أهلاً " + s.name;
    showPage("dashboard");
  } else {
    alert("كود أو كلمة المرور غير صحيحة");
  }
}

// ===== تسجيل الخروج =====
function logout() {
  current=null;
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentPage");
  showPage("login");
}

// ===== اظهار صفحة واحدة =====
function showPage(pageId){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.querySelectorAll(".lesson-page").forEach(p=>p.classList.add("hidden"));
  document.getElementById("lessonsMain")?.classList.add("hidden");

  if(pageId.startsWith("lesson")){
    document.getElementById(pageId).classList.remove("hidden");
  } else if(pageId === "lessons"){
    document.getElementById("lessonsMain").classList.remove("hidden");
  } else {
    document.getElementById(pageId).classList.remove("hidden");
  }

  localStorage.setItem("currentPage", pageId);
}

// ===== عرض درس من الحصص =====
function showLesson(id){
  showPage(id);
}

// ===== Dark/Light Mode =====
function toggleMode(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

// ===== Leaderboard =====
function updateLeaderboard() {
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  students.forEach(s=>{
    const li = document.createElement("li");
    li.innerText = s.name;
    list.appendChild(li);
  });
}

// ===== تشغيل / إغلاق الفيديو =====
function toggleVideo(videoId, btn){
  const container = btn.nextElementSibling;
  const iframe = container.querySelector("iframe");
  if(container.classList.contains("hidden")){
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    container.classList.remove("hidden");
    btn.innerText = "❌ إغلاق الفيديو";
  } else {
    iframe.src = "";
    container.classList.add("hidden");
    btn.innerText = "▶ تشغيل/إغلاق الفيديو";
  }
}

// ===== Dashboard buttons =====
document.getElementById("btnLessons").onclick = () => showPage("lessons");
document.getElementById("btnExams").onclick = () => showPage("exams");
document.getElementById("btnLeaderboard").onclick = () => { showPage("leaderboard"); updateLeaderboard(); }
