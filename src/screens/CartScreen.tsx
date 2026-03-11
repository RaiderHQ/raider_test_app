import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp, CartItem} from '../context/AppContext';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const {state, dispatch} = useApp();

  const total = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderCartItem = ({item}: {item: CartItem}) => (
    <View testID={`cart-item-${item.product.id}`} style={styles.cartItem}>
      <Text style={styles.itemImage}>{item.product.image}</Text>
      <View style={styles.itemDetails}>
        <Text testID={`cart-item-name-${item.product.id}`} style={styles.itemName}>
          {item.product.name}
        </Text>
        <Text testID={`cart-item-price-${item.product.id}`} style={styles.itemPrice}>
          ${item.product.price.toFixed(2)}
        </Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            testID={`cart-minus-${item.product.id}`}
            style={styles.qtyButton}
            onPress={() => {
              if (item.quantity <= 1) {
                dispatch({type: 'REMOVE_FROM_CART', productId: item.product.id});
              } else {
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  productId: item.product.id,
                  quantity: item.quantity - 1,
                });
              }
            }}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text testID={`cart-qty-${item.product.id}`} style={styles.qtyText}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            testID={`cart-plus-${item.product.id}`}
            style={styles.qtyButton}
            onPress={() =>
              dispatch({
                type: 'UPDATE_QUANTITY',
                productId: item.product.id,
                quantity: item.quantity + 1,
              })
            }>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        testID={`remove-item-${item.product.id}`}
        onPress={() =>
          dispatch({type: 'REMOVE_FROM_CART', productId: item.product.id})
        }>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  if (state.cart.length === 0) {
    return (
      <View testID="cart-screen-empty" style={styles.emptyContainer}>
        <Text testID="no-items-title" style={styles.emptyTitle}>
          No Items
        </Text>
        <Text style={styles.emptySubtitle}>
          Your cart is empty. Add some products!
        </Text>
        <TouchableOpacity
          testID="go-shopping-button"
          style={styles.shopButton}
          onPress={() => navigation.navigate('Catalog')}>
          <Text style={styles.shopButtonText}>Go Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View testID="cart-screen" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      <FlatList
        testID="cart-list"
        data={state.cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.product.id.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text testID="items-count" style={styles.itemsText}>
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </Text>
          <Text testID="total-price" style={styles.totalText}>
            ${total.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          testID="proceed-to-checkout"
          style={styles.checkoutButton}
          onPress={() => {
            if (state.isLoggedIn) {
              navigation.navigate('CheckoutInfo');
            } else {
              navigation.navigate('Login');
            }
          }}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  header: {
    padding: 16,
    backgroundColor: '#E2231A',
  },
  headerTitle: {fontSize: 20, fontWeight: 'bold', color: '#fff'},
  list: {padding: 16},
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemImage: {fontSize: 40, marginRight: 12},
  itemDetails: {flex: 1},
  itemName: {fontSize: 14, fontWeight: '600', marginBottom: 4},
  itemPrice: {fontSize: 16, fontWeight: 'bold', color: '#E2231A'},
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2231A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  qtyText: {fontSize: 16, fontWeight: 'bold'},
  removeText: {fontSize: 20, color: '#999', padding: 8},
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemsText: {fontSize: 16, color: '#666'},
  totalText: {fontSize: 20, fontWeight: 'bold'},
  checkoutButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  emptyTitle: {fontSize: 24, fontWeight: 'bold', marginBottom: 8},
  emptySubtitle: {fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center'},
  shopButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  shopButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
