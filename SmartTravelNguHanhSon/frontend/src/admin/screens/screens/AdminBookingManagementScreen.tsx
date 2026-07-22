import React, { useState, useMemo } from 'react';
import { FlatList, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { SegmentControl } from '../../../components/common/SegmentControl';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { useWorkshopBooking } from '../../../hooks/useWorkshopBooking';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';
import { WorkshopBooking } from '../../../types/workshop';

const FILTERS = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Hoàn thành', 'Đã hủy'];
const FILTER_MAP: Record<string, string> = { 
  'Chờ xác nhận': 'pending', 
  'Đã xác nhận': 'confirmed', 
  'Hoàn thành': 'completed', 
  'Đã hủy': 'cancelled' 
};

export const AdminBookingManagementScreen = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const { workshopBookings } = useWorkshopBooking();

  const filteredBookings = useMemo(() => {
    let result = workshopBookings;
    if (filter !== 'Tất cả') {
      result = result.filter(b => b.status === FILTER_MAP[filter]);
    }
    if (search.trim()) {
      result = result.filter(b => 
        b.workshopTitle.toLowerCase().includes(search.toLowerCase()) ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
        b.ownerName.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [workshopBookings, filter, search]);

  const renderCard = ({ item }: { item: WorkshopBooking }) => {
    return (
      <ManagementCard
        title={item.workshopTitle}
        subtitle={`Khách: ${item.customerName}`}
        image={item.workshopImage}
        status={item.status}
        meta={[
          `Mã: ${item.bookingCode}`,
          `Chủ xưởng: ${item.ownerName}`,
          `Số khách: ${item.participants} người`,
          `Liên hệ: ${item.phone}`,
          `Thời gian: ${item.date} | ${item.timeSlot}`,
          `Tổng tiền: ${formatCurrency(item.totalPrice)}`,
        ]}
      />
    );
  };

  return (
    <ScreenContainer>
      <GradientHeader
        title="Quản lý lịch đặt hàng"
        subtitle={`${workshopBookings.length} yêu cầu đặt lịch toàn hệ thống`}
        colors={['#075985', '#0284C7', '#8B5CF6']}
      />

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Tìm mã booking, tên khách, hoặc workshop..." 
          value={search} 
          onChangeText={setSearch} 
          placeholderTextColor={COLORS.muted}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        ) : null}
      </View>

      <SegmentControl
        options={FILTERS}
        selected={filter}
        onSelect={setFilter}
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
            description="Không tìm thấy lịch đặt nào phù hợp bộ lọc." 
          />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchWrap: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16, 
    height: 50,
    backgroundColor: COLORS.surface, 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    shadowColor: '#075985',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: COLORS.text, fontWeight: '500' },
  list: { padding: 20, paddingTop: 4, paddingBottom: 130 },
});
