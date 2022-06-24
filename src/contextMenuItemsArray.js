import uniqid from "uniqid";
import itemsToFind from "./itemsToFind";

const contextMenuItemsArray = itemsToFind.map((i) => {
  const contextMenuItemId = i.name.toLowerCase().replace(/\s/g, "-");
  return (
    <div
      id={`context-menu-${contextMenuItemId}`}
      className="context-menu-item clickable-context"
      data-menu-item-name={i.name}
      key={uniqid()}
    >
      <img alt={i.name} src={require(`./assets/images/${i.fileName}`)} />
      <span>{i.name}</span>
    </div>
  );
});

export default contextMenuItemsArray;
