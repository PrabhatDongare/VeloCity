import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';


const baseUrl = "http://localhost:3000/"
export const fetchUserCart = createAsyncThunk("fetchUserCart", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/cart/get`, {}, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestAddToCart = createAsyncThunk("requestAddToCart", async ({ item_type, url_slug, quantity }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/cart/add/${item_type}/${url_slug}/${quantity}`, {}, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const updateUserCart = createAsyncThunk("updateUserCart", async ({ item_type, url_slug, inc }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        // console.log( "THis is to check input for update Cart : ", item_type, url_slug, inc)
        const response = await axios.put(`${baseUrl}api/cart/update`, { item_type, url_slug, inc }, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const removeCartItem = createAsyncThunk("removeCartItem", async ({ url_slug }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.delete(`${baseUrl}api/cart/remove/${url_slug}`, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { userCart: [], cartTotal: 0 },

    reducers: {
        findCartTotal:(state) =>{
            if(state.userCart.length > 0){
                state.cartTotal = 0
                state.userCart.map(cartItem => 
                    state.cartTotal += cartItem.total_amount
                )
                state.cartTotal = state.cartTotal.toFixed(2)
            }
        },

        emptyCurrentUserCartFromFrontend: (state) => {
            state.userCart = []
        }
    },

    extraReducers: (builder) => {
        builder
            // fetchUserCart
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                const { success, cart } = action.payload
                if (success && cart.length > 0) {
                    state.userCart = cart.map(cartCol => {
                        return {
                            id: cartCol.id,
                            item_type: cartCol.item_type,
                            url_slug: cartCol.url_slug,
                            quantity: cartCol.quantity,
                            price: cartCol.price,
                            total_amount: cartCol.total_amount
                        }
                    })
                }
                cartSlice.caseReducers.findCartTotal(state);
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // requestAddToCart
            .addCase(requestAddToCart.fulfilled, (state, action) => {
                const { success, message } = action.payload
                if (success) {
                    toast.success(message)
                    cartSlice.caseReducers.findCartTotal(state);
                }
            })
            .addCase(requestAddToCart.rejected, (state, action) => {
                toast.error(action.payload)
            })
            
            // updateUserCart
            .addCase(updateUserCart.fulfilled, (state, action) => {
                const { success, newTotalAmount, url_slug, inc } = action.payload
                if(success){
                    state.userCart = state.userCart.map(cartItem => {
                        if(cartItem.url_slug === url_slug){
                            if(inc){
                                return { ...cartItem, quantity: cartItem.quantity + 1, total_amount: newTotalAmount }
                            }
                            else{
                                return { ...cartItem, quantity: cartItem.quantity - 1, total_amount: newTotalAmount }
                            }
                        }
                        return cartItem;
                    })
                    cartSlice.caseReducers.findCartTotal(state);
                }
            })
            .addCase(updateUserCart.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // // removeCartItem
            .addCase(removeCartItem.fulfilled, (state, action) => {
                const { success, message, url_slug } = action.payload
                if (success) {
                    state.userCart = state.userCart.filter(cartItem => cartItem.url_slug != url_slug)
                    toast.success(message)
                }
                cartSlice.caseReducers.findCartTotal(state);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                toast.error(action.payload)
            })
    }
})

export const { frontendAddToCart, emptyCurrentUserCartFromFrontend, findCartTotal } = cartSlice.actions
export default cartSlice.reducer