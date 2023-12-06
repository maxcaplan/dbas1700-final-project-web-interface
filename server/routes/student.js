import express from "express";
import mssql from "mssql"
import { validate_student_data } from "../util/student.js";

const router = express.Router();

//
// MIDDLEWARE
//

// Make sure there is an active databse connection
router.use((req, res, next) => {
  if (!req.app.locals.db || !req.app.locals.db.connected) {
    res.status(500)
    throw new Error("DATABASE CONNECTION ERROR")
  }

  next()
})

//
// ROUTES
//

// Get student by id
router.get("/:id", (req, res) => {
  res.send(req.params.id)
});

// Add new student
router.post("/addStudent", async (req, res) => {
  try {
    console.log("Adding student...")

    // Validate new student data
    if (!validate_student_data(req.body)) {
      throw new Error("INVALID INPUT DATA")
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db)

    // Set input parameters
    dbReq.input("FirstName", mssql.VarChar(50), req.body.FirstName)
    dbReq.input("LastName", mssql.VarChar(50), req.body.LastName)
    dbReq.input("DateOfBirth", mssql.Date, req.body.DateOfBirth)
    dbReq.input("MajorID", mssql.Int, req.body.MajorID)

    // Send insert query
    await dbReq.query("INSERT INTO Student (FirstName, LastName, DateOfBirth, MajorID) VALUES(@FirstName, @LastName, @DateOfBirth, @MajorID)")
    
    console.log("Student added")
    res.sendStatus(200)
  } catch(e) {
    throw e
  }
})

// Update a student by id
router.post("/updateStudent", (req, res) => {
  console.log("Updating student...")
  res.send("Update student")
})

// Delete a student by id
router.post("/removeStudent", (req, res) => {
  console.log("Removing student...")
  res.send("Remove student")
})

export { router }