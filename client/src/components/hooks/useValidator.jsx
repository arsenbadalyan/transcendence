import { useRef, useState } from "react";

const useValidator = (fieldList) => {

    const validatorFormRef = useRef();
    const [validatedAlready, setValidatedAlready] = useState(false);
    const [fieldNames, seyFieldNames] = useState(fieldList)
    const [errors, setErrors] = useState({});
    // errors

    const formValidator = evt => {
		evt.preventDefault();
		evt.stopPropagation();
		setValidatedAlready(true);
    };

    return ({
        validatedAlready,
        validatorFormRef,
        errors,
        formValidator
    })

};

export default useValidator;