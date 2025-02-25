import Joi from "joi";

const toySchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().required(),
  Team: Joi.string().required(),
});

const toyUpdateSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  age: Joi.number(),
  Team: Joi.string(),    
});

export { toySchema, toyUpdateSchema };