import { configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "./device.slice";
import { sourceSlice } from "./source.slice";
import { targetSlice } from "./target.slice";

export const rootReducer = {
        sourceElement: sourceSlice.reducer,
        targetElement: targetSlice.reducer,
        deviceElement: deviceSlice.reducer
}

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck: false
        }),
})

export type AppDistpatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>