import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { Search, X, ShoppingCart, RefreshCw } from 'lucide-react-native';
import { theme } from '../theme/colors';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { Product } from '../context/CartContext';
import { useCart } from '../hooks/useCart';
import { useAppNavigation } from '../context/NavigationContext';

const LIMIT = 10;

export const ProductListScreen = () => {
  const { navigate } = useAppNavigation();
  const { cartTotalItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Take first 6 categories for UI aesthetic simplicity
          setCategories(['All', ...data.slice(0, 6)]);
        }
      } catch (err) {
        console.warn('Failed to load categories, using static fallback', err);
        setCategories(['All', 'beauty', 'fragrances', 'furniture', 'groceries']);
      }
    };
    fetchCategories();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Main Fetch function
  const fetchProducts = useCallback(
    async (currentSkip: number, resetList = false) => {
      if (currentSkip === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        let url = 'https://dummyjson.com/products';

        if (debouncedSearch.trim() !== '') {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
            debouncedSearch
          )}`;
        } else if (selectedCategory !== 'All') {
          url = `https://dummyjson.com/products/category/${selectedCategory}`;
        }

        url += `${url.includes('?') ? '&' : '?'}limit=${LIMIT}&skip=${currentSkip}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        const fetchedProducts = data.products || [];

        setProducts((prev) => (resetList ? fetchedProducts : [...prev, ...fetchedProducts]));
        setHasMore(fetchedProducts.length === LIMIT && (data.skip + fetchedProducts.length < data.total));
      } catch (err: any) {
        setError(err.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, selectedCategory]
  );

  // Trigger fetch when search or category selection changes
  useEffect(() => {
    setSkip(0);
    fetchProducts(0, true);
  }, [debouncedSearch, selectedCategory, fetchProducts]);

  // Load more when reaching end of list
  const handleLoadMore = () => {
    if (!loadingMore && !loading && hasMore && !error) {
      const nextSkip = skip + LIMIT;
      setSkip(nextSkip);
      fetchProducts(nextSkip, false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const handleRetry = () => {
    setSkip(0);
    fetchProducts(0, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>AuraShop</Text>
          <Text style={styles.brandSubtitle}>Luxury Curated Store</Text>
        </View>

        {/* Floating Cart Badge */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cartHeaderBtn}
          onPress={() => navigate('cart')}
        >
          <ShoppingCart size={20} color={theme.colors.white} />
          {cartTotalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartTotalItems > 99 ? '99+' : cartTotalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={18} color={theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search premium products..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="never"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearIcon}>
              <X size={16} color={theme.colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Selection Carousel */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => {
                  setSelectedCategory(item);
                  setSearchQuery(''); // Clear search when selecting category
                }}
              >
                <Text
                  style={[styles.categoryText, isActive && styles.categoryTextActive]}
                >
                  {item === 'All' ? 'All Items' : item.replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.categoryListContent}
        />
      </View>

      {/* Loading Skeleton */}
      {loading && (
        <FlatList
          data={[1, 2, 4, 5, 6]}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <ProductCardSkeleton />}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.productListContent}
        />
      )}

      {/* Error state */}
      {error && !loading && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.retryButton} onPress={handleRetry}>
            <RefreshCw size={14} color={theme.colors.black} style={{ marginRight: 8 }} />
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No premium products found</Text>
        </View>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.productListContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
              </View>
            ) : null
          }
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  cartHeaderBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: theme.colors.badgeBg,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: theme.colors.badgeText,
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingHorizontal: theme.spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    height: '100%',
  },
  clearIcon: {
    padding: 4,
  },
  categoryContainer: {
    marginBottom: theme.spacing.sm,
  },
  categoryListContent: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.card,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: theme.colors.black,
    fontWeight: 'bold',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  productListContent: {
    paddingBottom: theme.spacing.xl,
  },
  loadingMoreContainer: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  errorText: {
    fontSize: 14,
    color: theme.colors.danger,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  retryText: {
    color: theme.colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
});
export default ProductListScreen;
