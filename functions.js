function addScriptFile(_src, _id, _timeout) {
  const preElement = document.getElementById(_id);
  const script = document.createElement("script");
  script.setAttribute("src", _src);
  script.setAttribute("id", _id);
  if (preElement) document.head.removeChild(preElement);
  let timeoutTime = typeof _timeout !== "undefined" ? _timeout : 700;
  setTimeout(function () {
    document.head.appendChild(script);
  }, timeoutTime);
}
function runSerotonin(self) {
  
  PLfile    = self.getAttribute("binfile");
  LoadedMSG = self.getAttribute("loadmsg");
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", PLfile, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var tmp0 = new Uint8Array(xhr.response.byteLength);
      tmp0.set(new Uint8Array(xhr.response), 0);
      var payload = new Uint32Array(tmp0);
      var getlength = "0x" + xhr.response.byteLength.toString(16);
      window.pl_blob_len = getlength;
      window.pl_blob = malloc(window.pl_blob_len);
      write_mem(window.pl_blob, payload);
      addScriptFile("misc/loader.js", "loader", 0);
    }
  };
  xhr.send();
}
