import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen({ route, navigation }) {
  const { property } = route.params || { property: { title: 'Căn Hộ' } };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={42} color="#16a34a" />
          </View>

          <Text style={styles.successHeadline}>Payment successful!</Text>
          <Text style={styles.successSubline}>
            Your reservation request has been recorded successfully.
          </Text>

          <View style={styles.receiptBox}>
            <Text style={styles.receiptTitle}>Digital Receipt</Text>

            <View style={styles.receiptRow}>
              <Text style={styles.rLabel}>Project</Text>
              <Text style={styles.rValue}>{property.title}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.rLabel}>Invoice ID</Text>
              <Text style={styles.rValue}>#SR99281A</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.rLabel}>Status</Text>
              <Text style={styles.statusText}>Deposit completed</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  successCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  iconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  successHeadline: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubline: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 26,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 28,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    gap: 16,
  },
  rLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  rValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16a34a',
  },
  homeButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});