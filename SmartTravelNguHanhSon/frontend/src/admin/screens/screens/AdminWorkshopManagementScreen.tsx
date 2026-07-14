import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { FilterChip } from '../../../components/common/FilterChip';
import { ManagementCard } from '../../../components/common/ManagementCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';
import { Workshop } from '../../../types/workshop';

const FILTERS = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã ẩn'];
const FILTER_MAP: Record<string, string> = { 'Chờ duyệt': 'pending', 'Đã duyệt': 'approved', 'Đã ẩn': 'hidden' };

export const AdminWorkshopManagementScreen = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const { allWorkshops, updateWorkshopStatus } = useWorkshopManagement();

  const filteredWorkshops = useMemo(() => {
    let result = allWorkshops;
    if (filter !== 'Tất cả') {
      result = result.filter(w => w.status === FILTER_MAP[filter]);
    }
    if (search.trim()) {
      result = result.filter(w => 
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.ownerName.toLowerCase().includes(search.toLowerCase()) ||
        w.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [allWorkshops, filter, search]);

  const handleApprove = (ws: Workshop) => {
    Alert.alert('Phê duyệt workshop', `Bạn có chắc chắn muốn phê duyệt hoạt động trải nghiệm "${ws.title}"?`, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Phê duyệt', onPress: () => updateWorkshopStatus(ws.id, 'approved') },
    ]);
  };

  const handleHide = (ws: Workshop) => {
    Alert.alert('Ẩn workshop', `Ẩn hoạt động "${ws.title}" khỏi ứng dụng của du khách?`, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Ẩn đi', style: 'destructive', onPress: () => updateWorkshopStatus(ws.id, 'hidden') },
    ]);
  };

  const renderCard = ({ item }: { item: Workshop }) => {
    return (
      <ManagementCard
        title={item.title}
        subtitle={item.category}
        image={item.image}
        status={item.status}
        meta={[
          `Chủ xưởng: ${item.ownerName}`,
          `Giá: ${formatCurrency(item.price)}`,
          `Thời lượng: ${item.duration} • Tối đa: ${item.maxParticipants} người`,
        ]}
        actions={
          <>
            {item.status !== 'approved' && (
              <TouchableOpacity 
                style={[styles.btnAction, { borderColor: COLORS.success, backgroundColor: '#F0FDF4' }]} 
                onPress={() => handleApprove(item)}
              >
                <Ionicons name="checkmark-circle-outline" size={15} color={COLORS.success} />
                <Text style={[styles.btnText, { color: COLORS.success }]}>
                  {item.status === 'hidden' ? 'Duyệt lại' : 'Duyệt bài'}
                </Text>
              </TouchableOpacity>
            )}
            {item.status !== 'hidden' && (
              <TouchableOpacity 
                style={[styles.btnAction, { borderColor: COLORS.danger, backgroundColor: '#FEF2F2' }]} 
                onPress={() => handleHide(item)}
              >
                <Ionicons name="eye-off-outline" size={15} color={COLORS.danger} />
                <Text style={[styles.btnText, { color: COLORS.danger }]}>Ẩn đi</Text>
              </TouchableOpacity>
            )}
          </>
        }
      />
    );
  };

  return (
    <ScreenContainer>
      <GradientHeader
        title="Duyệt & Quản lý Workshop"
        subtitle={`${allWorkshops.length} hoạt động trải nghiệm trong hệ thống`}
        colors={['#075985', '#0284C7', '#8B5CF6']}
      />

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Tìm tên workshop hoặc tên chủ xưởng..." 
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

      {/* Status Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <FilterChip
              label={item}
              active={filter === item}
              onPress={() => setFilter(item)}
              activeColor="#6366F1"
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
            title="Không tìm thấy workshop" 
            description="Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái." 
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
  filterContainer: {
    height: 48,
    marginVertical: 8,
  },
  filterScroll: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  list: { padding: 20, paddingTop: 4, paddingBottom: 130 },
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
