import "../styles/listItemHeader.css";
import { ReactComponent as TrashIcon } from "../assets/trash-x.svg";
import { Select } from "./Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTodoItem } from "../redux/slices/formSlice";

export const ListItemHeader = () => {
  const priorityOptions = ["Urgent", "Important", "Normal"];

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};
