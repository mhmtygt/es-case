import "../styles/input.css";

export const Input = ({ className, label, onChange, value, placeholder }) => {
  return (
    <div>
      <input
        className={className}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      ></input>
    </div>
  );
};
