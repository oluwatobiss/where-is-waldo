import "../styles/OopsModal.css";

function OopsModal() {
  return (
    <div id="oops-modal">
      <div id="oops-modal-content">
        <span id="close-oops-modal-span">❌</span>
        <h1>Oops!</h1>
        <p id="modal-info">You didn't make the top 10</p>
        <p id="see-board">See the leaderboard</p>
      </div>
    </div>
  );
}

export default OopsModal;
