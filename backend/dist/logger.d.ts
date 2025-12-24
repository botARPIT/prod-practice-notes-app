import type { RequestHandler } from 'express';
import pino from 'pino';
declare const logger: pino.Logger<never, boolean>;
declare const httpLogger: RequestHandler;
export { logger, httpLogger };
//# sourceMappingURL=logger.d.ts.map