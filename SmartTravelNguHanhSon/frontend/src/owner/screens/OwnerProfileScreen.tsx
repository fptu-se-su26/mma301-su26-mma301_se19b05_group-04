import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS, SHADOW } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

export const OwnerProfileScreen = () => {
  const { user, logout } = useAuth();
  const { allWorkshops } = useWorkshopManagement();
  const { workshopBookings } = useWorkshopBooking();

  const myWorkshops = useMemo(() => {
    return allWorkshops.filter(w => w.ownerId === user?.id);
  }, [allWorkshops, user]);

  const myBookings = useMemo(() => {
    return workshopBookings.filter(b => b.ownerId === user?.id);
  }, [workshopBookings, user]);

  const completedBookings = useMemo(() => myBookings.filter(b => b.status === 'completed'), [myBookings]);
  const revenue = useMemo(() => completedBookings.reduce((s, b) => s + b.totalPrice, 0), [completedBookings]);

  const infoItems = [
    { icon: 'mail-outline', label: 'Email tài khoản', value: user?.email, color: COLORS.primary, bg: '#E0F2FE' },
    { icon: 'call-outline', label: 'Số điện thoại', value: user?.phone, color: COLORS.accent, bg: '#F5F3FF' },
    { icon: 'business-outline', label: 'Tên xưởng đá', value: user?.workshopName || 'Xưởng đá Non Nước', color: COLORS.secondary, bg: '#FFF7ED' },
    { icon: 'location-outline', label: 'Địa chỉ xưởng', value: user?.workshopAddress || 'Hòa Hải, Ngũ Hành Sơn, Đà Nẵng', color: COLORS.success, bg: '#F0FDF4' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Gradient Header */}
        <GradientHeader
          title={user?.fullName || 'Chủ xưởng'}
          subtitle="Chủ xưởng sản xuất đá mỹ nghệ Non Nước"
          colors={['#0284C7', '#06B6D4', '#67E8F9']}
          avatar={user?.avatar}
          avatarFallback={user?.fullName}
        />

        {/* Profile Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{myWorkshops.length}</Text>
            <Text style={styles.statLbl}>Workshop</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>{myBookings.length}</Text>
            <Text style={styles.statLbl}>Lịch đặt</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: COLORS.success }]}>{formatCurrency(revenue)}</Text>
            <Text style={styles.statLbl}>Thực nhận</Text>
          </View>
        </View>

        {/* Account Info list */}
        <Text style={styles.sectionTitle}>Thông tin xưởng & tài khoản</Text>
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

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Đăng xuất tài khoản</Text>
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
