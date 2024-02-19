import registrationReducer from '../reducers/registrationsReducer';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from '../reducers/TokenReducer';
import employeeregistrationReducer from '../reducers/employeeregistrationReducer';


const persistConfig = {
    key: 'root',
    storage
}

const reg = persistReducer(persistConfig , registrationReducer);
const tokenreducer = persistReducer(persistConfig , tokenReducer);
const employeereg = persistReducer(persistConfig , employeeregistrationReducer);


const store = configureStore({
    reducer:{
        registration:reg,
        token:tokenreducer,
        employeeregistration:employeereg,
    },
});

let persistor = persistStore(store);

export  {store , persistor};




