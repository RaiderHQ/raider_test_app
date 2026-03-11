import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import {Product} from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

interface AppState {
  cart: CartItem[];
  isLoggedIn: boolean;
  currentUser: string | null;
}

type Action =
  | {type: 'ADD_TO_CART'; product: Product; quantity: number; color: string}
  | {type: 'REMOVE_FROM_CART'; productId: number}
  | {type: 'UPDATE_QUANTITY'; productId: number; quantity: number}
  | {type: 'CLEAR_CART'}
  | {type: 'LOGIN'; email: string}
  | {type: 'LOGOUT'};

const initialState: AppState = {
  cart: [],
  isLoggedIn: false,
  currentUser: null,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        item => item.product.id === action.product.id,
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? {...item, quantity: item.quantity + action.quantity}
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            product: action.product,
            quantity: action.quantity,
            color: action.color,
          },
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? {...item, quantity: action.quantity}
            : item,
        ),
      };
    case 'CLEAR_CART':
      return {...state, cart: []};
    case 'LOGIN':
      return {...state, isLoggedIn: true, currentUser: action.email};
    case 'LOGOUT':
      return {...state, isLoggedIn: false, currentUser: null};
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => null});

export function AppProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
