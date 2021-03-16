const fs = require("fs");

const getI18nMessages = (lang) => {
  return new Promise((resolve) => {
    try {
      fs.readFile(`./configs/locales/${lang}.json`, (err, messages) => {
        if (err) {
          resolve(null);
        }
        resolve(JSON.parse(messages.toString()));
      })
    } catch {
      resolve(null);
    }
  });
}

module.exports = getI18nMessages;
