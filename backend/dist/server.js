import app from './app.js';
import { config } from './config/config.js';
const startServer = async () => {
    const PORT = config.port || 3001;
    app.listen(PORT, () => {
        console.log("Server started...");
    });
};
startServer();
//# sourceMappingURL=server.js.map