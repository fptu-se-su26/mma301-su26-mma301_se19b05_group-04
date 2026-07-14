import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { SegmentControl } from '../../../components/common/SegmentControl';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';
import { WorkshopBooking } from '../../../types/workshop';

const FILTERS = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Hoàn thành', 'Đã hủy'];

export const OwnerBookingManagementScreen = ({ navigation, route }: any) => {
  const { user } = useAuth();
  const { workshopBookings, updateWorkshopBookingStatus } = useWorkshopBooking();
  const workshopId = route?.params?.workshopId;
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const myBookings = useMemo(() => {
    return workshopBookings
      .filter(b => b.ownerId === user?.id)
      .filter(b => workshopId ? b.workshopId === workshopId : true);
  }, [workshopBookings, user, workshopId]);

  const filteredBookings = useMemo(() => {
    if (selectedFilter === 'Tất cả') return myBookings;
    if (selectedFilter === 'Chờ xác nhận') return myBookings.filter(b => b.status === 'pending');
    if (selectedFilter === 'Đã xác nhận') return myBookings.filter(b => b.status === 'confirmed');
    if (selectedFilter === 'Hoàn thành') return myBookings.filter(b => b.status === 'completed');
    if (selectedFilter === 'Đã hủy') return myBookings.filter(b => b.status === 'cancelled');
    return myBookings;
  }, [myBookings, selectedFilter]);

  const confirm = (b: WorkshopBooking) => {
    Alert.alert('Xác nhận lịch đặt', `Xác nhận lịch đặt workshop của khách ${b.customerName}?`, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Xác nhận', onPress: () => updateWorkshopBookingStatus(b.id, 'confirmed') },
    ]);
  };

  const complete = (b: WorkshopBooking) => {
    Alert.alert('Hoàn thành workshop', `Đánh dấu buổi workshop của khách ${b.customerName} đã hoàn thành?`, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Hoàn thành', onPress: () => updateWorkshopBookingStatus(b.id, 'completed') },
    ]);
  };

  const cancel = (b: WorkshopBooking) => {
    Alert.alert('Hủy lịch đặt', `Bạn có chắc chắn muốn hủy lịch đặt mã ${b.bookingCode}?`, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Hủy lịch', style: 'destructive', onPress: () => updateWorkshopBookingStatus(b.id, 'cancelled') },
    ]);
  };

  const renderCard = ({ item }: { item: WorkshopBooking }) => {
    const hasActions = item.status === 'pending' || item.status === 'confirmed';
    return (
      <ManagementCard
        title={item.workshopTitle}
        subtitle={`Khách: ${item.customerName}`}
        image={item.workshopImage}
        status={item.status}
        meta={[
          `Mã: ${item.bookingCode}`,
          `Số điện thoại: ${item.phone}`,
          `Email: ${item.email}`,
          `Thời gian: ${item.date} | ${item.timeSlot}`,
          `Số khách: ${item.participants} người`,
          `Tổng tiền: ${formatCurrency(item.totalPrice)}`,
        ]}
        actions={
          hasActions ? (
            <>
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity 
                    style={[styles.btnAction, { borderColor: COLORS.danger, backgroundColor: '#FEF2F2' }]} 
                    onPress={() => cancel(item)}
                  >
                    <Ionicons name="close-circle-outline" size={15} color={COLORS.danger} />
                    <Text style={[styles.btnText, { color: COLORS.danger }]}>Hủy bỏ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.btnAction, { borderColor: COLORS.success, backgroundColor: '#F0FDF4' }]} 
                    onPress={() => confirm(item)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={15} color={COLORS.success} />
                    <Text style={[styles.btnText, { color: COLORS.success }]}>Xác nhận</Text>
                  </TouchableOpacity>
                </>
              )}
              {item.status === 'confirmed' && (
                <>
                  <TouchableOpacity 
                    style={[styles.btnAction, { borderColor: COLORS.danger, backgroundColor: '#FEF2F2' }]} 
                    onPress={() => cancel(item)}
                  >
                    <Ionicons name="close-circle-outline" size={15} color={COLORS.danger} />
                    <Text style={[styles.btnText, { color: COLORS.danger }]}>Hủy bỏ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.btnAction, { borderColor: COLORS.primary, backgroundColor: '#F0F9FF' }]} 
                    onPress={() => complete(item)}
                  >
                    <Ionicons name="checkmark-done-outline" size={15} color={COLORS.primary} />
                    <Text style={[styles.btnText, { color: COLORS.primary }]}>Hoàn thành</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : undefined
        }
      />
    );
  };

  return (
    <ScreenContainer>
      <GradientHeader
        title="Quản lý lịch đặt"
        subtitle={`${myBookings.length} yêu cầu đăng ký trải nghiệm`}
        colors={['#0284C7', '#06B6D4', '#67E8F9']}
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      />

      <SegmentControl
        options={FILTERS}
        selected={selectedFilter}
        onSelect={setSelectedFilter}
        scrollable
      />

      <FlatList
        data={filteredBookings}
        keyExtractor={i => i.id}
        renderItem={renderCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState 
            icon="calendar-outline" 
            title="Trống lịch đặt" 
            description={selectedFilter === 'Tất cả' ? 'Chưa có lịch đặt nào được ghi nhận.' : 'Không có lịch đặt nào ở trạng thái này.'} 
          />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
    paddingTop: 4,
    paddingBottom: 130,
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.2,
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
