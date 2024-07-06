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

// export const fetchUserCart = createAsyncThunk("fetchUserCart", async ({ rejectWithValue }) => {
//     console.log("reached ?")
//     try {
//         console.log("trying to fetch cart")

//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error.response.data.message);
//     }
// });

// export const addToUserCart = createAsyncThunk("addToUserCart", async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${baseUrl}api/cart/add/---`);
//         return response.data;

//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error.response.data.message);
//     }
// });

// export const updateUserCart = createAsyncThunk("updateUserCart", async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${baseUrl}api/cart/update`);
//         return response.data;

//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error.response.data.message);
//     }
// });

// export const removeFromUserCart = createAsyncThunk("removeFromUserCart", async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${baseUrl}api/cart/remove`);
//         return response.data;

//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error.response.data.message);
//     }
// });

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { userCart: [] },

    reducers: {
        frontendAddToCart: (state, action) => {
            const { id, item_type, url_slug, quantity, price, total_amount } = action.payload
            state.userCart.push({ id, item_type, url_slug, quantity, price, total_amount })
            // console.log(state.userCart)
        },
    },

    extraReducers: (builder) => {
        builder
            // fetchUserCart
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                const { success, cart } = action.payload
                if (success) {
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
                // console.log(state.userCart, "Printing userCart")
            })
            
            .addCase(fetchUserCart.rejected, (state, action) => {
                toast.error(action.payload)
            })

        // // addToUserCart
        // .addCase(addToUserCart.fulfilled, (state, action) => {
        //     const { success } = action.payload

        // })
        // .addCase(addToUserCart.rejected, (state, action) => {
        //     toast.error(action.payload)
        // })

        // // updateUserCart
        // .addCase(updateUserCart.fulfilled, (state, action) => {
        //     const { success } = action.payload

        // })
        // .addCase(updateUserCart.rejected, (state, action) => {
        //     toast.error(action.payload)
        // })

        // // removeFromUserCart
        // .addCase(removeFromUserCart.fulfilled, (state, action) => {
        //     const { success } = action.payload

        // })
        // .addCase(removeFromUserCart.rejected, (state, action) => {
        //     toast.error(action.payload)
        // })
    }
})

export const { frontendAddToCart } = cartSlice.actions
export default cartSlice.reducer