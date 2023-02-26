import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useChangeListItem = (priority, id, todoItem) => {
  const formState = useSelector((state) => state.formState);
  const [updated, setUpdated] = useState(false);
  let todoItems = [...formState.todoItems];

  useEffect(() => {
    console.log(id);
    if (priority !== todoItem.priority) {
      const findChangedItem = (item) => item.id === id;
      const todoIndex = todoItems.findIndex(findChangedItem);
      todoItems.splice(todoIndex, 1, { ...todoItem, priority: priority });
      setUpdated(true);
    }
  }, [priority]);

  return { todoItems, updated };
};
