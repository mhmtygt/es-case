import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { setTodoItem } from "../redux/slices/formSlice";
import "../styles/form.css";

export const Form = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.todoItem);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Choose Priority");

  const [isValidForm, setIsValidForm] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState("default");
  const [isValidPriority, setIsValidPriority] = useState("default");

  const priorityOptions = ["Urgent", "Important", "Normal"];

  //   useEffect(() => {
  //     validateTitle();
  //     validatePriority();
  //   }, [title, priority]);

  const handleAddClick = () => {
    //TODO: separate validation

    console.log(isValidPriority);
    console.log(isValidTitle);

    // if (isValidTitle === "valid" && isValidPriority !== "valid") {
    //   setPriority("Choose Priority");
    //   setIsValidPriority("default");
    // }

    // if (isValidPriority === "valid" && isValidTitle !== "valid") {
    //   setTitle("");
    //   setIsValidTitle("default");
    // }

    // if (isValidTitle === "valid" && isValidPriority === "valid") {
    //   dispatch(setTodoItem({ title: title, priority: priority }));
    // }
  };

  //   const validatePriority = () => {
  //     if (priority === "Choose Priority") {
  //       setIsValidPriority("inValid");
  //     } else {
  //       setIsValidPriority("valid");
  //     }
  //   };

  //   const validateTitle = () => {
  //     if (title.length > 255 || title === "") {
  //       setIsValidTitle("inValid");
  //     } else {
  //       setIsValidTitle("valid");
  //     }
  //   };

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };
  const handleTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
    if (e.target.value.length > 255 || e.target.value === "") {
      setIsValidTitle("inValid");
    } else {
      setIsValidTitle("valid");
    }
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
      />
      <Button text="Add" onClick={handleAddClick} />
    </div>
  );
};
