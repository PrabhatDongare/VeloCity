import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}api/auth/login`, { email, password });
        // console.log(response)
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


export const userSlice = createSlice({
    name: 'user',
    initialState: { todos: ""},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                toast.error(action.payload)
            })

            .addCase(fetchUserSignIn.fulfilled, (state, action) => {
                const { success, authToken } = action.payload
                if (success) {
                    localStorage.setItem('token', authToken)
                }
            })
            .addCase(fetchUserSignIn.rejected, (state, action) => {
                toast.error(action.payload)
            })
    }
})


export default userSlice.reducer