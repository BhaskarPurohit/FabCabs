const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port,()=>{
    console.log("Server is running on port 3000")
})