import mssql from "mssql";

/**
 * Checks an add professor request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for a new professor
 * @returns {Boolean}
 */
export function validateAddProfessorData(data) {
  // Check that FirstName is a none empty strings
  if (typeof data.FirstName !== "string" || data.FirstName === "") return false;

  // Check that LastName is a none empty strings
  if (typeof data.LastName !== "string" || data.LastName === "") return false;

  // Check that Prefix is a string and not empty if defined
  if (data.Prefix) {
    if (typeof data.Prefix !== "string" || data.Prefix === "")
      return false;
  }

  // If DepartmentID is not null, check that it is a valid int
  if (data.DepartmentID && !Number.isInteger(data.DepartmentID)) return false;

  return true;
}

/**
 * Checks an update professor request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for updating professor
 * @returns {Boolean}
 */
export function validateUpdateProfessorData(data) {
  // Check that an integer is set for ProfessorID
  if (!data.ProfessorID || !Number.isInteger(data.ProfessorID)) return false;

  // Check that ProfessorName is a string and not empty if defined
  if (data.FirstName) {
    if (typeof data.FirstName !== "string" || data.FirstName === "")
      return false;
  }

  // Check that LastName is a string and not empty if defined
  if (data.LastName) {
    if (typeof data.LastName !== "string" || data.LastName === "")
      return false;
  }

  // Check that Prefix is a string and not empty if defined
  if (data.Prefix) {
    if (typeof data.Prefix !== "string" || data.Prefix === "")
      return false;
  }

  // If DepartmentID is not null, check that it is a valid int
  if (data.DepartmentID && !Number.isInteger(data.DepartmentID)) return false;

  return true;
}

/**
 * Mssql types for updateProfessor data
 */
export const updateProfessorTypes = {
    ProfessorID: mssql.Int, 
    FirstName: mssql.VarChar(50),
    LastName: mssql.VarChar(50),
    Prefix: mssql.VarChar(50), 
    DepartmentID: mssql.Int
}