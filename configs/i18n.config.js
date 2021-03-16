const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'am'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join('./', 'configs', 'locales'),
  // api: {
  //   '__': 'translate',
  //   '__n': 'translateN'
  // }
});

module.exports = i18n;
