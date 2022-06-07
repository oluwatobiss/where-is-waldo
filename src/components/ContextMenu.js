import uniqid from "uniqid";
import "../styles/ContextMenu.css";
import itemsToFind from "../itemsToFind";

const contextMenuItems = itemsToFind.map((i) => {
  return (
    <div className="context-menu-item" key={uniqid()}>
      <img alt={i.name} src={require(`../assets/images/${i.fileName}`)} />
      <span>{i.name}</span>
    </div>
  );
});

function ContextMenu() {
  return (
    <div id="context-menu">
      <div id="close-context-menu-div">
        <span id="close-context-menu-span" title="Close">
          ❌
        </span>
      </div>
      {contextMenuItems}
    </div>
  );
}

export default ContextMenu;
