import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { StatCard } from '../../../components/common/StatCard';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { demoUsers } from '../../../data/demoUsers';
import { COLORS, SHADOW } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

export const AdminDashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { allWorkshops } = useWorkshopManagement();
  const { workshopBookings } = useWorkshopBooking();

  const totalUsers = demoUsers.filter(u => u.role === 'user').length;
  const totalOwners = demoUsers.filter(u => u.role === 'owner').length;
  const pendingWorkshops = allWorkshops.filter(w => w.status === 'pending');
  const totalRevenue = workshopBookings.filter(b => b.status === 'completed').reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { icon: 'people', label: 'Du khách', value: totalUsers, color: '#0284C7' },
    { icon: 'business', label: 'Chủ xưởng', value: totalOwners, color: '#F97316' },
    { icon: 'color-palette', label: 'Tổng workshop', value: allWorkshops.length, color: '#8B5CF6' },
    { icon: 'time', label: 'Chờ duyệt', value: pendingWorkshops.length, color: '#EAB308' },
    { icon: 'calendar', label: 'Tổng booking', value: workshopBookings.length, color: '#22C55E' },
    { icon: 'wallet', label: 'Doanh thu', value: formatCurrency(totalRevenue), color: '#BE123C' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Gradient Header */}
        <GradientHeader
          title="Hệ thống quản trị"
          subtitle="Tổng quan chỉ số hoạt động Smart Travel Ngũ Hành Sơn"
          colors={['#075985', '#0284C7', '#8B5CF6']}
        />

        {/* Stats Grid 3 Columns */}
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <StatCard
              key={i}
              title={s.label}
              value={s.value}
              icon={s.icon as any}
              iconColor={s.color}
              style={styles.statItem}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Lối tắt quản trị</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionCard, { borderLeftColor: '#8B5CF6' }]}
            onPress={() => navigation.navigate('AdminWorkshopsTab')}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="color-palette" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.actionText}>Duyệt workshop</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionCard, { borderLeftColor: '#0284C7' }]}
            onPress={() => navigation.navigate('AdminBookingsTab')}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="calendar" size={20} color="#0284C7" />
            </View>
            <Text style={styles.actionText}>Xem booking</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionCard, { borderLeftColor: '#F97316' }]}
            onPress={() => navigation.navigate('AdminUsersTab')}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="people" size={20} color="#F97316" />
            </View>
            <Text style={styles.actionText}>Xem người dùng</Text>
          </TouchableOpacity>
        </View>

        {/* Pending Workshops Section */}
        {pendingWorkshops.length > 0 && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>⏳ Workshop chờ duyệt mới</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AdminWorkshopsTab')}>
                <Text style={styles.seeAllText}>Duyệt ngay</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              {pendingWorkshops.slice(0, 3).map(w => (
                <ManagementCard
                  key={w.id}
                  title={w.title}
                  subtitle={`Chủ xưởng: ${w.ownerName}`}
                  image={w.image}
                  status={w.status}
                  meta={[
                    `Giá: ${formatCurrency(w.price)}`,
                    `Thời lượng: ${w.duration}`,
                  ]}
                  style={{ marginBottom: 12 }}
                />
              ))}
            </View>
          </>
        )}

        {/* Recent Bookings Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>📋 Lịch đặt mới nhất</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookingsTab')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {workshopBookings.slice(0, 3).map(b => (
            <ManagementCard
              key={b.id}
              title={b.workshopTitle}
              subtitle={`Khách: ${b.customerName}`}
              image={b.workshopImage}
              status={b.status}
              meta={[
                `Mã: ${b.bookingCode}`,
                `Thời gian: ${b.date} | ${b.timeSlot}`,
                `Tổng tiền: ${formatCurrency(b.totalPrice)}`,
              ]}
              style={{ marginBottom: 12 }}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginTop: -20,
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    marginBottom: 12,
    marginHorizontal: '1.5%',
    padding: 10,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 12,
    paddingRight: 20,
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 8,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 16,
    borderLeftWidth: 4,
    alignItems: 'center',
    shadowColor: '#075985',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
});
