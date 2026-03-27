import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = { items: [], isOpen: false };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) { existing.quantity += 1; }
            else { state.items.push({ ...action.payload, quantity: 1 }); }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        incrementItem(state, action: PayloadAction<number>) {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementItem(state, action: PayloadAction<number>) {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) item.quantity -= 1;
                else state.items = state.items.filter((i) => i.id !== action.payload);
            }
        },
        clearCart(state) { state.items = []; },
        toggleCart(state) { state.isOpen = !state.isOpen; },
        openCart(state) { state.isOpen = true; },
        closeCart(state) { state.isOpen = false; },
    },
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;