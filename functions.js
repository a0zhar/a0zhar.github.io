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

function executeBinFile(self) {
  PLfile = self.getAttribute("binfile");
  LoadedMSG = self.getAttribute("loadmsg");
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", PLfile, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let binSize = xhr.response.byteLength;
      let binData = new Uint8Array(xhr.response);
      let payload = new Uint32Array(binSize);
      payload.set(binData);
      window.pl_blob_len = "0x" + binSize.toString(16);
      window.pl_blob = malloc(window.pl_blob_len);
      write_mem(window.pl_blob, payload);
      launch_payload();
    }
  };
  xhr.send();
}

function runSerotonin(self) {
  PLfile = self.getAttribute("binfile");
  LoadedMSG = self.getAttribute("loadmsg");
  var xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", PLfile, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var tmp0 = new Uint8Array(xhr.response.byteLength);
      tmp0.set(new Uint8Array(xhr.response), 0);
      var payload = new Uint32Array(tmp0);
      var getlength = "0x" + xhr.response.byteLength.toString(16);
      window.pl_blob_len = getlength;
      window.pl_blob = malloc(window.pl_blob_len);
      write_mem(window.pl_blob, payload);
      addScriptFile("misc/netcat.js", "nett", 0);
      addScriptFile("misc/pl_loader.js", "cccc", 0);
    }
  };
  xhr.send();
}
