import { TodoPanel } from "./components/TodoPanel";
import { Form } from "./feature/Form";

import "./styles/layout.css";

function App() {
  return (
    <div className="root-area">
      <div className="center-grid">
        <div className="form-grid">
          <div className="form-area">
            <Form />
          </div>
        </div>
        <div className="todo-area">
          <TodoPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
