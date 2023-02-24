import "../styles/button.css";

export const Button = ({ text, onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      {text}
    </button>
  );
};
