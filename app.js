/* === SAFE ADDON: HTML entity auto-decoder (non-invasive) === */
(function(){
  function decodeHtmlEntities(s){
    try{
      if(!s || typeof s !== "string") return s||"";
      if(!/[&][a-zA-Z#0-9]+;/.test(s)) return s;
      const ta = document.createElement("textarea");
      ta.innerHTML = s;
      return ta.value;
    }catch(e){ return s; }
  }
  // expose for other code if needed
  window.decodeHtmlEntities = decodeHtmlEntities;

  // Helper to normalize the textarea before processing
  function normalizeTextarea(){
    var el = document.getElementById("input");
    if(el && typeof el.value === "string"){
      var v = el.value;
      var nv = decodeHtmlEntities(v);
      if(nv !== v) el.value = nv;
    }
  }

  // Patch startDecrypt -> decode input first
  if (typeof window.startDecrypt === "function") {
    const _origStart = window.startDecrypt;
    window.startDecrypt = function(){
      try{ normalizeTextarea(); }catch(e){}
      return _origStart.apply(this, arguments);
    };
  }

  // Patch pasteFromClipboard -> decode pasted text
  if (typeof window.pasteFromClipboard === "function") {
    const _origPaste = window.pasteFromClipboard;
    window.pasteFromClipboard = async function(){
      try{
        if (navigator.clipboard && navigator.clipboard.readText) {
          const t = await navigator.clipboard.readText();
          const el = document.getElementById("input");
          if (el) el.value = decodeHtmlEntities(t);
          // 如果原函数还会做额外逻辑，保持调用
        }
      }catch(e){ /* ignore */ }
      return _origPaste.apply(this, arguments);
    };
  }

  // Patch readFile (本地选择文件) -> decode file text before placing
  if (typeof window.readFile === "function") {
    const _origReadFile = window.readFile;
    window.readFile = async function(){
      const ret = await _origReadFile.apply(this, arguments);
      try{ normalizeTextarea(); }catch(e){}
      return ret;
    };
  }

  // Patch remote loader（如果你的函数名不同，这里不报错也不影响）
  if (typeof window.loadFromRemote === "function") {
    const _origRemote = window.loadFromRemote;
    window.loadFromRemote = async function(){
      const ret = await _origRemote.apply(this, arguments);
      try{ normalizeTextarea(); }catch(e){}
      return ret;
    };
  }
})();