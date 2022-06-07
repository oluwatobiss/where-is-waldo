import { useState } from "react";
import "../styles/CongratsModal.css";

function OopsModal() {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    alert(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div id="congrats-modal">
      <form id="congrats-form" onSubmit={handleSubmit}>
        <span id="close-congrats-form" title="Close">
          ❌
        </span>
        <h1>Congratulations🎉</h1>
        <p className="modal-info">You made the top 10!</p>
        <input
          type="text"
          placeholder="Add your name to the leaderboard"
          value={name}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default OopsModal;
