import uniqid from "uniqid";
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

    function createTableRowElements(doc, ind) {
      if (ind === 0) {
        const tr = document.createElement("tr");
        tr.setAttribute("key", uniqid());

        const rankTD = document.createElement("td");
        const positionSpan = document.createElement("span");
        const medalSpan = document.createElement("span");

        positionSpan.append("#1");
        medalSpan.append("🥇🏆");
        rankTD.append(positionSpan, medalSpan);

        const nameTD = document.createElement("td");
        nameTD.classList.add("name-td");
        nameTD.append(doc.name);

        const timeTD = document.createElement("td");
        timeTD.append(doc.time);

        const dateTD = document.createElement("td");
        dateTD.append(doc.date);

        tr.append(rankTD, nameTD, timeTD, dateTD);
        return tr;
      }

      if (ind === 1) {
        const tr = document.createElement("tr");
        tr.setAttribute("key", uniqid());

        const rankTD = document.createElement("td");
        const positionSpan = document.createElement("span");
        const medalSpan = document.createElement("span");

        positionSpan.append("#2");
        medalSpan.append("🥈");
        rankTD.append(positionSpan, medalSpan);

        const nameTD = document.createElement("td");
        nameTD.classList.add("name-td");
        nameTD.append(doc.name);

        const timeTD = document.createElement("td");
        timeTD.append(doc.time);

        const dateTD = document.createElement("td");
        dateTD.append(doc.date);

        tr.append(rankTD, nameTD, timeTD, dateTD);
        return tr;
      }

      if (ind === 2) {
        const tr = document.createElement("tr");
        tr.setAttribute("key", uniqid());

        const rankTD = document.createElement("td");
        const positionSpan = document.createElement("span");
        const medalSpan = document.createElement("span");

        positionSpan.append("#3");
        medalSpan.append("🥉");
        rankTD.append(positionSpan, medalSpan);

        const nameTD = document.createElement("td");
        nameTD.classList.add("name-td");
        nameTD.append(doc.name);

        const timeTD = document.createElement("td");
        timeTD.append(doc.time);

        const dateTD = document.createElement("td");
        dateTD.append(doc.date);

        tr.append(rankTD, nameTD, timeTD, dateTD);
        return tr;
      }

      if (ind >= 3) {
        const tr = document.createElement("tr");
        tr.setAttribute("key", uniqid());

        const rankTD = document.createElement("td");
        rankTD.append(`#${ind + 1}`);

        const nameTD = document.createElement("td");
        nameTD.classList.add("name-td");
        nameTD.append(doc.name);

        const timeTD = document.createElement("td");
        timeTD.append(doc.time);

        const dateTD = document.createElement("td");
        dateTD.append(doc.date);

        tr.append(rankTD, nameTD, timeTD, dateTD);
        return tr;
      }
    }

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
