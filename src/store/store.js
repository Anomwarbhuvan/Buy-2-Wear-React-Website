import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session'



const persistConfig = {
    key: 'root',
    storage : storageSession,
    blacklist:['user']

}

const persistedReducer = persistReducer(persistConfig, rootReducer);



const middleWares = [process.env.NODE_ENV == 'production' && logger].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV != 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);