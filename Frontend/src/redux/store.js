import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import itemReducer from './item/itemSlice';
import orderReducer from './order/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    item: itemReducer,
    order: orderReducer,
  },
})
