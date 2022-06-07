import { ReactComponent as DonutPileImage } from "../assets/images/donut-pile-search-and-find-codesweetly.svg";
import ItemSelectionFeedback from "./ItemSelectionFeedback";
import ContextMenu from "./ContextMenu";
import "../styles/Body.css";

function Body() {
  function handleContextMenu(e) {
    e.preventDefault();

    const contextMenu = document.getElementById("context-menu");
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");

    if (contextMenuIsActive) {
      contextMenu.classList.remove("visible");
    }
  }

  return (
    <main id="main" onContextMenu={handleContextMenu}>
      <ItemSelectionFeedback />
      <ContextMenu />
      <DonutPileImage />
    </main>
  );
}

export default Body;
