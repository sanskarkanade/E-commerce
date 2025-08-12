import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);

            if (existingItemIndex >= 0) {
                // Create a new array to ensure immutability
                state.cartItems = state.cartItems.map((cartItem, index) =>
                    index === existingItemIndex
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === itemId);

            if (existingItemIndex >= 0) {
                const existingItem = state.cartItems[existingItemIndex];

                if (existingItem.quantity > 1) {
                    state.cartItems = state.cartItems.map((cartItem, index) =>
                        index === existingItemIndex
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    );
                } else {
                    state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
                }
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
