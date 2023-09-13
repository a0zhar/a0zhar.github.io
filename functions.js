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
  printf("Loading Payload");
  PLfile    = self.getAttribute("binfile");
  LoadedMSG = self.getAttribute("loadmsg");
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", PLfile, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      printf("GET request sent, and was a Success!");
      let binSize = xhr.response.byteLength;
      let binData = new Uint8Array(xhr.response);
      let payload = new Uint32Array(binSize);
      payload.set(binData);
      window.pl_blob_len = "0x" + binSize.toString(16);
      window.pl_blob = malloc(window.pl_blob_len);
      write_mem(window.pl_blob, payload);
      printf("Adding the Loader");
      addScriptFile("misc/loader.js", "loader", 0);
    }
  };
  xhr.send();
}

function try_load_payload(filepath){
  printf("Payload loading");
  PLfile = filepath;
  var script = document.createElement('script');
  script.src = "pls_loader.js";
  document.getElementsByTagName('head')[0].appendChild(script);
}
