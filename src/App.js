import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Select } from "./components/Select";
import { Form } from "./feature/Form";

import "./styles/layout.css";

function App() {
  return (
    <div className="layout">
      <div className="child1">
        <div className="form-space">
          <Input label="Title" />
          <Select label="Priority" />
          <Button text="Add" />
        </div>
      </div>
      <div className="child2"></div>
      {/* <Button text={"Add"} /> */}
      {/* <Input label="Title" /> */}
      {/* <Select label="Priority" /> */}
      {/* <Form /> */}
    </div>
  );
}

export default App;
