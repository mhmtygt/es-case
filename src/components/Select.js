import "../styles/select.css";

export const Select = ({
  className,
  label,
  onChange,
  value,
  options,
  hiddenOption,
}) => {
  return (
    <div>
      {label && <label>{label}: </label>}
      <select className={className} onChange={onChange} value={value}>
        {hiddenOption && (
          <option selected disabled hidden>
            {hiddenOption}
          </option>
        )}
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
