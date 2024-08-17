import { useState } from "react";
import { AUTH_FORM_TYPES } from "../../constants/generalConstants";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./Auth.module.css"

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import { cn } from "../../utils/generalUtils";

const Auth = () => {

	const [userSelectedAuthType, setUserSelectedAuthType] = useState(AUTH_FORM_TYPES.SIGN_IN);

	return (
		<div className={cn("whole-size", "center-inside")}>
			<Tab.Container defaultActiveKey={userSelectedAuthType.name}>
				<Row xs={12} md={8} lg={6} className="flex-column container nav-justified panel-group row-gap-3 align-items-center">
					<Col xs={12} md={8} lg={6}>
						<Nav variant="pills" className="flex-row">
							<Nav.Item className="btn-default">
								<Nav.Link eventKey={AUTH_FORM_TYPES.SIGN_IN.name} variant="success">Sign In</Nav.Link>
							</Nav.Item>
							<Nav.Item >
								<Nav.Link className="btn-default" eventKey={AUTH_FORM_TYPES.SIGN_UP.name}>Sign Up</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col xs={12} md={8} lg={6}>
						<Tab.Content>
							<Tab.Pane eventKey={AUTH_FORM_TYPES.SIGN_IN.name}>
								<SignIn />
							</Tab.Pane>
							<Tab.Pane eventKey={AUTH_FORM_TYPES.SIGN_UP.name}>
								<SignUp />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);

};

export default Auth;