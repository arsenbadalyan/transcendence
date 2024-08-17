import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import { cn, isArrayOfClass } from "../../utils/generalUtils";
import { useEffect, useState } from "react";
import { SignInSchema } from "../../constants/validatorSchemas";
import ValidatorSchema from "../../utils/classes/Validator/ValidatorSchema";
import useValidator from "../hooks/useValidator";

const SignIn = () => {

	const {
		validatedAlready,
		validatorFormRef,
		formValidator,
	} = useValidator(SignInSchema);
	// const [validatedAlready, setValidatedAlready] = useState(false);

	// const signIn = evt => {
	// 	const form = evt.currentTarget;
	// 	evt.preventDefault();
	// 	evt.stopPropagation();

	// 	const validity = evt.currentTarget.checkValidity();
	// 	setValidatedAlready(true);
	// 	// console.log(Array.from(form.querySelectorAll(':invalid')));
	// 	console.log(validity);
	// };

	return (
		<div className={cn("whole-size")}>
			<Form
				ref={validatorFormRef}
				className="d-flex flex-column gap-2"
				noValidate
				validated={validatedAlready}
				onSubmit={formValidator}
			>
				{SignInSchema.getRules().map(rule => !console.log(rule) && (
					<FloatingLabel
						key={rule.getName()}
						label={rule.getName()}
					>
						<Form.Control
							required={rule.getRequired()}
							type={rule.getType()}
							placeholder={rule.getName()}
							min={rule.getMin()}
							max={rule.getMax()}
							isInvalid={false}
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
					</FloatingLabel>
				))}
				{/* <FloatingLabel
					label="password"
				>
					<Form.Control
						required
						minLength={7}
						type="password"
						placeholder="password"
					/>
				</FloatingLabel> */}
				<Button type="submit" variant="dark">Sign In</Button>
			</Form>
		</div>
	);

};

export default SignIn;