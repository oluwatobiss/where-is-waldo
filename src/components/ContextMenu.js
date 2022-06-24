import contextMenuItemsArray from "../contextMenuItemsArray";
import "../styles/ContextMenu.css";

function ContextMenu() {
  return (
    <div id="context-menu">
      <span id="close-context-menu" className="clickable-context" title="Close">
        ❌
      </span>
      <div id="context-menu-items-div">{contextMenuItemsArray}</div>
    </div>
  );
}

export default ContextMenu;
