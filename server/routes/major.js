import express from "express";
import mssql from "mssql";
import validateDbConnection from "../middleware/validate-db-connection.js";
import {
  updateMajorTypes,
  validateAddMajorData,
  validateUpdateMajorData,
} from "../util/major.js";

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
router.post("/getMajor", async (req, res) => {
  try {
    console.log("Gettings major...");

    // Validate get major MajorID
    if (Number.parseInt(req.body.MajorID) === NaN) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("MajorID", mssql.Int, req.body.MajorID);

    // Send select query
    const dbRes = await dbReq.query(
      "SELECT * FROM Major WHERE MajorID = @MajorID"
    );

    console.log("Got major");
    res.send(dbRes.recordset[0]);
  } catch (e) {
    throw e;
  }
});

// Get all majors
router.post("/listMajors", async (req, res) => {
  try {
    console.log("Getting all majors...");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Send select query
    const dbRes = await dbReq.query("SELECT * FROM Major");

    console.log(`Got all majors (${dbRes.recordset.length} rows selected)`);
    res.send(dbRes.recordset);
  } catch (e) {
    throw e;
  }
});

// Add new major
router.post("/addMajor", async (req, res) => {
  try {
    console.log("Adding major...");

    // Validate new major data
    if (!validateAddMajorData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("MajorName", mssql.VarChar(50), req.body.MajorName);
    dbReq.input(
      "MajorDescription",
      mssql.VarChar(3000),
      req.body.MajorDescription
    );

    // Send insert query
    const dbRes = await dbReq.query(
      "INSERT INTO Major (MajorName, MajorDescription) VALUES (@MajorName, @MajorDescription)"
    );

    console.log(`Added major (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Delete a major by id
router.post("/deleteMajor", async (req, res) => {
  try {
    console.log("Deleting major...");

    // Validate request MajorID
    if (!Number.isInteger(req.body.MajorID))
      throw new Error("INVALID REQUEST DATA");

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Set request input params
    dbReq.input("MajorID", mssql.Int, req.body.MajorID);

    // Send delete query for major
    const dbRes = await dbReq.query("DELETE FROM Major WHERE MajorID=@MajorID");

    console.log(`Deleted major (${dbRes.rowsAffected} rows affected)`);

    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

// Update a major by id
router.post("/updateMajor", async (req, res) => {
  try {
    console.log("Updating major...");

    // Validate update major data
    if (!validateUpdateMajorData(req.body)) {
      throw new Error("INVALID REQUEST DATA");
    }

    // Create new database request
    const dbReq = new mssql.Request(req.app.locals.db);

    // Deconstruct request body to only update fields
    const { MajorName, MajorDescription } = req.body;
    const updateData = { MajorName, MajorDescription };

    let values = [];

    // Loop over all update fields
    for (const [key, value] of Object.entries(updateData)) {
      // Skip key if value is not set
      if (value === undefined) continue;

      // Add request input param
      dbReq.input(key, updateMajorTypes[key], value);

      // Add update value to values arr
      values.push(`${key} = @${key}`);
    }

    // Set MajorID input param
    dbReq.input("MajorID", mssql.Int, req.body.MajorID);

    // Construct query string from values array
    const queryString = `UPDATE Major SET ${values.toString()} WHERE MajorID = @MajorID`;

    // Send update query
    const dbRes = await dbReq.query(queryString);

    console.log(`Updated major (${dbRes.rowsAffected} rows affected)`);
    res.sendStatus(200);
  } catch (e) {
    throw e;
  }
});

export { router };
