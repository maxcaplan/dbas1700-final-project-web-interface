const express = require("express")

/**
 * Express Server wrapper
 * @class
 */
class Server {
    constructor() {
        this.port = Server.get_port(process.argv.slice(2))
        this.app = express()

        this.app.get("/", (req, res) => {
            console.log(req.hostname)
            res.send("Hello World")
        })
    }

    // METHODS

    /** Starts the server listening to `this.port` */
    start_server() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
        })
    }

    // STATIC METHODS

    /**
     * Returns a port from cli args or a default value if no port is found in args
     * @param {String[]} argv - An array of command line arguments
     * @param {Number} default_port - A port number to default to. Default value is 4000
     * @returns {Number}
     */ 
    static get_port(argv, default_port = 4000) {
        // Return default port if no argv array is provided
        if(!Array.isArray(argv)) return default_port
        if(argv.length < 1) return default_port

        // Get index of port flag
        let flag_idx = -1
        flag_idx = argv.indexOf("--port") >= 0 ? argv.indexOf("--port") : flag_idx 
        flag_idx = argv.indexOf("-p") >= 0 ? argv.indexOf("-p") : flag_idx

        // Return default port if flag index is out of range
        if(flag_idx < 0) return default_port
        if(flag_idx >= argv.length - 1) return default_port

        // Get port from arguments
        const arg_port = parseInt(argv[flag_idx + 1])

        // Return default port if arg port is not a valid int
        if(isNaN(arg_port)) return default_port

        // Return port from argv
        return arg_port
    }
}

module.exports = Server