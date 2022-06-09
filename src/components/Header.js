import uniqid from "uniqid";
import itemsToFind from "../itemsToFind";
import "../styles/Header.css";

const searchItemsImages = itemsToFind.map((i) => {
  const headerItemToFindId = i.name.toLowerCase().replace(/\s/g, "-");
  console.log(`header-${headerItemToFindId}`);
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
        <span>{props.hours}</span>:<span>{props.minutes}</span>:
        <span>{props.seconds}</span>
      </span>
    </header>
  );
}

export default Header;
