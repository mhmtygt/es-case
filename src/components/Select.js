import "../styles/select.css";

export const Select = ({ label }) => {
  return (
    <div>
      <label>{label}: </label>
      <select className="priority-box">
        <option>Urgent</option>
        <option>Important</option>
        <option>Normal</option>
      </select>
    </div>
  );
};
