import express from "express";
import mssql from "mssql";
import validateDbConnection from "../middleware/validate-db-connection.js";
import {
  updateProfessorTypes,
  validateAddProfessorData,
  validateUpdateProfessorData,
} from "../util/professor.js";

const router = express.Router();

//
// MIDDLEWARE
//

// Make sure there is an active databse connection
router.use(validateDbConnection);

//
// ROUTES
//

// Get professor by id
router.post("/getProfessor", async (req, res) => {
  try {
    console.log("Getting professor...");

    // Validate get professor ProfessorID
    if (Number.parseInt(req.body.ProfessorID) === NaN) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("ProfessorID", mssql.Int, req.body.ProfessorID);

    // Send select query
    const dbRes = await dbReq.query(
      "SELECT * FROM Professor WHERE ProfessorID = @ProfessorID"
    );

    console.log("Got professor");
    res.send(dbRes.recordset[0]);
  } catch (e) {
    throw e;
  }
});

// Get all professors
router.post("/listProfessors", async (req, res) => {
  try {
    console.log("Getting all professors...");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Send select query
    const dbRes = await dbReq.query("SELECT * FROM Professor");

    console.log(`Got all professors (${dbRes.recordset.length} rows selected)`);
    res.send(dbRes.recordset);
  } catch (e) {
    throw e;
  }
});

// Add new professor
router.post("/addProfessor", async (req, res) => {
  try {
    console.log("Adding professor...");

    // Validate new professor data
    if (!validateAddProfessorData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("FirstName", mssql.VarChar(50), req.body.FirstName);
    dbReq.input("LastName", mssql.VarChar(50), req.body.LastName);
    dbReq.input("Prefix", mssql.VarChar(50), req.body.Prefix);
    dbReq.input("DepartmentID", mssql.Int, req.body.DepartmentID);

    // Send insert query
    const dbRes = await dbReq.query(
      "INSERT INTO Professor (FirstName, LastName, Prefix, DepartmentID) VALUES (@FirstName, @LastName, @Prefix, @DepartmentID)"
    );

    console.log(`Added professor (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Delete a professor by id
router.post("/deleteProfessor", async (req, res) => {
  try {
    console.log("Deleting professor...");

    // Validate request ProfessorID
    if (!Number.isInteger(req.body.ProfessorID))
      throw new Error("INVALID REQUEST DATA");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("ProfessorID", mssql.Int, req.body.ProfessorID);

    // Send delete query for professor
    const dbRes = await dbReq.query(
      "DELETE FROM Professor WHERE ProfessorID=@ProfessorID"
    );

    console.log(`Deleted professor (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Update a professor by id
router.post("/updateProfessor", async (req, res) => {
  try {
    console.log("Updating professor...");

    // Validate update professor data
    if (!validateUpdateProfessorData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Deconstruct request body to only update fields
    const { FirstName, LastName, Prefix, DepartmentID } = req.body;
    const updateData = { FirstName, LastName, Prefix, DepartmentID };

    let values = [];

    // Loop over all update fields
    for (const [key, value] of Object.entries(updateData)) {
      // Skip key if value is not set
      if (value === undefined) continue;

      // Add request input param
      dbReq.input(key, updateProfessorTypes[key], value);

      // Add update value to values arr
      values.push(`${key} = @${key}`);
    }

    // Set ProfessorID input param
    dbReq.input("ProfessorID", mssql.Int, req.body.ProfessorID);

    // Construct query string from values array
    const queryString = `UPDATE Professor SET ${values.toString()} WHERE ProfessorID = @ProfessorID`;

    // Send update query
    const dbRes = await dbReq.query(queryString);

    console.log(`Updated professor (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

export { router };
