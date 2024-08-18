import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import { cn } from "../../utils/generalUtils";
import { SignUpSchema } from "../../constants/validatorSchemas";
import useValidator from "../hooks/useValidator";

const SignUp = () => {

	const {
		validatedAlready,
		validatorFormRef,
		getRuleErrors,
	} = useValidator(SignUpSchema);

	return (
		<div className={cn("whole-size")}>
			<Form
				ref={validatorFormRef}
				className="d-flex flex-column gap-2"
				noValidate
			>
				{SignUpSchema.getRules().map(rule => {

					const ruleErrors = getRuleErrors(rule.getName());
					const successMsg = rule.getSuccessMsg();

					return (
						<FloatingLabel
							key={rule.getName()}
							label={rule.getName()}
						>
							<Form.Control
								name={rule.getName()}
								type={rule.getType()}
								placeholder={rule.getName()}
								isValid={!ruleErrors.length && validatedAlready}
								isInvalid={ruleErrors.length}
							/>
							{ successMsg ? <Form.Control.Feedback>{ successMsg }</Form.Control.Feedback> : null }
							{ ruleErrors.map((error, idx) => (
								<Form.Control.Feedback key={idx} type="invalid">{ error }</Form.Control.Feedback>
							)) }
						</FloatingLabel>
					);

				})}
				<Button type="submit" variant="dark">Sign In</Button>
			</Form>
		</div>
	);

};

export default SignUp;