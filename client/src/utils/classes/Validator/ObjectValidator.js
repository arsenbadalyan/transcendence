import ValidatorSchema from "./ValidatorSchema";

class ObjectValidator {

	constructor(rulesSet) {
		console.log(rulesSet);
		if (!Array.isArray(rulesSet))
			throw new Error("Object Validator handle only ValidatorSchema based arrays.");
		
		const rulesTempObj = {};

		rulesSet.forEach(rule => {
			if (rule instanceof ValidatorSchema) {
				rulesTempObj[rule.getName()] = rule.getRules();
			}
		});
		this.rules = rulesTempObj;
	}

	/**
	 * @returns {ValidatorSchema[]} Validator Schema instance
	 */
	getRules() {
		return (Object.values(this.rules));
	}

	validate(formObject) {
		if (!formObject || typeof formObject !== "object")
			throw new Error("Form Object is required to validate data with specified validation rules.");

		const validFormObject = {};

		if (formObject instanceof FormData) {
			console.log(formObject);
		}
		
	}

};

export default ObjectValidator;