import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {testUsers} from '../data/products';
import {useApp} from '../context/AppContext';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const {dispatch} = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let hasError = false;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Username is required');
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    }
    if (hasError) {
      return;
    }

    const user = testUsers.find(u => u.email === email);

    if (!user || user.password !== password) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      return;
    }

    if (user.type === 'locked_out') {
      Alert.alert(
        'Account Locked',
        'This account has been locked. Please contact support.',
      );
      return;
    }

    dispatch({type: 'LOGIN', email});
    navigation.navigate('CheckoutInfo');
  };

  return (
    <ScrollView
      testID="login-screen"
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Please login to proceed with checkout
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          testID="username-input"
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Username input"
        />
        {emailError ? (
          <Text testID="username-error" style={styles.errorText}>
            {emailError}
          </Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          testID="password-input"
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password input"
        />
        {passwordError ? (
          <Text testID="password-error" style={styles.errorText}>
            {passwordError}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        testID="login-button"
        style={styles.loginButton}
        onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.testCredentials}>
        <Text style={styles.credentialsTitle}>Test Credentials</Text>
        {testUsers.map((user, index) => (
          <TouchableOpacity
            key={user.email}
            testID={`test-user-${index + 1}`}
            style={styles.credentialRow}
            onPress={() => {
              setEmail(user.email);
              setPassword(user.password);
            }}>
            <Text testID={`test-username-${index + 1}`} style={styles.credEmail}>
              {user.email}
            </Text>
            <Text testID={`test-password-${index + 1}`} style={styles.credPassword}>
              {user.password}
            </Text>
            {user.type === 'locked_out' && (
              <Text style={styles.lockedBadge}>LOCKED</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 24},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 8},
  subtitle: {fontSize: 16, color: '#666', marginBottom: 32},
  inputGroup: {marginBottom: 20},
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
  loginButton: {
    backgroundColor: '#E2231A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  testCredentials: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  credentialsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 8,
  },
  credEmail: {fontSize: 14, color: '#E2231A', flex: 1},
  credPassword: {fontSize: 14, color: '#666'},
  lockedBadge: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: '#E2231A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
});
