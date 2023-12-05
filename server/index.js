const Server = require("./server");
const db_router = require("./routes/database")

// Load environment variables from .env
require("dotenv").config({ path: "../.env" });

/** Main app function */
async function main() {
  // Create new server with router
  const server = new Server();
  server.use_router(db_router)
  
  // Connect to mssql database
  await server.init_db_connection(
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    process.env.DB_SERVER
  )

  // Start server
  server.start_server();
}

// Start app
main();
