import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] }

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const updateCart = (state) => {
    // Calculate the items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calculate the total price
    state.totalPrice = (
        Number(state.itemsPrice)
    ).toFixed(2);

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            }
            else {
                state.cartItems = [...state.cartItems, item]
            }

            // Calculate items price
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

            return updateCart(state);
        }
    }
});

export const {
    addToCart,
    removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer