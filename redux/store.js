import { configureStore,combineReducers  } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';



//if we have multiple reducers then we have the power to combine the reducers
const rootReducer=combineReducers({
  theme:themeReducer
});  


 const persistConfig={
  key:'root',
  storage,
  version:1,

 };

const persistedReducer=persistReducer(persistConfig,rootReducer);



export const store=configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({ serializableCheck:false}),
});

export const persistor=persistStore(store);
