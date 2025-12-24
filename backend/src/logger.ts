import pino from 'pino';
const logger = pino({
    
    transport: {
        target: 'pino-pretty',
        options: {
            colourize: true,
            translateTime: 'SYS:standard'
        }
    },
    
})
export default logger;