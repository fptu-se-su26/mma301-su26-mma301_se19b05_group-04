// redux/store.js
// Cấu hình Redux Store — nơi tập trung toàn bộ state của app

import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './itinerarySlice';

const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    // Có thể thêm nhiều reducer khác ở đây
  },
});

export default store;
