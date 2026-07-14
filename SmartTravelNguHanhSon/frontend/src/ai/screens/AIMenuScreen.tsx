import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { COLORS } from '../../../utils/constants';

const FEATURES = [
  { icon: 'chatbubbles', title: 'AI Chatbot du lịch', desc: 'Hỏi đáp về Ngũ Hành Sơn, ẩm thực, văn hóa, workshop', screen: 'AIChatbot', gradient: ['#8B5CF6', '#6366F1'] },
  { icon: 'calendar', title: 'AI tạo lịch trình', desc: 'Tự động lên kế hoạch du lịch phù hợp với sở thích', screen: 'AIItinerary', gradient: ['#6366F1', '#0EA5E9'] },
  { icon: 'compass', title: 'AI gợi ý địa điểm', desc: 'Gợi ý địa điểm và workshop phù hợp với bạn', screen: 'AIRecommendation', gradient: ['#0EA5E9', '#2DD4BF'] },
  { icon: 'calculator', title: 'AI ước tính chi phí', desc: 'Ước tính ngân sách cho chuyến đi thông minh', screen: 'AICostEstimator', gradient: ['#2DD4BF', '#22C55E'] },
];

const SUGGESTIONS = ['Ngũ Hành Sơn có gì hay?', 'Workshop nào phù hợp nhóm bạn?', 'Món ăn đặc sản gần đây?', 'Lịch trình 1 ngày?', 'Workshop làm đồ thủ công?'];

export const AIMenuScreen = ({ navigation }: any) => (
  <ScreenContainer>
    <ScrollView contentContainerStyle={styles.c} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#8B5CF6', '#6366F1', '#0EA5E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="sparkles" size={36} color="#8B5CF6" />
        </View>
        <Text style={styles.title}>Trợ lý AI du lịch</Text>
        <Text style={styles.sub}>Khám phá Ngũ Hành Sơn thông minh hơn với AI</Text>
      </LinearGradient>

      {FEATURES.map((feat, i) => (
        <TouchableOpacity key={i} style={styles.card} onPress={() => navigation.navigate(feat.screen)} activeOpacity={0.9}>
          <LinearGradient colors={feat.gradient as any} style={styles.cardIcon}>
            <Ionicons name={feat.icon as any} size={24} color="#FFF" />
          </LinearGradient>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{feat.title}</Text>
            <Text style={styles.cardDesc}>{feat.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
        </TouchableOpacity>
      ))}

      <Text style={styles.sugTitle}>💡 Câu hỏi gợi ý</Text>
      <View style={styles.sugWrap}>
        {SUGGESTIONS.map((s, i) => (
          <TouchableOpacity key={i} style={styles.sugChip} onPress={() => navigation.navigate('AIChatbot')}>
            <Text style={styles.sugText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </ScreenContainer>
);

const styles = StyleSheet.create({
  c: { padding: 16, paddingTop: 0, paddingBottom: 130 },
  header: { borderRadius: 24, padding: 28, alignItems: 'center', marginBottom: 20, marginTop: 50 },
  headerIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.95)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 6 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 18, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardIcon: { width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 14 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  cardDesc: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  sugTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 8, marginBottom: 12, color: COLORS.text },
  sugWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  sugChip: { backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  sugText: { fontSize: 13, color: '#8B5CF6' },
});
