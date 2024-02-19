export const SET_REGISTRATION_EMPLOYEE_DATA = 'SET_REGISTRATION_EMPLOYEE_DATA';
export const CLEAR_REGISTRATION_EMPLOYEE_DATA = 'CLEAR_REGISTRATION_EMPLOYEE_DATA';
 
export const setEmployeeRegistrationData = (data) => ({
    type: SET_REGISTRATION_EMPLOYEE_DATA,
    payload : data,
});

export const clearEmployeeRegistrationData = () => ({
    type: CLEAR_REGISTRATION_EMPLOYEE_DATA,
});