class I18nController {

	constructor() {}

	get(key, vars) {
		if (!I18nController.translations.hasOwnProperty(key)
			|| (vars && typeof vars !== "object")
		) {
			return (`??? ${key} ???`);
		}

		return (I18nController.translations[key].format(vars))
	}

	static translations = {
		// validation errors
		"error.validation.min.underflow": "",
		"error.validation.max.overflow": "",
		"error.validation.min.length.underflow": "",
		"error.validation.max.length.overflow": "",
		"error.validation.required": "",
		"error.validation.max.overflow": "",
	};

};

/** @type {I18nController} */
const i18n = new I18nController();

export default i18n;