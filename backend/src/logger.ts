import { randomUUID } from 'node:crypto';
import type { Request, Response, RequestHandler } from 'express';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
const logger = pino({

    transport: {
        target: 'pino-pretty',
        options: {
            colourize: true,
            translateTime: 'SYS:standard'
        }
    },

})

const httpLogger: RequestHandler = pinoHttp({
    logger,
    genReqId: function (req: Request, res: Response) {
        return req.headers['x-request-id']?.toString() || randomUUID()
    },
    serializers: {
        req(req: Request) {
            return {
                requestId: req.id,
                method: req.method,
                url: req.url
            }
        },
        res(res: Response) {
            return {
                statuscode: res.statusCode
            }
        }
    }
})
// const httpLogger = pinoHttp({})
export { logger, httpLogger };
