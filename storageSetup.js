if (typeof localStorage === "undefined" || localStorage === null) {
  // This should have a better alternative to avoid `var`
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
