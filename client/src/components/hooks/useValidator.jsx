import { useEffect, useRef, useState } from "react";
import ObjectValidator from "../../utils/classes/Validator/ObjectValidator";

/**
 * Use Validator hook
 * validates form with specified schema
 * @param {ObjectValidator} validatorSchema 
 * @param {Function | undefined} successValidatedClb 
 * @param {Function | undefined} failureValidationClb 
 * @returns 
 */
const useValidator = (validatorSchema, successValidatedClb, failureValidationClb) => {

	const validatorFormRef = useRef();
	const [validatedAlready, setValidatedAlready] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		validatorFormRef.current.addEventListener("submit", formValidator);

		return (() => {
			validatorFormRef.current.removeEventListener("submit", formValidator);
		});
	}, []);

	useEffect(() => {
		validatorFormRef.current.addEventListener("input", onChangeDetectedInsideForm);

		return (() => {
			validatorFormRef.current.removeEventListener("input", onChangeDetectedInsideForm);
		});
	}, [validatedAlready]);

	/**
	 * @param {Event} evt 
	 */
	const formValidator = evt => {
		evt.preventDefault();
		evt.stopPropagation();
		setValidatedAlready(true);
		setErrors(validatorSchema.validate(new FormData(evt.currentTarget)) || {});
	};

	/**
	 * @param {Event} evt 
	 */
	const onChangeDetectedInsideForm = evt => {
		if (validatedAlready) {
			setErrors(validatorSchema.validate(new FormData(evt.currentTarget)) || {});
		}
	};

	/** @returns {Array} */
	const getRuleErrors = (ruleName) => {
		return (errors[ruleName] || []);
	};

	return ({
		validatedAlready,
		validatorFormRef,
		errors,
		getRuleErrors,
		setErrors
	})

};

export default useValidator;