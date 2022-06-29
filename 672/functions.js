function loadBINfile(e) {
  let req = new XMLHttpRequest();
  let a = "payloads/" + e;
  req.open("GET", a, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send();
  var o = Uint8Array.from(req.response, (e) => e.charCodeAt(0));
  if (a.endsWith(".bz2"))
    try {
      PLS = bzip2.simple(bzip2.array(o));
    } catch (e) {
      console.log(a + ">(error: " + e + ")");
      alert(a + ">(error: " + e + ")");
    }
  return o;
}
function loadFile(source, func) {
  const newScript = document.createElement("script");
  newScript.setAttribute("src", source);
  newScript.setAttribute("id", "p0");

  const oldInstance = document.getElementById("p0");
  if (document.head.contains(oldInstance))
    document.head.removeChild(oldInstance);

  setTimeout(() => {
    document.head.appendChild(newScript);
  }, 1500);
  if (typeof func !== "undefined") setTimeout(func, 500);
  return false;
}

function load_hen(t) {
  document.getElementById("status").innerHTML =
    "Loading " + (t.includes("goldhen") ? "GoldHEN" : "Hen") + " Please wait";
  LoadedMSG = "GoldHEN Loaded";
  setTimeout(function () {
    loadBINfile(t);
    var e = PLS;
    window.mira_blob_2_len = PLS.length;
    window.mira_blob_2 = malloc(window.mira_blob_2_len);
    write_mem(window.mira_blob_2, e);
    loadFile("common/exp_loader.js");
  }, 1e3),
    setTimeout(jailbreak, 500);
}
function load_pl(t) {
  document.getElementById("status").innerHTML =
    "Loading Payload, please wait...";
  LoadedMSG = "Payload Loaded";
  setTimeout(function () {
    loadBINfile(t);
    var e = PLS;
    window.mira_blob_2_len = PLS.length;
    window.mira_blob_2 = malloc(window.mira_blob_2_len);
    write_mem(window.mira_blob_2, e);
    loadFile("common/exp_loader.js");
  }, 1e3);
}

// Payload information index.
document.querySelectorAll("[data-info]").forEach((item) => {
  // When the mouseover event is triggered, display the object's information.
  item.addEventListener("mouseover", (self) => {
    document.getElementById("status").innerHTML = [
      "Start a new FTP server (Not recommended; use GoldHEN's inbuilt FTP instead.)", // 0 = ftp
      "Enable the PS4 Trainer. Don't run if the game is not running.", // 1 = webrte
      "Cache this page and its features for later offline use", // 2 = cache
      "View previous versions of GoldHEN and Hen.", // 3 = older hens
      "Enable PS4 Debugger", // 4 = ps4debug
      "Orbis Toolbox Loader Alfa 1190", // 5 = orbis toolbox
      "Copy the .json and .shn cheat files from the USB drive to the GoldHen folder", // 6 = cheat copy
      "Create dummy files in the PS4 update folder to prevent firmware updates from being installed.", // 7 = disable updates
      "Remove the dummy files in the PS4 update folder to allow firmware updates to be installed.", // 8 = enable updates
      "Changes the installed games' license type from FAKE to FREE (by Al-Azif)", // 9 = rifrename
      "Create a backup of important database files and user data, and export it to USB", // 10 = backupdb
      "Restore the current database and user data using a previously made backup.", // 11 = restoredb
      "Create a backup of your game trophies, and export it to USB", // 12 = backuptrophy
      "Restore the current trophies to a previously made backup.", // 13 = restoretrophy
      "Disable the auto-opening of the last page used in the PS4 WebBrowser.", // 14 = historyblocker
      "Install (.pkg) files without a large enough USB drive.", // 15 = Fakeusb
      "Convert the target ID to 0x81, which is DevKit.", // 16=todev
      "Convert the Target ID to 0xA0, which corresponds to an Arcade or Kratos model.", // 17=tokratos
      "Unlock some of the debug features available on testkit.", // 18 = todex
      "Export installed games to USB drive.", // 19 = app2usb
      "Replace the system Avatar files with new Avatar files from the external USB drive.", // 20 = avatar
      "Dump PS4 Kernel to USB", // 21 = Dump Kernel
      "Dump the game base without the installed game update to USB.", // 22 = Game only
      "Dump the game update without the game base onto a USB drive.", // 23 = Game Patch
      "Dump the game as well as the update separately to USB.", // 24 = G+U Seperate
      "Dump the game base and update merged to USB.", // 25 = G+U Merged
      "PS4 Homebrew Enabler - Coded By SiSTRo", // 26 = GoldHEN
      "Hen - PS4 Homebrew Enabler", // 27 = Hen
      "collection of PS4 payloads, such as Rifrename, FakeUSB, App2USB, and more." // 28 = tools
    ][self.target.getAttribute("data-info")];
    return false;
  });
  // When the mouseout event is triggered, display the default string.
  item.addEventListener("mouseout", () => {
    document.getElementById("status").innerHTML = "waiting...";
    return false;
  });
  return false;
});

// It used to be "Shwotab(e)," but I decided to rewrite it to save time manually adding it to each elm.
document.querySelectorAll("button[data-myTab]").forEach((card) => {
  if (typeof card.getAttribute("data-mytab") !== "undefined") {
    card.addEventListener("click", () => {
      document.getElementById("mainarea").style.display = "none";
      document.getElementById(card.getAttribute("data-myTab")).style.display =
        "block";
    });
  }

  return false;
});
// It used to be "HideTab (e)," but I decided to rewrite it to save time from manually adding it to each elm.
document.querySelectorAll("div>span.btn").forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById(card.parentNode.id).style.display = "none";
    document.getElementById("mainarea").style.display = "block";
  });
  return false;
});
