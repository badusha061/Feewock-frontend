export const SET_REGISTRATION_DATA = 'SET_REGISTRATION_DATA';
export const CLEAR_REGISTRATION_DATA = 'CLEAR_REGISTRATION_DATA';
 
export const setRegistrationData = (data) => ({
    type: SET_REGISTRATION_DATA,
    payload : data,
});

export const clearRegistrationData = () => ({
    type: CLEAR_REGISTRATION_DATA,
});