import "../styles/ItemSelectionFeedback.css";

function ItemSelectionFeedback(props) {
  // console.log(props);
  let messageToDisplay = "";

  if (props.clickedMenuItemInfo.itemFound === true) {
    messageToDisplay = `Yep! You found the ${props.clickedMenuItemInfo.clickedContextMenuItem}. 👏`;
  }

  if (props.clickedMenuItemInfo.itemFound === false) {
    messageToDisplay = `Nope. That's not the ${props.clickedMenuItemInfo.clickedContextMenuItem}.`;
  }

  return <div id="item-selection-feedback">{messageToDisplay}</div>;
}

export default ItemSelectionFeedback;