import express from "express";
import mssql from "mssql";
import validateDbConnection from "../middleware/validate-db-connection.js";

const router = express.Router();

//
// MIDDLEWARE
//

// Make sure there is an active databse connection
router.use(validateDbConnection);

//
// ROUTES
//

// Get major by id
router.get("/:MajorID", async(req, res) => {
  try {
    console.log("Gettings major...")

    // Validate get student StudentID
    if(Number.parseInt(req.params.MajorID) === NaN) {
      throw new Error("INVALID REQUEST DATA")
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db)

    // Set request input params
    dbReq.input("MajorID", mssql.Int, req.params.MajorID)

    // Send select query
    const dbRes = await dbReq.query("SELECT * FROM Major WHERE MajorID = @MajorID")

    console.log("Got major")
    res.send(dbRes.recordset[0])
  } catch (e) {
    throw e
  }
});

// Add new major
router.post("/addMajor", async (req, res) => {
  try {
    console.log("Adding major...");

    // // Validate new student data
    // if (!validateAddStudentData(req.body)) {
    //   throw new Error("INVALID REQUEST DATA");
    // }

    // // Create new database request
    // const dbReq = new mssql.Request(req.app.locals.db);

    // // Set request input params
    // dbReq.input("FirstName", mssql.VarChar(50), req.body.FirstName);
    // dbReq.input("LastName", mssql.VarChar(50), req.body.LastName);
    // dbReq.input("DateOfBirth", mssql.Date, req.body.DateOfBirth);
    // dbReq.input("MajorID", mssql.Int, req.body.MajorID);

    // // Send insert query
    // const dbRes = await dbReq.query(
    //   "INSERT INTO Student (FirstName, LastName, DateOfBirth, MajorID) VALUES(@FirstName, @LastName, @DateOfBirth, @MajorID)"
    // );

    // console.log(`Added major (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Delete a major by id
router.post("/deleteMajor", async (req, res) => {
  try {
    console.log("Deleting major...");

    // // Validate request StudentID
    // if (!Number.isInteger(req.body.StudentID))
    //   throw new Error("INVALID REQUEST DATA");

    // // Create new database request
    // const dbReq = new mssql.Request(req.app.locals.db);

    // // Set request input params
    // dbReq.input("StudentID", mssql.Int, req.body.StudentID);

    // // Send delete query
    // const dbRes = await dbReq.query(
    //   "DELETE FROM Student WHERE StudentID=@StudentID"
    // );

    // console.log(`Deleted major (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Update a major by id
router.post("/updateMajor", async(req, res) => {
  try {
    console.log("Updating major...")

    // // Validate update student data
    // if(!validateUpdateStudentData(req.body)) {
    //   throw new Error("INVALID REQUEST DATA")
    // }

    // // Create new database request
    // const dbReq = new mssql.Request(req.app.locals.db);

    // // Deconstruct request body to only update fields
    // const { FirstName, LastName, DateOfBirth, MajorID } = req.body
    // const updateData = { FirstName, LastName, DateOfBirth, MajorID }

    // let values = []
    
    // // Loop over all update fields
    // for (const [key, value] of Object.entries(updateData)) {
    //   // Skip key if value is not set
    //   if(value === undefined) continue

    //   // Add request input param
    //   dbReq.input(key, updateStudentTypes[key], value)

    //   // Add update value to values arr
    //   values.push(`${key} = @${key}`)
    // }

    // // Set StudentID input param
    // dbReq.input("StudentID", mssql.Int, req.body.StudentID)

    // // Construct query string from values array
    // const queryString = `UPDATE Student SET ${values.toString()} WHERE StudentID = @StudentID`

    // // Send update query
    // const dbRes = await dbReq.query(queryString)

    // console.log(`Updated major (${dbRes.rowsAffected} rows affected)`)
    res.sendStatus(200)
  } catch (e) {
    throw e;
  }
});

export { router };
