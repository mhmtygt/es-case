import "../styles/list.css";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useSequenceTodos } from "../hooks/useSequenceTodos";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { ListItemHeader } from "./ListItemHeader";
import { selectTodoItems } from "../redux/slices/formSlice";

export const List = () => {
  const todoItems = useSelector(selectTodoItems);

  return (
    <div className="list">
      {/* <ListItem /> */}
      {!isEmpty(todoItems) ? (
        todoItems.map((todoItem, index) => {
          return <ListItem key={index} todoItem={todoItem} />;
        })
      ) : (
        <span>Todo list is empty</span>
      )}
    </div>
  );
};
