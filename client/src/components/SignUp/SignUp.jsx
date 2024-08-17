import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import { cn } from "../../utils/generalUtils";

const SignUp = () => {

	return (
		<div className={cn("whole-size")}>
			<Form id="test" className="d-flex flex-column gap-2">
				<FloatingLabel
					label="first name"
				>
					<Form.Control
						required
						type="text"
						placeholder="first name"
					/>
				</FloatingLabel>
				<FloatingLabel
					label="last name"
				>
					<Form.Control
						required
						type="text"
						placeholder="last name"
					/>
				</FloatingLabel>
				<FloatingLabel
					label="username"
				>
					<Form.Control
						required
						type="text"
						placeholder="username"
					/>
				</FloatingLabel>
				<FloatingLabel
					label="email"
				>
					<Form.Control
						required
						type="emil"
						placeholder="email"
					/>
				</FloatingLabel>
				<FloatingLabel
					label="password"
				>
					<Form.Control
						required
						type="password"
						placeholder="password"
					/>
				</FloatingLabel>
				<FloatingLabel
					label="repeat password"
				>
					<Form.Control
						required
						type="password"
						placeholder="repeat password"
					/>
				</FloatingLabel>
				<Button type="submit" variant="dark">Sign Up</Button>
			</Form>
		</div>
	);

};

export default SignUp;