import { CLEAR_REGISTRATION_EMPLOYEE_DATA, SET_REGISTRATION_EMPLOYEE_DATA } from "../actions/EmployeeRegistrationAction";

const initialState = {
    id:''
};

const employeeregistrationReducer = (state = initialState , action) => {
    switch(action.type){
        case CLEAR_REGISTRATION_EMPLOYEE_DATA:  
            return initialState;
        case SET_REGISTRATION_EMPLOYEE_DATA:
            return {...state,...action.payload};
        default:
            return state;
    }
};

export default employeeregistrationReducer  