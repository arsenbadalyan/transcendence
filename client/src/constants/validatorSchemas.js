import ValidatorSchema from "../utils/classes/Validator/ValidatorSchema";

export const SignInSchema = ValidatorSchema.createValidationSet(
	ValidatorSchema.createSchema("username").min(5).max(15).required(),
	ValidatorSchema.createSchema("password").min(8).max(15).required()
);