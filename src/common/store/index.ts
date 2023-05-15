import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import counterReducer from './reducers/counterSlice';

const logger = createLogger({
  collapsed: true,
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    logger
  ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch