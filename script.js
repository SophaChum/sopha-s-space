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

var projects = [
  [
    "ប្រព័ន្ធគ្រប់គ្រងសាលារៀន",
    "ប្រព័ន្ធជាភាសាខ្មែរសម្រាប់គ្រប់គ្រងសិស្ស ថ្នាក់ វត្តមាន ពិន្ទុ និងតួនាទីអ្នកប្រើ។",
    ["HTML", "CSS", "JavaScript"],
    "រចនា និងអភិវឌ្ឍប្រព័ន្ធទាំងមូល។",
  ],
  [
    "កម្មវិធីគ្រប់គ្រងសិស្សសម្រាប់គ្រូ",
    "កត់វត្តមាន ពិន្ទុ កំណត់ត្រា និងបង្កើតលិខិតអញ្ជើញមាតាបិតាជាភាសាខ្មែរ។",
    ["JavaScript", "Supabase"],
    "រចនា និងអភិវឌ្ឍកម្មវិធីទាំងមូល។",
  ],
  [
    "គេហទំព័រអនុវត្តន៍ប្រឡងភាសាអង់គ្លេស",
    "គេហទំព័រអនុវត្តន៍ប្រឡងភាសាអង់គ្លេសតាមទម្រង់ប្រឡងបាក់ឌុប។",
    ["HTML", "CSS", "JavaScript"],
    "រចនា សរសេរសំណួរ និងបង្កើតគេហទំព័រ។",
  ],
];
document.getElementById("projGrid").innerHTML = projects
  .map(function (p) {
    return (
      '<div class="card proj"><div class="shot">' +
      ic("img") +
      "</div><h3>" +
      p[0] +
      "</h3><p>" +
      p[1] +
      '</p><div class="tags">' +
      p[2]
        .map(function (t) {
          return '<span class="tag">' + t + "</span>";
        })
        .join("") +
      '</div><dl style="margin:0"><dt>តួនាទីរបស់ខ្ញុំ</dt><dd>' +
      p[3] +
      "</dd></dl></div>"
    );
  })
  .join("");
var homeFeat = document.getElementById("homeFeatured");
if (homeFeat) {
  homeFeat.innerHTML = projects
    .slice(0, 2)
    .map(function (p) {
      return (
        '<div class="card proj">' +
        '<div class="shot">' +
        ic("img") +
        "</div>" +
        "<h3>" +
        p[0] +
        "</h3>" +
        "<p>" +
        p[1] +
        "</p>" +
        '<div class="tags">' +
        p[2]
          .map(function (t) {
            return '<span class="tag">' + t + "</span>";
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}
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

var books = [
  [
    "ចំណងជើងសៀវភៅទី ១",
    "អ្នកនិពន្ធ",
    5,
    "សម្រង់ដែលអ្នកចូលចិត្តពីសៀវភៅនេះ។",
    "ណែនាំសម្រាប់អ្នកចាប់ផ្តើម",
    "", // ដាក់ទីតាំងរូបភាពនៅទីនេះ ឧ. 'images/book1.jpg'
  ],
  [
    "ចំណងជើងសៀវភៅទី ២",
    "អ្នកនិពន្ធ",
    4,
    "សម្រង់ដែលអ្នកចូលចិត្តពីសៀវភៅនេះ។",
    "ណែនាំសម្រាប់គ្រូបង្រៀន",
    "", // ដាក់ទីតាំងរូបភាពនៅទីនេះ ឧ. 'images/book2.jpg'
  ],
];

document.getElementById("bookGrid").innerHTML = books
  .map(function (b) {
    var stars = "";
    for (var i = 1; i <= 5; i++) {
      stars += ic("star", i > b.at(2) ? "off" : "");
    }

    var coverUrl = b.at(5);
    var coverHtml = coverUrl
      ? '<img src="' +
        coverUrl +
        '" alt="' +
        b.at(0) +
        '" loading="lazy" onerror="this.parentElement.innerHTML=ic(\'book\')">'
      : ic("book");

    return (
      '<div class="card book glass-card">' +
      '<div class="book-cover">' +
      coverHtml +
      "</div>" +
      '<div class="book-info">' +
      "<h3>" +
      b.at(0) +
      "</h3>" +
      '<div class="by">' +
      b.at(1) +
      "</div>" +
      '<div class="stars" aria-label="ពិន្ទុ ' +
      b.at(2) +
      '/5">' +
      stars +
      "</div>" +
      "<blockquote>« " +
      b.at(3) +
      " »</blockquote>" +
      '<div class="rec-pill">' +
      ic("book") +
      "<span>" +
      b.at(4) +
      "</span></div>" +
      "</div>" +
      "</div>"
    );
  })
  .join("");

/* =========================================================
   Student Notes – Supabase-backed posts, admin editing & views
   Configure SUPABASE_URL and SUPABASE_ANON_KEY below.
   Never put a Supabase service-role key in browser code.
   ========================================================= */
var SUPABASE_URL = "https://jamycbsrhvhtmfjqxcbk.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_ENvDnaGyfrP7-hd_MHHzmQ_mC3zK7Vt";
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
  if (!id) {
    id = window.crypto && typeof window.crypto.randomUUID === "function"
      ? window.crypto.randomUUID()
      : "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
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

async function loadNotes() {
  var list = document.getElementById("noteList");
  if (list) list.innerHTML = '<p class="muted">កំពុងទាញយកកំណត់ត្រា...</p>';
  var result = await supabaseClient
    .from("student_notes")
    .select("id, title, class_tag, body, image_path, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (result.error) throw result.error;

  var counts = await loadNoteViewCounts();
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
      image_path: row.image_path,
      image_url: imageUrl,
      created_at: row.created_at,
      updated_at: row.updated_at,
      view_count: counts[row.id] || 0
    };
  });
  drawNotes();
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
  if (viewElement) viewElement.textContent = "👁 " + note.view_count + " views";
}

function observeNoteView(card, note, viewElement) {
  if (!("IntersectionObserver" in window)) {
    trackNoteView(note, viewElement);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        observer.unobserve(card);
        trackNoteView(note, viewElement);
      }
    });
  }, { threshold: [0.5] });
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
      var image = document.createElement("img");
      image.className = "note-img";
      image.src = note.image_url;
      image.alt = note.title;
      image.loading = "lazy";
      card.appendChild(image);
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

    var footer = document.createElement("div");
    footer.className = "note-card-footer";
    var viewCount = document.createElement("span");
    viewCount.className = "note-views";
    viewCount.textContent = "👁 " + (note.view_count || 0) + " views";
    footer.appendChild(viewCount);

    if (isNoteAdmin) {
      var actions = document.createElement("div");
      actions.className = "note-actions";
      var editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "btn ghost note-action";
      editButton.textContent = "កែសម្រួល";
      editButton.onclick = function () { startNoteEdit(note.id); };

      var deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn ghost note-action note-delete";
      deleteButton.textContent = "លុប";
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
    setNoteStatus("មុនពេលប្រើកំណត់ត្រាតាមអ៊ីនធឺណិត សូមកំណត់ Supabase URL និង anon key ក្នុង script.js ហើយអនុវត្ត SQL ក្នុងឯកសារ supabase_setup.sql។", "warning");
    var list = document.getElementById("noteList");
    list.innerHTML = '<p class="muted note-empty">ប្រព័ន្ធកំណត់ត្រាមិនទាន់ភ្ជាប់ database ទេ។ សូមអនុវត្តជំហានក្នុង SETUP.md។</p>';
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

updateAdminInterface();
initStudentNotes();
