import { EMPLOYEE_CLEAR_REGISTRATION_DATA, EMPLOYEE_SET_REGISTRATION_DATA } from "../actions/EmployeeRegister";

const initialState = {
    username:'',
    email:'',
    phone_number:'',
    role:2,
    city:'',
    state:'',
    gender:'',
    dob:'',
    type_of_work:'',
    location:'',
    position:[],
    address:'',
    adhar_number:'',
    password1:'',
    password2:'',
};


const employeeregistrationReducer = (state = initialState , action) => {
    switch(action.type){
        case EMPLOYEE_SET_REGISTRATION_DATA:  
            return {...state,...action.payload};
        case EMPLOYEE_CLEAR_REGISTRATION_DATA:
            return initialState;
        default:
            return state;
    }
};

export default employeeregistrationReducer  
