import express from "express";
import mssql from "mssql";
import validateDbConnection from "../middleware/validate-db-connection.js";
import {
  updateCourseTypes,
  validateAddCourseData,
  validateUpdateCourseData,
} from "../util/course.js";

const router = express.Router();

//
// MIDDLEWARE
//

// Make sure there is an active databse connection
router.use(validateDbConnection);

//
// ROUTES
//

// Get course by id
router.post("/getCourse", async (req, res) => {
  try {
    console.log("Getting course...");

    // Validate get course CourseID
    if (Number.parseInt(req.body.CourseID) === NaN) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("CourseID", mssql.Int, req.body.CourseID);

    // Send select query
    const dbRes = await dbReq.query(
      "SELECT * FROM Course WHERE CourseID = @CourseID"
    );

    console.log("Got course");
    res.send(dbRes.recordset[0]);
  } catch (e) {
    throw e;
  }
});

// Get all courses
router.post("/listCourses", async (req, res) => {
  try {
    console.log("Getting all courses...");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Send select query
    const dbRes = await dbReq.query("SELECT * FROM Course");

    console.log(`Got all courses (${dbRes.recordset.length} rows selected)`);
    res.send(dbRes.recordset);
  } catch (e) {
    throw e;
  }
});

// Add new course
router.post("/addCourse", async (req, res) => {
  try {
    console.log("Adding course...");

    // Validate new course data
    if (!validateAddCourseData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("CourseName", mssql.VarChar(50), req.body.CourseName);
    dbReq.input("Credits", mssql.Int, req.body.Credits);
    dbReq.input("ProfessorID", mssql.Int, req.body.ProfessorID);

    // Send insert query
    const dbRes = await dbReq.query(
      "INSERT INTO Course (CourseName, Credits, ProfessorID) VALUES (@CourseName, @Credits, @ProfessorID)"
    );

    console.log(`Added course (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Delete a course by id
router.post("/deleteCourse", async (req, res) => {
  try {
    console.log("Deleting course...");

    // Validate request CourseID
    if (!Number.isInteger(req.body.CourseID))
      throw new Error("INVALID REQUEST DATA");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("CourseID", mssql.Int, req.body.CourseID);

    // Send delete query for course
    const dbRes = await dbReq.query(
      "DELETE FROM Course WHERE CourseID=@CourseID"
    );

    console.log(`Deleted course (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Update a course by id
router.post("/updateCourse", async (req, res) => {
  try {
    console.log("Updating course...");

    // Validate update course data
    if (!validateUpdateCourseData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Deconstruct request body to only update fields
    const { CourseName, Credits, ProfessorID } = req.body;
    const updateData = { CourseName, Credits, ProfessorID };

    let values = [];

    // Loop over all update fields
    for (const [key, value] of Object.entries(updateData)) {
      // Skip key if value is not set
      if (value === undefined) continue;

      // Add request input param
      dbReq.input(key, updateCourseTypes[key], value);

      // Add update value to values arr
      values.push(`${key} = @${key}`);
    }

    // Set CourseID input param
    dbReq.input("CourseID", mssql.Int, req.body.CourseID);

    // Construct query string from values array
    const queryString = `UPDATE Course SET ${values.toString()} WHERE CourseID = @CourseID`;

    // Send update query
    const dbRes = await dbReq.query(queryString);

    console.log(`Updated course (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

export { router };
