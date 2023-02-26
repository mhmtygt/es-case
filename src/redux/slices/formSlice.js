import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItems: [],
  sequence: "default",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTodoItem: (state, action) => {
      state.todoItems = [...state.todoItems, action.payload];
    },
    setTodoItems: (state, action) => {
      state.todoItems = [...action.payload];
    },
    setSequence: (state, action) => {
      state.sequence = action.payload;
    },
  },
});

export const { setTodoItem, setTodoItems, setSequence } = formSlice.actions;
export default formSlice.reducer;
