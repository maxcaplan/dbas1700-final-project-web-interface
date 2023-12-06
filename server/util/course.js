import mssql from "mssql";

/**
 * Checks an add course request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for a new course
 * @returns {Boolean}
 */
export function validateAddCourseData(data) {
  // Check that FirstName is a none empty strings
  if (typeof data.CourseName !== "string" || data.FirstName === "") return false;

  // If Credits is not null, check that it is a valid int
  if (data.Credits && !Number.isInteger(data.Credits)) return false;

  // If CreditsID is not null, check that it is a valid int
  if (data.ProfessorID && !Number.isInteger(data.ProfessorID)) return false;

  return true;
}

/**
 * Checks an update course request input data object. Returns true if input data is valid, else returns false
 * @param {Object} data - Object containing input data for updating course
 * @returns {Boolean}
 */
export function validateUpdateCourseData(data) {
  // Check that an integer is set for CourseID
  if (!data.CourseID || !Number.isInteger(data.CourseID)) return false;

  // Check that CourseName is a string and not empty if defined
  if (data.CourseName) {
    if (typeof data.CourseName !== "string" || data.CourseName === "")
      return false;
  }

  // If Credits is not null, check that it is a valid int
  if (data.Credits && !Number.isInteger(data.Credits)) return false;

  // If ProfessorID is not null, check that it is a valid int
  if (data.ProfessorID && !Number.isInteger(data.ProfessorID)) return false;

  return true;
}

/**
 * Mssql types for updateCourse data
 */
export const updateCourseTypes = {
    CourseID: mssql.Int, 
    CourseName: mssql.VarChar(50),
    Credits: mssql.Int,
    ProfessorID: mssql.Int
}