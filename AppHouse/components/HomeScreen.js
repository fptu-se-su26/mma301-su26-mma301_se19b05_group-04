import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';

const MOCK_PROPERTIES = [
  { id: '1', title: 'Skyline Apartment', price: '5.5 TR/tháng', location: 'Quận Hải Châu, Đà Nẵng', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400' },
  { id: '2', title: 'Ocean View Studio', price: '7.0 TR/tháng', location: 'Quận Sơn Trà, Đà Nẵng', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400' },
  { id: '3', title: 'Green House Mini', price: '4.2 TR/tháng', location: 'Quận Ngũ Hành Sơn, Đà Nẵng', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400' },
];

export default function HomeScreen({ navigation }) {
  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { property: item })}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Profile Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeText}>Chào mừng bạn quay lại 👋</Text>
            <Text style={styles.userNameText}>Nguyễn Ngọc Bửu</Text>
          </View>
          <View style={styles.avatarPlaceholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Tìm kiếm khu vực, căn hộ..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Danh Mục</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {['Tất Cả', 'Chung Cư', 'Nhà Nguyên Căn', 'Phòng Trọ', 'Studio'].map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryBadge, index === 0 && styles.activeCategoryBadge]}>
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gợi Ý Nổi Bật</Text>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </View>

        <FlatList 
          data={MOCK_PROPERTIES}
          renderItem={renderPropertyCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
        />
      </ScrollView>

      {/* Mock Bottom Tab Menu Layout */}
      <View style={styles.bottomTabMock}>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabActiveText}>🏠 Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabInactiveText}>🔍 Tìm kiếm</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabInactiveText}>❤️ Đã lưu</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabInactiveText}>👤 Cá nhân</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  welcomeText: { fontSize: 14, color: '#64748B' },
  userNameText: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  avatarPlaceholder: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#E2E8F0', borderWidth: 1, borderColor: '#CBD5E1' },
  searchContainer: { paddingHorizontal: 20, marginTop: 20 },
  searchInput: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14, fontSize: 15, color: '#0F172A' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 28, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  seeAllText: { fontSize: 13, color: '#0ea5e9', fontWeight: '600' },
  categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
  categoryBadge: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F1F5F9', marginRight: 10 },
  activeCategoryBadge: { backgroundColor: '#0ea5e9' },
  categoryText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  activeCategoryText: { color: '#FFFFFF', fontWeight: 'bold' },
  card: { width: 240, backgroundColor: '#FFFFFF', borderRadius: 16, marginRight: 16, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardImage: { width: '100%', height: 140, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  cardInfo: { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  cardLocation: { fontSize: 12, color: '#64748B', marginTop: 4 },
  cardPrice: { fontSize: 15, fontWeight: '700', color: '#0ea5e9', marginTop: 8 },
  bottomTabMock: { flexDirection: 'row', height: 65, borderTopWidth: 1, borderTopColor: '#F1F5F9', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFFFFF' },
  tabItem: { alignItems: 'center' },
  tabActiveText: { color: '#0ea5e9', fontWeight: 'bold', fontSize: 12 },
  tabInactiveText: { color: '#94A3B8', fontSize: 12 }
});