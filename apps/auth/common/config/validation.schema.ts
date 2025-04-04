import * as Joi from 'joi';

export default Joi.object({
    GRPC_PORT: Joi.number().required(),
    GITHUB_CLIENT_ID: Joi.string().required(),
    GITHUB_CLIENT_SECRET: Joi.string().required(),
    GITHUB_CALLBACK_URL: Joi.string().required(),
    DB_URL: Joi.string().required(),
});
