import "../styles/list.css";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useSequenceTodos } from "../hooks/useSequenceTodos";
import { useEffect } from "react";
import { nanoid } from "nanoid";
export const List = () => {
  //   const [sequencedTodoItems] = useSequenceTodos();
  const formState = useSelector((state) => state.formState);
  useEffect(() => {
    console.log("List...");
  });
  return (
    <div className="list">
      {!isEmpty(formState.todoItems) ? (
        formState.todoItems.map((todoItem, index) => {
          return <ListItem key={index} todoItem={todoItem} />;
        })
      ) : (
        <span>Todo list is empty</span>
      )}
    </div>
  );
};
