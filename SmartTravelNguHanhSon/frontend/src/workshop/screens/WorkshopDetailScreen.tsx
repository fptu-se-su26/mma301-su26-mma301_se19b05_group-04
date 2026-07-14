import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { AppButton } from '../../../components/common/AppButton';
import { Workshop } from '../../../types/workshop';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';

const { width } = Dimensions.get('window');

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Di sản':
      return {
        backgroundColor: '#F3E8FF',
        color: '#7E22CE',
        borderColor: 'rgba(126, 34, 206, 0.16)',
      };
    case 'Làng nghề':
      return {
        backgroundColor: '#FFEDD5',
        color: '#C2410C',
        borderColor: 'rgba(194, 65, 12, 0.16)',
      };
    case 'Biển':
      return {
        backgroundColor: '#E0F2FE',
        color: '#0284C7',
        borderColor: 'rgba(2, 132, 199, 0.16)',
      };
    case 'Ẩm thực':
      return {
        backgroundColor: '#FEF9C3',
        color: '#A16207',
        borderColor: 'rgba(161, 98, 7, 0.16)',
      };
    case 'Thủ công':
      return {
        backgroundColor: '#ECFDF5',
        color: '#047857',
        borderColor: 'rgba(4, 120, 87, 0.16)',
      };
    case 'Nghệ thuật':
      return {
        backgroundColor: '#FCE7F3',
        color: '#BE185D',
        borderColor: 'rgba(190, 24, 93, 0.16)',
      };
    default:
      return {
        backgroundColor: '#E0F2FE',
        color: '#0284C7',
        borderColor: 'rgba(2, 132, 199, 0.16)',
      };
  }
};

export const WorkshopDetailScreen = ({ route, navigation }: any) => {
  const { workshop } = route.params as { workshop: Workshop };
  const [activeImg, setActiveImg] = useState(0);
  const categoryStyle = getCategoryStyle(workshop.category);

  // Fallback to make sure we always have 3 images for the carousel
  const galleryImages = useMemo(() => {
    if (workshop.images && workshop.images.length >= 3) {
      return workshop.images.slice(0, 3);
    }
    return [
      workshop.image,
      (workshop.images && workshop.images[1]) || workshop.image,
      (workshop.images && workshop.images[2]) || workshop.image,
    ];
  }, [workshop]);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* ─── Image Gallery Carousel ─── */}
        <View style={styles.imageContainer}>
          <FlatList
            data={galleryImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => setActiveImg(Math.round(e.nativeEvent.contentOffset.x / width))}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.heroImage} />}
          />

          <TouchableOpacity style={[styles.circleButton, styles.backButton]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.paginationContainer}>
            {galleryImages.map((_, i) => (
              <View key={i} style={[styles.dot, activeImg === i && styles.activeDot]} />
            ))}
          </View>
          
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)']} style={styles.galleryGradient} />
        </View>

        {/* ─── Content Wrapper ─── */}
        <View style={styles.contentWrapper}>
          <View style={styles.contentCard}>
            {/* Category Badge placed INSIDE contentCard at the top with negative marginTop */}
            <View
              style={[
                styles.categoryBadge,
                {
                  backgroundColor: categoryStyle.backgroundColor,
                  borderColor: categoryStyle.borderColor,
                },
              ]}
            >
              <Text style={[styles.categoryText, { color: categoryStyle.color }]}>
                {workshop.category}
              </Text>
            </View>

            {/* Title & Rating */}
            <Text style={styles.title}>{workshop.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={16} color="#FACC15" />
                <Text style={styles.metaText}>{workshop.rating}</Text>
              </View>

              <View style={styles.metaDivider} />

              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color={COLORS.muted} />
                <Text style={styles.metaText}>{workshop.duration}</Text>
              </View>

              <View style={styles.metaDivider} />

              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={16} color={COLORS.muted} />
                <Text style={styles.metaText}>Tối đa {workshop.maxParticipants} người</Text>
              </View>
            </View>

            {/* Price Card */}
            <View style={styles.priceCard}>
              <Text style={styles.priceLabel}>Giá mỗi người</Text>
              <Text style={styles.priceValue}>{formatCurrency(workshop.price)}</Text>
            </View>

            {/* Host Card */}
            <View style={styles.hostCard}>
              <View style={styles.hostAvatar}>
                <Ionicons name="person" size={22} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.hostLabel}>Người hướng dẫn</Text>
                <Text style={styles.hostName}>{workshop.hostName}</Text>
              </View>
            </View>

            {/* Location Info Card */}
            <View style={styles.infoCard}>
              <Ionicons name="location" size={20} color={COLORS.primary} style={{ marginTop: 2 }} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.infoLabel}>Địa điểm</Text>
                <Text style={styles.infoValue}>{workshop.location}</Text>
                <Text style={styles.infoSub}>{workshop.address}</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
            <Text style={styles.description}>{workshop.detailDescription}</Text>

            {/* Included */}
            <Text style={styles.sectionTitle}>Bao gồm</Text>
            {workshop.included.map((item, i) => (
              <View key={i} style={styles.includeRow}>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                <Text style={styles.includeText}>{item}</Text>
              </View>
            ))}

            {/* Schedule */}
            <Text style={styles.sectionTitle}>Khung giờ hoạt động</Text>
            <View style={styles.slotsWrap}>
              {workshop.scheduleSlots.map((slot, i) => (
                <View key={i} style={styles.slot}>
                  <Ionicons name="time" size={14} color={COLORS.primary} />
                  <Text style={styles.slotText}>{slot}</Text>
                </View>
              ))}
            </View>

            {/* Direction Button */}
            <AppButton
              title="Chỉ đường đến workshop"
              variant="outline"
              onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${workshop.latitude},${workshop.longitude}`)}
              iconLeft={<Ionicons name="navigate-outline" size={18} color={COLORS.primary} />}
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Book Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPriceLabel}>Giá từ</Text>
          <Text style={styles.bottomPrice}>{formatCurrency(workshop.price)}</Text>
        </View>
        <AppButton
          title="Đặt lịch workshop"
          variant="secondary"
          onPress={() => navigation.navigate('WorkshopBooking', { workshop })}
          style={{ width: undefined, paddingHorizontal: 24 }}
          fullWidth={false}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  /* ─── Hero Gallery ─── */
  imageContainer: {
    height: 380,
    position: 'relative',
  },
  heroImage: {
    width: width,
    height: 380,
    resizeMode: 'cover',
  },
  circleButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 24,
    zIndex: 20,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    zIndex: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  galleryGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },

  /* ─── Content Wrapper ─── */
  contentWrapper: {
    marginTop: -34,
    position: 'relative',
    zIndex: 20,
    elevation: 20,
    overflow: 'visible',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    marginTop: -22,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 18,
    borderWidth: 1,
    zIndex: 100,
    elevation: 100,
    shadowColor: '#7E22CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'visible',
    zIndex: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 34,
  },

  /* ─── Meta Row ─── */
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },
  metaText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  /* ─── Price Card ─── */
  priceCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  priceLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F97316',
    marginTop: 2,
  },

  /* ─── Host Card ─── */
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hostAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginLeft: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 12,
  },

  /* ─── Info Card ─── */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  infoSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },

  /* ─── Sections ─── */
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 10,
  },
  slotsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  slotText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 6,
  },

  /* ─── Sticky Bottom Bar ─── */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },
  bottomPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F97316',
  },
});
