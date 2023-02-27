import { List } from "./List";
import "../styles/todoPanel.css";
import { Select } from "./Select";
import { ListItemHeader } from "./ListItemHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  setSequence,
  setSearchKey,
  setPriorityFilter,
} from "../redux/slices/formSlice";

import "../styles/todoPanel.css";
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
    <div className="panel">
      <div className="filter-area">
        {/* <ListItemHeader /> */}
        <div className="title-filter-area">
          <div className="title-input-area">
            <input
              placeholder="Search by title..."
              className="title-filter"
              onChange={handleSearchFilter}
            ></input>
          </div>
          <div className="title-urgent-filter-area">
            <Select
              className="priority-filter"
              options={filterOptionsByPriority}
              onChange={handlePriorityFilter}
              value={formState.priorityFilter}
            />
          </div>
        </div>
        <div className="second-filter-area">
          <Select
            className="priority-filter"
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
