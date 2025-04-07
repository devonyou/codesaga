import * as Joi from 'joi';

export default Joi.object({
    GRPC_HOST: Joi.string().required(),
    GRPC_PORT: Joi.number().required(),
    AUTH_GRPC_HOST: Joi.string().required(),
    AUTH_GRPC_PORT: Joi.number().required(),
    CODESAGA_GRPC_HOST: Joi.string().required(),
    CODESAGA_GRPC_PORT: Joi.number().required(),
    DB_URL: Joi.string().required(),
    AI_URL: Joi.string().required(),
    AI_MODEL: Joi.string().required(),
});
