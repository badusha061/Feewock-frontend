import registrationReducer from '../reducers/registrationsReducer';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage
}

const persistReducerr = persistReducer(persistConfig , registrationReducer);

const store = configureStore({
    reducer:{
        registration:persistReducerr
    },
});

let persistor = persistStore(store);

export  {store , persistor};