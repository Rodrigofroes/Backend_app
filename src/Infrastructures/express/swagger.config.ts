import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API Documentation using Swagger',
    },
    servers: [
        {
            url: 'http://192.168.200.73:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: [
        './src/infrastructures/express/routes/*.ts',
        './src/infrastructures/express/routes/auth/*.ts',
        './src/infrastructures/express/routes/client/*.ts',
        './src/infrastructures/express/routes/user/*.ts',
        './src/infrastructures/express/routes/accountReceive/*.ts',
        './src/infrastructures/express/routes/expense/*.ts',
        './src/infrastructures/express/routes/category/*.ts',
        './src/infrastructures/express/routes/resetPassword/*.ts'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
