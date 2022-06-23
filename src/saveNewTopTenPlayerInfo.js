import uniqid from "uniqid";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populateTableWithTheTopTen() {
  const newTopTenPlayers = [];
  const leaderboardTableBody = document.getElementById(
    "leaderboard-table-body"
  );

  const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
  const topTenPlayersCollectionQuery = query(
    topTenPlayersCollectionRef,
    orderBy("time"),
    limit(10)
  );
  const currentTopTenPlayersDocs = await getDocs(topTenPlayersCollectionQuery);
  currentTopTenPlayersDocs.forEach((document) => {
    newTopTenPlayers.push(document.data());
  });

  const tableRowElements = newTopTenPlayers.map(createTableRowElements);
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
}

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
