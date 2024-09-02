import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import estimateRevenueSlice from '~/redux/slice/revenue-graph-slice';
import storageEngine from "~/redux/storageEngine";

const rootReducer = combineReducers({
    estimateRevenue: estimateRevenueSlice,
});

const persistConfig = {
    key: 'root',
    storage:storageEngine, 
    whitelist: ['estimateRevenue'] 
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
