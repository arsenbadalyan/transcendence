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
		if (ValidatorSchema.VALID_TYPES.hasOwnProperty(type))
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

	validate(value) {

		const errorList = [];

		// if (this.getMax() )

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
		password: "password"
	}

	static RULES = {
		type: "type",
		name: "name",
		max: "max",
		min: "min",
		required: "required",
		minLen: "minLen",
		oneOf: "oneOf"
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