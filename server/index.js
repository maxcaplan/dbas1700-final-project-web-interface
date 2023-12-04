const Server = require("./server")

/** Main app function */
function main() {
    // Create and start server
    const server = new Server()
    server.start_server()
}

// Start app
main()