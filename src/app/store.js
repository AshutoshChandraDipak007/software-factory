import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/counter/authSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authSlice
  },
});
