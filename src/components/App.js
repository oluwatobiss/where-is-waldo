import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../styles/Apps.css";

function App() {
  function handleMouseDown(e) {
    const contextMenu = document.getElementById("context-menu");
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");
    const isLeftMouseDown = e.button === 0;
    const isSearchAndFindImage = [...e.target.classList].includes(
      "search-and-find-image"
    );

    if (isLeftMouseDown && isSearchAndFindImage) {
      const { clientX: mouseXPosition, clientY: mouseYPosition } = e;

      contextMenu.style.left = `${mouseXPosition}px`;
      contextMenu.style.top = `${mouseYPosition}px`;

      contextMenu.classList.add("visible");
    }

    if (isLeftMouseDown && !isSearchAndFindImage && contextMenuIsActive) {
      contextMenu.classList.remove("visible");
    }
  }

  return (
    <div className="App" onMouseDown={handleMouseDown}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
