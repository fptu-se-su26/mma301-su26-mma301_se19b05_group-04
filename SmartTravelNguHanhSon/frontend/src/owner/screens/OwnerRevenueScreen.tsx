import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { StatCard } from '../../../components/common/StatCard';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS, SHADOW } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

export const OwnerRevenueScreen = () => {
  const { user } = useAuth();
  const { workshopBookings } = useWorkshopBooking();

  const myBookings = useMemo(() => {
    return workshopBookings.filter(b => b.ownerId === user?.id);
  }, [workshopBookings, user]);

  const completed = useMemo(() => myBookings.filter(b => b.status === 'completed'), [myBookings]);
  const pending = useMemo(() => myBookings.filter(b => b.status === 'pending'), [myBookings]);
  const cancelled = useMemo(() => myBookings.filter(b => b.status === 'cancelled'), [myBookings]);
  const revenue = useMemo(() => completed.reduce((s, b) => s + b.totalPrice, 0), [completed]);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Gradient Header */}
        <GradientHeader
          title="Báo cáo doanh thu"
          subtitle="Thống kê doanh thu từ các lớp học trải nghiệm Non Nước"
          colors={['#0284C7', '#06B6D4', '#67E8F9']}
        />

        {/* Large Stat Card for Total Revenue */}
        <View style={styles.mainRevenueCard}>
          <View style={styles.mainRevenueIcon}>
            <Ionicons name="cash" size={32} color="#FFF" />
          </View>
          <Text style={styles.mainRevenueLabel}>TỔNG DOANH THU THỰC NHẬN</Text>
          <Text style={styles.mainRevenueValue}>{formatCurrency(revenue)}</Text>
          <Text style={styles.mainRevenueSub}>Tính trên các booking đã hoàn thành khóa học</Text>
        </View>

        {/* Secondary Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Đã hoàn thành"
            value={`${completed.length} lịch`}
            icon="checkmark-done-circle"
            iconColor={COLORS.success}
            style={styles.statItem}
          />
          <StatCard
            title="Đang chờ duyệt"
            value={`${pending.length} lịch`}
            icon="time"
            iconColor={COLORS.warning}
            style={styles.statItem}
          />
          <StatCard
            title="Đã hủy bỏ"
            value={`${cancelled.length} lịch`}
            icon="close-circle"
            iconColor={COLORS.danger}
            style={styles.statItem}
          />
        </View>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Giao dịch hoàn thành gần đây</Text>
        {completed.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="receipt-outline" size={32} color={COLORS.muted} />
            <Text style={styles.emptyText}>Chưa có giao dịch hoàn thành nào</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {completed.slice(0, 5).map(b => (
              <View key={b.id} style={styles.transCard}>
                <View style={styles.transIconWrap}>
                  <Ionicons name="logo-usd" size={16} color={COLORS.success} />
                </View>
                <View style={styles.transInfo}>
                  <Text style={styles.transTitle} numberOfLines={1}>{b.workshopTitle}</Text>
                  <Text style={styles.transMeta}>{b.customerName} • {b.date}</Text>
                  <Text style={styles.transMeta}>{b.participants} người</Text>
                </View>
                <Text style={styles.transAmount}>+{formatCurrency(b.totalPrice)}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mainRevenueCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginTop: -20,
    alignItems: 'center',
    shadowColor: SHADOW.card.shadowColor,
    shadowOffset: SHADOW.card.shadowOffset,
    shadowOpacity: SHADOW.card.shadowOpacity,
    shadowRadius: SHADOW.card.shadowRadius,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainRevenueIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mainRevenueLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.muted,
    letterSpacing: 1,
  },
  mainRevenueValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 6,
  },
  mainRevenueSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    marginHorizontal: '1.5%',
    padding: 12,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
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
  transactionsList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  transCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  transIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  transTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  transMeta: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  transAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.success,
  },
});
