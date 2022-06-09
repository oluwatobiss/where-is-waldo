import "../styles/ItemSelectionFeedback.css";

function ItemSelectionFeedback(props) {
  // console.log(props);
  let messageToDisplay = "";

  if (props.itemFound === true) {
    messageToDisplay = `Yep! You found the ${props.clickedContextMenuItem}. 👏`;
  }

  if (props.itemFound === false) {
    messageToDisplay = `Nope. That's not the ${props.clickedContextMenuItem}.`;
  }

  return <div id="item-selection-feedback">{messageToDisplay}</div>;
}

export default ItemSelectionFeedback;
