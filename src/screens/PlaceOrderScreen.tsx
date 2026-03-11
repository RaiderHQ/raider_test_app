import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useApp, CartItem} from '../context/AppContext';

export default function PlaceOrderScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {state, dispatch} = useApp();
  const {shippingInfo, paymentInfo} = route.params;

  const total = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const cardNumber = paymentInfo.cardNumber || '';
  const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`;

  const handlePlaceOrder = () => {
    dispatch({type: 'CLEAR_CART'});
    navigation.navigate('CheckoutComplete');
  };

  return (
    <ScrollView
      testID="place-order-screen"
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Text style={styles.title}>Review Order</Text>

      <Text style={styles.sectionTitle}>Items</Text>
      {state.cart.map(item => (
        <View
          key={item.product.id}
          testID={`order-item-${item.product.id}`}
          style={styles.orderItem}>
          <Text style={styles.itemEmoji}>{item.product.image}</Text>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.product.name}</Text>
            <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
          </View>
          <Text style={styles.itemTotal}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <View testID="shipping-address-summary" style={styles.infoCard}>
        <Text testID="shipping-name" style={styles.infoText}>
          {shippingInfo.fullName}
        </Text>
        <Text testID="shipping-address" style={styles.infoText}>
          {shippingInfo.address1}
        </Text>
        <Text testID="shipping-city" style={styles.infoText}>
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </Text>
        <Text testID="shipping-country" style={styles.infoText}>
          {shippingInfo.country}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Payment</Text>
      <View testID="payment-summary" style={styles.infoCard}>
        <Text testID="card-holder" style={styles.infoText}>
          {paymentInfo.cardHolder}
        </Text>
        <Text testID="card-number-masked" style={styles.infoText}>
          {maskedCard}
        </Text>
        <Text testID="card-expiry" style={styles.infoText}>
          Exp: {paymentInfo.expDate}
        </Text>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text testID="order-item-count" style={styles.totalLabel}>
            Items ({itemCount})
          </Text>
          <Text testID="order-total" style={styles.totalValue}>
            ${total.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping</Text>
          <Text style={styles.totalValue}>Free</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text style={styles.grandTotalLabel}>Total</Text>
          <Text testID="grand-total" style={styles.grandTotalValue}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        testID="place-order-button"
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 24},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
  sectionTitle: {fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 12},
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemEmoji: {fontSize: 32, marginRight: 12},
  itemDetails: {flex: 1},
  itemName: {fontSize: 14, fontWeight: '600'},
  itemQty: {fontSize: 12, color: '#666', marginTop: 2},
  itemTotal: {fontSize: 16, fontWeight: 'bold'},
  infoCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  infoText: {fontSize: 14, color: '#333', lineHeight: 22},
  totalSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 2,
    borderColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  totalLabel: {fontSize: 16, color: '#666'},
  totalValue: {fontSize: 16},
  grandTotal: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    paddingTop: 12,
  },
  grandTotalLabel: {fontSize: 18, fontWeight: 'bold'},
  grandTotalValue: {fontSize: 18, fontWeight: 'bold', color: '#E2231A'},
  placeOrderButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  placeOrderText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
