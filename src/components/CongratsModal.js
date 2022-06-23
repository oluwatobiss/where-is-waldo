import { useState } from "react";
import saveNewTopTenPlayerInfo from "../saveNewTopTenPlayerInfo";
import "../styles/CongratsModal.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
  doc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function CongratsModal() {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("congrats-modal").style.display = "none";
    if (name) {
      const timerHours = document.getElementById("timer-hours").innerText;
      const timerMinutes = document.getElementById("timer-minutes").innerText;
      const timerSeconds = document.getElementById("timer-seconds").innerText;
      const newTopTenPlayer = {
        name: name,
        time: `${timerHours}:${timerMinutes}:${timerSeconds}`,
        date: new Date().toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      const topTenPlayers = [];
      const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
      const topTenPlayersCollectionQuery = query(
        topTenPlayersCollectionRef,
        orderBy("time"),
        limit(10)
      );

      const topTenPlayersDocs = await getDocs(topTenPlayersCollectionQuery);
      topTenPlayersDocs.forEach((document) => {
        const documentDataWithID = document.data();
        documentDataWithID.id = document.id;
        topTenPlayers.push(documentDataWithID);
      });

      const tenthTopTenPlayer = topTenPlayers[topTenPlayers.length - 1];

      if (topTenPlayers.length < 10) {
        saveNewTopTenPlayerInfo(newTopTenPlayer);
      }

      if (topTenPlayers.length === 10) {
        await deleteDoc(doc(db, "topTenPlayers", tenthTopTenPlayer.id));
        saveNewTopTenPlayerInfo(newTopTenPlayer);
      }
    } else {
      window.location.reload();
    }
  }

  return (
    <div id="congrats-modal">
      <form id="congrats-form" onSubmit={handleSubmit}>
        <span id="close-congrats-form" title="Close">
          ❌
        </span>
        <h1>Congratulations🎉</h1>
        <p className="modal-info">You made the top 10!</p>
        <input
          type="text"
          placeholder="Add your name to the leaderboard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p id="submit-note">(Press the Enter key to submit)</p>
      </form>
    </div>
  );
}

export default CongratsModal;
