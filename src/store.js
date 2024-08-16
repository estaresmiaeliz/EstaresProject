// store.js
import { configureStore } from '@reduxjs/toolkit';
import addOnsReducer from './avSlice';
import mealsReducer from './mealsSlice';
import venueReducer from './venueSlice';

export default configureStore({
  reducer: {
    venue: venueReducer,
    addons : addOnsReducer,
    meals : mealsReducer ,
  },
});
