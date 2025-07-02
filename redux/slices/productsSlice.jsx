import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const findByIdCart = (cart, productId, size) => {
    return cart.findIndex(item => item._id == productId && item.size == size);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const { product, quantity, size } = action.payload;
            const index = findByIdCart(state.cart, product._id, size);
            if (index !== -1) {
                state.cart[index].quantity = Number(state.cart[index].quantity) + Number(quantity);
                if (size === 'M') {
                    product.price += 10000;
                } else if (size === 'L') {
                    product.price += 20000;
                }
            } else {
                if (size === 'M') {
                    product.price += 10000;
                } else if (size === 'L') {
                    product.price += 20000;
                }
                state.cart.push({ ...product, quantity, size });
            }
        },
        deleteCart: (state, action) => {
            const { product, size } = action.payload;
            const index = findByIdCart(state.cart, product._id, size);
            state.cart.splice(index, 1)
        },
        updateQuantity: (state, action) => {
            const { product, quantity, size } = action.payload;
            const index = findByIdCart(state.cart, product._id, size);
            state.cart[index].quantity = Math.max(1, quantity);
        },
        clearCart: (state) => {
            state.cart = []
        }
    }
})

export const { addCart, deleteCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;