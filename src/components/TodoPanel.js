import { List } from "./List";
import { Select } from "./Select";
import { useSelector, useDispatch } from "react-redux";
import {
  setSequence,
  setSearchKey,
  setPriorityFilter,
} from "../redux/slices/formSlice";

import "../styles/todoPanel.css";
import { Input } from "./Input";

export const TodoPanel = () => {
  const formState = useSelector((state) => state.formState);
  const dispatch = useDispatch();
  const filterOptionsByOrder = ["Normal to Urgent", "Urgent to Normal"];
  const filterOptionsByPriority = ["All", "Urgent", "Important", "Normal"];

  const handlePriorityFilter = (e) => {
    dispatch(setPriorityFilter(e.target.value));
  };

  const handleOrderChange = (e) => {
    dispatch(setSequence(e.target.value));
  };

  const handleSearchFilter = (e) => {
    dispatch(setSearchKey(e.target.value));
  };

  return (
    <div className="todo-list-panel">
      <div className="list-filter-area">
        <div className="list-title-filter-area">
          <div className="list-title-input-area">
            <Input
              placeholder="Search by title..."
              className="list-title-filter"
              onChange={handleSearchFilter}
            />
          </div>
          <div className="list-title-urgent-filter-area">
            <Select
              className="list-priority-filter"
              options={filterOptionsByPriority}
              onChange={handlePriorityFilter}
              value={formState.priorityFilter}
            />
          </div>
        </div>
        <div className="list-second-filter-area">
          <Select
            className="list-priority-filter"
            options={filterOptionsByOrder}
            value={formState.sequence}
            onChange={handleOrderChange}
          />
        </div>
      </div>
      <div className="list-area">
        <List />
      </div>
    </div>
  );
};
