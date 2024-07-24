'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    userInfo: any;
}

const initialState: AuthState = {
    userInfo: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUserInfo(state, action: PayloadAction<any>) {
            state.userInfo = action.payload;
        },
    },
})

export const {
    setUserInfo,
} = authSlice.actions

export default authSlice.reducer
