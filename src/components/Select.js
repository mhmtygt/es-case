import "../styles/select.css";

export const Select = ({ className, label, onChange, value, options }) => {
  return (
    <div>
      <label>{label}: </label>
      <select className={className} onChange={onChange} value={value}>
        <option selected disabled hidden>
          Choose Priority
        </option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
