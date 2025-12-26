// This is to implement backpressure on concurrent db connections when connection pool is already busy
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("DB_ACQUIRE_TIMEOUT"))
        }, ms);

        promise
            .then((res) => {
                clearTimeout(timer)
                resolve(res)
            })
            .catch((err) => {
                clearTimeout(timer);
                reject(err) 
            })
    })
}

export { withTimeout }