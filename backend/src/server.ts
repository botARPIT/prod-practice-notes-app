import app from './app.js'

const startServer = async() => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log("Server started...");
    })
}

startServer();