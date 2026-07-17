import { useContext, createContext , useState } from "react";
import languageList from "./language";
const LangContext = createContext()
export function LanguageProvider({children}){
    const [lang,setLang] = useState("en")
    const t = (key) => lang === "mr" ? languageList[key] : key
    return(
        <LangContext.Provider value={{t,lang,setLang}}>
            {children}
        </LangContext.Provider>
    )
}
export function useLanguage() {
  return useContext(LangContext);
}