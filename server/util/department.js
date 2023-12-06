import mssql from "mssql";

/**
 * Checks an add department request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for a new department
 * @returns {Boolean}
 */
export function validateAddDepartmentData(data) {
  // Check that DepartmentName is a none empty strings
  if (typeof data.DepartmentName !== "string" || data.DepartmentName === "") return false;

  return true;
}

/**
 * Checks an update department request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for updating department
 * @returns {Boolean}
 */
export function validateUpdateDepartmentData(data) {
  // Check that an integer is set for DepartmentID
  if (!data.DepartmentID || !Number.isInteger(data.DepartmentID)) return false;

  // Check that DepartmentName is a string and not empty if defined
  if (data.DepartmentName) {
    if (typeof data.DepartmentName !== "string" || data.DepartmentName === "")
      return false;
  }

  return true;
}

/**
 * Mssql types for updateDepartment data
 */
export const updateDepartmentTypes = {
    DepartmentID: mssql.Int, 
    DepartmentName: mssql.VarChar(50), 
}