import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CheckoutCompleteScreen() {
  const navigation = useNavigation<any>();

  return (
    <View testID="checkout-complete-screen" style={styles.container}>
      <Text testID="complete-icon" style={styles.icon}>
        ✓
      </Text>
      <Text testID="complete-title" style={styles.title}>
        Checkout Complete
      </Text>
      <Text testID="thank-you-text" style={styles.thankYou}>
        Thank you for your order!
      </Text>
      <Text testID="swag-text" style={styles.swag}>
        Your new swag is on its way.
      </Text>
      <Text testID="order-id" style={styles.orderId}>
        Order #RDR-{Math.floor(Math.random() * 90000) + 10000}
      </Text>
      <TouchableOpacity
        testID="continue-shopping-button"
        style={styles.button}
        onPress={() => navigation.navigate('Catalog')}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 64,
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    width: 100,
    height: 100,
    lineHeight: 100,
    textAlign: 'center',
    borderRadius: 50,
    marginBottom: 24,
    overflow: 'hidden',
  },
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 12},
  thankYou: {fontSize: 18, color: '#666', marginBottom: 8},
  swag: {fontSize: 16, color: '#888', marginBottom: 16},
  orderId: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
