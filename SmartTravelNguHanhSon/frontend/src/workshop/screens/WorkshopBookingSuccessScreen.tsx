import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppButton } from '../../../components/common/AppButton';
import { WorkshopBooking } from '../../../types/workshop';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

export const WorkshopBookingSuccessScreen = ({ route, navigation }: any) => {
  const { booking } = route.params as { booking: WorkshopBooking };

  const formatDateVN = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.successCircle}>
          <Ionicons name="checkmark" size={56} color="#FFF" />
        </LinearGradient>
        <Text style={styles.title}>Đặt lịch workshop{'\n'}thành công! 🎉</Text>
        <Text style={styles.sub}>Chúng tôi sẽ xác nhận đặt lịch qua email sớm nhất</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Mã booking</Text>
            <View style={styles.codeBadge}>
              <Text style={styles.codeText}>{booking.bookingCode}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Workshop</Text>
            <Text style={styles.value} numberOfLines={2}>{booking.workshopTitle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ngày</Text>
            <Text style={styles.value}>{formatDateVN(booking.date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Giờ</Text>
            <Text style={styles.value}>{booking.timeSlot}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số người</Text>
            <Text style={styles.value}>{booking.participants} người</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Họ tên</Text>
            <Text style={styles.value}>{booking.customerName}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Tổng tiền</Text>
            <Text style={styles.totalValue}>{formatCurrency(booking.totalPrice)}</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <Ionicons name="time" size={20} color="#F59E0B" />
          <Text style={styles.statusText}>Trạng thái: Đang chờ xác nhận</Text>
        </View>

        <AppButton title="Xem lịch sử đặt lịch" onPress={() => navigation.navigate('ProfileTab', { screen: 'BookingHistory' })} icon="list-outline" style={styles.btn} />
        <AppButton title="Về trang chủ" variant="outline" onPress={() => navigation.navigate('HomeTab', { screen: 'Home' })} icon="home-outline" style={styles.btn} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scroll: { padding: 24, alignItems: 'center' },
  successCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginTop: 20 },
  sub: { fontSize: 14, color: COLORS.muted, textAlign: 'center', marginTop: 8 },
  card: { width: '100%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 20, marginTop: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 14, color: COLORS.muted },
  value: { fontSize: 14, fontWeight: '600', color: COLORS.text, textAlign: 'right', flex: 1, marginLeft: 16 },
  codeBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  codeText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: '#F97316' },
  statusCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF9C3', borderRadius: 14, padding: 14, width: '100%', marginTop: 16 },
  statusText: { fontSize: 14, color: '#A16207', fontWeight: '600', marginLeft: 8 },
  btn: { width: '100%', marginTop: 12 },
});
