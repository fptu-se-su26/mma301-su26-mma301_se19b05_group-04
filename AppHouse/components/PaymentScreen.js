import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { property } = route.params || { property: { title: 'Căn Hộ', price: '0 TR/tháng' } };
  const [method, setMethod] = useState('card'); // Trạng thái chọn phương thức

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.summaryTitle}>Tóm Tắt Hợp Đồng</Text>
        <View style={styles.invoiceCard}>
          <Text style={styles.roomName}>{property.title}</Text>
          <View style={styles.invoiceRow}>
            <Text style={styles.label}>Giá thuê cố định:</Text>
            <Text style={styles.value}>{property.price}</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text style={styles.label}>Đặt cọc giữ phòng (1 tháng):</Text>
            <Text style={styles.value}>{property.price}</Text>
          </View>
        </View>

        <Text style={styles.summaryTitle}>Chọn Phương Thức</Text>
        
        {/* Option 1: Thẻ tín dụng */}
        <TouchableOpacity 
          style={[styles.methodOption, method === 'card' && styles.selectedOption]} 
          onPress={() => setMethod('card')}
        >
          <Text style={styles.optionIcon}>💳</Text>
          <Text style={styles.optionText}>Thẻ Tín Dụng / Thẻ Ghi Nợ</Text>
        </TouchableOpacity>

        {/* Option 2: Chuyển khoản */}
        <TouchableOpacity 
          style={[styles.methodOption, method === 'bank' && styles.selectedOption]} 
          onPress={() => setMethod('bank')}
        >
          <Text style={styles.optionIcon}>🏦</Text>
          <Text style={styles.optionText}>Chuyển Khoản Ngân Hàng Nội Địa</Text>
        </TouchableOpacity>

        {/* Option 3: Ví điện tử */}
        <TouchableOpacity 
          style={[styles.methodOption, method === 'e-wallet' && styles.selectedOption]} 
          onPress={() => setMethod('e-wallet')}
        >
          <Text style={styles.optionIcon}>📱</Text>
          <Text style={styles.optionText}>Ví Điện Tử (Ví MoMo / ZaloPay)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Success', { property })}>
          <Text style={styles.confirmButtonText}>Xác Nhận & Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20 },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12, marginTop: 10 },
  invoiceCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  roomName: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 12 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 14, color: '#64748B' },
  value: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  methodOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E2E8F0', padding: 18, borderRadius: 12, marginBottom: 12 },
  selectedOption: { borderColor: '#0ea5e9', backgroundColor: '#F0F9FF' },
  optionIcon: { fontSize: 20, marginRight: 14 },
  optionText: { fontSize: 15, fontWeight: '500', color: '#334155' },
  bottomArea: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  confirmButton: { backgroundColor: '#0ea5e9', borderRadius: 12, padding: 16, alignItems: 'center' },
  confirmButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});