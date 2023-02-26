import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

export const useSequenceTodos = () => {
  const formState = useSelector((state) => state.formState);
  const [sequencedTodoItems, setSequencedTodoItems] = useState([]);

  const defaultSequence = () => {
    let urgentTodos = formState.todoItems.filter((todoItem) => {
      return todoItem.priority === "Urgent";
    });
    let importantTodos = formState.todoItems.filter((todoItem) => {
      return todoItem.priority === "Important";
    });
    let normalTodos = formState.todoItems.filter((todoItem) => {
      return todoItem.priority === "Normal";
    });

    setSequencedTodoItems(
      urgentTodos.concat(importantTodos).concat(normalTodos)
    );
  };

  useEffect(() => {
    console.log("useSequenceTodos...");

    defaultSequence();
  }, [formState.sequence, formState.todoItems]);

  return [sequencedTodoItems];
};
