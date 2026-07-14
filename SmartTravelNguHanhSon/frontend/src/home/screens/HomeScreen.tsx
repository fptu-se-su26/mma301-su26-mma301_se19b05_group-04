import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable, Image, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { SectionHeader } from '../../../components/common/SectionHeader';
import { useWorkshopManagement } from '../../../hooks/useWorkshopManagement';
import { useAuth } from '../../../hooks/useAuth';
import { useItinerary } from '../../../hooks/useItinerary';
import { COLORS, SHADOW } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/helpers';
import { Destination } from '../../../types/destination';
import { DESTINATIONS } from '../../destination/data/destinations';
import { DestinationCard } from '../../../components/cards/DestinationCard';
import { WorkshopCard } from '../../../components/cards/WorkshopCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH_DEST = Math.min(width * 0.72, 320);
const CARD_WIDTH_WS = Math.min(width * 0.76, 320);

const CATEGORIES = [
  { label: 'Di sản', icon: 'business-outline', color: '#7E22CE', bg: '#F3E8FF' },
  { label: 'Làng nghề', icon: 'hammer-outline', color: '#C2410C', bg: '#FFEDD5' },
  { label: 'Biển', icon: 'water-outline', color: '#0284C7', bg: '#E0F2FE' },
  { label: 'Ẩm thực', icon: 'restaurant-outline', color: '#A16207', bg: '#FEF9C3' },
  { label: 'An Thượng', icon: 'wine-outline', color: '#BE123C', bg: '#FFE4E6' },
  { label: 'Workshop', icon: 'color-palette-outline', color: '#0F766E', bg: '#CCFBF1' },
];

const AI_CARDS = [
  { icon: 'chatbubbles', title: 'Chat với AI', desc: 'Hỏi đáp du lịch', screen: 'AIChatbot', colors: ['#8B5CF6', '#6366F1'] },
  { icon: 'calendar', title: 'Tạo lịch trình', desc: 'Lên kế hoạch AI', screen: 'AIItinerary', colors: ['#6366F1', '#0EA5E9'] },
  { icon: 'compass', title: 'Gợi ý địa điểm', desc: 'Phù hợp sở thích', screen: 'AIRecommendation', colors: ['#0EA5E9', '#2DD4BF'] },
  { icon: 'calculator', title: 'Ước tính chi phí', desc: 'Ngân sách thông minh', screen: 'AICostEstimator', colors: ['#2DD4BF', '#22C55E'] },
];

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { itineraryItems } = useItinerary();
  const { allWorkshops } = useWorkshopManagement();
  const WORKSHOPS = allWorkshops.filter(w => w.status === 'approved' && w.isActive);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <LinearGradient colors={['#075985', '#0284C7', '#38BDF8']} style={styles.header}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Xin chào, {user?.fullName?.split(' ').pop() || 'Bạn'} 👋</Text>
              <Text style={styles.headerSub}>Bạn muốn khám phá đâu hôm nay?</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('ProfileTab')} hitSlop={12}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{(user?.fullName || 'U')[0].toUpperCase()}</Text>
                </View>
              )}
            </Pressable>
          </View>
          {/* Search Bar */}
          <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('SearchTab')}>
            <Ionicons name="search" size={20} color={COLORS.muted} />
            <Text style={styles.searchText}>Tìm địa điểm, workshop, món ăn...</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Hero Banner */}
        <TouchableOpacity style={styles.bannerWrap} activeOpacity={0.9} onPress={() => navigation.navigate('DestinationList')}>
          <Image source={{ uri: 'https://picsum.photos/id/164/800/400' }} style={styles.bannerImg} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Khám phá Ngũ Hành Sơn{'\n'}theo cách thông minh hơn</Text>
            <View style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Bắt đầu khám phá</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Categories */}
        <SectionHeader title="Danh mục" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catWrap}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.label} style={styles.catCard} activeOpacity={0.7} onPress={() => {
              if (cat.label === 'Workshop') {
                navigation.navigate('SearchTab', { screen: 'Search', params: { initialCategory: cat.label, initialTab: 'Workshop' } });
              } else {
                navigation.navigate('SearchTab', { screen: 'Search', params: { initialCategory: cat.label, initialTab: 'Địa điểm' } });
              }
            }}>
              <View style={[styles.catIcon, { backgroundColor: cat.bg }]}>
                <Ionicons name={cat.icon as any} size={24} color={cat.color} />
              </View>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Destinations */}
        <SectionHeader
          title="Địa điểm nổi bật"
          actionText="Xem tất cả"
          onActionPress={() => navigation.navigate('DestinationList')}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destScroll}>
          {DESTINATIONS.slice(0, 5).map(d => (
            <DestinationCard
              key={d.id}
              destination={d}
              onPress={() => navigation.navigate('DestinationDetail', { destination: d })}
            />
          ))}
        </ScrollView>

        {/* Workshop Section */}
        <View style={styles.workshopSection}>
          <LinearGradient colors={['#EAFBFF', '#FFFFFF']} style={styles.workshopBg}>
            <SectionHeader
              title="Workshop trải nghiệm"
              actionText="Xem tất cả"
              onActionPress={() => navigation.navigate('WorkshopList')}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wsScroll}>
              {WORKSHOPS.slice(0, 5).map(ws => (
                <WorkshopCard
                  key={ws.id}
                  workshop={ws}
                  onPress={() => navigation.navigate('WorkshopDetail', { workshop: ws })}
                  onBook={() => navigation.navigate('WorkshopBooking', { workshop: ws })}
                />
              ))}
            </ScrollView>
          </LinearGradient>
        </View>

        {/* AI Section */}
        <View style={styles.aiSection}>
          <LinearGradient colors={['#8B5CF6', '#6366F1', '#0EA5E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.aiBanner}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={28} color="#FFF" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.aiTitle}>Trợ lý AI du lịch</Text>
                <Text style={styles.aiSub}>Lên kế hoạch & giải đáp tự động thông minh</Text>
              </View>
            </View>
            <View style={styles.aiGrid}>
              {AI_CARDS.map(card => (
                <TouchableOpacity key={card.screen} style={styles.aiCard} onPress={() => navigation.navigate('AITab', { screen: card.screen })}>
                  <View style={styles.aiCardIcon}>
                    <Ionicons name={card.icon as any} size={22} color="#6366F1" />
                  </View>
                  <Text style={styles.aiCardTitle}>{card.title}</Text>
                  <Text style={styles.aiCardDesc}>{card.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 42, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginTop: 16, padding: 14, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  searchText: { marginLeft: 10, color: COLORS.muted, fontSize: 15 },
  // Banner
  bannerWrap: { marginHorizontal: 20, marginTop: 16, borderRadius: 22, overflow: 'hidden', height: 190, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  bannerImg: { width: '100%', height: 190 },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 20 },
  bannerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', lineHeight: 28 },
  bannerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F97316', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginTop: 10 },
  bannerBtnText: { color: '#FFF', fontWeight: '600', fontSize: 14, marginRight: 6 },
  // Categories
  catWrap: { paddingHorizontal: 20, paddingBottom: 6 },
  catCard: { alignItems: 'center', marginRight: 12, width: 80 },
  catIcon: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  catLabel: { fontSize: 12, color: COLORS.text, fontWeight: '600', textAlign: 'center' },
  // Featured Destinations
  destScroll: { paddingHorizontal: 20, gap: 16 },
  // Workshop Section
  workshopSection: { marginTop: 8 },
  workshopBg: { paddingVertical: 8 },
  wsScroll: { paddingHorizontal: 20, paddingBottom: 8, gap: 16 },
  // AI Section
  aiSection: { paddingHorizontal: 20, marginTop: 8 },
  aiBanner: { borderRadius: 22, padding: 20 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  aiTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  aiSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  aiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  aiCard: { width: '48%', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 14, marginBottom: 10, alignItems: 'center' },
  aiCardIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F5F3FF', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  aiCardTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  aiCardDesc: { fontSize: 11, color: COLORS.muted, textAlign: 'center', marginTop: 2 },
});
