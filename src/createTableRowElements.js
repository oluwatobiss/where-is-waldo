import createTableRowElement from "./createTableRowElement";

function createTableRowElements(data, ind) {
  if (ind === 0) {
    return createTableRowElement("#1", data, "🥇🏆");
  }

  if (ind === 1) {
    return createTableRowElement("#2", data, "🥈");
  }

  if (ind === 2) {
    return createTableRowElement("#3", data, "🥉");
  }

  if (ind >= 3) {
    return createTableRowElement(`#${ind + 1}`, data);
  }
}

export default createTableRowElements;
