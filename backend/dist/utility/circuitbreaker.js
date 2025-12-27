export class CircuitBreaker {
    failureThreshold;
    cooldownMs;
    maxHalfOpenProbes;
    state = "CLOSED";
    failures = 0;
    lastFailureTime = 0;
    probeInFlight = 0;
    constructor(failureThreshold = 5, cooldownMs = 10_000, maxHalfOpenProbes = 1) {
        this.failureThreshold = failureThreshold;
        this.cooldownMs = cooldownMs;
        this.maxHalfOpenProbes = maxHalfOpenProbes;
    }
    async exec(fn) {
        const now = Date.now();
        if (this.state === "OPEN") {
            if (now - this.lastFailureTime >= this.cooldownMs) {
                this.state = "HALF_OPEN";
            }
            else {
                throw new Error("Circuit OPEN");
            }
        }
        if (this.state === "HALF_OPEN") {
            if (this.probeInFlight >= this.maxHalfOpenProbes) {
                throw new Error("Circuit HALF_OPEN (probe limit)");
            }
            this.probeInFlight++;
        }
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        }
        catch (err) {
            this.onFailure();
            throw err;
        }
        finally {
            if (this.state === "HALF_OPEN") {
                this.probeInFlight--;
            }
        }
    }
    onSuccess() {
        this.failures = 0;
        if (this.state === "HALF_OPEN") {
            this.state = "CLOSED";
        }
    }
    onFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();
        if (this.failures >= this.failureThreshold) {
            this.state = "OPEN";
        }
    }
}
// Async function to use to call the external api
import axios from 'axios';
const breaker = new CircuitBreaker(5, 10_000, 2);
export async function callExternalApi() {
    return await breaker.exec(async () => {
        console.log("Inside call external api function");
        const res = await axios.get("http://localhost:4000/external/data", {
            timeout: 2000
        });
        return res.data;
    });
}
//# sourceMappingURL=circuitbreaker.js.map