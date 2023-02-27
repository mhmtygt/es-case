import "../styles/listItem.css";
import { ReactComponent as TrashIcon } from "../assets/trash-x.svg";
import { Select } from "./Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTodoItem, removeTodoItem } from "../redux/slices/formSlice";

export const ListItem = ({ todoItem }) => {
  const priorityOptions = ["Urgent", "Important", "Normal"];
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(
      setSelectedTodoItem({ item: todoItem, newPriority: e.target.value })
    );
  };

  const handleClick = () => {
    //TODO:
    dispatch(removeTodoItem(todoItem));
  };

  return (
    <div className="item">
      <div className="data-area">
        <span className="data-label">{todoItem.title}</span>
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
