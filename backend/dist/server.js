import app from './app.js';
const startServer = async () => {
    const PORT = 3005;
    app.listen(PORT, () => {
        console.log("Server started...");
    });
};
startServer();
//# sourceMappingURL=server.js.map