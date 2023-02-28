import "../styles/popup.css";

export const Popup = ({ onAccept, onDiscard }) => {
  return (
    <div className="popup">
      <div className="content-container">
        <h1>Remove Todo Item?</h1>
      </div>
      <div className="button-container">
        <button onClick={onAccept}>Yes</button>
        <button onClick={onDiscard}>No</button>
      </div>
    </div>
  );
};
