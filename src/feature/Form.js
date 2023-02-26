import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { setTodoItem } from "../redux/slices/formSlice";
import { nanoid } from "nanoid";
import "../styles/form.css";

export const Form = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Choose Priority");

  const [isValidTitle, setIsValidTitle] = useState("default");
  const [isValidPriority, setIsValidPriority] = useState("default");

  const priorityOptions = ["Urgent", "Important", "Normal"];

  const handleAddClick = () => {
    //TODO: separate validation
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
    if (title.length > 255 || title === "") {
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
    <div className="form-space">
      <Input
        className={
          isValidTitle === "inValid" ? "title-input-not-valid" : "title-input"
        }
        label="Title"
        onChange={handleTitle}
        value={title}
      />
      <Select
        className={
          isValidPriority === "inValid" ? "priority-box-error" : "priority-box"
        }
        label="Priority"
        onChange={handlePriority}
        value={priority}
        options={priorityOptions}
        hiddenOption="Choose Priority"
      />
      <Button text="Add" onClick={handleAddClick} />
    </div>
  );
};
