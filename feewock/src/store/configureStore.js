import registrationReducer from '../reducers/registrationsReducer';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from '../reducers/TokenReducer';

const persistConfig = {
    key: 'root',
    storage
}

const reg = persistReducer(persistConfig , registrationReducer);


const store = configureStore({
    reducer:{
        registration:reg,
        token:tokenReducer,
    },
});

let persistor = persistStore(store);

export  {store , persistor};