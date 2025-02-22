const http = require("http");
const app = require("./app"); // Importing the Express app
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle unexpected errors
server.on("error", (error) => {
    console.error("Server error:", error);
});
