import uniqid from "uniqid";
import "../styles/LeaderboardModal.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
const topTenPlayersCollectionQuery = query(
  topTenPlayersCollectionRef,
  orderBy("time"),
  limit(10)
);

let tableRowElements = [];

onSnapshot(topTenPlayersCollectionQuery, (allDocuments) => {
  let ind = 0;

  allDocuments.forEach((doc) => {
    const dataSource = doc.metadata.hasPendingWrites ? "Local" : "Server";

    if (dataSource === "Server") {
      const data = doc.data();
      console.log(data);
      if (ind === 0) {
        tableRowElements.push(
          <tr key={uniqid()}>
            <td>
              <span>#1</span>
              <span>🥇🏆</span>
            </td>
            <td>{data.name}</td>
            <td>{data.time}</td>
            <td>{data.date}</td>
          </tr>
        );
      }

      if (ind === 1) {
        tableRowElements.push(
          <tr key={uniqid()}>
            <td>
              <span>#2</span>
              <span>🥈</span>
            </td>
            <td>{data.name}</td>
            <td>{data.time}</td>
            <td>{data.date}</td>
          </tr>
        );
      }

      if (ind === 2) {
        tableRowElements.push(
          <tr key={uniqid()}>
            <td>
              <span>#3</span>
              <span>🥉</span>
            </td>
            <td>{data.name}</td>
            <td>{data.time}</td>
            <td>{data.date}</td>
          </tr>
        );
      }

      if (ind >= 3) {
        tableRowElements.push(
          <tr key={uniqid()}>
            <td>{`#${ind + 1}`}</td>
            <td>{data.name}</td>
            <td>{data.time}</td>
            <td>{data.date}</td>
          </tr>
        );
      }

      ind += 1;
    }
  });
});

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
          <tbody>{tableRowElements}</tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardModal;
