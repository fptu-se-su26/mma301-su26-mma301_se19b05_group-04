import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Heart, ShoppingBag } from 'lucide-react-native';
import { theme } from '../theme/colors';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../hooks/useWishlist';
import { useAppNavigation } from '../context/NavigationContext';

export const WishlistScreen = () => {
  const { wishlistItems } = useWishlist();
  const { switchTab } = useAppNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {/* Wishlist list */}
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <Heart size={40} color={theme.colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Wishlist is empty</Text>
          <Text style={styles.emptySub}>Save premium items to look at them later and buy them!</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.shopButton}
            onPress={() => switchTab('products')}
          >
            <ShoppingBag size={16} color={theme.colors.black} style={{ marginRight: 6 }} />
            <Text style={styles.shopButtonText}>Browse items</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  listContent: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySub: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 18,
  },
  shopButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  shopButtonText: {
    color: theme.colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
export default WishlistScreen;
