import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItem: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTodoItem: (state, action) => {
      state.todoItem = [...state.todoItem, action.payload];
    },
  },
});

export const { setTodoItem } = formSlice.actions;
export default formSlice.reducer;
