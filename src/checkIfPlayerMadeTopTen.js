import db from "./firebase-config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

async function checkIfPlayerMadeTopTen(stoppedTime) {
  let topTenPlayers = [];
  let lastTopTenPlayer = null;
  let lastLeaderboardTime = null;
  const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
  const topTenPlayersCollectionQuery = query(
    topTenPlayersCollectionRef,
    orderBy("time"),
    limit(10)
  );

  document.getElementById("loader-bg").style.display = "block";
  const topTenPlayersDocuments = await getDocs(topTenPlayersCollectionQuery);
  document.getElementById("loader-bg").style.display = "none";

  topTenPlayersDocuments.forEach((document) => {
    topTenPlayers.push(document.data());
  });

  lastTopTenPlayer = topTenPlayers[topTenPlayers.length - 1];
  lastLeaderboardTime = lastTopTenPlayer
    ? Number(lastTopTenPlayer.time.replace(/:/g, "0"))
    : 0;

  stoppedTime < lastLeaderboardTime || topTenPlayers.length < 10
    ? (document.getElementById("congrats-modal").style.display = "block")
    : (document.getElementById("oops-modal").style.display = "block");
}

export default checkIfPlayerMadeTopTen;
