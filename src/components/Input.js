export const Input = ({ className, onChange, value, placeholder }) => {
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
