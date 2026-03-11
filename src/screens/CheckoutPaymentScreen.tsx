import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export default function CheckoutPaymentScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {shippingInfo} = route.params;

  const [form, setForm] = useState<Record<string, string>>({});
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    const required = ['cardHolder', 'cardNumber', 'expDate', 'cvv'];

    if (!sameAsShipping) {
      required.push('billingName', 'billingAddress', 'billingCity', 'billingZip');
    }

    required.forEach(key => {
      if (!form[key]?.trim()) {
        newErrors[key] = 'Required';
      }
    });

    if (form.cardNumber && form.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigation.navigate('PlaceOrder', {
      shippingInfo,
      paymentInfo: form,
      sameAsShipping,
    });
  };

  const renderInput = (
    testID: string,
    key: string,
    label: string,
    placeholder: string,
    extra?: object,
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        testID={testID}
        style={[styles.input, errors[key] ? styles.inputError : null]}
        placeholder={placeholder}
        value={form[key] || ''}
        onChangeText={text => {
          setForm(prev => ({...prev, [key]: text}));
          if (errors[key]) {
            setErrors(prev => {
              const next = {...prev};
              delete next[key];
              return next;
            });
          }
        }}
        accessibilityLabel={label}
        {...extra}
      />
      {errors[key] ? (
        <Text testID={`${testID}-error`} style={styles.errorText}>
          {errors[key]}
        </Text>
      ) : null}
    </View>
  );

  return (
    <ScrollView
      testID="checkout-payment-screen"
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Payment</Text>

      {renderInput('card-holder-input', 'cardHolder', 'Cardholder Name', 'John Doe')}
      {renderInput('card-number-input', 'cardNumber', 'Card Number', '4111 1111 1111 1111', {
        keyboardType: 'numeric',
      })}

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          {renderInput('exp-date-input', 'expDate', 'Expiration', 'MM/YY')}
        </View>
        <View style={styles.halfWidth}>
          {renderInput('cvv-input', 'cvv', 'CVV', '123', {
            keyboardType: 'numeric',
            secureTextEntry: true,
          })}
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Billing same as shipping</Text>
        <Switch
          testID="same-as-shipping-switch"
          value={sameAsShipping}
          onValueChange={setSameAsShipping}
          trackColor={{true: '#E2231A'}}
        />
      </View>

      {!sameAsShipping && (
        <View testID="billing-address-section">
          <Text style={styles.sectionTitle}>Billing Address</Text>
          {renderInput('billing-name-input', 'billingName', 'Full Name', 'John Doe')}
          {renderInput('billing-address-input', 'billingAddress', 'Address', '123 Main St')}
          {renderInput('billing-city-input', 'billingCity', 'City', 'San Francisco')}
          {renderInput('billing-zip-input', 'billingZip', 'Zip Code', '94102')}
        </View>
      )}

      <TouchableOpacity
        testID="review-order-button"
        style={styles.submitButton}
        onPress={handleSubmit}>
        <Text style={styles.submitText}>Review Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 24},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
  sectionTitle: {fontSize: 18, fontWeight: '600', marginVertical: 16},
  inputGroup: {marginBottom: 16},
  label: {fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333'},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {borderColor: '#E2231A'},
  errorText: {color: '#E2231A', fontSize: 12, marginTop: 4},
  row: {flexDirection: 'row', gap: 12},
  halfWidth: {flex: 1},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  switchLabel: {fontSize: 16, color: '#333'},
  submitButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
