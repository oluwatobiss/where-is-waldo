import { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../styles/Apps.css";

function App() {
  function handleKeydown(e) {
    const contextMenu = document.getElementById("context-menu");
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");

    if (e.key === "Escape" && contextMenuIsActive) {
      contextMenu.classList.remove("visible");
    }
  }

  function setContextMenuPosition(
    mouseXViewportPosition,
    mouseYViewportPosition
  ) {
    const contextMenu = document.getElementById("context-menu");

    // prettier-ignore
    // Check if the sum of the mouse's X position and the context-menu's width is greater than the viewport's width:
    const contextMenuIsOutOfXView =
      (mouseXViewportPosition + contextMenu.clientWidth) > window.innerWidth;

    // prettier-ignore
    // Check if the sum of the mouse's Y position and the context-menu's height is greater than the viewport's height:
    const contextMenuIsOutOfYView =
      (mouseYViewportPosition + contextMenu.clientHeight) > window.innerHeight;

    let contextMenuLeftPosition = mouseXViewportPosition;
    let contextMenuTopPosition = mouseYViewportPosition;

    if (contextMenuIsOutOfXView) {
      // Subtract the mouse's X position from the viewport's width to get portion of the context-menu within the viewport:
      const sizeOfContextMenuWithinXViewport =
        window.innerWidth - mouseXViewportPosition;

      // Subtract the sizeOfContextMenuWithinXViewport from the context-menu's width to get the portion of the context-menu outside the viewport:
      const sizeOfContextMenuOutOfXViewport =
        contextMenu.clientWidth - sizeOfContextMenuWithinXViewport;

      // Subtract sizeOfContextMenuOutOfXViewport from the mouse's X position to move the context-menu within the viewport:
      // (Note: -15 moves context-menu 15px away from the viewport's edge.)
      contextMenuLeftPosition =
        mouseXViewportPosition - sizeOfContextMenuOutOfXViewport - 15;
    }

    if (contextMenuIsOutOfYView) {
      // Subtract the mouse's Y position from the viewport's height to get portion of the context-menu within the viewport:
      const sizeOfContextMenuWithinYViewport =
        window.innerHeight - mouseYViewportPosition;

      // Subtract the sizeOfContextMenuWithinYViewport from the context-menu's height to get the portion of the context-menu outside the viewport:
      const sizeOfContextMenuOutOfYViewport =
        contextMenu.clientHeight - sizeOfContextMenuWithinYViewport;

      // Subtract sizeOfContextMenuOutOfYViewport from the mouse's Y position to move the context-menu within the viewport:
      contextMenuTopPosition =
        mouseYViewportPosition - sizeOfContextMenuOutOfYViewport;
    }

    return { contextMenuLeftPosition, contextMenuTopPosition };
  }

  function handleMouseDown(e) {
    const contextMenu = document.getElementById("context-menu");
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");
    const isLeftMouseDown = e.button === 0;
    const isSearchAndFindImage = [...e.target.classList].includes(
      "search-and-find-image"
    );

    // console.log({
    //   clientY: e.clientY,
    //   pageY: e.pageY,
    //   screenY: e.screenY,
    //   offsetY: e.offsetY,
    // });

    // console.log({
    //   viewportHeight: window.innerHeight,
    //   contextMenuHeight: contextMenu.clientHeight,
    // });

    if (isLeftMouseDown && isSearchAndFindImage) {
      // Get mouse's position relative to the viewport:
      const {
        clientX: mouseXViewportPosition,
        clientY: mouseYViewportPosition,
      } = e;
      const { contextMenuLeftPosition, contextMenuTopPosition } =
        setContextMenuPosition(mouseXViewportPosition, mouseYViewportPosition);

      contextMenu.style.left = `${contextMenuLeftPosition}px`;
      contextMenu.style.top = `${contextMenuTopPosition}px`;

      contextMenuIsActive && contextMenu.classList.remove("visible");

      setTimeout(() => {
        contextMenu.classList.add("visible");
      });
    }

    if (isLeftMouseDown && !isSearchAndFindImage && contextMenuIsActive) {
      contextMenu.classList.remove("visible");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="App" onMouseDown={handleMouseDown}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
