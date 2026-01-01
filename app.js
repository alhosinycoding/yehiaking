// ===== الطلاب =====
const students = [
  {code:"KING1", pass:"1111", name:"يحيى حسين"},
  {code:"KING2", pass:"2222", name:"زياد إيهاب"},
  {code:"KING3", pass:"3333", name:"عمر سعيد"}
];

let current = null;

// ===== تسجيل الدخول =====
function login() {
  const c = document.getElementById("code").value.trim();
  const p = document.getElementById("pass").value.trim();
  const s = students.find(x => x.code === c && x.pass === p);
  if (s) {
    current = s;
    document.getElementById("studentName").innerText = "أهلاً " + s.name;
    showPage("dashboard");
  } else {
    alert("كود أو كلمة المرور غير صحيحة");
  }
}

// ===== تسجيل الخروج =====
function logout() {
  current = null;
  showPage("login");
}

// ===== اظهار صفحة واحدة فقط =====
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
  if (pageId === "leaderboard") updateLeaderboard();
}

// ===== Dark/Light Mode =====
function toggleMode() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

// load saved theme
if (localStorage.getItem("theme") === "light") document.body.classList.add("light");

// ===== Leaderboard =====
function updateLeaderboard() {
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.innerText = s.name;
    list.appendChild(li);
  });
}

// ===== تشغيل الفيديو =====
function playVideo(id, btn) {
  const container = btn.nextElementSibling;
  const iframe = container.querySelector("iframe");
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  container.classList.remove("hidden");
  btn.style.display = "none";
}

// Buttons
document.getElementById("btnLessons").onclick = () => showPage("lessons");
document.getElementById("btnExams").onclick = () => showPage("exams");
document.getElementById("btnLeaderboard").onclick = () => showPage("leaderboard");
