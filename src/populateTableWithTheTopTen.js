import createTableRowElements from "./createTableRowElements";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
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

async function populateTableWithTheTopTen() {
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
  const topTenPlayersDocs = await getDocs(topTenPlayersCollectionQuery);
  topTenPlayersDocs.forEach((document) => {
    topTenPlayers.push(document.data());
  });

  const tableRowElements = topTenPlayers.map(createTableRowElements);
  tableRowElements.forEach((i) => leaderboardTableBody.append(i));
}

export default populateTableWithTheTopTen;
