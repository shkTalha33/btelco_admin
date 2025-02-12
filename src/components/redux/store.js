/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable import/order */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './loginForm';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThemeSlice } from './dark-light-theme';
import ChatSlice  from './chat-message';
import pricingPackageSlice  from './pricingPackage';
import firmSlice  from './firm';
import staffSlice  from './staff';
import faqSlice  from './faq';


// Define the root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  chat : ChatSlice,
  themeDark: ThemeSlice.reducer,
  pricingPackage: pricingPackageSlice,
  firm: firmSlice,
  staff: staffSlice,
  faq: faqSlice,
});

// Create the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'themeDark'], // persist only 'auth' and 'themeDark'
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

// Persist the store
persistStore(store);

// Export the store
export { store };
