import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  // Nhận dữ liệu truyền qua từ màn hình Home, nếu không có sẽ lấy mặc định
  const { property } = route.params || {
    property: { title: 'Skyline Apartment', price: '5.5 TR/tháng', location: 'Quận Hải Châu, Đà Nẵng', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400' }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: property.image }} style={styles.detailImage} />
        
        <View style={styles.infoBox}>
          <Text style={styles.mainTitle}>{property.title}</Text>
          <Text style={styles.mainLocation}>📍 {property.location}</Text>
          <Text style={styles.mainPrice}>{property.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Thông Tin Chi Tiết</Text>
          <Text style={styles.descriptionText}>
            Căn hộ nằm ở vị trí đắc địa, giao thông thuận tiện, an ninh tốt 24/7. Phòng đã được trang bị đầy đủ tiện nghi thiết yếu cao cấp bao gồm giường tủ, điều hòa, hệ thống nước nóng lạnh, tivi thông minh và ban công thông thoáng đón gió tự nhiên.
          </Text>

          <Text style={styles.sectionLabel}>Tiện Ích Đi Kèm</Text>
          <View style={styles.amenitiesGrid}>
            {['Wifi Tốc Độ Cao', 'Bãi Đỗ Xe Máy', 'Bảo Vệ 24/7', 'Máy Giặt Tự Động'].map((item, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>✔️</Text>
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Payment', { property })}>
          <Text style={styles.actionButtonText}>Đặt Thuê Ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 },
  detailImage: { width: '100%', height: 260 },
  infoBox: { padding: 20 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  mainLocation: { fontSize: 14, color: '#64748B', marginTop: 6 },
  mainPrice: { fontSize: 22, fontWeight: 'bold', color: '#0ea5e9', marginTop: 12 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 20 },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 10 },
  descriptionText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  amenityItem: { flexDirection: 'row', width: '48%', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  amenityIcon: { marginRight: 8, fontSize: 14 },
  amenityText: { fontSize: 13, color: '#334155', fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', padding: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  actionButton: { backgroundColor: '#0ea5e9', borderRadius: 12, padding: 16, alignItems: 'center' },
  actionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});