import populateTableWithTheTopTen from "./populateTableWithTheTopTen";
import db from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

async function saveNewTopTenPlayerInfo(newTopTenPlayer) {
  const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
  try {
    await addDoc(topTenPlayersCollectionRef, newTopTenPlayer);
  } catch (error) {
    console.error("Error writing new data to Database", error);
  }
  populateTableWithTheTopTen();
  document.getElementById("leaderboard-modal").style.display = "block";
}

export default saveNewTopTenPlayerInfo;
