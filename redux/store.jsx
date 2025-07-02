import { configureStore } from '@reduxjs/toolkit';
import { createStore ,applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định sử dụng localStorage cho web
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ 'persist/PERSIST', 'persist/REHYDRATE' ],
      },
    }),
})
export let persistor = persistStore(store)
