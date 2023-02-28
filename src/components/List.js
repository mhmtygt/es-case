import "../styles/list.css";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { selectTodoItems } from "../redux/slices/formSlice";

export const List = () => {
  const todoItems = useSelector(selectTodoItems);

  return (
    <div className="list">
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
