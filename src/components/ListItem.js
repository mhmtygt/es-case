import "../styles/listItem.css";
import { ReactComponent as TrashIcon } from "../assets/trash-x.svg";
import { Select } from "./Select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSelectedTodoItem, removeTodoItem } from "../redux/slices/formSlice";
import { Popup } from "./Popup";

export const ListItem = ({ todoItem }) => {
  const priorityOptions = ["Urgent", "Important", "Normal"];
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);

  const handleOnChange = (e) => {
    dispatch(
      setSelectedTodoItem({ item: todoItem, newPriority: e.target.value })
    );
  };

  const handleClick = () => {
    setPopup(true);
  };

  const handleRemoveProcess = () => {
    dispatch(removeTodoItem(todoItem));
    setPopup(false);
  };

  const handleDiscardProcess = () => {
    setPopup(false);
  };

  const selectColorByPriority = () => {
    if (todoItem.priority === "Urgent") {
      return "red";
    }
    if (todoItem.priority === "Important") {
      return "orange";
    }
  };

  return (
    <div className={`item ${selectColorByPriority()}`}>
      <div className="data-area">
        <span className="data-label">{todoItem.title}</span>
      </div>
      <div className="select-area">
        <Select
          className={`priority-options ${selectColorByPriority()}`}
          options={priorityOptions}
          value={todoItem.priority}
          onChange={handleOnChange}
        />
      </div>
      <div className={`delete-button-area ${selectColorByPriority()}`}>
        <button
          className={`trash-button ${selectColorByPriority()}`}
          onClick={handleClick}
        >
          <TrashIcon className="trash" />
        </button>
      </div>
      {popup && (
        <Popup
          onAccept={handleRemoveProcess}
          onDiscard={handleDiscardProcess}
        />
      )}
    </div>
  );
};
