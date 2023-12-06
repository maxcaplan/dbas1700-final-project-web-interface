import mssql from "mssql";

/**
 * Checks an add major request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for a new major
 * @returns {Boolean}
 */
export function validateAddMajorData(data) {
  // Check that MajorName is a none empty strings
  if (typeof data.MajorName !== "string" || data.MajorName === "") return false;

  // If MajorDescription is not null, check that it is a none empty strings
  if (data.MajorDescription) {
    if (typeof data.MajorDescription !== "string" || data.MajorDescription === "") return false;
  }

  return true;
}

/**
 * Checks an update major request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for updating major
 * @returns {Boolean}
 */
export function validateUpdateMajorData(data) {
  // Check that an integer is set for MajorID
  if (!data.MajorID || !Number.isInteger(data.MajorID)) return false;

  // Check that MajorName is a string and not empty if defined
  if (data.MajorName) {
    if (typeof data.MajorName !== "string" || data.MajorName === "")
      return false;
  }

  // Check that MajorDescription is a string if defined
  if (data.MajorDescription) {
    if (typeof data.MajorDescription !== "string") return false;
  }

  return true;
}

/**
 * Mssql types for updateMajor data
 */
export const updateMajorTypes = {
    MajorID: mssql.Int, 
    MajorName: mssql.VarChar(50), 
    MajorDescription: mssql.VarChar(3000),
}