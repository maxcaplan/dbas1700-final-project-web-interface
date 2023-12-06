import mssql from "mssql";

/**
 * Checks an add student request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for a new student
 * @returns {Boolean}
 */
export function validateAddStudentData(data) {
  // Check that names and date of birth are all none empty strings
  if (typeof data.FirstName !== "string" || data.FirstName === "") return false;
  if (typeof data.LastName !== "string" || data.LastName === "") return false;
  if (typeof data.DateOfBirth !== "string" || data.DateOfBirth === "")
    return false;

  // If MajorID is not null, check that it is a valid int
  if (data.MajorID && !Number.isInteger(data.MajorID)) return false;

  return true;
}

/**
 * Checks an updated student request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for updating student
 * @returns {Boolean}
 */
export function validateUpdateStudentData(data) {
  // Check that an integer is set for StudentID
  if (!data.StudentID || !Number.isInteger(data.StudentID)) return false;

  // Check that FirstName is a string and not empty if defined
  if (data.FirstName) {
    if (typeof data.FirstName !== "string" || data.FirstName === "")
      return false;
  }

  // Check that LastName is a string and not empty if defined
  if (data.LastName) {
    if (typeof data.LastName !== "string" || data.LastName === "") return false;
  }

  // Check that DateOfBirth is a string and not empty if defined
  if (data.DateOfBirth) {
    if (typeof data.DateOfBirth !== "string" || data.DateOfBirth === "")
      return false;
  }

  // Check that MajorID is an int if defined
  if (data.MajorID && !Number.isInteger(data.MajorID)) return false;

  return true;
}

/**
 * Mssql types for updateStudent data
 */
export const updateStudentTypes = {
    StudentID: mssql.Int, 
    FirstName: mssql.VarChar(50), 
    LastName: mssql.VarChar(50), 
    DateOfBirth: mssql.Date, 
    MajorID: mssql.Int
}