import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";

const initialState = {
  todoItems: [],
  todoItemsByTitle: [],
  todoItemsByPriorityFilter: [],
  sequence: "Urgent to Normal",
  priorityFilter: "All",
  selectedTodoItem: null,
  todoItemToBeDeleted: null,
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
    removeTodoItem: (state, action) => {
      state.todoItemToBeDeleted = action.payload;

      state.todoItems = [
        ...removeTodoItemInArray([...state.todoItems], action.payload),
      ];

      if (state.searchKey !== "") {
        state.todoItemsByTitle = [
          ...removeTodoItemInArray([...state.todoItemsByTitle], action),
        ];
      }

      if (state.priorityFilter !== "All") {
        state.todoItemsByPriorityFilter = [
          ...removeTodoItemInArray(
            [...state.todoItemsByPriorityFilter],
            action
          ),
        ];
      }
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
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;

      state.todoItemsByPriorityFilter = [
        ...filterTodoItemsForPriority(
          [...state.todoItems],
          state.priorityFilter
        ),
      ];
      if (state.searchKey !== "") {
        state.todoItemsByPriorityFilter = [
          ...filterTodoItemsForPriority(
            [...state.todoItemsByTitle],
            state.priorityFilter
          ),
        ];
      }

      console.log([...state.todoItemsByPriorityFilter]);
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

      state.todoItemsByTitle = [
        ...filterTodoItemsForPriority([...filterbyTitle], state.priorityFilter),
      ];

      if (state.searchKey === "") {
        state.todoItemsByPriorityFilter = [
          ...filterTodoItemsForPriority(
            [...state.todoItems],
            state.priorityFilter
          ),
        ];
      } else {
        let cloneTodoItems = [...state.todoItems];
        const filterbyTitle = cloneTodoItems.filter((todoItem) => {
          return todoItem.title
            .trim()
            .toLowerCase()
            .includes(state.searchKey.trim().toLowerCase());
        });

        state.todoItemsByPriorityFilter = [
          ...filterTodoItemsForPriority(
            [...filterbyTitle],
            state.priorityFilter
          ),
        ];
      }
    },
    setSelectedTodoItem: (state, action) => {
      state.selectedTodoItem = action.payload;

      if (!isEmpty(state.todoItemsByTitle)) {
        let todoItemsByTitleWithUpdatedPriority = updateItemPriority(
          [...state.todoItemsByTitle],
          state.selectedTodoItem
        );

        state.todoItemsByTitle = [
          ...defaultSequence(
            todoItemsByTitleWithUpdatedPriority,
            state.sequence
          ),
        ];
      }

      let todoItemsWithUpdatedPriority = updateItemPriority(
        [...state.todoItems],
        state.selectedTodoItem
      );

      state.todoItems = [
        ...defaultSequence(todoItemsWithUpdatedPriority, state.sequence),
      ];
      if (state.priorityFilter !== "All") {
        let todoItemsByPriorityWithUpdatedPriority = updateItemPriority(
          [...state.todoItemsByPriorityFilter],
          state.selectedTodoItem
        );

        state.todoItemsByPriorityFilter = [
          ...filterTodoItemsForPriority(
            [
              ...defaultSequence(
                todoItemsByPriorityWithUpdatedPriority,
                state.sequence
              ),
            ],
            state.priorityFilter
          ),
        ];
      }
    },
  },
});

const removeTodoItemInArray = (array, todoItem) => {
  const findChangedItem = (item) => item.id === todoItem.id;
  let todoIndex = array.findIndex(findChangedItem);
  array.splice(todoIndex, 1);

  return array;
};

const updateItemPriority = (todoItems, selectedTodoItem) => {
  const findChangedItem = (item) => item.id === selectedTodoItem.item.id;
  let cloneTodoItems = [...todoItems];
  let todoIndex = cloneTodoItems.findIndex(findChangedItem);

  cloneTodoItems.splice(todoIndex, 1, {
    ...selectedTodoItem.item,
    priority: selectedTodoItem.newPriority,
  });

  return cloneTodoItems;
};

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

const filterTodoItemsForPriority = (todoItems, selectedPriority) => {
  if (selectedPriority === "All") return todoItems;
  return todoItems.filter((todoItem) => {
    return todoItem.priority === selectedPriority;
  });
};

export const selectTodoItems = (state) => {
  if (state.formState.priorityFilter === "All") {
    return state.formState.searchKey !== ""
      ? state.formState.todoItemsByTitle
      : state.formState.todoItems;
  } else {
    return state.formState.todoItemsByPriorityFilter;
  }
};

export const {
  setTodoItem,
  setSequence,
  setSelectedTodoItem,
  setSearchKey,
  setPriorityFilter,
  removeTodoItem,
} = formSlice.actions;

export default formSlice.reducer;
