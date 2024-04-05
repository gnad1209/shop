import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlide/CounterSlide'
import userReducer from './slide/userSlide'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})
