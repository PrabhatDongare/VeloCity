import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
export const requestCheckout = createAsyncThunk("requestCheckout", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/order/checkout`, {}, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchOrder = createAsyncThunk("fetchOrder", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/order/get`, {}, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteOrder = createAsyncThunk("deleteOrder", async ({ order_id }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.delete(`${baseUrl}api/order/remove/${order_id}`, { headers });
        return response.data;

    } catch (error) {
        console.log(error, error.message)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestPayment = createAsyncThunk("requestPayment", async ({ order_id }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/order/payment`, { order_id }, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderTable: [],
        orderItem: [],
        loading: false,
        orderLoading: false,
        paymentLoading: false
    },

    reducers: {
        emptyCurrentUserOrderTableFromFrontend: (state) => {
            state.orderTable = []
        },
        emptyCurrentUserOrderItemFromFrontend: (state) => {
            state.orderItem = []
        }
    },

    extraReducers: (builder) => {
        builder
            // requestCheckout
            .addCase(requestCheckout.pending, (state) => {
                state.loading = true;
            })

            .addCase(requestCheckout.fulfilled, (state, action) => {
                state.loading = false;
                const { success, order, orderItem, message  } = action.payload
                if (success) {
                    state.orderTable = [...state.orderTable, order]
                    state.orderItem = [...state.orderItem, ...orderItem]
                    toast.warning(message)
                }
            })

            .addCase(requestCheckout.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload)
            })
            
            // fetchOrder
            .addCase(fetchOrder.pending, (state) => {
                state.orderLoading = true;
            })

            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                const { success, order  } = action.payload
                if (success) {
                    state.orderTable = order
                }
            })

            .addCase(fetchOrder.rejected, (state, action) => {
                state.orderLoading = false;
                toast.error(action.payload)
            })
            
            // deleteOrder
            .addCase(deleteOrder.fulfilled, (state, action) => {
                const { success, order_id, message  } = action.payload
                if (success) {
                    state.orderTable = state.orderTable.filter(orderTableRow => orderTableRow.id != order_id)
                    state.orderItem = state.orderItem.filter(orderItemRow => orderItemRow.order_id != order_id)
                    toast.success(message)
                }
            })
            
            .addCase(deleteOrder.rejected, (state, action) => {
                toast.error(action.payload)
            })
            
            // requestPayment
            .addCase(requestPayment.pending, (state) => {
                state.paymentLoading = true;
            })
    
            .addCase(requestPayment.fulfilled, (state) => {
                state.paymentLoading = false;
            })
    
            .addCase(requestPayment.rejected, (state, action) => {
                state.paymentLoading = false;
                toast.error(action.payload)
            })
        }
})


export const { emptyCurrentUserOrderTableFromFrontend, emptyCurrentUserOrderItemFromFrontend } = orderSlice.actions
export default orderSlice.reducer
