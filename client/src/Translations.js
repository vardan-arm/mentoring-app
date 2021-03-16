import {createContext, useEffect, useState} from 'react';
import {getTranslations} from "./store/actions/getTranslations";
import {getI18nTranslations} from "./store/selectors/general";

const translationsContext = createContext({});

export const TranslationsProvider = ({children}) => {
  const [translations, setTranslations] = useState([]);


  useEffect(async () => {
    const lang = 'am';
    const response = await fetch(`/api/translations?lang=${lang}`);
    setTranslations(response);

    console.log({response});
  }, []);

  return (
    <TranslationsProvider.Provider value={translations}>
      {children}
    </TranslationsProvider.Provider>
  )
}

export default TranslationsProvider;
