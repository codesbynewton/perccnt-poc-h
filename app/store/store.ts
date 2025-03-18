import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

export default store

export const useAppSelector = useSelector