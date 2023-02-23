import "../styles/input.css";

export const Input = ({ label }) => {
  return (
    <div>
      <label for="title-input">{label} : </label>
      <input className="title-input" id="title-input"></input>
    </div>
  );
};
