import uniqid from "uniqid";

function createTableRowElement(rank, data, medal) {
  let medalSpan = "";
  if (medal) {
    medalSpan = document.createElement("span");
    medalSpan.append(medal);
  }

  const positionSpan = document.createElement("span");
  positionSpan.append(rank);

  const rankTD = document.createElement("td");
  rankTD.append(positionSpan, medalSpan);

  const nameTD = document.createElement("td");
  nameTD.classList.add("name-td");
  nameTD.append(data.name);

  const timeTD = document.createElement("td");
  timeTD.append(data.time);

  const dateTD = document.createElement("td");
  dateTD.append(data.date);

  const tr = document.createElement("tr");
  tr.setAttribute("key", uniqid());
  tr.append(rankTD, nameTD, timeTD, dateTD);
  return tr;
}

export default createTableRowElement;
