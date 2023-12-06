import express from "express";
import bodyParser from "body-parser";
import mssql from "mssql"

/**
 * Express Server wrapper
 * @class
 */
export default class Server {
  constructor() {
    this.port = Server.get_port(process.argv.slice(2));
    this.address = Server.get_address(process.argv.slice(2));

    this.app = express();
    this.app.use(bodyParser.json())
  }

  // METHODS

  /**
   * Adds an express router to the express server
   * @param {Express.Router} router - The express router to use
   * @param {String} base_route - Optional base route for router. Defaults to `"/"`
   */
  use_router(router, base_route = "/") {
    this.app.use(base_route, router);
  }

  /**
   * Initializes connection with an mssql database
   * @param {String} user - Database login username
   * @param {String} pass - Database login password
   * @param {String} name - Database name
   * @param {String} server - Database server name
   * @param {Boolean} local - Whether the database being connected to is local. Defaults to true
   */
  async init_db_connection(user, pass, name, server, local = true) {
    try {
      console.log("Establishing connection to database...");

      this.close_db_connection();

      // Instantiate a new global connection pool
      const connectionPool = new mssql.ConnectionPool({
        user: user,
        password: pass,
        database: name,
        server: server,
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000,
        },
        options: {
          encrypt: false,
          trustServerCertificate: local, // change to true for local dev / self-signed certs
        },
      });

      this.app.locals.db = await connectionPool.connect();

      console.log("Connected to database");
    } catch (e) {
      console.error(e);
    }
  }

  /** Closes global connection pool with database */
  close_db_connection() {
    if (this.app.locals.db) this.app.locals.db.close();
  }

  /** Starts the server listening to `this.port` */
  start_server() {
    this.app.listen(this.port, this.address, () => {
      console.log(`Server listening at http://${this.address}:${this.port}`);
    });
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
    if (!Array.isArray(argv)) return default_port;
    if (argv.length < 1) return default_port;

    // Get index of port flag
    let flag_idx = -1;
    flag_idx = argv.indexOf("--port") >= 0 ? argv.indexOf("--port") : flag_idx;
    flag_idx = argv.indexOf("-p") >= 0 ? argv.indexOf("-p") : flag_idx;

    // Return default port if flag index is out of range
    if (flag_idx < 0) return default_port;
    if (flag_idx >= argv.length - 1) return default_port;

    // Get port from arguments
    const arg_port = parseInt(argv[flag_idx + 1]);

    // Return default port if arg port is not a valid int
    if (isNaN(arg_port)) return default_port;

    // Return port from argv
    return arg_port;
  }

  /**
   * Returns an address from cli args or a default value if no address is found in args
   * @param {String[]} argv - An array of command line arguments
   * @param {Number} default_address - An address to default to. Default value is localhost
   * @returns {String}
   */
  static get_address(argv, default_address = "localhost") {
    // Return default address if no argv array is provided
    if (!Array.isArray(argv)) return default_address;
    if (argv.length < 1) return default_address;

    // Get index of address flag
    let flag_idx = -1;
    flag_idx =
      argv.indexOf("--address") >= 0 ? argv.indexOf("--address") : flag_idx;
    flag_idx = argv.indexOf("-a") >= 0 ? argv.indexOf("-a") : flag_idx;

    // Return default address if flag index is out of range
    if (flag_idx < 0) return default_address;
    if (flag_idx >= argv.length - 1) return default_address;

    // Get address from arguments
    const arg_address = argv[flag_idx + 1];

    // Return default address if arg address is not a valid int
    if (isNaN(arg_address)) return default_address;

    // Return address from argv
    return arg_address;
  }
}