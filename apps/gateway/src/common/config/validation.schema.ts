import * as Joi from 'joi';

export default Joi.object({
    HTTP_HOST: Joi.string().required(),
    HTTP_PORT: Joi.number().required(),
    SWAGGER_PATH: Joi.string().required(),
    SWAGGER_TITLE: Joi.string().required(),
    SWAGGER_DESCRIPTION: Joi.string().required(),
    SWAGGER_VERSION: Joi.string().required(),
    GITHUB_CLIENT_ID: Joi.string().required(),
    AUTH_GRPC_HOST: Joi.string().required(),
    AUTH_GRPC_PORT: Joi.number().required(),
    CODESAGA_GRPC_HOST: Joi.string().required(),
    CODESAGA_GRPC_PORT: Joi.number().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().required(),
});
