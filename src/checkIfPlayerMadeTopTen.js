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
  const topTenPlayersDocuments = await getDocs(topTenPlayersCollectionQuery);

  topTenPlayersDocuments.forEach((document) => {
    topTenPlayers.push(document.data());
  });

  lastTopTenPlayer = topTenPlayers[topTenPlayers.length - 1];
  lastLeaderboardTime = lastTopTenPlayer
    ? Number(lastTopTenPlayer.time.replace(/:/g, "0"))
    : 0;

  if (stoppedTime < lastLeaderboardTime || topTenPlayers.length < 10) {
    document.getElementById("congrats-modal").style.display = "block";
  } else {
    document.getElementById("oops-modal").style.display = "block";
  }
}

export default checkIfPlayerMadeTopTen;
