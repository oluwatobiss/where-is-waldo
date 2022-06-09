import "../styles/Header.css";
import uniqid from "uniqid";
import itemsToFind from "../itemsToFind";

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

function Header() {
  return (
    <header>
      <span id="logo-span">Find →</span>
      <span id="header-images-span">{searchItemsImages}</span>
      <span id="timer-span">00:02:41</span>
    </header>
  );
}

export default Header;
