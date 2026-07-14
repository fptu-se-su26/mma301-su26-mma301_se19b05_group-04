import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { StatCard } from '../../../components/common/StatCard';
import { ActionCard } from '../../../components/common/ActionCard';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS, SHADOW } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

export const OwnerDashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { allWorkshops } = useWorkshopManagement();
  const { workshopBookings } = useWorkshopBooking();

  const myWorkshops = allWorkshops.filter(w => w.ownerId === user?.id);
  const myBookings = workshopBookings.filter(b => b.ownerId === user?.id);
  const pendingBookings = myBookings.filter(b => b.status === 'pending');
  const confirmedBookings = myBookings.filter(b => b.status === 'confirmed');
  const completedBookings = myBookings.filter(b => b.status === 'completed');
  const revenue = completedBookings.reduce((s, b) => s + b.totalPrice, 0);
  const recentBookings = myBookings.slice(0, 3);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Header with blue gradient */}
        <GradientHeader
          title={`Xin chào, ${user?.fullName?.split(' ').pop() || 'Chủ xưởng'} 👋`}
          subtitle="Quản lý xưởng đá mỹ nghệ & hoạt động trải nghiệm"
          colors={['#0284C7', '#06B6D4', '#67E8F9']}
          avatar={user?.avatar}
          avatarFallback={user?.fullName}
        />

        {/* Xưởng Info Card */}
        <View style={styles.shopCard}>
          <View style={styles.shopIconWrap}>
            <Ionicons name="business" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.shopInfo}>
            <Text style={styles.shopTitle}>{user?.workshopName || 'Xưởng đá mỹ nghệ Non Nước'}</Text>
            <Text style={styles.shopAddr}>{user?.workshopAddress || 'Hòa Hải, Ngũ Hành Sơn, Đà Nẵng'}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Workshop của tôi"
            value={myWorkshops.length}
            icon="color-palette"
            iconColor={COLORS.secondary}
            style={styles.statItem}
          />
          <StatCard
            title="Lịch chờ xác nhận"
            value={pendingBookings.length}
            icon="time"
            iconColor={COLORS.warning}
            style={styles.statItem}
          />
          <StatCard
            title="Lịch đã xác nhận"
            value={confirmedBookings.length}
            icon="checkmark-circle"
            iconColor={COLORS.success}
            style={styles.statItem}
          />
          <StatCard
            title="Doanh thu tháng"
            value={formatCurrency(revenue)}
            icon="wallet"
            iconColor={COLORS.primary}
            style={styles.statItem}
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Chức năng quản lý</Text>
        <View style={styles.actionsWrap}>
          <ActionCard
            title="Thêm workshop mới"
            description="Tạo lớp học trải nghiệm Non Nước cho du khách"
            icon="add-circle"
            iconColor={COLORS.secondary}
            onPress={() => navigation.navigate('OwnerWorkshopTab', { screen: 'OwnerWorkshopForm' })}
            style={styles.actionCard}
          />
          <ActionCard
            title="Quản lý danh sách workshop"
            description="Chỉnh sửa thông tin, ẩn/hiển thị workshop"
            icon="list-circle"
            iconColor={COLORS.primary}
            onPress={() => navigation.navigate('OwnerWorkshopTab', { screen: 'OwnerWorkshopList' })}
            style={styles.actionCard}
          />
          <ActionCard
            title="Xem lịch đặt hôm nay"
            description="Xác nhận, hoàn thành lịch trải nghiệm của khách"
            icon="calendar"
            iconColor={COLORS.accent}
            onPress={() => navigation.navigate('OwnerBookingTab')}
            style={styles.actionCard}
          />
          <ActionCard
            title="Báo cáo doanh thu xưởng"
            description="Theo dõi chi tiết số tiền thu được từ workshop"
            icon="cash"
            iconColor={COLORS.success}
            onPress={() => navigation.navigate('OwnerRevenueTab')}
            style={styles.actionCard}
          />
        </View>

        {/* Recent Bookings */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Booking gần đây</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OwnerBookingTab')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {recentBookings.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={32} color={COLORS.muted} />
            <Text style={styles.emptyText}>Chưa có lịch đặt nào gần đây</Text>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20 }}>
            {recentBookings.map(b => (
              <ManagementCard
                key={b.id}
                title={b.workshopTitle}
                subtitle={`Khách: ${b.customerName}`}
                image={b.workshopImage}
                status={b.status}
                meta={[
                  `Ngày: ${b.date}`,
                  `Giờ: ${b.timeSlot}`,
                  `Số khách: ${b.participants} người`,
                  `Tổng tiền: ${formatCurrency(b.totalPrice)}`,
                ]}
                style={{ marginBottom: 12 }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
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
  shopIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopInfo: {
    marginLeft: 14,
    flex: 1,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shopAddr: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    width: '47%',
    marginBottom: 12,
    marginHorizontal: '1.5%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 14,
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
  actionsWrap: {
    paddingHorizontal: 20,
    gap: 12,
  },
  actionCard: {
    marginBottom: 0,
  },
  emptyCard: {
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
});
