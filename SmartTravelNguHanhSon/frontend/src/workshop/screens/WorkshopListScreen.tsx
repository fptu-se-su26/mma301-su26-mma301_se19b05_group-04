import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ScrollView, TextInput, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { EmptyState } from '../../../components/common/EmptyState';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { Workshop } from '../../../types/workshop';
import { COLORS, categoryColors } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

const WORKSHOP_CATS = ['Tất cả', 'Làng nghề', 'Ẩm thực', 'Thủ công', 'Nghệ thuật', 'Văn hóa', 'Trải nghiệm'];

export const WorkshopListScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Tất cả');
  const { allWorkshops } = useWorkshopManagement();

  const data = useMemo(() => {
    let result = allWorkshops.filter(w => w.status === 'approved' && w.isActive);
    if (cat !== 'Tất cả') result = result.filter(w => w.category === cat);
    if (query.trim()) result = result.filter(w =>
      w.title.toLowerCase().includes(query.toLowerCase()) ||
      w.location.toLowerCase().includes(query.toLowerCase()) ||
      w.description.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }, [query, cat]);

  const renderCard = ({ item }: { item: Workshop }) => {
    const catColor = categoryColors[item.category] || { background: '#E0F2FE', text: '#0284C7' };
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WorkshopDetail', { workshop: item })} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.cardImg} />

        {/* Category badge */}
        <View style={styles.badgeWrap}>
          <View style={[styles.badge, { backgroundColor: catColor.background }]}>
            <Text style={[styles.badgeText, { color: catColor.text }]}>{item.category}</Text>
          </View>
        </View>

        {/* Rating badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FACC15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        {/* Card body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>

          <View style={styles.cardRow}>
            <Ionicons name="person-outline" size={14} color={COLORS.muted} />
            <Text style={styles.cardMeta}>{item.hostName}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.muted} />
            <Text style={styles.cardMeta} numberOfLines={1}>{item.location}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.muted} />
              <Text style={styles.cardMeta}>{item.duration}</Text>
            </View>
            <View style={styles.cardRow}>
              <Ionicons name="people-outline" size={14} color={COLORS.muted} />
              <Text style={styles.cardMeta}>Tối đa {item.maxParticipants}</Text>
            </View>
          </View>

          {/* Price + Book */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('WorkshopBooking', { workshop: item })}>
              <Text style={styles.bookBtnText}>Đặt lịch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer>
      {/* ─── Compact Gradient Header (same as DestinationList) ─── */}
      <LinearGradient
        colors={['#075985', '#0284C7', '#38BDF8', '#A7F3D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerAction} activeOpacity={0.7}>
            <Ionicons name="sparkles-outline" size={16} color="#FFF" />
            <Text style={styles.headerActionText}>Khám phá</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Workshop trải nghiệm</Text>
        <Text style={styles.headerSub}>{data.length} workshop đang mở tại Non Nước</Text>
      </LinearGradient>

      {/* ─── Search ─── */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm workshop trải nghiệm..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={COLORS.muted}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* ─── Category Chips ─── */}
      <View style={styles.chipRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
          {WORKSHOP_CATS.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, cat === c && styles.chipActive]}
              onPress={() => setCat(c)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, cat === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ─── List ─── */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState title="Không tìm thấy" description="Thử từ khóa hoặc danh mục khác" icon="color-palette-outline" />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  /* ─── Header (identical to DestinationListScreen) ─── */
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 42,
    paddingBottom: 22,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  headerActionText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  headerSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.80)',
    marginTop: 4,
    fontWeight: '500',
  },

  /* ─── Search (identical to DestinationListScreen) ─── */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#075985',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },

  /* ─── Chips (identical to DestinationListScreen) ─── */
  chipRow: {
    height: 44,
    marginVertical: 6,
  },
  chipScroll: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  chip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },

  /* ─── List ─── */
  list: {
    padding: 20,
    paddingTop: 6,
    paddingBottom: 130,
  },

  /* ─── Workshop Card ─── */
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#075985',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImg: {
    width: '100%',
    height: 180,
    backgroundColor: '#CBD5E1',
  },
  badgeWrap: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: COLORS.muted,
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  bookBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
