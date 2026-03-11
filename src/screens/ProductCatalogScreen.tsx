import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {products, Product} from '../data/products';
import {useApp} from '../context/AppContext';

type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';

export default function ProductCatalogScreen() {
  const navigation = useNavigation<any>();
  const {state} = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('name_asc');
  const [showSort, setShowSort] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
    }
  });

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      testID={`product-item-${item.id}`}
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}
      accessibilityLabel={`Product: ${item.name}`}>
      <Text style={styles.productImage}>{item.image}</Text>
      <Text testID={`product-title-${item.id}`} style={styles.productTitle}>
        {item.name}
      </Text>
      <Text testID={`product-price-${item.id}`} style={styles.productPrice}>
        ${item.price.toFixed(2)}
      </Text>
      <Text testID={`product-rating-${item.id}`} style={styles.productRating}>
        {renderStars(item.rating)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View testID="product-catalog-screen" style={styles.container}>
      <View style={styles.header}>
        <Text testID="catalog-title" style={styles.headerTitle}>
          Products
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            testID="sort-button"
            style={styles.sortButton}
            onPress={() => setShowSort(true)}>
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="cart-badge"
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text testID="cart-count" style={styles.badgeText}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        testID="product-list"
        data={sortedProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <Modal visible={showSort} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View testID="sort-modal" style={styles.sortModal}>
            <Text style={styles.sortModalTitle}>Sort by</Text>
            {([
              ['name_asc', 'Name (A-Z)'],
              ['name_desc', 'Name (Z-A)'],
              ['price_asc', 'Price (Low-High)'],
              ['price_desc', 'Price (High-Low)'],
            ] as [SortOption, string][]).map(([value, label]) => (
              <TouchableOpacity
                key={value}
                testID={`sort-${value}`}
                style={[
                  styles.sortOption,
                  sortBy === value && styles.sortOptionActive,
                ]}
                onPress={() => {
                  setSortBy(value);
                  setShowSort(false);
                }}>
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === value && styles.sortOptionTextActive,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              testID="sort-cancel"
              style={styles.sortCancel}
              onPress={() => setShowSort(false)}>
              <Text style={styles.sortCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E2231A',
  },
  headerTitle: {fontSize: 20, fontWeight: 'bold', color: '#fff'},
  headerRight: {flexDirection: 'row', alignItems: 'center', gap: 12},
  sortButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  sortText: {color: '#fff', fontWeight: '600'},
  cartButton: {position: 'relative'},
  cartIcon: {fontSize: 24},
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {color: '#E2231A', fontSize: 12, fontWeight: 'bold'},
  list: {padding: 8},
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {fontSize: 48, marginBottom: 8},
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {fontSize: 16, fontWeight: 'bold', color: '#E2231A'},
  productRating: {fontSize: 14, color: '#FFD700', marginTop: 4},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sortModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  sortModalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 16},
  sortOption: {paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee'},
  sortOptionActive: {backgroundColor: '#FFF0EF'},
  sortOptionText: {fontSize: 16},
  sortOptionTextActive: {color: '#E2231A', fontWeight: '600'},
  sortCancel: {paddingVertical: 14, marginTop: 8, alignItems: 'center'},
  sortCancelText: {fontSize: 16, color: '#888'},
});
