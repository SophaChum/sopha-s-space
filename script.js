var ic = function (n, c) {
  return '<svg class="i ' + (c || "") + '"><use href="#i-' + n + '"/></svg>';
};
var tabs = [
  ["home", "home", "ទំព័រដើម"],
  ["skills", "zap", "ជំនាញ"],
  ["projects", "folder", "គម្រោង"],
  ["education", "cap", "ការសិក្សា និងបទពិសោធន៍"],
  ["contact", "mail", "ទំនាក់ទំនង"],
  ["books", "book", "ជ្រុងសៀវភៅ"],
  ["notes", "note", "កំណត់ត្រាសិស្ស"],
];
var navEl = document.getElementById("nav");
navEl.innerHTML =
  tabs
    .map(function (t) {
      return (
        '<a href="#' +
        t[0] +
        '" data-t="' +
        t[0] +
        '">' +
        ic(t[1]) +
        t[2] +
        "</a>"
      );
    })
    .join("") +
  '<button id="themeToggle" class="theme-btn" type="button" aria-label="ប្តូរពន្លឺ/ងងឹត"></button>';

/* Light/Dark Theme Switcher (Light by default) */
var root = document.documentElement;
var tBtn = document.getElementById("themeToggle");
var savedTheme = localStorage.getItem("sopha-theme") || "light";

function applyTheme(mode) {
  root.setAttribute("data-theme", mode);
  tBtn.innerHTML = ic(mode === "dark" ? "sun" : "moon");
  tBtn.title = mode === "dark" ? "ប្តូរទៅផ្ទៃភ្លឺ" : "ប្តូរទៅផ្ទៃងងឹត";
  localStorage.setItem("sopha-theme", mode);
}

applyTheme(savedTheme);
tBtn.onclick = function () {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
};
function route() {
  var h = (location.hash || "#home").slice(1);
  if (
    !tabs.some(function (t) {
      return t[0] === h;
    })
  )
    h = "home";
  tabs.forEach(function (t) {
    document.getElementById(t[0]).hidden = t[0] !== h;
  });
  document.querySelectorAll("nav a").forEach(function (a) {
    a.toggleAttribute("aria-current", a.dataset.t === h);
    if (a.dataset.t === h) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
document.getElementById("yr").textContent = new Date().getFullYear();

/* slider */
var cur = 0,
  n = 2,
  timer;
var dots = document.getElementById("dots");
dots.innerHTML = [0, 1]
  .map(function (i) {
    return (
      '<button aria-label="ស្លាយ ' + (i + 1) + '" data-i="' + i + '"></button>'
    );
  })
  .join("");
function go(i) {
  cur = (i + n) % n;
  document.getElementById("track").style.transform =
    "translateX(-" + cur * 100 + "%)";
  dots.querySelectorAll("button").forEach(function (b, k) {
    b.setAttribute("aria-current", k === cur);
  });
}
function auto() {
  clearInterval(timer);
  timer = setInterval(function () {
    go(cur + 1);
  }, 5000);
}
document.getElementById("prev").onclick = function () {
  go(cur - 1);
  auto();
};
document.getElementById("next").onclick = function () {
  go(cur + 1);
  auto();
};
dots.onclick = function (e) {
  if (e.target.dataset.i) {
    go(+e.target.dataset.i);
    auto();
  }
};
go(0);
auto();

/* avatar */
var av = document.getElementById("avatar"),
  fi = document.getElementById("file");
av.onclick = function () {
  fi.click();
};
fi.onchange = function () {
  var f = fi.files[0];
  if (!f) return;
  var r = new FileReader();
  r.onload = function () {
    av.innerHTML = '<img alt="រូបថតប្រវត្តិរូប" src="' + r.result + '">';
  };
  r.readAsDataURL(f);
};

/* data */
var skills = [
  [
    "book",
    "វិធីសាស្ត្របង្រៀន",
    "រៀបចំមេរៀន និងបង្រៀនភាសាអង់គ្លេស រួមជាមួយ ICT សម្រាប់សិស្សកម្រិតមូលដ្ឋានប្រកបដោយប្រសិទ្ធភាព។",
    ["English Teaching", "ICT", "រៀបចំកិច្ចតែងការបង្រៀន", "វាយតម្លៃសិស្ស"],
    true,
  ],
  [
    "code",
    "ការអភិវឌ្ឍវេបសាយ និង EdTech",
    "រចនា និងបង្កើតគេហទំព័រ ព្រមទាំងកម្មវិធីគ្រប់គ្រងសាលា និងសិស្សជាភាសាខ្មែរ។",
    ["HTML", "CSS", "JavaScript", "Supabase", "UI/UX"],
    true,
  ],
  [
    "user",
    "ការគ្រប់គ្រងទិន្នន័យសិស្ស",
    "គ្រប់គ្រងព័ត៌មានសិស្ស វត្តមាន និងលទ្ធផលសិក្សាឱ្យមានរបៀបរៀបរយ។",
    ["Database", "របាយការណ៍សិក្សា", "Excel / Sheets"],
    false,
  ],
  [
    "img",
    "ការរចនាក្រាហ្វិក",
    "រចនាផ្ទាំងផ្សព្វផ្សាយ ឯកសារ និងសម្ភារៈបង្រៀនសម្រាប់សាលារៀន។",
    ["Poster", "សម្ភារៈបង្រៀន", "Layout Design"],
    false,
  ],
  [
    "brief",
    "រដ្ឋបាលទូទៅ",
    "ធ្វើការងាររដ្ឋបាលទូទៅ រៀបចំលិខិតស្នាម និងគ្រប់គ្រងឯកសារសាលា។",
    ["លិខិតរដ្ឋបាល", "គ្រប់គ្រងឯកសារ"],
    false,
  ],
  [
    "globe",
    "ភាសា",
    "អាចប្រើប្រាស់ និងទំនាក់ទំនងបាន ៣ ភាសាក្នុងការងារ និងការបង្រៀន។",
    ["ភាសាខ្មែរ (ភាសាកំណើត)", "ភាសាអង់គ្លេស", "ភាសាចិន"],
    false,
  ],
  [
    "zap",
    "ទំនាក់ទំនង និងការធ្វើការជាក្រុម",
    "រួសរាយរាក់ទាក់ ស្មោះត្រង់ មានទំនួលខុសត្រូវខ្ពស់ និងបត់បែនតាមកាលៈទេសៈ។",
    ["ភាពជាអ្នកដឹកនាំ", "ការងារជាក្រុម", "ដោះស្រាយបញ្ហា"],
    false,
  ],
];
document.getElementById("skillsGrid").innerHTML = skills
  .map(function (s) {
    var tagsHtml = s[3]
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");

    return (
      '<div class="card sk-card' +
      (s[4] ? " featured" : "") +
      '">' +
      '<div class="sk-top">' +
      '<div class="sk-ico">' +
      ic(s[0]) +
      "</div>" +
      (s[4] ? '<span class="sk-badge">ជំនាញស្នូល</span>' : "") +
      "</div>" +
      "<h3>" +
      s[1] +
      "</h3>" +
      "<p>" +
      s[2] +
      "</p>" +
      '<div class="tags">' +
      tagsHtml +
      "</div>" +
      "</div>"
    );
  })
  .join("");

var defaultProjects = [
  {
    title: "ប្រព័ន្ធគ្រប់គ្រងសាលារៀន",
    description: "ប្រព័ន្ធជាភាសាខ្មែរសម្រាប់គ្រប់គ្រងសិស្ស ថ្នាក់ វត្តមាន ពិន្ទុ និងតួនាទីអ្នកប្រើ។",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "រចនា និងអភិវឌ្ឍប្រព័ន្ធទាំងមូល។",
    project_url: "",
    image_url: "",
  },
  {
    title: "កម្មវិធីគ្រប់គ្រងសិស្សសម្រាប់គ្រូ",
    description: "កត់វត្តមាន ពិន្ទុ កំណត់ត្រា និងបង្កើតលិខិតអញ្ជើញមាតាបិតាជាភាសាខ្មែរ។",
    technologies: ["JavaScript", "Supabase"],
    role: "រចនា និងអភិវឌ្ឍកម្មវិធីទាំងមូល។",
    project_url: "",
    image_url: "",
  },
  {
    title: "គេហទំព័រអនុវត្តន៍ប្រឡងភាសាអង់គ្លេស",
    description: "គេហទំព័រអនុវត្តន៍ប្រឡងភាសាអង់គ្លេសតាមទម្រង់ប្រឡងបាក់ឌុប។",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "រចនា សរសេរសំណួរ និងបង្កើតគេហទំព័រ។",
    project_url: "",
    image_url: "",
  },
];
renderProjects(defaultProjects);

var edu = [
  [
    "brief",
    "បទពិសោធន៍ការងារ",
    "exp",
    [
      [
        "ប្រធានក្រុមបច្ចេកវិទ្យា",
        "សាលាឧត្តមវិជ្ជា",
        "២០២៦ - បច្ចុប្បន្ន",
        true,
      ],
      [
        "គ្រូបង្គោលវគ្គបំប៉នជំនាញកុំព្យូទ័រ ជូនកងរាជអាវុធហត្ថខេត្តតាកែវ",
        "មជ្ឈមណ្ឌលគរុកោសល្យភូមិភាគខេត្តតាកែវ",
        "២០២៦ - បច្ចុប្បន្ន",
        true,
      ],
    ],
  ],
  [
    "book",
    "បទពិសោធន៍បង្រៀន",
    "exp",
    [
      [
        "គ្រូបង្រៀនកម្រិតមូលដ្ឋាន ICT-អង់គ្លេស",
        "មជ្ឈមណ្ឌលគរុកោសល្យភូមិភាគខេត្តតាកែវ",
        "២០២៤ - ២០២៦",
        false,
      ],
      [
        "កម្មសិក្សា ICT និងភាសាអង់គ្លេស ថ្នាក់ទី៨",
        "វិទ្យាល័យសម្តេចក្រុមព្រះអង្គរនាប",
        "ខែតុលា ២០២៥ - ខែសីហា ២០២៦",
        false,
      ],
      [
        "គ្រូបង្រៀនក្រៅម៉ោងភាសាចិន",
        "សាលាអន្តរជាតិស្កាយឡាញន៍",
        "ខែកញ្ញា ២០២៣ - ខែមិថុនា ២០២៤",
        false,
      ],
    ],
  ],
  [
    "cap",
    "ប្រវត្តិសិក្សា",
    "edu",
    [
      [
        "បរិញ្ញាបត្រសិល្បៈ ជំនាញវិធីសាស្ត្របង្រៀនភាសាអង់គ្លេស",
        "សាកលវិទ្យាល័យបញ្ញាសាស្ត្រកម្ពុជា",
        "២០១៩ - ២០២៤",
        false,
      ],
      [
        "ភាសាចិនទូទៅ",
        "វិទ្យាស្ថានអន្តរជាតិ កម្ពុជា-អាស៊ាន",
        "២០២០ - ២០២៣",
        false,
      ],
      [
        "សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ",
        "វិទ្យាល័យសម្តេចក្រុមព្រះអង្គរនាប",
        "២០១៦ - ២០១៩",
        false,
      ],
    ],
  ],
  [
    "user",
    "វគ្គបណ្តុះបណ្តាល",
    "edu",
    [
      [
        "វគ្គបណ្តុះបណ្តាលគ្រូបង្រៀនកម្រិតមូលដ្ឋាន ១២ + ២",
        "មជ្ឈមណ្ឌលគរុកោសល្យភូមិភាគខេត្តតាកែវ",
        "បានបញ្ចប់",
        false,
      ],
    ],
  ],
  [
    "award",
    "វិញ្ញាបនបត្រ និងសមិទ្ធផល",
    "edu",
    [
      [
        "បរិញ្ញាបត្រសិល្បៈ ជំនាញវិធីសាស្ត្របង្រៀនភាសាអង់គ្លេស",
        "សាកលវិទ្យាល័យបញ្ញាសាស្ត្រកម្ពុជា",
        "២០២៤",
        false,
      ],
    ],
  ],
];

function renderGroup(g) {
  return (
    '<div class="group">' +
    '<div class="g-head">' +
    '<div class="g-ico">' +
    ic(g[0]) +
    "</div>" +
    "<h3>" +
    g[1] +
    "</h3>" +
    "</div>" +
    '<div class="timeline">' +
    g[3]
      .map(function (x) {
        return (
          '<div class="tl-item' +
          (x[3] ? " active" : "") +
          '">' +
          '<div class="tl-card">' +
          '<div class="tl-top">' +
          "<b>" +
          x[0] +
          "</b>" +
          '<span class="tl-date' +
          (x[3] ? " now" : "") +
          '">' +
          x[2] +
          "</span>" +
          "</div>" +
          '<div class="tl-org">' +
          x[1] +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("") +
    "</div>" +
    "</div>"
  );
}

function drawEdu(filter) {
  var list = edu.filter(function (g) {
    return filter === "all" || g.at(2) === filter;
  });

  var tabsHtml =
    '<div class="edu-tabs" role="tablist">' +
    '<button type="button" class="edu-tab' +
    (filter === "all" ? " active" : "") +
    '" data-f="all">ទាំងអស់</button>' +
    '<button type="button" class="edu-tab' +
    (filter === "exp" ? " active" : "") +
    '" data-f="exp">បទពិសោធន៍ការងារ និងបង្រៀន</button>' +
    '<button type="button" class="edu-tab' +
    (filter === "edu" ? " active" : "") +
    '" data-f="edu">ការសិក្សា និងវិញ្ញាបនបត្រ</button>' +
    "</div>";

  var groupsHtml = list
    .map(function (g) {
      return (
        '<div class="group">' +
        '<div class="g-head">' +
        '<div class="g-ico">' +
        ic(g.at(0)) +
        "</div>" +
        "<h3>" +
        g.at(1) +
        "</h3>" +
        "</div>" +
        '<div class="timeline">' +
        g
          .at(3)
          .map(function (x) {
            return (
              '<div class="tl-item' +
              (x.at(3) ? " active" : "") +
              '">' +
              '<div class="tl-card">' +
              '<div class="tl-top">' +
              "<b>" +
              x.at(0) +
              "</b>" +
              '<span class="tl-date' +
              (x.at(3) ? " now" : "") +
              '">' +
              x.at(2) +
              "</span>" +
              "</div>" +
              '<div class="tl-org">' +
              x.at(1) +
              "</div>" +
              "</div>" +
              "</div>"
            );
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  var wrap = document.getElementById("eduWrap");
  wrap.innerHTML =
    tabsHtml + '<div class="edu-single">' + groupsHtml + "</div>";

  wrap.querySelectorAll(".edu-tab").forEach(function (btn) {
    btn.onclick = function () {
      drawEdu(btn.dataset.f);
    };
  });
}

drawEdu("all");

var defaultBooks = [];
renderBooks(defaultBooks);

/* =========================================================
   Student Notes – Supabase-backed posts, admin editing & views
   Configure SUPABASE_URL and SUPABASE_ANON_KEY below.
   Never put a Supabase service-role key in browser code.
   ========================================================= */
var SUPABASE_CONFIG = window.SOPHA_SUPABASE_CONFIG || {};
var SUPABASE_URL = SUPABASE_CONFIG.url || "https://jamycbsrhvhtmfjqxcbk.supabase.co";
var SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey || "sb_publishable_ENvDnaGyfrP7-hd_MHHzmQ_mC3zK7Vt";

// Give the homepage a stable canonical URL without the current tab hash.
(function setHomeCanonical() {
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = window.location.origin + window.location.pathname;
})();
var SUPABASE_BUCKET = "student-note-images";

var supabaseClient = null;
var notes = [];
var currentImg = "";
var clearExistingImage = false;
var activeTag = "all";
var editingNoteId = null;
var isNoteAdmin = false;
var viewsTrackedThisPage = Object.create(null);

var noteForm = document.getElementById("noteForm");
var noteLoginForm = document.getElementById("noteLoginForm");
var noteAdminTools = document.getElementById("noteAdminTools");
var noteEditor = document.getElementById("noteEditor");
var noteStatus = document.getElementById("noteStatus");
var nImg = document.getElementById("nImg");
var nPickBtn = document.getElementById("nPickBtn");
var nPreview = document.getElementById("nPreview");
var nPrevImg = document.getElementById("nPrevImg");
var nClearImg = document.getElementById("nClearImg");
var noteSubmitBtn = document.getElementById("noteSubmitBtn");
var cancelNoteEditBtn = document.getElementById("cancelNoteEditBtn");
var importLegacyBtn = document.getElementById("importLegacyBtn");

function setNoteStatus(message, type) {
  if (!noteStatus) return;
  noteStatus.textContent = message || "";
  noteStatus.className = "note-status" + (type ? " " + type : "");
}

function hasSupabaseConfig() {
  return SUPABASE_URL.indexOf("YOUR_") === -1 &&
    SUPABASE_ANON_KEY.indexOf("YOUR_") === -1 &&
    window.supabase && typeof window.supabase.createClient === "function";
}

function getVisitorId() {
  var key = "sopha-note-visitor-id";
  var id = localStorage.getItem(key);
  var validUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!id || !validUuid.test(id)) {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      id = window.crypto.randomUUID();
    } else {
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
        var random = Math.floor(Math.random() * 16);
        var value = char === "x" ? random : (random & 3) | 8;
        return value.toString(16);
      });
    }
    localStorage.setItem(key, id);
  }
  return id;
}

function formatNoteDate(value) {
  if (!value) return "";
  var date = new Date(value);
  if (isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("km-KH", {
    year: "numeric", month: "short", day: "numeric"
  });
}

function compressImage(file, callback) {
  var reader = new FileReader();
  reader.onerror = function () {
    setNoteStatus("មិនអាចអានរូបភាពនេះបានទេ។ សូមសាកល្បងម្ដងទៀត។", "error");
  };
  reader.onload = function (ev) {
    var img = new Image();
    img.onerror = function () {
      setNoteStatus("រូបភាពមិនត្រឹមត្រូវទេ។ សូមជ្រើសរើសរូបភាពផ្សេង។", "error");
    };
    img.onload = function () {
      var maxW = 1200;
      var scale = img.width > maxW ? maxW / img.width : 1;
      var canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.78));
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function resetPreview() {
  currentImg = "";
  if (nImg) nImg.value = "";
  if (nPreview) nPreview.hidden = true;
  if (nPrevImg) nPrevImg.removeAttribute("src");
}

function resetNoteEditor() {
  if (noteForm) noteForm.reset();
  editingNoteId = null;
  clearExistingImage = false;
  resetPreview();
  if (noteSubmitBtn) noteSubmitBtn.textContent = "រក្សាទុកកំណត់ត្រា";
  if (cancelNoteEditBtn) cancelNoteEditBtn.hidden = true;
}

if (nPickBtn) nPickBtn.onclick = function () { nImg.click(); };
if (nClearImg) nClearImg.onclick = function () {
  resetPreview();
  if (editingNoteId) clearExistingImage = true;
};
if (nImg) {
  nImg.onchange = function () {
    var file = nImg.files && nImg.files[0];
    if (!file) return;
    if (!file.type || file.type.indexOf("image/") !== 0) {
      setNoteStatus("សូមជ្រើសរើសឯកសាររូបភាព។", "error");
      nImg.value = "";
      return;
    }
    var submitBtn = noteForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    compressImage(file, function (dataUrl) {
      currentImg = dataUrl;
      clearExistingImage = false;
      nPrevImg.src = dataUrl;
      nPreview.hidden = false;
      if (submitBtn) submitBtn.disabled = false;
      setNoteStatus("រូបភាពត្រូវបានជ្រើសរើសរួចរាល់។", "success");
    });
  };
}

function updateAdminInterface() {
  if (noteLoginForm) noteLoginForm.hidden = isNoteAdmin;
  if (noteAdminTools) noteAdminTools.hidden = !isNoteAdmin;
  if (noteEditor) noteEditor.hidden = !isNoteAdmin;
  if (importLegacyBtn) {
    var legacy = [];
    try { legacy = JSON.parse(localStorage.getItem("sopha-notes") || "[]"); }
    catch (e) { legacy = []; }
    importLegacyBtn.hidden = !isNoteAdmin || !legacy.length ||
      localStorage.getItem("sopha-notes-imported-v1") === "yes";
  }
  if (typeof updatePortfolioAdminInterface === "function") updatePortfolioAdminInterface();
  if (typeof renderBooks === "function" && typeof portfolioBooks !== "undefined") renderBooks(portfolioBooks);
  if (typeof renderProjects === "function" && typeof portfolioProjects !== "undefined") renderProjects(portfolioProjects);
}

async function verifyNoteAdmin(user) {
  var result = await supabaseClient
    .from("note_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (result.error) throw result.error;
  if (!result.data) {
    await supabaseClient.auth.signOut();
    isNoteAdmin = false;
    updateAdminInterface();
    throw new Error("គណនីនេះមិនទាន់មានសិទ្ធិគ្រប់គ្រងកំណត់ត្រាទេ។");
  }
  isNoteAdmin = true;
  updateAdminInterface();
}

async function loadNoteViewCounts() {
  var result = await supabaseClient.rpc("get_student_note_view_counts");
  if (result.error) {
    console.warn("Could not load note view counts:", result.error.message);
    return Object.create(null);
  }
  var counts = Object.create(null);
  (result.data || []).forEach(function (row) {
    counts[row.note_id] = Number(row.view_count || 0);
  });
  return counts;
}

async function loadNoteDownloadCounts() {
  var result = await supabaseClient.rpc("get_student_note_download_counts");
  if (result.error) {
    console.warn("Could not load note download counts:", result.error.message);
    return Object.create(null);
  }
  var counts = Object.create(null);
  (result.data || []).forEach(function (row) {
    counts[row.note_id] = Number(row.download_count || 0);
  });
  return counts;
}

async function loadNotes() {
  var list = document.getElementById("noteList");
  if (list) list.innerHTML = '<p class="muted">កំពុងទាញយកកំណត់ត្រា...</p>';
  var result = await supabaseClient
    .from("student_notes")
    .select("id, title, class_tag, body, source_credit, image_path, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;

  var counts = await loadNoteViewCounts();
  var downloads = await loadNoteDownloadCounts();
  notes = (result.data || []).map(function (row) {
    var imageUrl = "";
    if (row.image_path) {
      imageUrl = supabaseClient.storage.from(SUPABASE_BUCKET)
        .getPublicUrl(row.image_path).data.publicUrl;
    }
    return {
      id: row.id,
      title: row.title,
      tag: row.class_tag,
      body: row.body,
      source_credit: row.source_credit || "",
      image_path: row.image_path,
      image_url: imageUrl,
      created_at: row.created_at,
      updated_at: row.updated_at,
      view_count: counts[row.id] || 0,
      download_count: downloads[row.id] || 0
    };
  }).sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  drawNotes();
  renderHomeLatestNotes();
}

function drawNoteFilters() {
  var bar = document.getElementById("noteFilters");
  if (!bar) return;
  bar.innerHTML = "";

  var tags = [];
  notes.forEach(function (note) {
    if (note.tag && tags.indexOf(note.tag) === -1) tags.push(note.tag);
  });
  if (activeTag !== "all" && tags.indexOf(activeTag) === -1) activeTag = "all";

  var allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "edu-tab" + (activeTag === "all" ? " active" : "");
  allButton.textContent = "ទាំងអស់ (" + notes.length + ")";
  allButton.onclick = function () { activeTag = "all"; drawNotes(); };
  bar.appendChild(allButton);

  tags.forEach(function (tag) {
    var count = notes.filter(function (note) { return note.tag === tag; }).length;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "edu-tab" + (activeTag === tag ? " active" : "");
    button.textContent = tag + " (" + count + ")";
    button.onclick = function () { activeTag = tag; drawNotes(); };
    bar.appendChild(button);
  });
}

async function trackNoteView(note, viewElement) {
  if (!supabaseClient || viewsTrackedThisPage[note.id]) return;
  viewsTrackedThisPage[note.id] = true;
  var result = await supabaseClient.rpc("record_student_note_view", {
    p_note_id: note.id,
    p_visitor_id: getVisitorId()
  });
  if (result.error) {
    console.warn("Could not record note view:", result.error.message);
    return;
  }
  note.view_count = Number(result.data || 0);
  document.querySelectorAll('[data-note-view-count="' + note.id + '"]').forEach(function (el) {
    el.innerHTML = ic("eye") + '<span>' + note.view_count + ' views</span>';
  });
  if (viewElement) viewElement.innerHTML = ic("eye") + '<span>' + note.view_count + ' views</span>';
}

async function trackNoteDownload(note, button) {
  if (!supabaseClient || !note.image_url) return;
  if (button) button.disabled = true;
  try {
    var fileName = (note.title || "student-note").replace(/[^a-z0-9\u1780-\u17ff_-]+/gi, "-").replace(/^-+|-+$/g, "") || "student-note";
    var separator = note.image_url.indexOf("?") >= 0 ? "&" : "?";
    var downloadUrl = note.image_url + separator + "download=" + encodeURIComponent(fileName + ".jpg");
    var anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.download = fileName + ".jpg";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    var result = await supabaseClient.rpc("record_student_note_download", {
      p_note_id: note.id,
      p_visitor_id: getVisitorId()
    });
    if (result.error) throw result.error;
    note.download_count = Number(result.data || 0);
    document.querySelectorAll('[data-note-download-count="' + note.id + '"]').forEach(function (el) {
      el.innerHTML = ic("download") + '<span>' + note.download_count + ' downloads</span>';
    });
  } catch (error) {
    console.warn("Could not record note download:", error.message);
  } finally {
    if (button) button.disabled = false;
  }
}

var imageLightbox = document.getElementById("imageLightbox");
var lightboxImage = document.getElementById("lightboxImage");
var lightboxZoomLabel = document.getElementById("lightboxZoomReset");
var lightboxDownloadButton = document.getElementById("lightboxDownload");
var activeLightboxNote = null;
var lightboxScale = 1;
function setLightboxScale(nextScale) {
  lightboxScale = Math.min(4, Math.max(0.5, nextScale));
  if (lightboxImage) lightboxImage.style.transform = "scale(" + lightboxScale + ")";
  if (lightboxZoomLabel) lightboxZoomLabel.textContent = Math.round(lightboxScale * 100) + "%";
}
function openImageLightbox(url, title, note) {
  if (!imageLightbox || !lightboxImage || !url) return;
  activeLightboxNote = note || null;
  if (lightboxDownloadButton) lightboxDownloadButton.hidden = !activeLightboxNote;
  lightboxImage.src = url;
  lightboxImage.alt = title || "រូបភាពកំណត់ត្រា";
  document.getElementById("lightboxTitle").textContent = title || "រូបភាពកំណត់ត្រា";
  setLightboxScale(1);
  if (typeof imageLightbox.showModal === "function") imageLightbox.showModal();
  else imageLightbox.setAttribute("open", "open");
}
if (imageLightbox) {
  document.getElementById("lightboxZoomIn").onclick = function () { setLightboxScale(lightboxScale + 0.25); };
  document.getElementById("lightboxZoomOut").onclick = function () { setLightboxScale(lightboxScale - 0.25); };
  document.getElementById("lightboxZoomReset").onclick = function () { setLightboxScale(1); };
  if (lightboxDownloadButton) lightboxDownloadButton.onclick = function () {
    if (activeLightboxNote) trackNoteDownload(activeLightboxNote, lightboxDownloadButton);
  };
  document.getElementById("lightboxClose").onclick = function () { imageLightbox.close(); };
  imageLightbox.addEventListener("click", function (event) {
    if (event.target === imageLightbox) imageLightbox.close();
  });
  imageLightbox.addEventListener("close", function () {
    lightboxImage.removeAttribute("src");
    activeLightboxNote = null;
    setLightboxScale(1);
  });
}

function observeNoteView(card, note, viewElement) {
  if (!("IntersectionObserver" in window)) {
    trackNoteView(note, viewElement);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var cardHeight = entry.boundingClientRect.height || card.offsetHeight || 1;
      var visibleTarget = Math.min(cardHeight * 0.5, window.innerHeight * 0.5);
      var enoughVisible = entry.intersectionRect && entry.intersectionRect.height >= visibleTarget;
      if (entry.isIntersecting && enoughVisible) {
        observer.unobserve(card);
        trackNoteView(note, viewElement);
      }
    });
  }, { threshold: [0.1, 0.25, 0.5] });
  observer.observe(card);
}

function drawNotes() {
  drawNoteFilters();
  var list = document.getElementById("noteList");
  if (!list) return;
  list.innerHTML = "";

  var visible = activeTag === "all"
    ? notes
    : notes.filter(function (note) { return note.tag === activeTag; });

  if (!visible.length) {
    var empty = document.createElement("p");
    empty.className = "muted note-empty";
    empty.textContent = "មិនទាន់មានកំណត់ត្រាសម្រាប់ថ្នាក់នេះទេ។";
    list.appendChild(empty);
    return;
  }

  visible.forEach(function (note) {
    var card = document.createElement("article");
    card.className = "card note";
    card.setAttribute("data-note-id", note.id);

    if (note.image_url) {
      var imageButton = document.createElement("button");
      imageButton.type = "button";
      imageButton.className = "note-image-button";
      imageButton.setAttribute("aria-label", "ពង្រីករូបភាព៖ " + note.title);
      var image = document.createElement("img");
      image.className = "note-img";
      image.src = note.image_url;
      image.alt = note.title;
      image.loading = "lazy";
      image.decoding = "async";
      imageButton.appendChild(image);
      imageButton.onclick = function () { openImageLightbox(note.image_url, note.title, note); };
      card.appendChild(imageButton);
      var zoomHint = document.createElement("span");
      zoomHint.className = "note-image-hint";
      zoomHint.innerHTML = ic("zoom-in") + " ពង្រីករូបភាព";
      card.appendChild(zoomHint);
    }

    var meta = document.createElement("div");
    meta.className = "note-meta";
    if (note.tag) {
      var badge = document.createElement("span");
      badge.className = "tag";
      badge.textContent = note.tag;
      meta.appendChild(badge);
    }
    var time = document.createElement("time");
    time.textContent = formatNoteDate(note.created_at);
    meta.appendChild(time);
    card.appendChild(meta);

    var title = document.createElement("h3");
    title.textContent = note.title;
    card.appendChild(title);

    var body = document.createElement("p");
    body.className = "note-body";
    body.textContent = note.body;
    card.appendChild(body);

    if (note.source_credit) {
      var source = document.createElement("p");
      source.className = "note-source-credit";
      source.textContent = "ប្រភព៖ " + note.source_credit;
      card.appendChild(source);
    }

    var detailLink = document.createElement("a");
    detailLink.className = "note-detail-link";
    detailLink.href = "note.html?id=" + encodeURIComponent(note.id);
    detailLink.textContent = "មើលមេរៀនពេញលេញ";
    card.appendChild(detailLink);

    var footer = document.createElement("div");
    footer.className = "note-card-footer";
    var stats = document.createElement("div");
    stats.className = "note-stats";
    var viewCount = document.createElement("span");
    viewCount.className = "note-stat";
    viewCount.setAttribute("data-note-view-count", note.id);
    viewCount.innerHTML = ic("eye") + '<span>' + (note.view_count || 0) + ' views</span>';
    stats.appendChild(viewCount);
    var downloadCount = document.createElement("span");
    downloadCount.className = "note-stat";
    downloadCount.setAttribute("data-note-download-count", note.id);
    downloadCount.innerHTML = ic("download") + '<span>' + (note.download_count || 0) + ' downloads</span>';
    stats.appendChild(downloadCount);
    footer.appendChild(stats);

    if (note.image_url) {
      var downloadButton = document.createElement("button");
      downloadButton.type = "button";
      downloadButton.className = "btn ghost note-action note-download";
      downloadButton.innerHTML = ic("download") + " ទាញយករូបភាព";
      downloadButton.onclick = function () { trackNoteDownload(note, downloadButton); };
      footer.appendChild(downloadButton);
    }

    if (isNoteAdmin) {
      var actions = document.createElement("div");
      actions.className = "note-actions";
      var editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "btn ghost note-action";
      editButton.innerHTML = ic("edit") + " កែសម្រួល";
      editButton.onclick = function () { startNoteEdit(note.id); };
      var deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn ghost note-action note-delete";
      deleteButton.innerHTML = ic("trash") + " លុប";
      deleteButton.onclick = function () { deleteNote(note.id); };
      actions.append(editButton, deleteButton);
      footer.appendChild(actions);
    }
    card.appendChild(footer);
    list.appendChild(card);
    observeNoteView(card, note, viewCount);
  });
}

function startNoteEdit(noteId) {
  if (!isNoteAdmin) return;
  var note = notes.find(function (item) { return item.id === noteId; });
  if (!note) return;
  editingNoteId = note.id;
  clearExistingImage = false;
  document.getElementById("nTitle").value = note.title;
  document.getElementById("nTag").value = note.tag;
  document.getElementById("nBody").value = note.body;
  document.getElementById("nSource").value = note.source_credit || "";
  resetPreview();
  if (note.image_url) {
    nPrevImg.src = note.image_url;
    nPreview.hidden = false;
  }
  noteSubmitBtn.textContent = "រក្សាទុកការកែប្រែ";
  cancelNoteEditBtn.hidden = false;
  setNoteStatus("កំពុងកែសម្រួល៖ " + note.title, "success");
  noteEditor.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function uploadNoteImage(dataUrl) {
  var blob = await fetch(dataUrl).then(function (response) { return response.blob(); });
  var path = "notes/" + (window.crypto && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + "-" + Math.random().toString(36).slice(2)) + ".jpg";
  var result = await supabaseClient.storage.from(SUPABASE_BUCKET).upload(path, blob, {
    contentType: "image/jpeg",
    cacheControl: "3600",
    upsert: false
  });
  if (result.error) throw result.error;
  return path;
}

async function removeNoteImage(path) {
  if (!path) return;
  var result = await supabaseClient.storage.from(SUPABASE_BUCKET).remove([path]);
  if (result.error) console.warn("Could not remove old image:", result.error.message);
}

noteForm.onsubmit = async function (event) {
  event.preventDefault();
  if (!isNoteAdmin) return;

  var titleInput = document.getElementById("nTitle");
  var tagInput = document.getElementById("nTag");
  var bodyInput = document.getElementById("nBody");
  var title = titleInput.value.trim();
  var tag = tagInput.value.trim();
  var body = bodyInput.value.trim();
  if (!title || !tag || !body) return;

  noteSubmitBtn.disabled = true;
  setNoteStatus(editingNoteId ? "កំពុងរក្សាទុកការកែប្រែ..." : "កំពុងបង្ហោះកំណត់ត្រា...", "loading");

  try {
    var wasEditing = Boolean(editingNoteId);
    var previous = editingNoteId
      ? notes.find(function (item) { return item.id === editingNoteId; })
      : null;
    var imagePath = previous ? previous.image_path : null;
    if (currentImg) imagePath = await uploadNoteImage(currentImg);
    else if (clearExistingImage) imagePath = null;

    var payload = {
      title: title,
      class_tag: tag,
      body: body,
      source_credit: document.getElementById("nSource").value.trim(),
      image_path: imagePath,
      updated_at: new Date().toISOString()
    };
    var result;
    if (editingNoteId) {
      result = await supabaseClient.from("student_notes")
        .update(payload).eq("id", editingNoteId).select().single();
    } else {
      result = await supabaseClient.from("student_notes")
        .insert(payload).select().single();
    }
    if (result.error) throw result.error;

    if (previous && previous.image_path && (currentImg || clearExistingImage) && previous.image_path !== imagePath) {
      await removeNoteImage(previous.image_path);
    }
    resetNoteEditor();
    setNoteStatus(wasEditing ? "បានកែប្រែកំណត់ត្រាដោយជោគជ័យ។" : "បានបង្ហោះកំណត់ត្រាដោយជោគជ័យ។", "success");
    await loadNotes();
  } catch (error) {
    console.error(error);
    setNoteStatus("មានបញ្ហាក្នុងការរក្សាទុក៖ " + (error.message || "សូមព្យាយាមម្ដងទៀត។"), "error");
  } finally {
    noteSubmitBtn.disabled = false;
  }
};

if (cancelNoteEditBtn) {
  cancelNoteEditBtn.onclick = function () {
    resetNoteEditor();
    setNoteStatus("បានបោះបង់ការកែសម្រួល។", "");
  };
}

async function deleteNote(noteId) {
  if (!isNoteAdmin) return;
  var note = notes.find(function (item) { return item.id === noteId; });
  if (!note || !window.confirm('តើអ្នកប្រាកដថាចង់លុបកំណត់ត្រា "' + note.title + '" មែនទេ?')) return;
  setNoteStatus("កំពុងលុបកំណត់ត្រា...", "loading");
  var result = await supabaseClient.from("student_notes").delete().eq("id", noteId);
  if (result.error) {
    setNoteStatus("មិនអាចលុបបានទេ៖ " + result.error.message, "error");
    return;
  }
  await removeNoteImage(note.image_path);
  setNoteStatus("បានលុបកំណត់ត្រាដោយជោគជ័យ។", "success");
  await loadNotes();
}

noteLoginForm.onsubmit = async function (event) {
  event.preventDefault();
  if (!supabaseClient) return;
  var email = document.getElementById("noteAdminEmail").value.trim();
  var password = document.getElementById("noteAdminPassword").value;
  var submit = noteLoginForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  setNoteStatus("កំពុងចូលគណនី...", "loading");
  try {
    var result = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
    if (result.error) throw result.error;
    await verifyNoteAdmin(result.data.user);
    noteLoginForm.reset();
    setNoteStatus("បានចូលជាគ្រូគ្រប់គ្រង។ អ្នកអាចបង្ហោះ និងកែសម្រួលកំណត់ត្រាបាន។", "success");
    drawNotes();
  } catch (error) {
    setNoteStatus(error.message || "មិនអាចចូលគណនីបានទេ។", "error");
  } finally {
    submit.disabled = false;
  }
};

var noteLogoutBtn = document.getElementById("noteLogoutBtn");
if (noteLogoutBtn) {
  noteLogoutBtn.onclick = async function () {
    await supabaseClient.auth.signOut();
    isNoteAdmin = false;
    resetNoteEditor();
    updateAdminInterface();
    drawNotes();
    setNoteStatus("បានចាកចេញពីគណនីគ្រូ។", "success");
  };
}

async function importLegacyNotes() {
  if (!isNoteAdmin) return;
  var oldNotes = [];
  try { oldNotes = JSON.parse(localStorage.getItem("sopha-notes") || "[]"); }
  catch (e) { oldNotes = []; }
  if (!oldNotes.length) {
    setNoteStatus("មិនមានកំណត់ត្រាចាស់សម្រាប់នាំចូលទេ។", "");
    return;
  }
  if (!window.confirm("នាំចូលកំណត់ត្រាចាស់ចំនួន " + oldNotes.length + " ពី browser នេះទៅក្នុងប្រព័ន្ធថ្មី?")) return;

  importLegacyBtn.disabled = true;
  var imported = 0;
  try {
    for (var i = 0; i < oldNotes.length; i++) {
      var old = oldNotes[i];
      var imagePath = null;
      if (old.img && old.img.indexOf("data:image/") === 0) {
        imagePath = await uploadNoteImage(old.img);
      }
      var inserted = await supabaseClient.from("student_notes").insert({
        title: old.t || "កំណត់ត្រាចាស់",
        class_tag: old.tag || "ទូទៅ",
        body: old.b || "",
        image_path: imagePath
      });
      if (inserted.error) throw inserted.error;
      imported++;
    }
    localStorage.setItem("sopha-notes-imported-v1", "yes");
    updateAdminInterface();
    setNoteStatus("បាននាំចូលកំណត់ត្រាចាស់ " + imported + " បានជោគជ័យ។", "success");
    await loadNotes();
  } catch (error) {
    setNoteStatus("បាននាំចូល " + imported + " ប៉ុណ្ណោះ។ បញ្ហា៖ " + error.message, "error");
  } finally {
    importLegacyBtn.disabled = false;
  }
}

if (importLegacyBtn) importLegacyBtn.onclick = importLegacyNotes;

async function initStudentNotes() {
  if (!hasSupabaseConfig()) {
    setNoteStatus("មុនពេលប្រើកំណត់ត្រាតាមអ៊ីនធឺណិត សូមកំណត់ Supabase URL និង anon key ក្នុង site-config.js ហើយអនុវត្ត SQL ក្នុងឯកសារ supabase_setup.sql។", "warning");
    var list = document.getElementById("noteList");
    list.innerHTML = '<p class="muted note-empty">ប្រព័ន្ធកំណត់ត្រាមិនទាន់ភ្ជាប់ database ទេ។ សូមអនុវត្តជំហានក្នុង SETUP.md។</p>';
    var latest = document.getElementById("homeLatestNotes");
    if (latest) latest.innerHTML = '<p class="muted">សូមភ្ជាប់ Supabase ដើម្បីបង្ហាញកំណត់ត្រាថ្មីៗ។</p>';
    updateAdminInterface();
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  try {
    var sessionResult = await supabaseClient.auth.getSession();
    if (sessionResult.error) throw sessionResult.error;
    var session = sessionResult.data.session;
    if (session) {
      try { await verifyNoteAdmin(session.user); }
      catch (adminError) { setNoteStatus(adminError.message, "warning"); }
    }
    updateAdminInterface();
    await loadNotes();
    var portfolioLoads = await Promise.allSettled([loadBooks(), loadProjects()]);
    portfolioLoads.forEach(function (result, index) {
      if (result.status === "rejected") {
        console.error("Portfolio content load failed:", result.reason);
        setContentStatus(index === 0 ? "bookStatus" : "projectStatus",
          "មិនអាចទាញយកទិន្នន័យបានទេ។ សូមពិនិត្យថាបានដំណើរការ supabase_upgrade.sql ហើយឬនៅ៖ " + (result.reason && result.reason.message ? result.reason.message : "Database error"),
          "error");
      }
    });
  } catch (error) {
    setNoteStatus("មិនអាចភ្ជាប់ទៅ database បានទេ៖ " + error.message, "error");
  }

  supabaseClient.auth.onAuthStateChange(function (_event, session) {
    if (!session) {
      isNoteAdmin = false;
      updateAdminInterface();
      drawNotes();
    }
  });
}


/* =========================================================
   Portfolio content manager – Books and Projects
   Uses the same teacher account and Supabase image bucket.
   ========================================================= */
var portfolioBooks = [];
var portfolioProjects = [];
var editingBookId = null;
var editingProjectId = null;
var bookImageState = { dataUrl: "", clear: false };
var projectImageState = { dataUrl: "", clear: false };

function escapeHTML(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
  });
}

function publicImageUrl(path) {
  if (!path || !supabaseClient) return "";
  return supabaseClient.storage.from(SUPABASE_BUCKET).getPublicUrl(path).data.publicUrl;
}

function renderProjects(items) {
  var grid = document.getElementById("projGrid");
  var featured = document.getElementById("homeFeatured");
  if (!grid) return;
  var projectItems = Array.isArray(items) ? items : [];
  function cardHTML(project, adminMode) {
    var tags = (project.technologies || []).map(function (tag) {
      return '<span class="tag">' + escapeHTML(tag) + '</span>';
    }).join("");
    var visual = project.image_url
      ? '<img src="' + escapeHTML(project.image_url) + '" alt="' + escapeHTML(project.title) + '" loading="lazy" decoding="async">'
      : ic("img");
    var safeProjectUrl = "";
    if (project.project_url) {
      try {
        var parsedProjectUrl = new URL(project.project_url, window.location.href);
        if (parsedProjectUrl.protocol === "http:" || parsedProjectUrl.protocol === "https:") safeProjectUrl = parsedProjectUrl.href;
      } catch (urlError) { safeProjectUrl = ""; }
    }
    var link = safeProjectUrl
      ? '<a class="project-link" href="' + escapeHTML(safeProjectUrl) + '" target="_blank" rel="noopener noreferrer">បើកគម្រោង ' + ic("external") + '</a>'
      : "";
    var admin = adminMode && isNoteAdmin && project.id
      ? '<div class="content-card-actions"><button type="button" class="btn ghost note-action" data-edit-project="' + escapeHTML(project.id) + '">' + ic("edit") + ' កែសម្រួល</button><button type="button" class="btn ghost note-action note-delete" data-delete-project="' + escapeHTML(project.id) + '">' + ic("trash") + ' លុប</button></div>'
      : "";
    return '<article class="card proj"><div class="shot">' + visual + '</div><h3>' + escapeHTML(project.title) + '</h3><p>' + escapeHTML(project.description) + '</p><div class="tags">' + tags + '</div>' + (project.role ? '<dl class="project-role"><dt>តួនាទីរបស់ខ្ញុំ</dt><dd>' + escapeHTML(project.role) + '</dd></dl>' : '') + link + admin + '</article>';
  }
  if (!projectItems.length) {
    grid.innerHTML = '<p class="muted note-empty">មិនទាន់មានគម្រោងទេ។</p>';
    if (featured) featured.innerHTML = '<p class="muted">មិនទាន់មានគម្រោងណាមួយត្រូវបានបង្ហោះទេ។</p>';
    return;
  }
  grid.innerHTML = projectItems.map(function (project) { return cardHTML(project, true); }).join("");
  if (featured) featured.innerHTML = projectItems.slice(0, 2).map(function (project) { return cardHTML(project, false); }).join("");
  grid.querySelectorAll("[data-edit-project]").forEach(function (button) {
    button.onclick = function () { startProjectEdit(button.getAttribute("data-edit-project")); };
  });
  grid.querySelectorAll("[data-delete-project]").forEach(function (button) {
    button.onclick = function () { deleteProject(button.getAttribute("data-delete-project")); };
  });
}

function renderBooks(items) {
  var grid = document.getElementById("bookGrid");
  if (!grid) return;
  var list = Array.isArray(items) ? items : [];
  if (!list.length) {
    grid.innerHTML = '<p class="muted note-empty">មិនទាន់មានការពិនិត្យសៀវភៅទេ។ ចូលគណនីគ្រូនៅផ្ទាំងកំណត់ត្រាសិស្ស ដើម្បីបន្ថែមសៀវភៅដំបូង។</p>';
    return;
  }
  grid.innerHTML = list.map(function (book) {
    var rating = Math.max(1, Math.min(5, Number(book.rating || 5)));
    var stars = "";
    for (var i = 1; i <= 5; i++) stars += ic("star", i > rating ? "off" : "");
    var cover = book.cover_url
      ? '<img src="' + escapeHTML(book.cover_url) + '" alt="គម្រប ' + escapeHTML(book.title) + '" loading="lazy" decoding="async">'
      : ic("book");
    var admin = isNoteAdmin && book.id
      ? '<div class="content-card-actions"><button type="button" class="btn ghost note-action" data-edit-book="' + escapeHTML(book.id) + '">' + ic("edit") + ' កែសម្រួល</button><button type="button" class="btn ghost note-action note-delete" data-delete-book="' + escapeHTML(book.id) + '">' + ic("trash") + ' លុប</button></div>'
      : "";
    return '<article class="card book glass-card"><div class="book-cover">' + cover + '</div><div class="book-info"><h3>' + escapeHTML(book.title) + '</h3><div class="by">' + escapeHTML(book.author || "") + '</div><div class="stars" aria-label="ពិន្ទុ ' + rating + '/5">' + stars + '</div>' + (book.quote ? '<blockquote>« ' + escapeHTML(book.quote) + ' »</blockquote>' : '') + (book.recommendation ? '<div class="rec-pill">' + ic("book") + '<span>' + escapeHTML(book.recommendation) + '</span></div>' : '') + admin + '</div></article>';
  }).join("");
  grid.querySelectorAll("[data-edit-book]").forEach(function (button) {
    button.onclick = function () { startBookEdit(button.getAttribute("data-edit-book")); };
  });
  grid.querySelectorAll("[data-delete-book]").forEach(function (button) {
    button.onclick = function () { deleteBook(button.getAttribute("data-delete-book")); };
  });
}

function setContentStatus(id, message, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = message || "";
  el.className = "note-status" + (type ? " " + type : "");
}

function updatePortfolioAdminInterface() {
  var bookPanel = document.getElementById("bookAdmin");
  var projectPanel = document.getElementById("projectAdmin");
  if (bookPanel) bookPanel.hidden = !isNoteAdmin;
  if (projectPanel) projectPanel.hidden = !isNoteAdmin;
  var bookHint = document.getElementById("bookAdminHint");
  var projectHint = document.getElementById("projectAdminHint");
  if (bookHint) bookHint.hidden = isNoteAdmin;
  if (projectHint) projectHint.hidden = isNoteAdmin;
}

async function loadBooks() {
  var result = await supabaseClient.from("portfolio_books")
    .select("id, title, author, rating, quote, recommendation, cover_path, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;
  portfolioBooks = (result.data || []).map(function (row) {
    return Object.assign({}, row, { cover_url: publicImageUrl(row.cover_path) });
  });
  renderBooks(portfolioBooks);
}

async function loadProjects() {
  var result = await supabaseClient.from("portfolio_projects")
    .select("id, title, description, technologies, role, project_url, image_path, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;
  portfolioProjects = (result.data || []).map(function (row) {
    return Object.assign({}, row, { image_url: publicImageUrl(row.image_path) });
  });
  renderProjects(portfolioProjects);
}

function compressContentImage(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = function () { reject(new Error("មិនអាចអានរូបភាពបានទេ។")); };
    reader.onload = function (event) {
      var image = new Image();
      image.onerror = function () { reject(new Error("ឯកសាររូបភាពមិនត្រឹមត្រូវទេ។")); };
      image.onload = function () {
        var maxWidth = 1400;
        var scale = image.width > maxWidth ? maxWidth / image.width : 1;
        var canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function setupContentImagePicker(prefix, state) {
  var input = document.getElementById(prefix + "ImageInput");
  var pick = document.getElementById(prefix + "ImagePick");
  var preview = document.getElementById(prefix + "ImagePreview");
  var previewImg = document.getElementById(prefix + "ImagePreviewImg");
  var clear = document.getElementById(prefix + "ImageClear");
  if (!input || !pick || !preview || !previewImg || !clear) return;
  pick.onclick = function () { input.click(); };
  input.onchange = async function () {
    var file = input.files && input.files[0];
    if (!file) return;
    if (!file.type || file.type.indexOf("image/") !== 0) {
      setContentStatus(prefix === "book" ? "bookStatus" : "projectStatus", "សូមជ្រើសរើសឯកសាររូបភាព។", "error");
      return;
    }
    try {
      state.dataUrl = await compressContentImage(file);
      state.clear = false;
      previewImg.src = state.dataUrl;
      preview.hidden = false;
    } catch (error) {
      setContentStatus(prefix === "book" ? "bookStatus" : "projectStatus", error.message, "error");
    }
  };
  clear.onclick = function () {
    state.dataUrl = "";
    state.clear = true;
    input.value = "";
    previewImg.removeAttribute("src");
    preview.hidden = true;
  };
}

function resetContentImage(prefix, state) {
  state.dataUrl = "";
  state.clear = false;
  var input = document.getElementById(prefix + "ImageInput");
  var preview = document.getElementById(prefix + "ImagePreview");
  var previewImg = document.getElementById(prefix + "ImagePreviewImg");
  if (input) input.value = "";
  if (preview) preview.hidden = true;
  if (previewImg) previewImg.removeAttribute("src");
}

async function uploadPortfolioImage(dataUrl, folder) {
  if (!dataUrl) return null;
  var blob = await fetch(dataUrl).then(function (response) { return response.blob(); });
  var randomName = window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(36).slice(2);
  var path = "portfolio/" + folder + "/" + randomName + ".jpg";
  var result = await supabaseClient.storage.from(SUPABASE_BUCKET).upload(path, blob, {
    contentType: "image/jpeg", cacheControl: "3600", upsert: false
  });
  if (result.error) throw result.error;
  return path;
}

async function removePortfolioImage(path) {
  if (!path) return;
  var result = await supabaseClient.storage.from(SUPABASE_BUCKET).remove([path]);
  if (result.error) console.warn("Could not remove portfolio image:", result.error.message);
}

function openBookEditor(book) {
  var form = document.getElementById("bookForm");
  form.reset();
  editingBookId = book ? book.id : null;
  resetContentImage("book", bookImageState);
  document.getElementById("bookFormHeading").textContent = book ? "កែសម្រួលការពិនិត្យសៀវភៅ" : "ការពិនិត្យសៀវភៅថ្មី";
  document.getElementById("bookTitle").value = book ? book.title : "";
  document.getElementById("bookAuthor").value = book ? (book.author || "") : "";
  document.getElementById("bookRating").value = book ? String(book.rating || 5) : "5";
  document.getElementById("bookQuote").value = book ? (book.quote || "") : "";
  document.getElementById("bookRecommendation").value = book ? (book.recommendation || "") : "";
  if (book && book.cover_url) {
    document.getElementById("bookImagePreviewImg").src = book.cover_url;
    document.getElementById("bookImagePreview").hidden = false;
  }
  form.hidden = false;
  document.getElementById("bookForm").scrollIntoView({ behavior: "smooth", block: "start" });
}

function startBookEdit(id) {
  if (!isNoteAdmin) return;
  var book = portfolioBooks.find(function (item) { return item.id === id; });
  if (book) openBookEditor(book);
}

function closeBookEditor() {
  document.getElementById("bookForm").reset();
  document.getElementById("bookForm").hidden = true;
  editingBookId = null;
  resetContentImage("book", bookImageState);
}

async function saveBook(event) {
  event.preventDefault();
  if (!isNoteAdmin) return;
  var button = document.getElementById("bookSaveBtn");
  button.disabled = true;
  setContentStatus("bookStatus", "កំពុងរក្សាទុកការពិនិត្យសៀវភៅ...", "loading");
  try {
    var old = editingBookId ? portfolioBooks.find(function (item) { return item.id === editingBookId; }) : null;
    var coverPath = old ? old.cover_path : null;
    if (bookImageState.dataUrl) coverPath = await uploadPortfolioImage(bookImageState.dataUrl, "books");
    else if (bookImageState.clear) coverPath = null;
    var payload = {
      title: document.getElementById("bookTitle").value.trim(),
      author: document.getElementById("bookAuthor").value.trim(),
      rating: Number(document.getElementById("bookRating").value),
      quote: document.getElementById("bookQuote").value.trim(),
      recommendation: document.getElementById("bookRecommendation").value.trim(),
      cover_path: coverPath,
      updated_at: new Date().toISOString()
    };
    var result = editingBookId
      ? await supabaseClient.from("portfolio_books").update(payload).eq("id", editingBookId).select().single()
      : await supabaseClient.from("portfolio_books").insert(payload).select().single();
    if (result.error) throw result.error;
    if (old && old.cover_path && old.cover_path !== coverPath) await removePortfolioImage(old.cover_path);
    closeBookEditor();
    setContentStatus("bookStatus", "បានរក្សាទុកការពិនិត្យសៀវភៅ។", "success");
    await loadBooks();
  } catch (error) {
    setContentStatus("bookStatus", "មិនអាចរក្សាទុកបានទេ៖ " + error.message, "error");
  } finally { button.disabled = false; }
}

async function deleteBook(id) {
  if (!isNoteAdmin) return;
  var book = portfolioBooks.find(function (item) { return item.id === id; });
  if (!book || !window.confirm('តើអ្នកប្រាកដថាចង់លុបការពិនិត្យសៀវភៅ "' + book.title + '" មែនទេ?')) return;
  var result = await supabaseClient.from("portfolio_books").delete().eq("id", id);
  if (result.error) { setContentStatus("bookStatus", result.error.message, "error"); return; }
  await removePortfolioImage(book.cover_path);
  setContentStatus("bookStatus", "បានលុបការពិនិត្យសៀវភៅ។", "success");
  await loadBooks();
}

function openProjectEditor(project) {
  var form = document.getElementById("projectForm");
  form.reset();
  editingProjectId = project ? project.id : null;
  resetContentImage("project", projectImageState);
  document.getElementById("projectFormHeading").textContent = project ? "កែសម្រួលគម្រោង" : "គម្រោងថ្មី";
  document.getElementById("projectTitle").value = project ? project.title : "";
  document.getElementById("projectDescription").value = project ? project.description : "";
  document.getElementById("projectTech").value = project ? (project.technologies || []).join(", ") : "";
  document.getElementById("projectRole").value = project ? (project.role || "") : "";
  document.getElementById("projectUrl").value = project ? (project.project_url || "") : "";
  if (project && project.image_url) {
    document.getElementById("projectImagePreviewImg").src = project.image_url;
    document.getElementById("projectImagePreview").hidden = false;
  }
  form.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startProjectEdit(id) {
  if (!isNoteAdmin) return;
  var project = portfolioProjects.find(function (item) { return item.id === id; });
  if (project) openProjectEditor(project);
}

function closeProjectEditor() {
  document.getElementById("projectForm").reset();
  document.getElementById("projectForm").hidden = true;
  editingProjectId = null;
  resetContentImage("project", projectImageState);
}

async function saveProject(event) {
  event.preventDefault();
  if (!isNoteAdmin) return;
  var button = document.getElementById("projectSaveBtn");
  button.disabled = true;
  setContentStatus("projectStatus", "កំពុងរក្សាទុកគម្រោង...", "loading");
  try {
    var old = editingProjectId ? portfolioProjects.find(function (item) { return item.id === editingProjectId; }) : null;
    var imagePath = old ? old.image_path : null;
    if (projectImageState.dataUrl) imagePath = await uploadPortfolioImage(projectImageState.dataUrl, "projects");
    else if (projectImageState.clear) imagePath = null;
    var technologies = document.getElementById("projectTech").value.split(",").map(function (item) { return item.trim(); }).filter(Boolean);
    var projectUrl = document.getElementById("projectUrl").value.trim();
    var payload = {
      title: document.getElementById("projectTitle").value.trim(),
      description: document.getElementById("projectDescription").value.trim(),
      technologies: technologies,
      role: document.getElementById("projectRole").value.trim(),
      project_url: projectUrl || null,
      image_path: imagePath,
      updated_at: new Date().toISOString()
    };
    var result = editingProjectId
      ? await supabaseClient.from("portfolio_projects").update(payload).eq("id", editingProjectId).select().single()
      : await supabaseClient.from("portfolio_projects").insert(payload).select().single();
    if (result.error) throw result.error;
    if (old && old.image_path && old.image_path !== imagePath) await removePortfolioImage(old.image_path);
    closeProjectEditor();
    setContentStatus("projectStatus", "បានរក្សាទុកគម្រោង។", "success");
    await loadProjects();
  } catch (error) {
    setContentStatus("projectStatus", "មិនអាចរក្សាទុកបានទេ៖ " + error.message, "error");
  } finally { button.disabled = false; }
}

async function deleteProject(id) {
  if (!isNoteAdmin) return;
  var project = portfolioProjects.find(function (item) { return item.id === id; });
  if (!project || !window.confirm('តើអ្នកប្រាកដថាចង់លុបគម្រោង "' + project.title + '" មែនទេ?')) return;
  var result = await supabaseClient.from("portfolio_projects").delete().eq("id", id);
  if (result.error) { setContentStatus("projectStatus", result.error.message, "error"); return; }
  await removePortfolioImage(project.image_path);
  setContentStatus("projectStatus", "បានលុបគម្រោង។", "success");
  await loadProjects();
}

document.getElementById("addBookBtn").onclick = function () { openBookEditor(null); };
document.getElementById("bookCancelBtn").onclick = closeBookEditor;
document.getElementById("bookForm").onsubmit = saveBook;
document.getElementById("addProjectBtn").onclick = function () { openProjectEditor(null); };
document.getElementById("projectCancelBtn").onclick = closeProjectEditor;
document.getElementById("projectForm").onsubmit = saveProject;
setupContentImagePicker("book", bookImageState);
setupContentImagePicker("project", projectImageState);

function renderHomeLatestNotes() {
  var grid = document.getElementById("homeLatestNotes");
  if (!grid) return;
  if (!notes.length) {
    grid.innerHTML = '<p class="muted">មិនទាន់មានកំណត់ត្រាថ្មីទេ។</p>';
    return;
  }
  grid.innerHTML = notes.slice().sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }).slice(0, 3).map(function (note) {
    var image = note.image_url
      ? '<button type="button" class="latest-image-button" data-latest-image="' + escapeHTML(note.id) + '" aria-label="ពង្រីករូបភាព ' + escapeHTML(note.title) + '"><img src="' + escapeHTML(note.image_url) + '" alt="' + escapeHTML(note.title) + '" loading="lazy" decoding="async"></button>'
      : '<div class="latest-image-placeholder">' + ic("note") + '</div>';
    return '<article class="card latest-note-card">' + image + '<div class="latest-note-content">' + (note.tag ? '<span class="tag">' + escapeHTML(note.tag) + '</span>' : '') + '<h3>' + escapeHTML(note.title) + '</h3><p>' + escapeHTML(note.body) + '</p><div class="latest-note-meta"><time>' + escapeHTML(formatNoteDate(note.created_at)) + '</time><span data-note-view-count="' + escapeHTML(note.id) + '" class="note-stat">' + ic("eye") + '<span>' + (note.view_count || 0) + ' views</span></span><span data-note-download-count="' + escapeHTML(note.id) + '" class="note-stat">' + ic("download") + '<span>' + (note.download_count || 0) + ' downloads</span></span></div><a class="latest-read-link" href="note.html?id=' + escapeHTML(note.id) + '">អានកំណត់ត្រា ' + ic("external") + '</a></div></article>';
  }).join("");
  grid.querySelectorAll("[data-latest-image]").forEach(function (button) {
    button.onclick = function () {
      var note = notes.find(function (item) { return item.id === button.getAttribute("data-latest-image"); });
      if (note) openImageLightbox(note.image_url, note.title, note);
    };
  });
  grid.querySelectorAll(".latest-note-card").forEach(function (card) {
    var noteId = card.querySelector("[data-note-view-count]");
    var note = noteId && notes.find(function (item) { return item.id === noteId.getAttribute("data-note-view-count"); });
    if (note) observeNoteView(card, note, noteId);
  });
}

renderBooks(defaultBooks);
renderProjects(defaultProjects);
updatePortfolioAdminInterface();

updateAdminInterface();
initStudentNotes();
