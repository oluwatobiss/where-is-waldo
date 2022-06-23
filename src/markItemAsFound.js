function markItemAsFound(clickedContextMenuItem) {
  switch (clickedContextMenuItem) {
    case "Carrot":
      document.getElementById("carrot-found").classList.add("visible");
      document.getElementById("header-carrot").classList.add("invisible");
      document.getElementById("context-menu-carrot").classList.add("invisible");
      break;
    case "Pack of fries":
      document.getElementById("pack-of-fries-found").classList.add("visible");
      document
        .getElementById("header-pack-of-fries")
        .classList.add("invisible");
      document
        .getElementById("context-menu-pack-of-fries")
        .classList.add("invisible");
      break;
    case "Hamburger":
      document.getElementById("hamburger-found").classList.add("visible");
      document
        .getElementById("context-menu-hamburger")
        .classList.add("invisible");
      document.getElementById("header-hamburger").classList.add("invisible");
      break;
    case "American football":
      document
        .getElementById("american-football-found")
        .classList.add("visible");
      document
        .getElementById("header-american-football")
        .classList.add("invisible");
      document
        .getElementById("context-menu-american-football")
        .classList.add("invisible");
      break;
    case "Pizza":
      document.getElementById("pizza-found").classList.add("visible");
      document.getElementById("header-pizza").classList.add("invisible");
      document.getElementById("context-menu-pizza").classList.add("invisible");
      break;
    case "Pineapple":
      document.getElementById("pineapple-found").classList.add("visible");
      document.getElementById("header-pineapple").classList.add("invisible");
      document
        .getElementById("context-menu-pineapple")
        .classList.add("invisible");
      break;
    default:
      console.error("Selected context item not marked in SVG.");
  }
}

export default markItemAsFound;
