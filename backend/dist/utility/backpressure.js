// This is to implement timeout based abadonment of the request not true backpressure, this is implicit backpressure where the client is notified not to wait further after timer expires
function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("DB_ACQUIRE_TIMEOUT"));
        }, ms);
        promise
            .then((res) => {
            clearTimeout(timer);
            resolve(res);
        })
            .catch((err) => {
            clearTimeout(timer);
            reject(err);
        });
    });
}
export { withTimeout };
//# sourceMappingURL=backpressure.js.map