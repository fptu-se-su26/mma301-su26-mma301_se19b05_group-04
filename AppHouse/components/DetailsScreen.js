import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { property } = route.params || {
    property: { title: 'Skyline Apartment', price: '5.5 TR/tháng', location: 'Quận Hải Châu, Đà Nẵng', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400' }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Image source={{ uri: property.image }} style={styles.detailImage} />

          <View style={styles.heroInfo}>
            <Text style={styles.mainTitle}>{property.title}</Text>
            <Text style={styles.mainLocation}>📍 {property.location}</Text>
            <Text style={styles.mainPrice}>{property.price}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Thông Tin Chi Tiết</Text>
            <Text style={styles.descriptionText}>
              Căn hộ nằm ở vị trí đắc địa, giao thông thuận tiện, an ninh tốt 24/7. Phòng đã được trang bị đầy đủ tiện nghi thiết yếu cao cấp bao gồm giường tủ, điều hòa, hệ thống nước nóng lạnh, tivi thông minh và ban công thông thoáng đón gió tự nhiên.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Tiện Ích Đi Kèm</Text>
            <View style={styles.amenitiesGrid}>
              {['Wifi Tốc Độ Cao', 'Bãi Đỗ Xe Máy', 'Bảo Vệ 24/7', 'Máy Giặt Tự Động'].map((item, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityIcon}>✔</Text>
                  <Text style={styles.amenityText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Gặp Người Cộng Tác</Text>

            <View style={styles.hostRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>A</Text>
              </View>

              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>Anh Minh</Text>
                <Text style={styles.hostRole}>Cộng tác viên Smart Rent</Text>
                <Text style={styles.hostDesc}>Hỗ trợ tư vấn, xem phòng và giải đáp thông tin thuê nhà.</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.messageButton} activeOpacity={0.85}>
              <Text style={styles.messageButtonText}>Nhắn Tin Tư Vấn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Payment', { property })}>
          <Text style={styles.actionButtonText}>Đặt Thuê Ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7ff' },
  scrollContent: { paddingBottom: 120 },

  heroCard: {
    margin: 20,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  detailImage: {
    width: '100%',
    height: 260,
  },
  heroInfo: {
    padding: 22,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 36,
  },
  mainLocation: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 22,
  },
  mainPrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2563eb',
    marginTop: 16,
  },

  infoBox: {
    paddingHorizontal: 20,
    gap: 18,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  descriptionText: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  amenityIcon: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },

  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb',
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  hostRole: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 3,
  },
  hostDesc: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 5,
    lineHeight: 19,
  },
  messageButton: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '700',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});