import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
const initialState = {
  todoItems: [],
  sequence: "default",
  selectedTodoItem: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTodoItem: (state, action) => {
      let withNewItem = [...state.todoItems, action.payload];
      state.todoItems = [...defaultSequence(withNewItem)];
    },
    setTodoItems: (state, action) => {
      state.todoItems = [...defaultSequence(action.payload)];
    },
    setSequence: (state, action) => {
      state.sequence = action.payload;
    },
    setSelectedTodoItem: (state, action) => {
      state.selectedTodoItem = action.payload;

      const findChangedItem = (item) => item.id === action.payload.item.id;
      let cloneTodoItems = [...state.todoItems];
      const todoIndex = cloneTodoItems.findIndex(findChangedItem);

      cloneTodoItems.splice(todoIndex, 1, {
        ...action.payload.item,
        priority: action.payload.newPriority,
      });
      console.log(cloneTodoItems);
      state.todoItems = [...defaultSequence(cloneTodoItems)];
    },
  },
});

const defaultSequence = (todoItems) => {
  if (!isEmpty(todoItems)) {
    let urgentTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Urgent";
    });
    let importantTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Important";
    });
    let normalTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Normal";
    });

    return urgentTodos.concat(importantTodos).concat(normalTodos);
  } else {
    return todoItems;
  }
};

// const updateSelectedTodoItem = (todoItems, selectedItem) => {
//   const todoIndex = todoItems.findIndex(
//     (item) => item.id === selectedItem.item.id
//   );

//   return todoItems.splice(todoIndex, 1, {
//     ...selectedItem.item,
//     priority: selectedItem.newPriority,
//   });
// };

export const { setTodoItem, setTodoItems, setSequence, setSelectedTodoItem } =
  formSlice.actions;
export default formSlice.reducer;
