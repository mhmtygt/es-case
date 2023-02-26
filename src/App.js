import { List } from "./components/List";
import { ListItem } from "./components/ListItem";
import { Form } from "./feature/Form";

import "./styles/layout.css";

function App() {
  return (
    <div className="layout">
      <div className="child1">
        <Form />
      </div>
      <div className="child2">
        {/* <ListItem /> */}
        <List />
      </div>
      {/* List */}
    </div>
  );
}

export default App;
