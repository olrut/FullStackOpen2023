import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import notificationReducer from "./reducers/notificationReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer,
    }
})

export default store