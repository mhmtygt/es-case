import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { setTodoItem } from "../redux/slices/formSlice";
import { nanoid } from "nanoid";
import "../styles/form.css";

export const Form = () => {
  let letters = /^[0-9a-zA-Z]+$/;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Choose Priority");

  const [isValidTitle, setIsValidTitle] = useState("default");
  const [isValidPriority, setIsValidPriority] = useState("default");

  const priorityOptions = ["Urgent", "Important", "Normal"];

  const handleAddClick = () => {
    validateTitle(title);
    validatePriority(priority);

    if (isValidTitle === "valid" && isValidPriority === "valid") {
      dispatch(setTodoItem({ id: nanoid(), title: title, priority: priority }));
    }
  };

  const validatePriority = (priority) => {
    if (priority === "Choose Priority") {
      setIsValidPriority("inValid");
    } else {
      setIsValidPriority("valid");
    }
  };

  const validateTitle = (title) => {
    if (title.length > 255 || title === "" || !title.match(letters)) {
      setIsValidTitle("inValid");
    } else {
      setIsValidTitle("valid");
    }
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
    validatePriority(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    validateTitle(e.target.value);
  };

  return (
    <div className="elements-area">
      <div className="title-element-area">
        <div className="title-input-area">
          <Input
            className={
              isValidTitle === "inValid"
                ? "title-input-not-valid"
                : "title-input"
            }
            placeholder="Title..."
            onChange={handleTitle}
            value={title}
          />
        </div>
        <div className="priority-select-area">
          <Select
            className={
              isValidPriority === "inValid"
                ? "priority-select-invalid"
                : "priority-select"
            }
            onChange={handlePriority}
            value={priority}
            options={priorityOptions}
            hiddenOption="Choose Priority"
          />
        </div>
      </div>
      <div className="add-button-area">
        <Button text="Add" className="add-button" onClick={handleAddClick} />
      </div>
    </div>
  );
};
