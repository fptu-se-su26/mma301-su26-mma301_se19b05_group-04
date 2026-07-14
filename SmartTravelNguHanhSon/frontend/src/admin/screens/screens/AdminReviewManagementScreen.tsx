import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { EmptyState } from '../../../components/common/EmptyState';
import { COLORS } from '../../../utils/constants';

interface Review { id: string; reviewer: string; target: string; targetType: 'workshop' | 'destination'; rating: number; content: string; date: string; isHidden: boolean; }

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', reviewer: 'Nguyễn Văn A', target: 'Trải nghiệm chế tác đá mỹ nghệ', targetType: 'workshop', rating: 5, content: 'Workshop rất tuyệt vời! Nghệ nhân hướng dẫn tận tình, sản phẩm mang về rất đẹp.', date: '2026-06-25', isHidden: false },
  { id: 'r2', reviewer: 'Trần Thị B', target: 'Workshop nấu món miền Trung', targetType: 'workshop', rating: 4, content: 'Được trải nghiệm nấu mì Quảng rất thú vị. Đầu bếp vui tính và chuyên nghiệp.', date: '2026-06-24', isHidden: false },
  { id: 'r3', reviewer: 'Lê Minh C', target: 'Danh thắng Ngũ Hành Sơn', targetType: 'destination', rating: 5, content: 'Cảnh đẹp tuyệt vời, không khí trong lành. Nên đến sớm tránh đông.', date: '2026-06-23', isHidden: false },
  { id: 'r4', reviewer: 'Phạm Văn D', target: 'Workshop làm đèn lồng Hội An', targetType: 'workshop', rating: 3, content: 'Workshop bình thường, thời gian hơi ngắn. Nên kéo dài thêm 30 phút.', date: '2026-06-22', isHidden: false },
  { id: 'r5', reviewer: 'Hoàng Thị E', target: 'Bãi biển Mỹ Khê', targetType: 'destination', rating: 5, content: 'Biển sạch đẹp, nước trong veo. Hoàng hôn tuyệt đẹp!', date: '2026-06-21', isHidden: false },
];

export const AdminReviewManagementScreen = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const toggleHide = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isHidden: !r.isHidden } : r));
  };

  const deleteReview = (id: string) => {
    Alert.alert('Xóa đánh giá', 'Bạn chắc chắn muốn xóa?', [
      { text: 'Hủy' },
      { text: 'Xóa', style: 'destructive', onPress: () => setReviews(prev => prev.filter(r => r.id !== id)) },
    ]);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}><Text style={styles.headerTitle}>Quản lý đánh giá</Text></View>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, item.isHidden && styles.cardHidden]}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.reviewer}>{item.reviewer}</Text>
                <Text style={styles.target}>{item.target}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FACC15" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => toggleHide(item.id)}>
                  <Ionicons name={item.isHidden ? 'eye' : 'eye-off'} size={16} color={item.isHidden ? '#22C55E' : '#F59E0B'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => deleteReview(item.id)}>
                  <Ionicons name="trash" size={16} color="#DC2626" />
                </TouchableOpacity>
              </View>
            </View>
            {item.isHidden && (
              <View style={styles.hiddenBadge}><Text style={styles.hiddenText}>Đã ẩn</Text></View>
            )}
          </View>
        )}
        ListEmptyComponent={<EmptyState title="Chưa có đánh giá" description="Chưa có đánh giá nào trong hệ thống" />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  list: { padding: 16, paddingBottom: 130 },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 14, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardHidden: { opacity: 0.5 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  reviewer: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  target: { fontSize: 13, color: '#F97316', marginTop: 2 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF9C3', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#A16207', marginLeft: 3 },
  content: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  date: { fontSize: 12, color: COLORS.muted },
  actions: { flexDirection: 'row', gap: 6 },
  actionBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  hiddenBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  hiddenText: { fontSize: 10, fontWeight: '600', color: '#DC2626' },
});
