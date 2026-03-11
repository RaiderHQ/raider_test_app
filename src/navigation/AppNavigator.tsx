import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

import ProductCatalogScreen from '../screens/ProductCatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import CheckoutInfoScreen from '../screens/CheckoutInfoScreen';
import CheckoutPaymentScreen from '../screens/CheckoutPaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import CheckoutCompleteScreen from '../screens/CheckoutCompleteScreen';
import DrawingScreen from '../screens/DrawingScreen';
import WebViewScreen from '../screens/WebViewScreen';
import AboutScreen from '../screens/AboutScreen';
import MenuScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#E2231A'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Catalog"
        component={ProductCatalogScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{title: 'Product Details'}}
      />
      <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}} />
      <Stack.Screen
        name="CheckoutInfo"
        component={CheckoutInfoScreen}
        options={{title: 'Shipping'}}
      />
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPaymentScreen}
        options={{title: 'Payment'}}
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrderScreen}
        options={{title: 'Review'}}
      />
      <Stack.Screen
        name="CheckoutComplete"
        component={CheckoutCompleteScreen}
        options={{title: 'Complete', headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
}

function TabIcon({label, focused}: {label: string; focused: boolean}) {
  const icons: Record<string, string> = {
    Shop: '🛍️',
    Cart: '🛒',
    Drawing: '🎨',
    WebView: '🌐',
    Menu: '☰',
  };
  return (
    <Text style={{fontSize: 22, opacity: focused ? 1 : 0.5}}>
      {icons[label] || '•'}
    </Text>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarTestID: `tab-${route.name.toLowerCase()}`,
        tabBarIcon: ({focused}) => (
          <TabIcon label={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: '#E2231A',
        tabBarInactiveTintColor: '#999',
      })}>
      <Tab.Screen name="Shop" component={CatalogStack} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#E2231A'},
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen name="Drawing" component={DrawingScreen} />
      <Tab.Screen name="WebView" component={WebViewScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
