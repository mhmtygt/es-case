import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";

const initialState = {
  todoItems: [],
  todoItemsByTitle: [],
  sequence: "Urgent to Normal",
  selectedTodoItem: null,
  searchKey: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTodoItem: (state, action) => {
      let withNewItem = [...state.todoItems, action.payload];
      state.todoItems = [...defaultSequence(withNewItem, state.sequence)];
    },
    setTodoItems: (state, action) => {
      state.todoItems = [...defaultSequence(action.payload, state.sequence)];
    },
    setSequence: (state, action) => {
      state.sequence = action.payload;
      let orderedItemsWithByTitle = [];
      let orderedItems = [];
      if (!isEmpty(state.todoItemsByTitle)) {
        orderedItemsWithByTitle = [
          ...defaultSequence(state.todoItemsByTitle, state.sequence),
        ];
        orderedItems = [...defaultSequence(state.todoItems, state.sequence)];
        state.todoItemsByTitle = [...orderedItemsWithByTitle];
        state.todoItems = [...orderedItems];
      } else {
        orderedItems = [...defaultSequence(state.todoItems, state.sequence)];
        state.todoItems = [...orderedItems];
      }
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload.trim();
      let cloneTodoItems = [...state.todoItems];
      const filterbyTitle = cloneTodoItems.filter((todoItem) => {
        return todoItem.title
          .trim()
          .toLowerCase()
          .includes(state.searchKey.trim().toLowerCase());
      });

      state.todoItemsByTitle = [...filterbyTitle];
    },
    setSelectedTodoItem: (state, action) => {
      state.selectedTodoItem = action.payload;
      const findChangedItem = (item) => item.id === action.payload.item.id;
      let cloneTodoItems = [];
      let todoIndex;

      if (!isEmpty(state.todoItemsByTitle)) {
        cloneTodoItems = [...state.todoItemsByTitle];
        todoIndex = cloneTodoItems.findIndex(findChangedItem);
        cloneTodoItems.splice(todoIndex, 1, {
          ...action.payload.item,
          priority: action.payload.newPriority,
        });
        state.todoItemsByTitle = [
          ...defaultSequence(cloneTodoItems, state.sequence),
        ];
      }

      cloneTodoItems = [...state.todoItems];
      todoIndex = cloneTodoItems.findIndex(findChangedItem);

      cloneTodoItems.splice(todoIndex, 1, {
        ...action.payload.item,
        priority: action.payload.newPriority,
      });
      console.log(cloneTodoItems);

      //TODO
      state.todoItems = [...defaultSequence(cloneTodoItems, state.sequence)];
    },
  },
});

const defaultSequence = (todoItems, sequence) => {
  if (!isEmpty(todoItems)) {
    const urgentTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Urgent";
    });
    const importantTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Important";
    });
    const normalTodos = todoItems.filter((todoItem) => {
      return todoItem.priority === "Normal";
    });

    if (sequence === "Urgent to Normal") {
      return urgentTodos.concat(importantTodos).concat(normalTodos);
    } else {
      return normalTodos.concat(importantTodos).concat(urgentTodos);
    }
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

export const selectTodoItems = (state) => {
  return state.formState.searchKey !== ""
    ? state.formState.todoItemsByTitle
    : state.formState.todoItems;
};

export const {
  setTodoItem,
  setTodoItems,
  setSequence,
  setSelectedTodoItem,
  setSearchKey,
} = formSlice.actions;

export default formSlice.reducer;
