(function () {
  "use strict";
  var config = window.SOPHA_SUPABASE_CONFIG || {};
  var article = document.getElementById("noteDetailArticle");
  var noteId = new URLSearchParams(window.location.search).get("id");
  var client = null;
  var currentNote = null;
  var currentImageUrl = "";
  var scale = 1;
  var dialog = document.getElementById("detailImageViewer");
  var viewerImage = document.getElementById("detailViewerImage");
  var resetButton = document.getElementById("detailZoomReset");

  function setMeta(selector, value, attribute) {
    var el = document.querySelector(selector);
    if (!el) {
      var match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
      if (match) {
        el = document.createElement("meta");
        el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
    }
    if (el) el.setAttribute(attribute || "content", value);
  }
  function text(tag, className, value) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value || "";
    return el;
  }
  function visitorId() {
    var key = "sopha-note-visitor-id";
    var id = localStorage.getItem(key);
    var valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!id || !valid.test(id)) {
      id = window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.floor(Math.random() * 16);
            return (c === "x" ? r : (r & 3) | 8).toString(16);
          });
      localStorage.setItem(key, id);
    }
    return id;
  }
  function dateLabel(value) {
    var date = new Date(value);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("km-KH", {year:"numeric", month:"long", day:"numeric"});
  }
  function setZoom(value) {
    scale = Math.max(0.5, Math.min(4, value));
    viewerImage.style.transform = "scale(" + scale + ")";
    resetButton.textContent = Math.round(scale * 100) + "%";
  }
  function openViewer(imageUrl) {
    if (!currentNote || !imageUrl) return;
    currentImageUrl = imageUrl;
    viewerImage.src = imageUrl;
    viewerImage.alt = currentNote.title;
    document.getElementById("detailViewerTitle").textContent = currentNote.title;
    setZoom(1);
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "open");
  }
  function downloadImage() {
    if (!currentNote || !currentImageUrl) return;
    var clean = (currentNote.title || "student-note").replace(/[^a-z0-9\u1780-\u17ff_-]+/gi, "-").replace(/^-+|-+$/g, "") || "student-note";
    var url = currentImageUrl + (currentImageUrl.indexOf("?") >= 0 ? "&" : "?") + "download=" + encodeURIComponent(clean + ".jpg");
    var a = document.createElement("a");
    a.href = url; a.download = clean + ".jpg"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
    client.rpc("record_student_note_download", {p_note_id: currentNote.id, p_visitor_id: visitorId()})
      .then(function (result) {
        if (!result.error) document.getElementById("detailDownloadCount").textContent = Number(result.data || 0).toLocaleString() + " downloads";
        else console.warn("Download action could not be recorded:", result.error.message);
      });
  }
  async function recordView(note) {
    try {
      var result = await client.rpc("record_student_note_view", {p_note_id: note.id, p_visitor_id: visitorId()});
      if (!result.error) document.getElementById("detailViewCount").textContent = Number(result.data || 0).toLocaleString() + " views";
    } catch (e) { console.warn("View count unavailable:", e); }
  }
  function updatePageMetadata(note) {
    var desc = (NoteContent.getText(note.body) || "កំណត់ត្រាសិក្សា").replace(/\s+/g, " ").slice(0, 155);
    var fullTitle = note.title + " | កំណត់ត្រាសម្រាប់សិស្ស – Sopha's Space";
    document.title = fullTitle;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', window.location.href);
    if (note.image_urls.length) setMeta('meta[property="og:image"]', note.image_urls[0]);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = window.location.href;
    var structured = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": note.title,
      "description": desc,
      "learningResourceType": "Educational material",
      "inLanguage": "km",
      "datePublished": note.created_at,
      "dateModified": note.updated_at || note.created_at,
      "author": {"@type":"Person", "name":"Chum Sopha"},
      "url": window.location.href
    };
    if (note.image_urls.length) structured.image = note.image_urls;
    var jsonld = document.createElement("script");
    jsonld.type = "application/ld+json";
    jsonld.textContent = JSON.stringify(structured);
    document.head.appendChild(jsonld);
  }
  function renderNote(note) {
    currentNote = note;
    updatePageMetadata(note);
    article.innerHTML = "";
    article.setAttribute("aria-busy", "false");
    var meta = document.createElement("div"); meta.className = "note-detail-meta";
    if (note.class_tag) meta.appendChild(text("span", "tag", note.class_tag));
    meta.appendChild(text("time", "", dateLabel(note.created_at)));
    article.appendChild(meta);
    article.appendChild(text("h1", "note-detail-title", note.title));
    if (note.image_urls.length) {
      currentImageUrl = note.image_urls[0];
      var gallery = document.createElement("div");
      gallery.className = "note-detail-gallery" + (note.image_urls.length === 1 ? " single-image" : "");
      note.image_urls.forEach(function (imageUrl, index) {
        var imageButton = document.createElement("button");
        imageButton.type = "button";
        imageButton.className = "note-detail-image-button";
        imageButton.setAttribute("aria-label", "ពង្រីករូបភាព " + (index + 1) + "៖ " + note.title);
        var image = document.createElement("img");
        image.src = imageUrl;
        image.alt = note.title + " - " + (index + 1);
        image.loading = "eager";
        image.decoding = "async";
        imageButton.appendChild(image);
        imageButton.addEventListener("click", function () { openViewer(imageUrl); });
        gallery.appendChild(imageButton);
      });
      article.appendChild(gallery);
      var tools = document.createElement("div"); tools.className = "note-detail-tools";
      var zoom = text("span", "muted", "ចុចលើរូបភាពណាមួយដើម្បីពង្រីក និងមើលលម្អិត។");
      var download = document.createElement("button"); download.type = "button"; download.className = "btn ghost"; download.innerHTML = '<svg class="i"><use href="#i-download" /></svg> ទាញយករូបភាព'; download.addEventListener("click", downloadImage);
      tools.append(zoom, download); article.appendChild(tools);
    }
    var body = text("div", "note-detail-content", "");
    NoteContent.render(body, note.body);
    article.appendChild(body);
    if (note.source_credit) {
      var source = document.createElement("p"); source.className = "note-source-credit"; source.textContent = "ប្រភព៖ " + note.source_credit; article.appendChild(source);
    }
    var stats = document.createElement("div"); stats.className = "note-detail-stats";
    var view = text("span", "note-stat", "0 views"); view.id = "detailViewCount";
    var downloads = text("span", "note-stat", "0 downloads"); downloads.id = "detailDownloadCount";
    stats.append(view, downloads); article.appendChild(stats);
    var noteDisclaimer = text("p", "note-detail-disclaimer", "កំណត់ត្រានេះត្រូវបានផ្តល់ជាសម្ភារៈជំនួយសិក្សា។ សូមពិនិត្យមើលសៀវភៅសិក្សា និងការណែនាំផ្លូវការរបស់គ្រូផងដែរ។");
    article.appendChild(noteDisclaimer);
    recordView(note);
  }
  async function init() {
    document.getElementById("detailYear").textContent = new Date().getFullYear();
    if (!noteId || !/^[0-9a-f-]{36}$/i.test(noteId)) {
      article.innerHTML = ""; article.setAttribute("aria-busy", "false");
      article.appendChild(text("h1", "note-detail-title", "រកមិនឃើញកំណត់ត្រា"));
      article.appendChild(text("p", "muted", "សូមត្រឡប់ទៅទំព័រកំណត់ត្រាសិស្ស ហើយជ្រើសរើសមេរៀនមួយទៀត។"));
      return;
    }
    if (!config.url || !config.anonKey || config.url.indexOf("YOUR_") === 0 || !window.supabase) {
      article.innerHTML = ""; article.setAttribute("aria-busy", "false");
      article.appendChild(text("h1", "note-detail-title", "មិនទាន់ភ្ជាប់ប្រព័ន្ធទិន្នន័យ"));
      article.appendChild(text("p", "muted", "សូមពិនិត្យការកំណត់ Supabase នៅក្នុង site-config.js។"));
      return;
    }
    client = window.supabase.createClient(config.url, config.anonKey);
    var result = await client.from("student_notes").select("id, title, class_tag, body, source_credit, image_path, created_at, updated_at").eq("id", noteId).maybeSingle();
    if (result.error || !result.data) {
      article.innerHTML = ""; article.setAttribute("aria-busy", "false");
      article.appendChild(text("h1", "note-detail-title", "រកមិនឃើញកំណត់ត្រា"));
      article.appendChild(text("p", "muted", "កំណត់ត្រានេះអាចត្រូវបានលុប ឬមិនមានទៀត។"));
      return;
    }
    var row = result.data;
    row.image_paths = getNoteImagePaths(row.image_path);
    row.image_urls = row.image_paths.map(function (path) {
      return client.storage.from("student-note-images").getPublicUrl(path).data.publicUrl;
    });
    row.image_url = row.image_urls[0] || "";
    renderNote(row);
  }

  function getNoteImagePaths(value) {
    if (Array.isArray(value)) return value.filter(function (path) { return typeof path === "string" && path; });
    if (typeof value !== "string" || !value) return [];
    try {
      var paths = JSON.parse(value);
      if (Array.isArray(paths)) {
        return paths.filter(function (path) { return typeof path === "string" && path; });
      }
    } catch (error) {
      return [value];
    }
    return [value];
  }
  document.getElementById("detailZoomIn").addEventListener("click", function () { setZoom(scale + 0.25); });
  document.getElementById("detailZoomOut").addEventListener("click", function () { setZoom(scale - 0.25); });
  document.getElementById("detailZoomReset").addEventListener("click", function () { setZoom(1); });
  document.getElementById("detailImageClose").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", function () { viewerImage.removeAttribute("src"); currentImageUrl = ""; setZoom(1); });
  init().catch(function (error) {
    console.error(error); article.innerHTML = ""; article.setAttribute("aria-busy", "false");
    article.appendChild(text("h1", "note-detail-title", "មិនអាចបើកកំណត់ត្រាបានទេ"));
    article.appendChild(text("p", "muted", "សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ។"));
  });
})();
