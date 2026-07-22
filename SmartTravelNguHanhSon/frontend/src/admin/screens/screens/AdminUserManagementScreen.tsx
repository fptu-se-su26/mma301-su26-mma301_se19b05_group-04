import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { GradientHeader } from '../../../components/common/GradientHeader';
import { FilterChip } from '../../../components/common/FilterChip';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { demoUsers } from '../../../data/demoUsers';
import { COLORS, SHADOW } from '../../../utils/constants';

const FILTERS = ['Tất cả', 'Du khách', 'Chủ xưởng', 'Quản trị viên'];
const ROLE_FILTER: Record<string, string> = { 
  'Du khách': 'user', 
  'Chủ xưởng': 'owner', 
  'Quản trị viên': 'admin' 
};

export const AdminUserManagementScreen = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    let result = demoUsers;
    if (filter !== 'Tất cả') {
      result = result.filter(u => u.role === ROLE_FILTER[filter]);
    }
    if (search.trim()) {
      result = result.filter(u => 
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone && u.phone.includes(search))
      );
    }
    return result;
  }, [filter, search]);

  return (
    <ScreenContainer>
      <GradientHeader
        title="Quản lý người dùng"
        subtitle={`${demoUsers.length} tài khoản trong hệ thống`}
        colors={['#075985', '#0284C7', '#8B5CF6']}
      />

      {/* Search Wrap */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Tìm tên, email hoặc số điện thoại..." 
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

      {/* Role Filters */}
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
        data={filteredUsers}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.avatar, { backgroundColor: item.role === 'admin' ? '#F5F3FF' : item.role === 'owner' ? '#FFF7ED' : '#E0F2FE' }]}>
              <Text style={[styles.avatarText, { color: item.role === 'admin' ? '#6D28D9' : item.role === 'owner' ? '#C2410C' : '#0284C7' }]}>
                {item.fullName[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.email}>{item.email}</Text>
              {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
              {item.role === 'owner' && item.workshopName ? (
                <View style={styles.workshopWrap}>
                  <Ionicons name="business-outline" size={12} color={COLORS.muted} />
                  <Text style={styles.workshopText} numberOfLines={1}>{item.workshopName}</Text>
                </View>
              ) : null}
            </View>
            <StatusBadge status={item.role} />
          </View>
        )}
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
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 12, 
    shadowColor: SHADOW.card.shadowColor, 
    shadowOffset: SHADOW.card.shadowOffset, 
    shadowOpacity: SHADOW.card.shadowOpacity, 
    shadowRadius: SHADOW.card.shadowRadius, 
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  avatarText: { fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 14, marginRight: 8 },
  name: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  email: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  phone: { fontSize: 11, color: COLORS.muted, marginTop: 1 },
  workshopWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  workshopText: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '500',
  },
});
