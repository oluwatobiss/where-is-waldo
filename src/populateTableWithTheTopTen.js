import createTableRowElements from "./createTableRowElements";
import db from "./firebase-config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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
  document.getElementById("loader-bg").style.display = "none";
  topTenPlayersDocs.forEach((document) => {
    topTenPlayers.push(document.data());
  });

  const tableRowElements = topTenPlayers.map(createTableRowElements);
  tableRowElements.forEach((i) => leaderboardTableBody.append(i));
}

export default populateTableWithTheTopTen;
