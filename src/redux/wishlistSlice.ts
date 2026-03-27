import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface WishlistState {
    items: WishlistItem[];
    isOpen: boolean;
}

const initialState: WishlistState = { items: [], isOpen: false };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist(state, action: PayloadAction<WishlistItem>) {
            const idx = state.items.findIndex((i) => i.id === action.payload.id);
            if (idx >= 0) state.items.splice(idx, 1);
            else state.items.push(action.payload);
        },
        removeWishlistItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        toggleWishlistPanel(state) { state.isOpen = !state.isOpen; },
        closeWishlistPanel(state) { state.isOpen = false; },
    },
});

export const { toggleWishlist, removeWishlistItem, toggleWishlistPanel, closeWishlistPanel } = wishlistSlice.actions;
export default wishlistSlice.reducer;