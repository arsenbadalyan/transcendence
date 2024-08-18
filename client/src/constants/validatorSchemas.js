import UserController from "../controllers/UserController";
import ValidatorSchema from "../utils/classes/Validator/ValidatorSchema";

export const SignInSchema = ValidatorSchema.createValidationSet(
	ValidatorSchema
		.createSchema("username")
		.minLen(UserController.validatorSettings.usernameMinLen)
		.maxLen(UserController.validatorSettings.usernameMaxLen)
		.required(),
	ValidatorSchema
		.createSchema("password")
		.type(ValidatorSchema.TYPES.password)
		.minLen(UserController.validatorSettings.passwordMinLen)
		.maxLen(UserController.validatorSettings.passwordMaxLen)
		.required()
);

export const SignUpSchema = ValidatorSchema.createValidationSet(
	ValidatorSchema
		.createSchema("firstName")
		.minLen(UserController.validatorSettings.firstNameMinLen)
		.maxLen(UserController.validatorSettings.firstNameMaxLen)
		.required(),
	ValidatorSchema
		.createSchema("lastName")
		.minLen(UserController.validatorSettings.lastNameMinLen)
		.maxLen(UserController.validatorSettings.lastNameMaxLen)
		.required(),
	ValidatorSchema
		.createSchema("email")
		.type(ValidatorSchema.TYPES.email)
		.required(),
	ValidatorSchema
		.createSchema("username")
		.minLen(UserController.validatorSettings.usernameMinLen)
		.maxLen(UserController.validatorSettings.usernameMaxLen)
		.required(),
	ValidatorSchema
		.createSchema("password")
		.type(ValidatorSchema.TYPES.password)
		.minLen(UserController.validatorSettings.passwordMinLen)
		.maxLen(UserController.validatorSettings.passwordMaxLen)
		.required(),
	ValidatorSchema
		.createSchema("confirmPassword")
		.type(ValidatorSchema.TYPES.password)
		.minLen(UserController.validatorSettings.passwordMinLen)
		.maxLen(UserController.validatorSettings.passwordMaxLen)
		.oneOf(ValidatorSchema.ref("password"))
		.required()
);