import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { useAuth } from '../../../hooks/useAuth';
import { useItinerary } from '../../../hooks/useItinerary';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS } from '../../../utils/constants';

const MENU_ITEMS = [
  { icon: 'calendar-outline', label: 'Lịch sử đặt lịch', screen: 'BookingHistory', color: '#F97316', bg: '#FFF7ED' },
  { icon: 'map-outline', label: 'Lịch trình của tôi', screen: 'Itinerary', color: '#0284C7', bg: '#E0F2FE' },
  { icon: 'heart-outline', label: 'Địa điểm yêu thích', screen: 'FavoriteDestination', color: '#EF4444', bg: '#FEE2E2' },
  { icon: 'sparkles-outline', label: 'Trợ lý AI', tab: 'AITab', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: 'create-outline', label: 'Chỉnh sửa hồ sơ', screen: 'EditProfile', color: '#22C55E', bg: '#DCFCE7' },
  { icon: 'camera-outline', label: 'Upload ảnh đại diện', screen: 'UploadAvatar', color: '#0EA5E9', bg: '#E0F2FE' },
  { icon: 'mail-outline', label: 'Liên hệ hỗ trợ', screen: 'ContactSupport', color: '#64748B', bg: '#F1F5F9' },
  { icon: 'notifications-outline', label: 'Thông báo', screen: 'Notification', color: '#FACC15', bg: '#FEF9C3' },
];

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { itineraryItems, savedAIItineraries } = useItinerary();
  const { workshopBookings } = useWorkshopBooking();
  if (!user) return null;

  const stats = [
    { label: 'Lịch trình', value: savedAIItineraries.length, icon: 'map', color: '#0284C7' },
    { label: 'Yêu thích', value: itineraryItems.length, icon: 'heart', color: '#EF4444' },
    { label: 'Workshop', value: workshopBookings.length, icon: 'color-palette', color: '#F97316' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Gradient Header */}
        <LinearGradient colors={['#0284C7', '#6366F1', '#8B5CF6']} style={styles.header}>
          <View style={styles.avatarWrap}>
            {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user.fullName[0]}</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.phone ? <Text style={styles.phone}>{user.phone}</Text> : null}
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsWrap}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Ionicons name={s.icon as any} size={22} color={s.color} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuWrap}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={() => item.tab ? navigation.navigate(item.tab) : navigation.navigate(item.screen)}>
              <View style={[styles.menuIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { paddingTop: 60, paddingBottom: 30, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  avatarWrap: { marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: 'rgba(255,255,255,0.4)' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  email: { color: 'rgba(255,255,255,0.85)', marginTop: 2, fontSize: 14 },
  phone: { color: 'rgba(255,255,255,0.7)', marginTop: 2, fontSize: 13 },
  statsWrap: { flexDirection: 'row', marginHorizontal: 16, marginTop: -20, gap: 10 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 18, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginTop: 6 },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  menuWrap: { marginHorizontal: 16, marginTop: 20, backgroundColor: COLORS.surface, borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, marginLeft: 14, fontSize: 15, color: COLORS.text, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginTop: 20, paddingVertical: 14, backgroundColor: '#FEE2E2', borderRadius: 16 },
  logoutText: { fontSize: 16, color: COLORS.danger, fontWeight: '600', marginLeft: 8 },
});
