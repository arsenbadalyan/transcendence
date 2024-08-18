
class I18nController {

	constructor() {}

	get(key, vars) {
		if (!this.translations.hasOwnProperty(key)
			|| (vars && typeof vars !== "object")
		) {
			return (`??? ${key} ???`);
		}

		return (this.translations[key].format(vars))
	}

	translationKeys = {
		validation: {
			minValueUnderflow: "error.validation.min.underflow",
			maxValueOverflow: "error.validation.max.overflow",
			minLengthUnderflow: "error.validation.min.length.underflow",
			maxLengthOverflow: "error.validation.max.length.overflow",
			required: "error.validation.required",
			invalidEmail: "error.validation.invalid.email"
		}
	}

	translations = {
		// validation errors
		[this.translationKeys.validation.minValueUnderflow]: {
			en: "",
			ru: ""
		},
		[this.translationKeys.validation.maxValueOverflow]: {
			en: "",
			ru: ""
		},
		[this.translationKeys.validation.minLengthUnderflow]: {
			en: "",
			ru: ""
		},
		[this.translationKeys.validation.maxLengthOverflow]: {
			en: "",
			ru: ""
		},
		[this.translationKeys.validation.required]: {
			en: "",
			ru: ""
		},
		[this.translationKeys.validation.invalidEmail]: {
			en: "",
			ru: ""
		},
	};

};

/** @type {I18nController} */
const i18n = new I18nController();

export default i18n;