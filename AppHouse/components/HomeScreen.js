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
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.favoriteBadge}>
          <Text style={styles.favoriteText}>♡</Text>
        </View>
        <View style={styles.availableBadge}>
          <Text style={styles.availableText}>Available Now</Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.cardTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardLocation}>⌖ {item.location}</Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.specRow}>
          <Text style={styles.specText}>2 Bed</Text>
          <Text style={styles.specText}>2 Bath</Text>
          <Text style={styles.specText}>1,200 sqft</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <Text style={styles.menuText}>☰</Text>
          <Text style={styles.brandText}>Smart Rent</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>B</Text>
          </View>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Find your perfect home</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by city, neighborhood..."
            placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {['Apartment', 'Room', 'House', 'Studio'].map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryBadge, index === 0 && styles.activeCategoryBadge]}>
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Listings</Text>
          <Text style={styles.seeAllText}>View all</Text>
        </View>

        <FlatList
          data={MOCK_PROPERTIES}
          renderItem={renderPropertyCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />

        <View style={styles.promoCard}>
          <Text style={styles.promoTitle}>Fast Approval</Text>
          <Text style={styles.promoDesc}>
            Most applications are reviewed within 24 hours.
          </Text>
          <View style={styles.learnButton}>
            <Text style={styles.learnText}>Learn More</Text>
          </View>
        </View>

        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>Secure Payments</Text>
          <Text style={styles.securityDesc}>
            Bank-grade security for all your rental transactions.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomTabMock}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabIconActive}>⌂</Text>
          <Text style={styles.tabActiveText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⌕</Text>
          <Text style={styles.tabInactiveText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>♡</Text>
          <Text style={styles.tabInactiveText}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>♙</Text>
          <Text style={styles.tabInactiveText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f4f7ff' 
  },
  scrollContent: { 
    paddingBottom: 105 
  },

  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 24,
    color: '#2563eb',
    fontWeight: '700',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563eb',
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#2563eb',
    fontWeight: '800',
  },

  headerContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },

  searchContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    backgroundColor: '#f8fbff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 22,
    color: '#6b7280',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  sectionHeader: {
    marginTop: 32,
    marginBottom: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '700',
  },

  categoryContainer: {
    paddingHorizontal: 24,
  },
  categoryBadge: {
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 999,
    backgroundColor: '#e7efff',
    marginRight: 14,
  },
  activeCategoryBadge: {
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#ffffff',
  },

  card: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  cardImageWrap: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 26,
    color: '#ffffff',
    marginTop: -4,
  },
  availableBadge: {
    position: 'absolute',
    left: 18,
    bottom: 16,
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  availableText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },

  cardInfo: {
    padding: 22,
  },
  cardTitleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  cardLocation: {
    marginTop: 7,
    fontSize: 13,
    color: '#374151',
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563eb',
  },
  monthText: {
    fontSize: 12,
    color: '#6b7280',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#dbeafe',
    marginVertical: 14,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '600',
  },

  promoCard: {
    marginHorizontal: 24,
    marginTop: 10,
    backgroundColor: '#0b55d9',
    borderRadius: 28,
    padding: 30,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 5,
  },
  promoTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 10,
  },
  promoDesc: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 21,
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    borderRadius: 999,
  },
  learnText: {
    color: '#2563eb',
    fontWeight: '700',
  },

  securityCard: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#dbeafe',
    borderRadius: 28,
    padding: 30,
  },
  securityTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  securityDesc: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
  },

  bottomTabMock: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    height: 66,
    backgroundColor: '#eef4ff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dbeafe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tabActive: {
    width: 58,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    width: 58,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  tabIcon: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 3,
  },
  tabActiveText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  tabInactiveText: {
    color: '#111827',
    fontSize: 10,
    fontWeight: '500',
  },
});