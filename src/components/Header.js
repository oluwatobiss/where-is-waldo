import "../styles/Header.css";
import uniqid from "uniqid";

const itemsToFind = [
  { name: "American football", fileName: "american-football-311817_640.png" },
  { name: "Carrot", fileName: "carrot-5982724_640.png" },
  { name: "Hamburger", fileName: "hamburger-31775_640.png" },
  { name: "Pack of fries", fileName: "french-fries-155679_640.png" },
  {
    name: "Pineapple",
    fileName: "pngkey.com-pineapple-clipart-png-9605931.png",
  },
  { name: "Pizza", fileName: "pngkey.com-pizza-png-53164.png" },
];

const searchItemsImgTags = itemsToFind.map((i) => {
  return (
    <img
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
      <span id="header-images-span">{searchItemsImgTags}</span>
      <span id="timer-span">00:02:41</span>
    </header>
  );
}

export default Header;
