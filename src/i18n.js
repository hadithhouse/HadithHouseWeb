import i18n from "i18next";
import XhrBackend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

function formatNumber(number, language) {
  return number.toLocaleString(language);
}

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(XhrBackend)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    keySeparator: ".", // we do not use keys in form messages.welcome
    interpolation: {
      format: function(value, format, language) {
        if (format === "number") {
          return formatNumber(value, language);
        }
        return value;
      },
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      wait: true
    }
  });

export { i18n };
