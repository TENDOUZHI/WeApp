import { useAutoSave } from "@/hooks/useAutoSave";
import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
export interface User {
    username: string,
    avatar: Blob | null,
    email: string,
    telephone: string,
    token: string,
    isLogin: boolean
}

const initialState: User = {
    username: "",
    avatar: null,
    email: "",
    telephone: "",
    token: "",
    isLogin: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        synUserData(state,payload) {
            const data = payload.payload
            state.username = data.username
            state.avatar = data.avatar
            state.email = data.email
            state.telephone = data.telephone
            state.token = data.token
            state.isLogin = data.isLogin
        }
    }
})

export const userSliceAction = userSlice.actions

export const selectUser = (state: RootState) => state.userElement