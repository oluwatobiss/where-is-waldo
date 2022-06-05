import { ReactComponent as DonutPileImage } from "../assets/images/donut-pile-search-and-find-codesweetly.svg";
import ContextMenu from "./ContextMenu";
import "../styles/Body.css";

function Body() {
  const contextMenu = document.getElementById("context-menu");

  function handleMouseDown(e) {
    if (e.button === 0) {
      const { clientX: mouseXPosition, clientY: mouseYPosition } = e;

      contextMenu.style.left = `${mouseXPosition}px`;
      contextMenu.style.top = `${mouseYPosition}px`;

      contextMenu.classList.add("visible");
    }
  }

  return (
    <main onMouseDown={handleMouseDown}>
      <ContextMenu />
      <DonutPileImage />
    </main>
  );
}

export default Body;
