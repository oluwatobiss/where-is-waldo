import uniqid from "uniqid";

function createTableRowElements(data, ind) {
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
    nameTD.append(data.name);

    const timeTD = document.createElement("td");
    timeTD.append(data.time);

    const dateTD = document.createElement("td");
    dateTD.append(data.date);

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
    nameTD.append(data.name);

    const timeTD = document.createElement("td");
    timeTD.append(data.time);

    const dateTD = document.createElement("td");
    dateTD.append(data.date);

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
    nameTD.append(data.name);

    const timeTD = document.createElement("td");
    timeTD.append(data.time);

    const dateTD = document.createElement("td");
    dateTD.append(data.date);

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
    nameTD.append(data.name);

    const timeTD = document.createElement("td");
    timeTD.append(data.time);

    const dateTD = document.createElement("td");
    dateTD.append(data.date);

    tr.append(rankTD, nameTD, timeTD, dateTD);
    return tr;
  }
}

export default createTableRowElements;
