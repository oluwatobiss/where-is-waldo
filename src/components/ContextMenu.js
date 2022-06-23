import uniqid from "uniqid";
import "../styles/ContextMenu.css";
import itemsToFind from "../itemsToFind";

const contextMenuItems = itemsToFind.map((i) => {
  const contextMenuItemId = i.name.toLowerCase().replace(/\s/g, "-");

  return (
    <div
      id={`context-menu-${contextMenuItemId}`}
      className="context-menu-item clickable-context"
      data-menu-item-name={i.name}
      key={uniqid()}
    >
      <img alt={i.name} src={require(`../assets/images/${i.fileName}`)} />
      <span>{i.name}</span>
    </div>
  );
});

function ContextMenu() {
  return (
    <div id="context-menu">
      <span id="close-context-menu" className="clickable-context" title="Close">
        ❌
      </span>
      <div id="context-menu-items-div">{contextMenuItems}</div>
    </div>
  );
}

export default ContextMenu;
