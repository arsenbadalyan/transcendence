
import i18n from "../../../controllers/I18nController";
import ObjectValidator from "./ObjectValidator";

class ValidatorSchema {

	constructor(name) {
		if (!name || typeof name !== "string") {
			throw new Error("Name is required for Validator Schema");
		}

		this.rules = {};
		this.rules[ValidatorSchema.RULES.type] = ValidatorSchema.TYPES.text;
		this.rules[ValidatorSchema.RULES.name] = name;
	}

	getRules() {
		return (this);
	}

	type(type) {
		if (ValidatorSchema.TYPES.hasOwnProperty(type))
			this.rules[ValidatorSchema.RULES.type] = type;
		return (this);
	}

	getType() {
		return (this.rules[ValidatorSchema.RULES.type]);
	}

	name(name) {
		this.rules[ValidatorSchema.RULES.name] = name;
		return (this);
	}

	getName() {
		return (this.rules[ValidatorSchema.RULES.name]);
	}

	required() {
		this.rules[ValidatorSchema.RULES.required] = true;
		return (this);
	}

	getRequired() {
		return (this.rules[ValidatorSchema.RULES.required]);
	}
	
	max(maxValue) {
		this.rules[ValidatorSchema.RULES.max] = maxValue;
		return (this);
	}

	getMax() {
		return (this.rules[ValidatorSchema.RULES.max]);
	}
	
	min(minValue) {
		this.rules[ValidatorSchema.RULES.min] = minValue;
		return (this);
	}

	getMin() {
		return (this.rules[ValidatorSchema.RULES.min]);
	}

	minLen(minLen) {
		this.rules[ValidatorSchema.RULES.minLen] = minLen;
		return (this);
	}

	getMinLen() {
		return (this.rules[ValidatorSchema.RULES.minLen]);
	}

	maxLen(maxLen) {
		this.rules[ValidatorSchema.RULES.maxLen] = maxLen;
		return (this);
	}

	getMaxLen() {
		return (this.rules[ValidatorSchema.RULES.maxLen]);
	}

	oneOf(...list) {
		this.rules[ValidatorSchema.RULES.oneOf] = [...list];
		return (this);
	}

	getOneOf() {
		return (this.rules[ValidatorSchema.RULES.oneOf]);
	}

	successMsg(msg) {
		this.rules[ValidatorSchema.RULES.successMsg] = msg;
		return (this);
	}

	getSuccessMsg() {
		return (this.rules[ValidatorSchema.RULES.successMsg]);
	}

	validate(value) {

		const errorList = [];

		if (this.getRequired() && (typeof value !== "number" && !value)) {
			errorList.push(i18n.translationKeys.validation.required);
		} else {
			// rules that needs to check if its not required or passed required rule
			if (this.getType() === ValidatorSchema.TYPES.email) {
				const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailRegExp.test(value)) {
					errorList.push(i18n.translationKeys.validation.invalidEmail);
				}
			}

			if (this.getType() === ValidatorSchema.TYPES.number) {
				value = +value;
	
				if (this.getMin() > value) {
					errorList.push(i18n.translationKeys.validation.minValueUnderflow);
				}
	
				if (this.getMax() < value) {
					errorList.push(i18n.translationKeys.validation.maxValueOverflow);
				}
			} else {
	
				// assuming that value is text if not number
				value += "";
	
				if (this.getMinLen() > value.length) {
					errorList.push(i18n.translationKeys.validation.minLengthUnderflow);
				}
	
				if (this.getMaxLen() < value.length) {
					errorList.push(i18n.translationKeys.validation.maxLengthOverflow);
				}
	
			}
		}

		return (errorList)

	}

	static isRef(ref) {
		return (ValidatorRef.isValidRef(ref));
	}

	static ref(source) {
		return (new ValidatorRef(source));
	}

	static createValidationSet(...rules) {
		return (new ObjectValidator(rules));
	}

	static createSchema(name) {
		return (new ValidatorSchema(name));
	}

	static TYPES = {
		text: "text",
		number: "number",
		email: "email",
		password: "password",
	}

	static RULES = {
		type: "type",
		name: "name",
		max: "max",
		min: "min",
		required: "required",
		minLen: "minLen",
		oneOf: "oneOf",
		successMsg: "successMsg"
	}

};

class ValidatorRef {
	constructor(ref) {
		this.__isValidatorRef = true;
		this.ref = ref;
	}

	static isValidRef(refObject) {
		return (refObject || typeof refObject === "object" || refObject instanceof ValidatorRef);
	}
}

export default ValidatorSchema;