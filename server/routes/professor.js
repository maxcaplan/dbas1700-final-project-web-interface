import express from "express";
import mssql from "mssql";
import validateDbConnection from "../middleware/validate-db-connection.js";
import {
  updateDepartmentTypes,
  validateAddDepartmentData,
  validateUpdateDepartmentData,
} from "../util/department.js";

const router = express.Router();

//
// MIDDLEWARE
//

// Make sure there is an active databse connection
router.use(validateDbConnection);

//
// ROUTES
//

// Get department by id
router.post("/getDepartment", async (req, res) => {
  try {
    console.log("Getting department...");

    // Validate get department DepartmentID
    if (Number.parseInt(req.body.DepartmentID) === NaN) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("DepartmentID", mssql.Int, req.body.DepartmentID);

    // Send select query
    const dbRes = await dbReq.query(
      "SELECT * FROM Department WHERE DepartmentID = @DepartmentID"
    );

    console.log("Got department");
    res.send(dbRes.recordset[0]);
  } catch (e) {
    throw e;
  }
});

// Get all departments
router.post("/listDepartments", async (req, res) => {
  try {
    console.log("Getting all departments...");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Send select query
    const dbRes = await dbReq.query("SELECT * FROM Department");

    console.log(
      `Got all departments (${dbRes.recordset.length} rows selected)`
    );
    res.send(dbRes.recordset);
  } catch (e) {
    throw e;
  }
});

// Add new department
router.post("/addDepartment", async (req, res) => {
  try {
    console.log("Adding department...");

    // Validate new department data
    if (!validateAddDepartmentData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("DepartmentName", mssql.VarChar(50), req.body.DepartmentName);

    // Send insert query
    const dbRes = await dbReq.query(
      "INSERT INTO Department (DepartmentName) VALUES (@DepartmentName)"
    );

    console.log(`Added department (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Delete a department by id
router.post("/deleteDepartment", async (req, res) => {
  try {
    console.log("Deleting department...");

    // Validate request DepartmentID
    if (!Number.isInteger(req.body.DepartmentID))
      throw new Error("INVALID REQUEST DATA");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("DepartmentID", mssql.Int, req.body.DepartmentID);

    // Send delete query for department
    const dbRes = await dbReq.query(
      "DELETE FROM Department WHERE DepartmentID=@DepartmentID"
    );

    console.log(`Deleted department (${dbRes.rowsAffected} rows affected)`);

    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Update a department by id
router.post("/updateDepartment", async (req, res) => {
  try {
    console.log("Updating department...");

    // Validate update department data
    if (!validateUpdateDepartmentData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Deconstruct request body to only update fields
    const { DepartmentName } = req.body;
    const updateData = { DepartmentName };

    let values = [];

    // Loop over all update fields
    for (const [key, value] of Object.entries(updateData)) {
      // Skip key if value is not set
      if (value === undefined) continue;

      // Add request input param
      dbReq.input(key, updateDepartmentTypes[key], value);

      // Add update value to values arr
      values.push(`${key} = @${key}`);
    }

    // Set DepartmentID input param
    dbReq.input("DepartmentID", mssql.Int, req.body.DepartmentID);

    // Construct query string from values array
    const queryString = `UPDATE Department SET ${values.toString()} WHERE DepartmentID = @DepartmentID`;

    // Send update query
    const dbRes = await dbReq.query(queryString);

    console.log(`Updated department (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

export { router };
