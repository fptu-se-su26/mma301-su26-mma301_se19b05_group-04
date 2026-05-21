import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { property } = route.params || { property: { title: 'Căn Hộ', price: '0 TR/tháng' } };
  const [method, setMethod] = useState('card');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Payment Method</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summarySmallTitle}>PAYMENT SUMMARY</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly Rent</Text>
            <Text style={styles.summaryValue}>{property.price}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.feeLabel}>Processing Fee</Text>
            <Text style={styles.feeValue}>0 TR</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total to Pay</Text>
            <Text style={styles.totalValue}>{property.price}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Method</Text>

        <TouchableOpacity
          style={[styles.methodOption, method === 'card' && styles.selectedOption]}
          onPress={() => setMethod('card')}
        >
          <View style={styles.methodIconBox}>
            <Text style={styles.methodIcon}>▣</Text>
          </View>

          <View style={styles.methodTextBox}>
            <Text style={styles.optionText}>Thẻ Tín Dụng / Thẻ Ghi Nợ</Text>
            <Text style={styles.optionSubText}>Visa, Mastercard, Amex</Text>
          </View>

          <View style={[styles.radioCircle, method === 'card' && styles.radioCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodOption, method === 'bank' && styles.selectedOption]}
          onPress={() => setMethod('bank')}
        >
          <View style={styles.methodIconBox}>
            <Text style={styles.methodIcon}>▤</Text>
          </View>

          <View style={styles.methodTextBox}>
            <Text style={styles.optionText}>Chuyển Khoản Ngân Hàng</Text>
            <Text style={styles.optionSubText}>Direct bank transfer</Text>
          </View>

          <View style={[styles.radioCircle, method === 'bank' && styles.radioCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodOption, method === 'e-wallet' && styles.selectedOption]}
          onPress={() => setMethod('e-wallet')}
        >
          <View style={[styles.methodIconBox, styles.walletIconBox]}>
            <Text style={[styles.methodIcon, styles.walletIcon]}>▣</Text>
          </View>

          <View style={styles.methodTextBox}>
            <Text style={styles.optionText}>Ví Điện Tử</Text>
            <Text style={styles.optionSubText}>MoMo / ZaloPay</Text>
          </View>

          <View style={[styles.radioCircle, method === 'e-wallet' && styles.radioCircleActive]} />
        </TouchableOpacity>

        <View style={styles.secureBox}>
          <Text style={styles.secureText}>
            Giao dịch của bạn được bảo mật. Smart Rent không lưu thông tin thanh toán đầy đủ trên hệ thống.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Success', { property })}
        >
          <Text style={styles.confirmButtonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7ff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 120,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 24,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#eef4ff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },
  summarySmallTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6b7280',
    letterSpacing: 1.5,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'right',
  },
  feeLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 14,
  },
  feeValue: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#dbe3f2',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    flex: 1,
  },
  totalValue: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2563eb',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  selectedOption: {
    borderColor: '#2563eb',
  },
  methodIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  walletIconBox: {
    backgroundColor: '#0e7490',
  },
  methodIcon: {
    fontSize: 20,
    color: '#2563eb',
    fontWeight: '800',
  },
  walletIcon: {
    color: '#ffffff',
  },
  methodTextBox: {
    flex: 1,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  optionSubText: {
    fontSize: 13,
    color: '#4b5563',
    marginTop: 4,
    lineHeight: 18,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: '#c7cbe0',
    marginLeft: 8,
  },
  radioCircleActive: {
    borderColor: '#2563eb',
    backgroundColor: '#dbeafe',
  },
  secureBox: {
    backgroundColor: '#e8efff',
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
  },
  secureText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f4f7ff',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
});