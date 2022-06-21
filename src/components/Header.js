import uniqid from "uniqid";
import itemsToFind from "../itemsToFind";
import "../styles/Header.css";

const searchItemsImages = itemsToFind.map((i) => {
  const headerItemToFindId = i.name.toLowerCase().replace(/\s/g, "-");
  return (
    <img
      id={`header-${headerItemToFindId}`}
      key={uniqid()}
      alt={i.name}
      title={i.name}
      src={require(`../assets/images/${i.fileName}`)}
    />
  );
});

function Header(props) {
  return (
    <header>
      <span id="logo-span">Find →</span>
      <span id="header-images-span">{searchItemsImages}</span>
      <span id="timer-span">
        <span id="timer-hours">{props.hours}</span>:
        <span id="timer-minutes">{props.minutes}</span>:
        <span id="timer-seconds">{props.seconds}</span>
      </span>
    </header>
  );
}

export default Header;
