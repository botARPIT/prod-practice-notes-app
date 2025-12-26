import { logger } from "../logger.js";

type State = "CLOSED" | "OPEN"

export class NaiveCircuitBreaker {
    private failures = 0;
    private state: State = "CLOSED";
    private readonly failureThreshold: number;

    constructor(failureThreshold = 5) {
        this.failureThreshold = failureThreshold
    }

    async exec<T>(fn: () => Promise<T>): Promise<T> {
        if (this.state == "OPEN") {
            throw new Error("Circuit is open")
        }
        console.log("Inside exec function")
        console.log("Value of failure is", this.failures)
        try {
            const result = await fn()
            console.log("using await and result is: ", result)
            return result
            // return fn().then(result => {
            //     console.log("inside try and returning the result", result)
            //     return result
            // })
        } catch (err) {
            logger.warn("Error in try block")
            this.failures++


            if (this.failures >= this.failureThreshold) {
                this.state = 'OPEN'
                logger.warn("Circuit is opened")
            }

            throw err
        }
    }
}



// Async function to use to call the external api
import axios from 'axios'
const breaker = new NaiveCircuitBreaker(5)
export async function callExternalApi() {
    return await breaker.exec(async () => {
        console.log("Inside call external api function")
        const res = await axios.get("http://localhost:4000/external/data", {
            timeout: 2000
        })
        return res.data
    })
}