import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { counterSlice } from "./reducers/counterSlice";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import jobSlice from "./reducers/jobSlice";
import { persistStore, persistReducer } from "redux-persist";

import hireSlice from "./reducers/hireSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,

};

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice,
  user: userSlice,

  hire: hireSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);