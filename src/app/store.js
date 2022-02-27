import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import chatReducer from '../features/chatSlice';
import signReducer from '../features/signSlice';
import idReducer from '../features/idSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    sign: signReducer,
    id: idReducer,
  },
});
