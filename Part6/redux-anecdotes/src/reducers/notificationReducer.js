import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const {setNotification} = notificationSlice.actions

export const newNotification = (text, timeout) => {
    return async dispatch => {
        dispatch(setNotification(text))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer