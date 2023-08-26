// Prepare element that will contain debug text
printElm = document.createElement("p");
printElm.setAttribute("id", "infc");

function printf(format, ...args) {
  const output = [`[${new Date().toLocaleTimeString().substring(0, 8)}] `];
  let argIndex = 0;

  for (let index = 0; index < format.length; index++) {
    let char = format[index];
    if (char === "%" && index < format.length - 1) {
      let nextChar = format[index + 1];
      switch (nextChar) {
        case "s": case "d": case "f": case "c": case "i":
          output.push(args[argIndex]);
          argIndex++;
          break;
        case "p": case "x":
          output.push(`0x${args[argIndex].toString(16)}`);
          argIndex++;
          break;
        default: output.push(char); break;
      };
      index++;
    } else output.push(char);
  }
  printElm.innerHTML += `<span>${output.join("")}</span><br>`;
}
