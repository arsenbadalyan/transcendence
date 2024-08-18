class UserController {

	constructor() {}

	validatorSettings = {
		usernameMinLen: 3,
		usernameMaxLen: 15,
		passwordMinLen: 6,
		passwordMaxLen: 15,
		firstNameMinLen: 3,
		firstNameMaxLen: 15,
		lastNameMinLen: 3,
		lastNameMaxLen: 15,
	}

};

/** @type {UserController} */
export default new UserController();