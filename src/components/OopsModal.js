import populateTableWithTheTopTen from "../populateTableWithTheTopTen";
import "../styles/OopsModal.css";

function OopsModal() {
  async function handleClick() {
    populateTableWithTheTopTen();
    document.getElementById("oops-modal").style.display = "none";
    document.getElementById("leaderboard-modal").style.display = "block";
  }

  return (
    <div id="oops-modal">
      <div id="oops-modal-content">
        <span id="close-oops-modal" title="Close">
          ❌
        </span>
        <h1>Oops!</h1>
        <p className="modal-info">You didn't make the top 10</p>
        <button id="see-board" onClick={handleClick}>
          See the leaderboard
        </button>
      </div>
    </div>
  );
}

export default OopsModal;
