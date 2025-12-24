type NODE_ENV = "development" | "test" | "stage" | "production";

import { config as conf } from 'dotenv';
// Loading configuration
conf();

// Make a private object of name config, and access the env variables through it
const _config = {
    database_url: process.env.DATABASE_URL
}

// Export the object normally by freezing the private object
export const config = Object.freeze(_config)
