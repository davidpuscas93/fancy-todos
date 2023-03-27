import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';

import todoReducer from './reducers/todos.reducer';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
