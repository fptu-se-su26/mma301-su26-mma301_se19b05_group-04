// redux/itinerarySlice.js
// Redux Toolkit: Quản lý lịch trình du lịch

import { createSlice } from '@reduxjs/toolkit';

const initialItineraries = [
  {
    id: '1',
    title: 'Khám phá Ngũ Hành Sơn 1 ngày',
    description: 'Lịch trình trọn vẹn 1 ngày khám phá các điểm đến nổi bật tại Ngũ Hành Sơn.',
    duration: '1 ngày',
    stops: [
      { id: 's1', name: 'Ngũ Hành Sơn', time: '07:00 - 10:00', note: 'Leo núi, tham quan các hang động' },
      { id: 's2', name: 'Động Huyền Không', time: '10:00 - 11:30', note: 'Khám phá hang động huyền bí' },
      { id: 's3', name: 'Chùa Tam Thai', time: '11:30 - 12:30', note: 'Viếng chùa, cầu bình an' },
      { id: 's4', name: 'Bãi biển Non Nước', time: '14:00 - 17:00', note: 'Tắm biển, nghỉ ngơi' },
    ],
    createdAt: '2026-06-01',
  },
  {
    id: '2',
    title: 'Tour văn hóa & tâm linh',
    description: 'Hành trình khám phá văn hóa truyền thống và các địa điểm tâm linh.',
    duration: '2 ngày',
    stops: [
      { id: 's1', name: 'Chùa Linh Ứng', time: '06:00 - 09:00', note: 'Ngắm bình minh, viếng chùa' },
      { id: 's2', name: 'Làng đá mỹ nghệ', time: '09:30 - 12:00', note: 'Tham quan làng nghề truyền thống' },
      { id: 's3', name: 'Chùa Tam Thai', time: '14:00 - 16:00', note: 'Tham quan, thiền định' },
    ],
    createdAt: '2026-05-28',
  },
];

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: {
    itineraries: initialItineraries,
    aiGeneratedItinerary: null,
  },
  reducers: {
    addItinerary: (state, action) => {
      state.itineraries.push({ ...action.payload, id: Date.now().toString() });
    },
    removeItinerary: (state, action) => {
      state.itineraries = state.itineraries.filter(i => i.id !== action.payload);
    },
    updateItinerary: (state, action) => {
      const index = state.itineraries.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.itineraries[index] = { ...state.itineraries[index], ...action.payload };
      }
    },
    setAIItinerary: (state, action) => {
      state.aiGeneratedItinerary = action.payload;
    },
    clearAIItinerary: (state) => {
      state.aiGeneratedItinerary = null;
    },
  },
});

export const { addItinerary, removeItinerary, updateItinerary, setAIItinerary, clearAIItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;
