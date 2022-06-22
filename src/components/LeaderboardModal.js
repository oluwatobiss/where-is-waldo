import "../styles/LeaderboardModal.css";

function LeaderboardModal() {
  return (
    <div id="leaderboard-modal">
      <div id="leaderboard-modal-content">
        <span id="close-leaderboard-modal-span" title="Close">
          ❌
        </span>
        <h1>Top 10 Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="leaderboard-table-body"></tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardModal;
