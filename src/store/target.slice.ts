import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
    target: HTMLElement | null
}

const initialState: State = {
    target: null
}

export const targetSlice = createSlice({
    name: 'targetSlice',
    initialState,
    reducers: {
        captureTarget(state, payload) {
            state.target = payload.payload
        }
    }
})

export const targetSliceAction = targetSlice.actions

export const selectTarget = (state: RootState) => state.targetElement.target