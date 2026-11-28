(function () {
  "use strict";

  var prefix = "<!--sopha-note-rich-v1-->";
  var allowedTags = {
    B: true, BLOCKQUOTE: true, BR: true, DIV: true, EM: true, H2: true,
    H3: true, I: true, LI: true, OL: true, P: true, STRONG: true,
    U: true, UL: true
  };
  var discardedTags = {
    SCRIPT: true, STYLE: true, TEMPLATE: true, SVG: true, MATH: true
  };

  function isRich(body) {
    return typeof body === "string" && body.indexOf(prefix) === 0;
  }

  function safeFragment(html) {
    var template = document.createElement("template");
    template.innerHTML = html;

    function copyChildren(source, destination) {
      Array.prototype.forEach.call(source.childNodes, function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          destination.appendChild(document.createTextNode(node.nodeValue));
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE || discardedTags[node.tagName]) return;

        if (allowedTags[node.tagName]) {
          var clean = document.createElement(node.tagName.toLowerCase());
          destination.appendChild(clean);
          copyChildren(node, clean);
        } else {
          copyChildren(node, destination);
        }
      });
    }

    var fragment = document.createDocumentFragment();
    copyChildren(template.content, fragment);
    return fragment;
  }

  function getText(body) {
    if (!isRich(body)) return typeof body === "string" ? body : "";
    return safeFragment(body.slice(prefix.length)).textContent || "";
  }

  function render(target, body) {
    if (isRich(body)) {
      target.replaceChildren(safeFragment(body.slice(prefix.length)));
    } else {
      target.textContent = typeof body === "string" ? body : "";
    }
  }

  function setEditor(editor, body) {
    if (isRich(body)) {
      editor.replaceChildren(safeFragment(body.slice(prefix.length)));
    } else {
      editor.textContent = typeof body === "string" ? body : "";
    }
  }

  function serializeEditor(editor) {
    var clean = document.createElement("div");
    clean.appendChild(safeFragment(editor.innerHTML));
    return prefix + clean.innerHTML;
  }

  window.NoteContent = {
    getText: getText,
    render: render,
    serializeEditor: serializeEditor,
    setEditor: setEditor
  };
})();
