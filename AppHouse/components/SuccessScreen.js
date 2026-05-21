import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function SuccessScreen({ route, navigation }) {
  const { property } = route.params || { property: { title: 'Căn Hộ' } };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.successWrapper}>
        <View style={styles.iconCircle}>
          <Text style={styles.successCheck}>✓</Text>
        </View>
        <Text style={styles.successHeadline}>Giao Dịch Thành Công!</Text>
        <Text style={styles.successSubline}>Hệ thống đã ghi nhận lịch hẹn giữ chỗ của bạn.</Text>
      </View>

      <View style={styles.receiptBox}>
        <Text style={styles.receiptTitle}>Biên Nhận Điện Tử</Text>
        <View style={styles.receiptRow}>
          <Text style={styles.rLabel}>Dự án:</Text>
          <Text style={styles.rValue}>{property.title}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.rLabel}>Mã hóa đơn:</Text>
          <Text style={styles.rValue}>#SR99281A</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.rLabel}>Trạng thái:</Text>
          <Text style={[styles.rValue, { color: '#10B981' }]}>Đã hoàn tất cọc</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Quay Lại Trang Chủ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, justifyContent: 'center' },
  successWrapper: { alignItems: 'center', marginBottom: 40 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#D1FAE5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successCheck: { fontSize: 40, color: '#10B981', fontWeight: 'bold' },
  successHeadline: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center' },
  successSubline: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 8, paddingHorizontal: 10 },
  receiptBox: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 40 },
  receiptTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 10 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  rLabel: { fontSize: 14, color: '#64748B' },
  rValue: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  homeButton: { backgroundColor: '#1E3A8A', borderRadius: 12, padding: 16, alignItems: 'center' },
  homeButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});