import * as Joi from 'joi';

export default Joi.object({
    HTTP_HOST: Joi.string().required(),
    HTTP_PORT: Joi.string().required(),
});
