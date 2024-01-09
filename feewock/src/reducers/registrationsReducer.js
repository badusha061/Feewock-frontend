import {SET_REGISTRATION_DATA, CLEAR_REGISTRATION_DATA} from '../actions/RegisterAction';

const initialState = {
    first_name:'',
    last_name:'',
    email:'',
    number:'',
    location:'',
    password:'',
    conform_password:'',
};

const registrationReducer = (state = initialState , action) => {
    switch(action.type){
        case SET_REGISTRATION_DATA:  
            return {...state,...action.payload};
        case CLEAR_REGISTRATION_DATA:
            return initialState;
        default:
            return state;
    }
};

export default registrationReducer  
