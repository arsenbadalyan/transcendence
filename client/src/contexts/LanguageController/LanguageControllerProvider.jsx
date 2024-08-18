import { createContext, useState } from "react";

const LanguageControllerContext = createContext(null);

const LanguageControllerProvider = ({ children }) => {

	const [lang, setLang] = useState();

	return (
		<LanguageControllerContext.Provider value={{
			lang,
			setLang
		}}>
			{ children }
		</LanguageControllerContext.Provider>
	);

};

export default LanguageControllerProvider;