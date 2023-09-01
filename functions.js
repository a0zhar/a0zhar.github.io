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
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", self.getAttribute("binfile"), true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let binSize  = xhr.response.byteLength; 
      let response = new Uint8Array(xhr.response);
      let payload  = new Uint32Array(response);
      window.pl_blob_len = "0x" + binSize.toString(16);
      window.pl_blob = malloc(window.pl_blob_len);
      write_mem(window.pl_blob, payload);
      printf("adding loader");
      addScriptFile("misc/loader.js", "loader", 0);
    }
  };
  xhr.send();
}
