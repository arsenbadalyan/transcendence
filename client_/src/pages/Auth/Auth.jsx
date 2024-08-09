import { useState } from "react";
import styles from "./Auth.module.less"
import { AUTH_FORM_TYPES } from "../../constants/generalConstants";

const Auth = () => {

	const [userSelectedAuthType, setUserSelectedAuthType] = useState(AUTH_FORM_TYPES.SIGN_IN);

	
	

};

export default Auth;