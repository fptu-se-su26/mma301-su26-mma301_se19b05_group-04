import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ArrowLeft, Star, Heart, ShoppingBag, Plus, Minus } from 'lucide-react-native';
import { theme } from '../theme/colors';
import { useAppNavigation } from '../context/NavigationContext';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export const ProductDetailScreen = () => {
  const { goBack, screenParams } = useAppNavigation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = screenParams?.product;

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>No product selected.</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setAdding(false);
      Alert.alert(
        'Cart Updated',
        `Successfully added ${quantity}x ${product.title} to your cart!`,
        [{ text: 'Continue Shopping' }, { text: 'View Cart', onPress: () => goBack() }]
      );
    }, 500);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} style={styles.headerBtn} onPress={goBack}>
          <ArrowLeft size={20} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product Details
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerBtn}
          onPress={() => toggleWishlist(product)}
        >
          <Heart
            size={20}
            color={isFavorited ? theme.colors.danger : theme.colors.textMuted}
            fill={isFavorited ? theme.colors.danger : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          {!imageLoaded && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            resizeMode="contain"
            onLoad={() => setImageLoaded(true)}
          />
        </View>

        {/* Product Information */}
        <View style={styles.detailsBlock}>
          <Text style={styles.categoryBadge}>{product.category.toUpperCase()}</Text>

          <Text style={styles.title}>{product.title}</Text>

          {/* Rating & Stock row */}
          <View style={styles.infoRow}>
            <View style={styles.ratingBox}>
              <Star size={14} color={theme.colors.star} fill={theme.colors.star} />
              <Text style={styles.ratingVal}>{product.rating?.toFixed(1) || '4.5'}</Text>
            </View>
            <View style={styles.stockBox}>
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          </View>

          {/* Price Tag */}
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>${product.price?.toFixed(2)}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Quantity selector */}
          <Text style={styles.sectionHeader}>Quantity</Text>
          <View style={styles.qtyRow}>
            <View style={styles.qtySelector}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.qtyControl}
                onPress={handleDecrement}
              >
                <Minus size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.qtyControl}
                onPress={handleIncrement}
              >
                <Plus size={16} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtotalText}>
              Subtotal: <Text style={styles.subtotalVal}>${(product.price * quantity).toFixed(2)}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Actions */}
      <View style={styles.actionBlock}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.cartButton, adding && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={adding}
        >
          {adding ? (
            <ActivityIndicator size="small" color={theme.colors.black} />
          ) : (
            <>
              <ShoppingBag size={18} color={theme.colors.black} style={{ marginRight: 8 }} />
              <Text style={styles.cartButtonText}>Add To Cart</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.md,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  imageWrapper: {
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: theme.spacing.md,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  loaderContainer: {
    position: 'absolute',
  },
  detailsBlock: {
    paddingHorizontal: theme.spacing.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(226, 177, 60, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 0.8,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginRight: theme.spacing.sm,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 4,
  },
  stockBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  stockText: {
    fontSize: 11,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  priceRow: {
    marginBottom: theme.spacing.md,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  descriptionText: {
    fontSize: 14,
    color: theme.colors.textMuted,
    lineHeight: 22,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    marginBottom: theme.spacing.md,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.full,
    padding: 3,
  },
  qtyControl: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  qtyVal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingHorizontal: 14,
  },
  subtotalText: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  subtotalVal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  actionBlock: {
    borderTopWidth: 1,
    borderColor: theme.colors.cardBorder,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  cartButton: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colors.textMuted,
  },
  cartButtonText: {
    color: theme.colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 15,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  backButtonText: {
    color: theme.colors.black,
    fontWeight: 'bold',
  },
});
export default ProductDetailScreen;
