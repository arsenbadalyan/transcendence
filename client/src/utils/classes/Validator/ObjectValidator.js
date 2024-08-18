import { isArrayOfClass } from "../../generalUtils";
import ValidatorSchema from "./ValidatorSchema";

class ObjectValidator {

	/**
	 * @param {ValidatorSchema[]} rulesSet 
	 */
	constructor(rulesSet) {
		if (!isArrayOfClass(rulesSet, ValidatorSchema))
			throw new Error("Object Validator handle only ValidatorSchema based arrays.");
		
		const rulesTempObj = {};

		rulesSet.forEach(rule => {
			rulesTempObj[rule.getName()] = rule.getRules();
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
		const errors = {};

		// debugger;
		if (formObject instanceof FormData) {
			formObject.entries().forEach(([fieldName, fieldValue]) => { validFormObject[fieldName] = fieldValue; })
		} else {
			Object.assign(validFormObject, { ...formObject });
		}

		Object.entries(validFormObject).forEach(([fieldName, fieldValue]) => {
			const validatorRule = this.rules[fieldName];

			if (validatorRule) {
				const errorList = validatorRule.validate(fieldValue);

				if (errorList.length) {
					errors[validatorRule.getName()] = errorList;
				}
			}
		});

		return (errors);
	}

};

export default ObjectValidator;