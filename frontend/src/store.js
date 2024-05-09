import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cartSlice'
import userSliceReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
        user: userSliceReducer
    },
})

export default store;