export const EMPLOYEE_SET_REGISTRATION_DATA = 'SET_REGISTRATION_DATA';
export const EMPLOYEE_CLEAR_REGISTRATION_DATA = 'CLEAR_REGISTRATION_DATA';
 
export const employee_setRegistrationData = (data) => ({
    type: EMPLOYEE_SET_REGISTRATION_DATA,
    payload : data,
});

export const employee_clearRegistrationData = () => ({
    type: EMPLOYEE_CLEAR_REGISTRATION_DATA,
});