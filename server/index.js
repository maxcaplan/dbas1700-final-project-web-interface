import { config } from "dotenv";

import Server from "./server.js"
import { router as major_routes } from "./routes/major.js";
import { router as student_routes } from "./routes/student.js";
import { router as department_routes } from "./routes/department.js";
import { router as professor_routes } from "./routes/professor.js";
import { router as course_routes } from "./routes/course.js";


// Load environment variables from .env
config({ path: "../.env" });

/** Main app function */
async function main() {
  // Create new server
  const server = new Server();

  // Add routes to server
  server.use_router(major_routes, "/major")
  server.use_router(student_routes, "/student")
  server.use_router(department_routes, "/department")
  server.use_router(professor_routes, "/professor")
  server.use_router(course_routes, "/course")
  
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
