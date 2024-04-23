import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
