import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { userInfo: {} }


const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log('iii');
            const user = action.payload;
            console.log("action.payload",action.payload);
            localStorage.setItem('user', JSON.stringify(user));
            state.userInfo = user
            return state;
        }
    }
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer;