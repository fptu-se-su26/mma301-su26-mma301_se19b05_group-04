import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { demoUsers } from '../../../data/demoUsers';
import { COLORS, SHADOW } from '../../../utils/constants';

export const AdminProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { allWorkshops } = useWorkshopManagement();
  const { workshopBookings } = useWorkshopBooking();

  const totalUsers = useMemo(() => demoUsers.filter(u => u.role === 'user').length, []);
  const totalOwners = useMemo(() => demoUsers.filter(u => u.role === 'owner').length, []);

  const infoItems = [
    { icon: 'mail-outline', label: 'Email tài khoản', value: user?.email, color: '#6366F1', bg: '#EEF2F6' },
    { icon: 'shield-outline', label: 'Vai trò phân quyền', value: 'Quản trị viên hệ thống', color: '#8B5CF6', bg: '#F5F3FF' },
    { icon: 'people-outline', label: 'Tổng du khách quản lý', value: `${totalUsers} tài khoản`, color: '#0284C7', bg: '#E0F2FE' },
    { icon: 'business-outline', label: 'Tổng chủ xưởng liên kết', value: `${totalOwners} xưởng`, color: '#F97316', bg: '#FFF7ED' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Gradient Header */}
        <GradientHeader
          title={user?.fullName || 'Quản trị viên'}
          subtitle="Tài khoản Admin quản trị cấp cao"
          colors={['#075985', '#0284C7', '#8B5CF6']}
          avatarFallback={user?.fullName || 'A'}
        />

        {/* Profile Overlapping Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{totalUsers + totalOwners}</Text>
            <Text style={styles.statLbl}>Tài khoản</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{allWorkshops.length}</Text>
            <Text style={styles.statLbl}>Workshop</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: '#6366F1' }]}>{workshopBookings.length}</Text>
            <Text style={styles.statLbl}>Lịch đặt</Text>
          </View>
        </View>

        {/* Info Rows */}
        <Text style={styles.sectionTitle}>Thông tin quản trị viên</Text>
        <View style={styles.infoSection}>
          {infoItems.map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Menu Lối tắt */}
        <Text style={styles.sectionTitle}>Lối tắt nhanh</Text>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminDashboardTab')}>
            <Ionicons name="grid-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.menuLabel}>Bảng tổng quan điều khiển</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminUsersTab')}>
            <Ionicons name="people-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.menuLabel}>Xem danh sách người dùng</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminWorkshopsTab')}>
            <Ionicons name="color-palette-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.menuLabel}>Phê duyệt các workshop mới</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Đăng xuất tài khoản quản trị</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: -20,
    shadowColor: SHADOW.card.shadowColor,
    shadowOffset: SHADOW.card.shadowOffset,
    shadowOpacity: SHADOW.card.shadowOpacity,
    shadowRadius: SHADOW.card.shadowRadius,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLbl: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  infoSection: {
    marginHorizontal: 20,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  menuSection: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 28,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});
