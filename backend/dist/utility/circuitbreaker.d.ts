export declare class NaiveCircuitBreaker {
    private failures;
    private state;
    private readonly failureThreshold;
    constructor(failureThreshold?: number);
    exec<T>(fn: () => Promise<T>): Promise<T>;
}
export declare function callExternalApi(): Promise<any>;
//# sourceMappingURL=circuitbreaker.d.ts.map