import "../styles/listItem.css";
import { ReactComponent as TrashIcon } from "../assets/trash-x.svg";
import { Select } from "./Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTodoItem, setTodoItems } from "../redux/slices/formSlice";
import { useChangeListItem } from "../hooks/useChangeListItem";

export const ListItem = ({ todoItem }) => {
  const priorityOptions = ["Urgent", "Important", "Normal"];
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.formState);

  const [priority, setPriority] = useState(todoItem.priority);
  //   const { todoItems, updated } = useChangeListItem(
  //     priority,
  //     todoItem.id,
  //     todoItem
  //   );
  useEffect(() => {
    console.log("render item...");
  });
  //   useEffect(() => {
  //     console.log(todoItem.id);
  //     if (updated) {
  //       dispatch(setTodoItems(todoItems));
  //     }
  //   }, [priority]);

  const handleOnChange = (e) => {
    // setPriority(e.target.value);
    dispatch(
      setSelectedTodoItem({ item: todoItem, newPriority: e.target.value })
    );
  };
  const handleClick = () => {
    //TODO:
  };

  return (
    <div className="item">
      <div className="data-area">
        <span className="data-label">{todoItem.id}</span>
      </div>
      <div className="select-area">
        <Select
          className="priority-options"
          options={priorityOptions}
          value={todoItem.priority}
          onChange={handleOnChange}
        />
      </div>
      <div className="delete-button-area">
        <button className="trash-button" onClick={handleClick}>
          <TrashIcon width="1rem" />
        </button>
      </div>
    </div>
  );
};
