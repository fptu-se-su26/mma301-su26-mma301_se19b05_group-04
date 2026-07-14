// context/DestinationContext.js
// CRUD Reducer: Quản lý danh sách địa điểm du lịch Ngũ Hành Sơn

import React, { createContext, useReducer } from 'react';

// ============================
// DATA MẪU BAN ĐẦU
// ============================
const initialDestinations = [
  {
    id: '1',
    title: 'Chùa Linh Ứng',
    category: 'Tâm linh',
    location: 'Bãi Bụt, Sơn Trà, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=400',
    description: 'Chùa Linh Ứng nằm trên bán đảo Sơn Trà với tượng Phật Quan Thế Âm cao 67m, nơi linh thiêng bậc nhất Đà Nẵng.',
    rating: 4.8,
    reviews: 1250,
    openTime: '06:00 - 18:00',
    price: 'Miễn phí',
    latitude: 16.1005,
    longitude: 108.2772,
  },
  {
    id: '2',
    title: 'Ngũ Hành Sơn',
    category: 'Thiên nhiên',
    location: 'Quận Ngũ Hành Sơn, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400',
    description: 'Danh thắng Ngũ Hành Sơn gồm 5 ngọn núi đá vôi: Kim, Mộc, Thủy, Hỏa, Thổ với nhiều hang động và chùa chiền.',
    rating: 4.7,
    reviews: 2100,
    openTime: '07:00 - 17:30',
    price: '40.000 VNĐ',
    latitude: 16.0044,
    longitude: 108.2631,
  },
  {
    id: '3',
    title: 'Bãi biển Non Nước',
    category: 'Bãi biển',
    location: 'Non Nước, Ngũ Hành Sơn',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400',
    description: 'Bãi biển Non Nước – một trong 6 bãi biển đẹp nhất hành tinh do Forbes bình chọn, nước xanh trong và cát trắng mịn.',
    rating: 4.6,
    reviews: 980,
    openTime: '24/7',
    price: 'Miễn phí',
    latitude: 15.9949,
    longitude: 108.2694,
  },
  {
    id: '4',
    title: 'Làng đá mỹ nghệ Non Nước',
    category: 'Văn hóa',
    location: 'Hòa Hải, Ngũ Hành Sơn',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400',
    description: 'Làng nghề điêu khắc đá truyền thống hơn 400 năm, nơi tạo ra những tác phẩm nghệ thuật từ đá cẩm thạch.',
    rating: 4.4,
    reviews: 560,
    openTime: '08:00 - 17:00',
    price: 'Miễn phí',
    latitude: 16.0020,
    longitude: 108.2600,
  },
  {
    id: '5',
    title: 'Động Huyền Không',
    category: 'Thiên nhiên',
    location: 'Thủy Sơn, Ngũ Hành Sơn',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400',
    description: 'Hang động đẹp nhất trong cụm Ngũ Hành Sơn với ánh sáng tự nhiên xuyên qua trần hang, tạo nên khung cảnh huyền ảo.',
    rating: 4.9,
    reviews: 1800,
    openTime: '07:00 - 17:30',
    price: '40.000 VNĐ',
    latitude: 16.0038,
    longitude: 108.2628,
  },
  {
    id: '6',
    title: 'Chùa Tam Thai',
    category: 'Tâm linh',
    location: 'Thủy Sơn, Ngũ Hành Sơn',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400',
    description: 'Ngôi chùa cổ nhất tại Ngũ Hành Sơn, được vua Minh Mạng sắc phong, mang kiến trúc truyền thống Việt Nam.',
    rating: 4.5,
    reviews: 720,
    openTime: '06:00 - 18:00',
    price: 'Miễn phí',
    latitude: 16.0042,
    longitude: 108.2635,
  },
];

// ============================
// CRUD REDUCER
// ============================
const destinationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DESTINATION':
      return [...state, { ...action.payload, id: Date.now().toString() }];

    case 'UPDATE_DESTINATION':
      return state.map(dest =>
        dest.id === action.payload.id
          ? { ...dest, ...action.payload }
          : dest
      );

    case 'DELETE_DESTINATION':
      return state.filter(dest => dest.id !== action.payload);

    default:
      return state;
  }
};

// ============================
// CONTEXT + PROVIDER
// ============================
export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [destinations, dispatch] = useReducer(destinationReducer, initialDestinations);

  return (
    <DestinationContext.Provider value={{ destinations, dispatch }}>
      {children}
    </DestinationContext.Provider>
  );
};
