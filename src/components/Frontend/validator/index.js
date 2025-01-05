import Joi from 'joi';

// Create a Joi schema for validation
const schema = Joi.object({
    fullname: Joi.string().min(3).max(30).required().messages({
        'string.base': '"Name" should be a type of text',
        'string.empty': '"Name" cannot be an empty field',
        'string.min': '"Name" should have at least 3 characters',
        'string.max': '"Name" should have at most 30 characters',
        'any.required': '"Name" is a required field'
    }),
    email: Joi.string().required().messages({
        'string.base': '"Email" should be a type of text',
        'string.email': '"Email" must be a valid email address',
        'any.required': '"Email" is a required field'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': '"Password" should be a type of text',
        'string.min': '"Password" should have at least 6 characters',
        'any.required': '"Password" is a required field'
    })
});

export default schema;
