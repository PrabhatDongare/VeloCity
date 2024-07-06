import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';


const baseUrl = "http://localhost:3000/"
export const fetchProductData = createAsyncThunk("fetchProductData", async ({ product_id }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/item/getProductDetail`, { product_id });
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

export const fetchAccessoryData = createAsyncThunk("fetchAccessoryData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/item/getAccessory`);
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        product: [],
        accessory: [],
        loading: false,
        accessoryItemPage: []
    },
    reducers: {
        getAccessoryItemPageCardData: (state, action) => {
            console.log(state.accessory, "checking accessory ")
            const { url_slug } = action.payload
            let accessoryItemPageMainCard = {}
            state.accessory.filter(acc => {
                if (acc.url_slug === url_slug) {
                    accessoryItemPageMainCard = acc
                }
            })

            const exclude = accessoryItemPageMainCard.id;
            const numbers = [];
            while (numbers.length < 4) {
                const rand = Math.floor(Math.random() * 9) + 1;
                if (rand !== exclude && !numbers.includes(rand)) {
                    numbers.push(rand);
                }
            }
            console.log("checking random : ", numbers, "exclude : ", exclude, "acc main card : ", accessoryItemPageMainCard)
            state.accessoryItemPage.push(accessoryItemPageMainCard)
            state.accessory.filter(accessoryCol => state.accessoryItemPage.push(numbers.includes(accessoryCol.id)));
            console.log(state.accessoryItemPage, "Checking code now")
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchUserCart
            .addCase(fetchProductData.fulfilled, (state, action) => {
                const { success, productDetail } = action.payload;
                if (success) {
                    // Filter out products from productDetail that already exist in state.product
                    const newProducts = productDetail.filter(
                        newProduct => !state.product.some(existingProduct => existingProduct.product_id === newProduct.product_id)
                    );

                    // Transform the new products and update state.product
                    state.product = [...state.product, ...newProducts.map(productDetailsCol => ({
                        ...productDetailsCol, product: productDetailsCol.product_id === 1 ? "Ace" : "Ivy"
                    }))
                    ];
                }
                // console.log(state.product[0].price)
            })

            .addCase(fetchProductData.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // requestAddToCart
            .addCase(requestAddToCart.fulfilled, (state, action) => {
                const { success, newCartItem, message } = action.payload
                return { ...state, success, newCartItem, message }
            })

            .addCase(requestAddToCart.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // fetchAccessoryData
            .addCase(fetchAccessoryData.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchAccessoryData.fulfilled, (state, action) => {
                state.loading = false;
                const { success, accessory } = action.payload
                if (success) {
                    state.accessory = accessory
                    // console.log(state.accessory, "Print fetched accessory from backend")
                }
            })

            .addCase(fetchAccessoryData.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload)
            })
    }
})

export const { getAccessoryItemPageCardData } = itemSlice.actions
export default itemSlice.reducer