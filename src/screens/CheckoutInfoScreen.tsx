import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface FormField {
  key: string;
  label: string;
  placeholder: string;
  testID: string;
}

const fields: FormField[] = [
  {key: 'fullName', label: 'Full Name', placeholder: 'John Doe', testID: 'full-name-input'},
  {key: 'address1', label: 'Address Line 1', placeholder: '123 Main St', testID: 'address1-input'},
  {key: 'address2', label: 'Address Line 2', placeholder: 'Apt 4B', testID: 'address2-input'},
  {key: 'city', label: 'City', placeholder: 'San Francisco', testID: 'city-input'},
  {key: 'state', label: 'State', placeholder: 'CA', testID: 'state-input'},
  {key: 'zip', label: 'Zip Code', placeholder: '94102', testID: 'zip-input'},
  {key: 'country', label: 'Country', placeholder: 'United States', testID: 'country-input'},
];

export default function CheckoutInfoScreen() {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    const required = ['fullName', 'address1', 'city', 'state', 'zip', 'country'];

    required.forEach(key => {
      if (!form[key]?.trim()) {
        const field = fields.find(f => f.key === key);
        newErrors[key] = `${field?.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigation.navigate('CheckoutPayment', {shippingInfo: form});
  };

  return (
    <ScrollView
      testID="checkout-info-screen"
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Shipping Information</Text>

      {fields.map(field => (
        <View key={field.key} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            testID={field.testID}
            style={[styles.input, errors[field.key] ? styles.inputError : null]}
            placeholder={field.placeholder}
            value={form[field.key] || ''}
            onChangeText={text => {
              setForm(prev => ({...prev, [field.key]: text}));
              if (errors[field.key]) {
                setErrors(prev => {
                  const next = {...prev};
                  delete next[field.key];
                  return next;
                });
              }
            }}
            accessibilityLabel={field.label}
          />
          {errors[field.key] ? (
            <Text testID={`${field.testID}-error`} style={styles.errorText}>
              {errors[field.key]}
            </Text>
          ) : null}
        </View>
      ))}

      <TouchableOpacity
        testID="to-payment-button"
        style={styles.submitButton}
        onPress={handleSubmit}>
        <Text style={styles.submitText}>To Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 24},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
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
  submitButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
