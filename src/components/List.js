import "../styles/list.css";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useSequenceTodos } from "../hooks/useSequenceTodos";
import { useEffect } from "react";
export const List = () => {
  const [sequencedTodoItems] = useSequenceTodos();

  return (
    <div className="list">
      {!isEmpty(sequencedTodoItems) ? (
        sequencedTodoItems.map((todoItem, index) => {
          return <ListItem key={index} todoItem={todoItem} />;
        })
      ) : (
        <span>Todo list is empty</span>
      )}
    </div>
  );
};
