export function validate_student_data(data) {
    // Check that names and date of birth are all none empty strings
    if(typeof data.FirstName !== 'string' || data.FirstName === "") return false
    if(typeof data.LastName !== 'string' || data.LastName === "") return false
    if(typeof data.DateOfBirth !== 'string' || data.DateOfBirth === "") return false

    // If MajorID is not null, check that it is a valid int
    if(data.MajorID && !Number.isInteger(data.MajorID)) return false

    return true
}