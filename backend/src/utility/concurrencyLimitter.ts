class ConcurrencyLimiter {
    private current = 0
    private readonly max: number

    constructor(max: number) {
        this.max = max
    }

    async acquire(): Promise<() => void> {
        // Check if we're at capacity
        if (this.current >= this.max) {
            throw new Error("RATE_LIMIT_EXCEEDED")
        }

        // Increment BEFORE any await (critical!)
        this.current++

        // Return release function
        return () => {
            this.current--
        }
    }

    getAvailable(): number {
        return this.max - this.current
    }
}

export { ConcurrencyLimiter }