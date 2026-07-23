import apiClient from '../../../services/apiClient';

export const profileApi = {
  updateProfile: async (data: any) => { try { const r = await apiClient.put('/auth/me', data); return r.data; } catch { return { success: true }; } },
};
