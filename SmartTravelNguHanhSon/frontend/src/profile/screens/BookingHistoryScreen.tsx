import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { Header } from '../../../components/layout/Header';
import { EmptyState } from '../../../components/common/EmptyState';
import { AppButton } from '../../../components/common/AppButton';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { useAuth } from '../../../hooks/useAuth';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: 'Đang chờ xác nhận', color: '#A16207', bg: '#FEF9C3', icon: 'time' },
  confirmed: { label: 'Đã xác nhận', color: '#0284C7', bg: '#E0F2FE', icon: 'checkmark-circle' },
  completed: { label: 'Đã hoàn thành', color: '#15803D', bg: '#DCFCE7', icon: 'trophy' },
  cancelled: { label: 'Đã hủy', color: '#DC2626', bg: '#FEE2E2', icon: 'close-circle' },
};

export const BookingHistoryScreen = ({ navigation }: any) => {
  const { workshopBookings, cancelWorkshopBooking } = useWorkshopBooking();
  const { user } = useAuth();
  const myBookings = workshopBookings.filter(b => b.userId === user?.id);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (myBookings.length === 0) {
    return (
      <ScreenContainer>
        <Header title="Lịch sử đặt lịch" onBack={() => navigation.goBack()} />
        <EmptyState title="Chưa có đặt lịch nào" description="Hãy khám phá các workshop trải nghiệm" icon="calendar-outline" buttonTitle="Khám phá workshop" onPress={() => navigation.navigate('HomeTab')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header title="Lịch sử đặt lịch" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }}>
        {myBookings.map(booking => {
          const status = STATUS_MAP[booking.status] || STATUS_MAP.pending;
          return (
            <View key={booking.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: booking.workshopImage }} style={styles.cardImg} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{booking.workshopTitle}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                    <Ionicons name={status.icon as any} size={14} color={status.color} />
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.detailRow}>
                  <Ionicons name="receipt-outline" size={16} color={COLORS.muted} />
                  <Text style={styles.detailLabel}>Mã booking:</Text>
                  <Text style={styles.detailValue}>{booking.bookingCode}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.muted} />
                  <Text style={styles.detailLabel}>Ngày:</Text>
                  <Text style={styles.detailValue}>{formatDate(booking.date)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color={COLORS.muted} />
                  <Text style={styles.detailLabel}>Giờ:</Text>
                  <Text style={styles.detailValue}>{booking.timeSlot}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="people-outline" size={16} color={COLORS.muted} />
                  <Text style={styles.detailLabel}>Số người:</Text>
                  <Text style={styles.detailValue}>{booking.participants} người</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="wallet-outline" size={16} color={COLORS.muted} />
                  <Text style={styles.detailLabel}>Tổng tiền:</Text>
                  <Text style={styles.priceValue}>{formatCurrency(booking.totalPrice)}</Text>
                </View>
              </View>
              {booking.status === 'pending' && (
                <View style={{ padding: 12, borderTopWidth: 1, borderTopColor: COLORS.border }}>
                  <AppButton
                    title="Hủy đặt lịch"
                    variant="danger"
                    onPress={() => cancelWorkshopBooking(booking.id)}
                    iconLeft={<Ionicons name="close-circle-outline" size={18} color="#FFF" />}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardHeader: { flexDirection: 'row', padding: 14 },
  cardImg: { width: 80, height: 80, borderRadius: 14, backgroundColor: '#94A3B8' },
  cardInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  statusBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 6 },
  statusText: { fontSize: 12, fontWeight: '600', marginLeft: 4 },
  cardBody: { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  detailLabel: { fontSize: 13, color: COLORS.muted, marginLeft: 8, marginRight: 4 },
  detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  priceValue: { fontSize: 16, fontWeight: 'bold', color: '#F97316' },
  cancelBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  cancelText: { fontSize: 14, color: COLORS.danger, fontWeight: '600', marginLeft: 6 },
});
