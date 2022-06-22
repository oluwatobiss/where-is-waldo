import { useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import "../styles/CongratsModal.css";
import {
  getFirestore,
  collection,
  addDoc,
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
    document.getElementById("congrats-modal").style.display = "none";
    e.preventDefault();
    setName("");

    if (name) {
      let topTenPlayers = [];
      let lastTopTenPlayer = null;

      const timerHours = document.getElementById("timer-hours").innerText;
      const timerMinutes = document.getElementById("timer-minutes").innerText;
      const timerSeconds = document.getElementById("timer-seconds").innerText;

      const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
      const topTenPlayersCollectionQuery = query(
        topTenPlayersCollectionRef,
        orderBy("time"),
        limit(10)
      );

      const topTenPlayersDocuments = await getDocs(
        topTenPlayersCollectionQuery
      );
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

      console.log(newTopTenPlayer);

      topTenPlayersDocuments.forEach((document) => {
        const documentDataWithID = document.data();
        documentDataWithID.id = document.id;
        topTenPlayers.push(documentDataWithID);
      });

      lastTopTenPlayer = topTenPlayers[topTenPlayers.length - 1];

      // Add the new top 10 player to the Firestore database:
      async function saveNewTopTenPlayerInfo(newTopTenPlayer) {
        try {
          await addDoc(topTenPlayersCollectionRef, newTopTenPlayer);
          document.getElementById("leaderboard-modal").style.display = "block";
        } catch (error) {
          console.error("Error writing new data to Database", error);
        }
      }

      if (topTenPlayers.length < 10) {
        saveNewTopTenPlayerInfo(newTopTenPlayer);
      }

      if (topTenPlayers.length === 10) {
        await deleteDoc(doc(db, "topTenPlayers", lastTopTenPlayer.id));
        saveNewTopTenPlayerInfo(newTopTenPlayer);
      }
    } else {
      window.location.reload();
    }
  }

  function handleChange(e) {
    setName(e.target.value);
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
          onChange={handleChange}
        />
        <p id="submit-note">(Press the Enter key to submit)</p>
      </form>
    </div>
  );
}

export default CongratsModal;
