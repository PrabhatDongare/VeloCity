import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/login`, { email, password });
        return response.data;
        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchUserSignIn = createAsyncThunk("fetchUserSignIn", async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/signup`, { first_name, last_name, email, password });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestPasswordForgot = createAsyncThunk("requestPasswordForgot", async ({ email }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/forgot-password`, { email });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestPasswordReset = createAsyncThunk("requestPasswordReset", async ({ password, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/reset-password`, { password, token });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchAddress = createAsyncThunk("fetchAddress", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/auth/getAddress`, {}, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestToAddAddress = createAsyncThunk("requestToAddAddress", async ({ house_no, street_name, zipcode, city, country, phone }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.post(`${baseUrl}api/auth/addAddress`, { house_no, street_name, zipcode, city, country, phone }, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});

export const requestToEditAddress = createAsyncThunk("requestToEditAddress", async ({ house_no, street_name, zipcode, city, country, phone }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
        };
        const response = await axios.put(`${baseUrl}api/auth/updateAddress`, { house_no, street_name, zipcode, city, country, phone }, { headers });
        return response.data;

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message);
    }
});


export const userSlice = createSlice({
    name: 'user',
    initialState: { 
        address: [],
        loading: false,
    },

    reducers: {
        removeCurrentUserAddressFromFrontend: (state) => {
            state.address = []
        }
    },

    extraReducers: (builder) => {
        builder
            // fetchUserLogin
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // fetchUserSignIn
            .addCase(fetchUserSignIn.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserSignIn.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // requestPasswordForgot
            .addCase(requestPasswordForgot.fulfilled, (state, action) => {
                const { success, message } = action.payload
                if (success) {
                    toast.success(message)
                }
            })
            .addCase(requestPasswordForgot.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // requestPasswordReset
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                const { success, message } = action.payload
                if (success) {
                    toast.success(message)
                }
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // fetchAddress
            .addCase(fetchAddress.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading = false;
                const { success, address } = action.payload
                if (success) {
                    state.address = address
                }
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload)
            })

            // requestToAddAddress
            .addCase(requestToAddAddress.pending, (state) => {
                state.loading = true;
            })

            .addCase(requestToAddAddress.fulfilled, (state, action) => {
                state.loading = false;
                const { success, address } = action.payload
                if (success) {
                    state.address = address
                }
            })
            .addCase(requestToAddAddress.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload)
            })

            // requestToEditAddress
            .addCase(requestToEditAddress.pending, (state) => {
                state.loading = true;
            })

            .addCase(requestToEditAddress.fulfilled, (state, action) => {
                state.loading = false;
                const { success, updatedAddress } = action.payload
                if (success) {
                    state.address = updatedAddress
                }
            })
            .addCase(requestToEditAddress.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload)
            })
    }
})


export const { removeCurrentUserAddressFromFrontend } = userSlice.actions
export default userSlice.reducer
