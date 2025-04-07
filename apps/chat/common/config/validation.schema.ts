import * as Joi from 'joi';

export default Joi.object({
    GRPC_HOST: Joi.string().required(),
    GRPC_PORT: Joi.number().required(),
    AUTH_GRPC_HOST: Joi.string().required(),
    AUTH_GRPC_PORT: Joi.number().required(),
    LLAMA_GRPC_HOST: Joi.string().required(),
    LLAMA_GRPC_PORT: Joi.number().required(),
    DB_URL: Joi.string().required(),
});
