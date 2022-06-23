import createTableRowElements from "../createTableRowElements";
import "../styles/OopsModal.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function OopsModal() {
  async function handleClick() {
    const leaderboardTableBody = document.getElementById(
      "leaderboard-table-body"
    );
    const topTenPlayers = [];
    const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
    const topTenPlayersCollectionQuery = query(
      topTenPlayersCollectionRef,
      orderBy("time"),
      limit(10)
    );

    const topTenPlayersDocuments = await getDocs(topTenPlayersCollectionQuery);
    topTenPlayersDocuments.forEach((document) => {
      topTenPlayers.push(document.data());
    });

    const tableRowElements = topTenPlayers.map(createTableRowElements);
    tableRowElements.forEach((i) => leaderboardTableBody.append(i));

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
