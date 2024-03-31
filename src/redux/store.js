import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlide/CounterSlide'

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})
