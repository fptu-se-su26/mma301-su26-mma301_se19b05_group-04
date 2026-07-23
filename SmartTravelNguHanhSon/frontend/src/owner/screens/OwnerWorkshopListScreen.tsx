import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { FilterChip } from '../../../components/common/FilterChip';
import { EmptyState } from '../../../components/common/EmptyState';
import { useAuth } from '../../../hooks/useAuth';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';
import { Workshop } from '../../../types/workshop';

const FILTERS = ['Tất cả', 'Đã duyệt', 'Chờ duyệt', 'Đã ẩn'];

export const OwnerWorkshopListScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { allWorkshops } = useWorkshopManagement();
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const myWorkshops = useMemo(() => {
    return allWorkshops.filter(w => w.ownerId === user?.id);
  }, [allWorkshops, user]);

  const filteredWorkshops = useMemo(() => {
    if (selectedFilter === 'Tất cả') return myWorkshops;
    if (selectedFilter === 'Đã duyệt') return myWorkshops.filter(w => w.status === 'approved');
    if (selectedFilter === 'Chờ duyệt') return myWorkshops.filter(w => w.status === 'pending');
    if (selectedFilter === 'Đã ẩn') return myWorkshops.filter(w => w.status === 'hidden');
    return myWorkshops;
  }, [myWorkshops, selectedFilter]);

  const renderCard = ({ item }: { item: Workshop }) => {
    return (
      <ManagementCard
        title={item.title}
        subtitle={item.category}
        image={item.image}
        status={item.status}
        meta={[
          `Giá: ${formatCurrency(item.price)}`,
          `Thời lượng: ${item.duration}`,
          `Tối đa: ${item.maxParticipants} người`,
        ]}
        actions={
          <>
            <TouchableOpacity 
              style={[styles.btnAction, { borderColor: COLORS.secondary }]} 
              onPress={() => navigation.navigate('OwnerWorkshopForm', { workshop: item })}
            >
              <Ionicons name="create-outline" size={15} color={COLORS.secondary} />
              <Text style={[styles.btnText, { color: COLORS.secondary }]}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btnAction, { borderColor: COLORS.primary }]} 
              onPress={() => navigation.navigate('OwnerBookingManagement', { workshopId: item.id })}
            >
              <Ionicons name="calendar-outline" size={15} color={COLORS.primary} />
              <Text style={[styles.btnText, { color: COLORS.primary }]}>Xem lịch đặt</Text>
            </TouchableOpacity>
          </>
        }
      />
    );
  };

  return (
    <ScreenContainer>
      <GradientHeader
        title="Workshop của tôi"
        subtitle={`${myWorkshops.length} lớp học trải nghiệm Non Nước`}
        colors={['#0284C7', '#06B6D4', '#67E8F9']}
        rightElement={
          <TouchableOpacity 
            style={styles.headerAddBtn} 
            onPress={() => navigation.navigate('OwnerWorkshopForm')}
          >
            <Ionicons name="add" size={22} color={COLORS.primary} />
            <Text style={styles.headerAddText}>Thêm</Text>
          </TouchableOpacity>
        }
      />

      {/* State Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <FilterChip
              label={item}
              active={selectedFilter === item}
              onPress={() => setSelectedFilter(item)}
              activeColor={COLORS.primary}
            />
          )}
          contentContainerStyle={styles.filterScroll}
        />
      </View>

      <FlatList
        data={filteredWorkshops}
        keyExtractor={i => i.id}
        renderItem={renderCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState 
            icon="color-palette-outline" 
            title="Chưa có workshop" 
            description={selectedFilter === 'Tất cả' ? 'Hãy thêm workshop đầu tiên của xưởng!' : 'Không tìm thấy workshop phù hợp bộ lọc.'} 
          />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerAddText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  filterContainer: {
    height: 48,
    marginVertical: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
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
    backgroundColor: '#FFFFFF',
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
