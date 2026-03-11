import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {products} from '../data/products';
import {useApp} from '../context/AppContext';

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {dispatch} = useApp();
  const product = products.find(p => p.id === route.params.productId)!;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      product,
      quantity,
      color: selectedColor,
    });
    Alert.alert('Added to Cart', `${product.name} x${quantity} added to cart`);
  };

  return (
    <ScrollView
      testID="product-detail-screen"
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Text testID="product-image" style={styles.image}>
        {product.image}
      </Text>

      <Text testID="product-name" style={styles.name}>
        {product.name}
      </Text>

      <Text testID="product-price" style={styles.price}>
        ${product.price.toFixed(2)}
      </Text>

      <Text testID="product-rating" style={styles.rating}>
        {renderStars(product.rating)}
      </Text>

      <Text testID="product-description" style={styles.description}>
        {product.description}
      </Text>

      <Text style={styles.sectionTitle}>Color</Text>
      <View testID="color-selector" style={styles.colorRow}>
        {product.colors.map(color => (
          <TouchableOpacity
            key={color}
            testID={`color-${color.replace('#', '')}`}
            style={[
              styles.colorCircle,
              {backgroundColor: color},
              selectedColor === color && styles.colorSelected,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.quantityRow}>
        <TouchableOpacity
          testID="minus-button"
          style={styles.quantityButton}
          onPress={() => setQuantity(q => Math.max(1, q - 1))}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text testID="quantity-value" style={styles.quantityText}>
          {quantity}
        </Text>
        <TouchableOpacity
          testID="plus-button"
          style={styles.quantityButton}
          onPress={() => setQuantity(q => q + 1)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID="add-to-cart-button"
        style={styles.addToCartButton}
        onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="back-to-catalog"
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Products</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 20, alignItems: 'center'},
  image: {fontSize: 100, marginVertical: 20},
  name: {fontSize: 22, fontWeight: 'bold', textAlign: 'center'},
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E2231A',
    marginVertical: 8,
  },
  rating: {fontSize: 20, color: '#FFD700', marginBottom: 12},
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  colorSelected: {borderColor: '#E2231A', borderWidth: 3},
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2231A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
  quantityText: {fontSize: 20, fontWeight: 'bold', minWidth: 30, textAlign: 'center'},
  addToCartButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  addToCartText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  backButton: {paddingVertical: 12},
  backText: {color: '#E2231A', fontSize: 16},
});
