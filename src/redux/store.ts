'use client'

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import calcReducer from './slices/calcSlice'
import authReducer from './slices/authSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            calc: calcReducer,
            auth: authReducer,
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
