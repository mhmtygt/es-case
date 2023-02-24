import "../styles/input.css";

export const Input = ({ className, label, onChange, value }) => {
  return (
    <div>
      <label>{label}: </label>
      <input className={className} onChange={onChange} value={value}></input>
    </div>
  );
};
