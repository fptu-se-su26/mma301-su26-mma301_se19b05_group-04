// context/AppContext.js
// Pattern: Context + useReducer (theo pattern AppHouse)
// Quản lý: User đăng nhập, Theme, Favorites, Notifications

import React, { createContext, useReducer } from 'react';

// ============================
// 1. KHỞI TẠO STATE BAN ĐẦU
// ============================
const initialState = {
  user: null,           // null = chưa đăng nhập
  theme: 'light',       // 'light' hoặc 'dark'
  favorites: [],        // danh sách địa điểm yêu thích
  notifications: [
    { id: '1', title: 'Chào mừng đến Ngũ Hành Sơn!', body: 'Khám phá những điểm đến tuyệt vời tại Ngũ Hành Sơn.', read: false, time: '2 phút trước' },
    { id: '2', title: 'Lịch trình mới được tạo', body: 'Lịch trình "Khám phá Ngũ Hành Sơn 1 ngày" đã sẵn sàng.', read: false, time: '1 giờ trước' },
    { id: '3', title: 'Địa điểm gợi ý', body: 'Chùa Linh Ứng đang có nhiều lượt ghé thăm hôm nay.', read: true, time: '3 giờ trước' },
  ],
};

// ============================
// 2. ĐỊNH NGHĨA REDUCER
// ============================
const appReducer = (state, action) => {
  switch (action.type) {

    // --- User Actions ---
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null, favorites: [] };

    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };

    // --- Theme Action ---
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    // --- Favorites Actions (CRUD) ---
    case 'ADD_FAVORITE':
      if (state.favorites.find(f => f.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };

    // --- Notifications ---
    case 'MARK_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };

    default:
      return state;
  }
};

// ============================
// 3. TẠO CONTEXT
// ============================
export const AppContext = createContext();

// ============================
// 4. TẠO PROVIDER (bọc toàn app)
// ============================
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
