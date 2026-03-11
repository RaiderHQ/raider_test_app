import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';

interface MenuItem {
  testID: string;
  label: string;
  icon: string;
  screen?: string;
  action?: string;
}

const menuItems: MenuItem[] = [
  {testID: 'menu-catalog', label: 'Catalog', icon: '🛍️', screen: 'Catalog'},
  {testID: 'menu-webview', label: 'WebView', icon: '🌐', screen: 'WebView'},
  {testID: 'menu-drawing', label: 'Drawing', icon: '🎨', screen: 'Drawing'},
  {testID: 'menu-about', label: 'About', icon: 'ℹ️', screen: 'About'},
  {testID: 'menu-reset', label: 'Reset App State', icon: '🔄', action: 'reset'},
];

export default function MenuScreen() {
  const navigation = useNavigation<any>();
  const {state, dispatch} = useApp();

  const handlePress = (item: MenuItem) => {
    if (item.action === 'reset') {
      Alert.alert('Reset App', 'Are you sure you want to reset all app data?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            dispatch({type: 'CLEAR_CART'});
            dispatch({type: 'LOGOUT'});
            Alert.alert('Done', 'App state has been reset.');
          },
        },
      ]);
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <ScrollView testID="menu-screen" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        {state.isLoggedIn && (
          <Text testID="logged-in-user" style={styles.userText}>
            {state.currentUser}
          </Text>
        )}
      </View>

      {menuItems.map(item => (
        <TouchableOpacity
          key={item.testID}
          testID={item.testID}
          style={styles.menuItem}
          onPress={() => handlePress(item)}>
          <Text style={styles.menuIcon}>{item.icon}</Text>
          <Text style={styles.menuLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        testID={state.isLoggedIn ? 'menu-logout' : 'menu-login'}
        style={styles.menuItem}
        onPress={() => {
          if (state.isLoggedIn) {
            dispatch({type: 'LOGOUT'});
            Alert.alert('Logged Out', 'You have been logged out.');
          } else {
            navigation.navigate('Login');
          }
        }}>
        <Text style={styles.menuIcon}>{state.isLoggedIn ? '🚪' : '🔑'}</Text>
        <Text style={styles.menuLabel}>
          {state.isLoggedIn ? 'Logout' : 'Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    padding: 24,
    backgroundColor: '#E2231A',
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold', color: '#fff'},
  userText: {fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuIcon: {fontSize: 24, marginRight: 16, width: 32, textAlign: 'center'},
  menuLabel: {fontSize: 16, color: '#333'},
});
