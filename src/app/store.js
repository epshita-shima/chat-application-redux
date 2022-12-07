import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import conversationSliceReducer from '../features/conversations/conversationsSlice';
import messagesSliceReducer from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
    conversations:conversationSliceReducer,
    messages:messagesSliceReducer,
  },
  devTools:process.env.NODE_ENV !=='production',
  middleware: (gDm)=>gDm().concat(apiSlice.middleware)
});
