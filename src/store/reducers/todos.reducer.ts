import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
} from '@/services/todos.service';

import { ToDo } from '@/interfaces/todo.interface';

export interface ToDoState {
  todos: ToDo[];
}

const initialState: ToDoState = {
  todos: [],
};

export const getTodoList = createAsyncThunk(
  'todos/fetchTodos',
  async (userId: string) => {
    return await getTodos(userId);
  }
);

export const updateTodoItem = createAsyncThunk(
  'todos/updateTodo',
  async (data: { todo: ToDo; docId: string; userId: string }) => {
    return await updateTodo(data.todo, data.docId, data.userId);
  }
);

export const createTodoItem = createAsyncThunk(
  'todos/createTodo',
  async (data: { todo: ToDo; userId: string }) => {
    return await createTodo(data.todo, data.userId);
  }
);

export const deleteTodoItem = createAsyncThunk(
  'todos/deleteTodo',
  async (data: { docId: string; userId: string }) => {
    return await deleteTodo(data.docId, data.userId);
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(updateTodoItem.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.docId === action.meta.arg.docId) {
          return action.meta.arg.todo;
        }
        return todo;
      });
    });
    builder.addCase(createTodoItem.fulfilled, (state, action) => {
      state.todos.push(action.meta.arg.todo);
    });
    builder.addCase(deleteTodoItem.fulfilled, (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.docId !== action.meta.arg.docId
      );
    });
  },
});

export default todoSlice.reducer;
