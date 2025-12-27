export declare class CircuitBreaker {
    private readonly failureThreshold;
    private readonly cooldownMs;
    private readonly maxHalfOpenProbes;
    private state;
    private failures;
    private lastFailureTime;
    private probeInFlight;
    constructor(failureThreshold?: number, cooldownMs?: number, maxHalfOpenProbes?: number);
    exec<T>(fn: () => Promise<T>): Promise<T>;
    private onSuccess;
    private onFailure;
}
export declare function callExternalApi(): Promise<any>;
//# sourceMappingURL=circuitbreaker.d.ts.map