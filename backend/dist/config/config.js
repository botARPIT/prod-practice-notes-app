import { config as conf } from 'dotenv';
// Loading configuration
conf();
// Make a private object of name config, and access the env variables through it
const _config = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET
};
// Export the object normally by freezing the private object
export const config = Object.freeze(_config);
//# sourceMappingURL=config.js.map