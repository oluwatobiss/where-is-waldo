import populateTableWithTheTopTen from "./populateTableWithTheTopTen";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
