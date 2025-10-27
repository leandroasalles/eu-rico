import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "../../languages/pt.json";
import en from "../../languages/en.json";

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      pt: {
        translation: pt,
      },
    },
    lng: "pt",
    fallbackLng: "en",
  });

  export default i18n