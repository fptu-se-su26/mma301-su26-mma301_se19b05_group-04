import apiClient from '../../../services/apiClient';
import { ENDPOINTS } from '../../../services/endpoints';
import { AIItineraryRequest } from '../../../types/ai';

const FALLBACK_REPLIES = [
  'Ngũ Hành Sơn gồm 5 ngọn núi: Kim, Mộc, Thủy, Hoả, Thổ. Trong đó Thủy Sơn là ngọn lớn nhất và có nhiều chùa chiền, hang động đẹp nhất!',
  'Bạn nên đến Động Huyền Không vào buổi sáng sớm để tránh đông và có ánh sáng tự nhiên đẹp nhất chiếu qua trần hang.',
  'Làng đá mỹ nghệ Non Nước có lịch sử hơn 400 năm, bạn có thể mua tượng đá làm quà lưu niệm rất đẹp.',
  'Bãi biển Mỹ Khê được Forbes bình chọn là 1 trong 6 bãi biển quyến rũ nhất thế giới, rất phù hợp để tắm biển và lướt sóng!',
];

const FALLBACK_ITINERARY = `🌅 BUỔI SÁNG (7:00 - 11:30)
• 7:00 - Ăn sáng tại Chợ Bắc Mỹ An (mì Quảng, bún chả cá)
• 8:00 - Tham quan Danh thắng Ngũ Hành Sơn
• 9:00 - Khám phá Động Huyền Không
• 10:00 - Viếng Chùa Linh Ứng Non Nước
• 11:00 - Tham quan Làng đá mỹ nghệ Non Nước

🌞 BUỔI TRƯA (11:30 - 13:30)
• 11:30 - Ăn trưa hải sản gần Bãi biển Non Nước
• 12:30 - Nghỉ ngơi tại bãi biển

🌇 BUỔI CHIỀU (13:30 - 17:00)
• 13:30 - Tắm biển tại Bãi biển Mỹ Khê
• 15:00 - Dạo Công viên Biển Đông
• 16:00 - Cafe tại khu phố An Thượng

🌙 BUỔI TỐI (17:00 - 21:00)
• 17:30 - Ngắm hoàng hôn tại Bãi biển Mỹ Khê
• 18:30 - Ăn tối tại khu phố An Thượng
• 20:30 - Xem Cầu Rồng phun lửa (T7-CN)`;

export const aiApi = {
  askAIChatbot: async (message: string): Promise<string> => {
    try {
      const res = await apiClient.post(ENDPOINTS.AI.CHAT, { message });
      return res.data.data?.reply || res.data.reply;
    } catch {
      return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    }
  },
  generateAIItinerary: async (data: AIItineraryRequest): Promise<string> => {
    try {
      const res = await apiClient.post(ENDPOINTS.AI.ITINERARY, data);
      return res.data.data?.itinerary || res.data.itinerary;
    } catch {
      return FALLBACK_ITINERARY;
    }
  },
};
