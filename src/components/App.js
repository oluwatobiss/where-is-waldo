import { useState, useEffect } from "react";
import itemsToFind from "../itemsToFind";
import ItemSelectionFeedback from "./ItemSelectionFeedback";
import LeaderboardModal from "./LeaderboardModal";
import CongratsModal from "./CongratsModal";
import OopsModal from "./OopsModal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../styles/Apps.css";

let previousTimeout = null;

function App() {
  const [totalItems, setTotalItems] = useState(itemsToFind.length);
  const [itemFound, setItemFound] = useState(null);
  const [clickedContextMenuItem, setClickedContextMenuItem] = useState(null);

  let clickedBodyItemName = null;
  let clickedContextMenuItemName = null;

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
      // Subtract the mouse's X position from the viewport's width to get the context-menu's portion that is within the viewport:
      const sizeOfContextMenuWithinXViewport =
        window.innerWidth - mouseXViewportPosition;

      // Subtract the sizeOfContextMenuWithinXViewport from the context-menu's width to get the context-menu's portion that is outside the viewport:
      const sizeOfContextMenuOutOfXViewport =
        contextMenu.clientWidth - sizeOfContextMenuWithinXViewport;

      // Subtract sizeOfContextMenuOutOfXViewport from the mouse's X position to move the context-menu within the viewport:
      // (Note: -15 moves context-menu 15px away from the viewport's edge.)
      contextMenuLeftPosition =
        mouseXViewportPosition - sizeOfContextMenuOutOfXViewport - 15;
    }

    if (contextMenuIsOutOfYView) {
      // Subtract the mouse's Y position from the viewport's height to get the context-menu's portion that is within the viewport:
      const sizeOfContextMenuWithinYViewport =
        window.innerHeight - mouseYViewportPosition;

      // Subtract the sizeOfContextMenuWithinYViewport from the context-menu's height to get the context-menu's portion that is outside the viewport:
      const sizeOfContextMenuOutOfYViewport =
        contextMenu.clientHeight - sizeOfContextMenuWithinYViewport;

      // Subtract sizeOfContextMenuOutOfYViewport from the mouse's Y position to move the context-menu within the viewport:
      contextMenuTopPosition =
        mouseYViewportPosition - sizeOfContextMenuOutOfYViewport;
    }

    return { contextMenuLeftPosition, contextMenuTopPosition };
  }

  function handleMouseDown(e) {
    let isContextMenuItem = false;
    const contextMenu = document.getElementById("context-menu");
    const itemSelectionFeedback = document.getElementById(
      "item-selection-feedback"
    );
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");
    const isLeftMouseDown = e.button === 0;
    const isContextMenu = e.target.getAttribute("id") === "context-menu";
    const isSearchAndFindImage = [...e.target.classList].includes(
      "search-and-find-image"
    );

    if (isSearchAndFindImage) {
      console.log(clickedContextMenuItemName);
      clickedBodyItemName = e.target.getAttribute("data-item-name");
      console.log(clickedBodyItemName);
    }

    if (e.target.closest(".clickable-context")) {
      isContextMenuItem = [
        ...e.target.closest(".clickable-context").classList,
      ].includes("context-menu-item");
    }

    if (isContextMenuItem) {
      console.log(clickedBodyItemName);
      clickedContextMenuItemName = e.target
        .closest(".clickable-context")
        .getAttribute("data-menu-item-name");

      console.log(clickedContextMenuItemName);

      if (clickedContextMenuItemName === clickedBodyItemName) {
        clearTimeout(previousTimeout);
        setItemFound(true);
        setClickedContextMenuItem(clickedContextMenuItemName);
        setTotalItems(totalItems - 1);
        itemSelectionFeedback.classList.remove("item-not-found-feedback");
        itemSelectionFeedback.classList.add("visible", "item-found-feedback");
        previousTimeout = setTimeout(() => {
          itemSelectionFeedback.classList.remove("visible");
        }, 5000);

        switch (clickedContextMenuItemName) {
          case "Carrot":
            document.getElementById("carrot-found").classList.add("visible");
            document.getElementById("header-carrot").classList.add("invisible");
            document
              .getElementById("context-menu-carrot")
              .classList.add("invisible");
            break;
          case "Pack of fries":
            document
              .getElementById("pack-of-fries-found")
              .classList.add("visible");
            document
              .getElementById("header-pack-of-fries")
              .classList.add("invisible");
            document
              .getElementById("context-menu-pack-of-fries")
              .classList.add("invisible");
            break;
          case "Hamburger":
            document.getElementById("hamburger-found").classList.add("visible");
            document
              .getElementById("context-menu-hamburger")
              .classList.add("invisible");
            document
              .getElementById("header-hamburger")
              .classList.add("invisible");
            break;
          case "American football":
            document
              .getElementById("american-football-found")
              .classList.add("visible");
            document
              .getElementById("header-american-football")
              .classList.add("invisible");
            document
              .getElementById("context-menu-american-football")
              .classList.add("invisible");
            break;
          case "Pizza":
            document.getElementById("pizza-found").classList.add("visible");
            document.getElementById("header-pizza").classList.add("invisible");
            document
              .getElementById("context-menu-pizza")
              .classList.add("invisible");
            break;
          case "Pineapple":
            document.getElementById("pineapple-found").classList.add("visible");
            document
              .getElementById("header-pineapple")
              .classList.add("invisible");
            document
              .getElementById("context-menu-pineapple")
              .classList.add("invisible");
            break;
          default:
            console.error("Selected context item not marked in SVG.");
        }
      } else {
        clearTimeout(previousTimeout);
        setItemFound(false);
        setClickedContextMenuItem(clickedContextMenuItemName);
        itemSelectionFeedback.classList.remove("item-found-feedback");
        itemSelectionFeedback.classList.add(
          "visible",
          "item-not-found-feedback"
        );
        previousTimeout = setTimeout(() => {
          itemSelectionFeedback.classList.remove("visible");
        }, 5000);
      }
    }

    if (isLeftMouseDown && isSearchAndFindImage) {
      // Get mouse's position relative to the viewport:
      const {
        clientX: mouseXViewportPosition,
        clientY: mouseYViewportPosition,
      } = e;

      // Define context menu's left and top positions:
      const { contextMenuLeftPosition, contextMenuTopPosition } =
        setContextMenuPosition(mouseXViewportPosition, mouseYViewportPosition);

      // Move context menu to its left and top positions:
      contextMenu.style.left = `${contextMenuLeftPosition}px`;
      contextMenu.style.top = `${contextMenuTopPosition}px`;

      // Remove 'visible' class from the previously active context menu:
      contextMenuIsActive && contextMenu.classList.remove("visible");

      // Add 'visible' class to context menu to show it at its new position:
      // Note: setTimeout() makes the CSS transition effective. It prevents remove("visible")
      // and add("visible") from occurring in the same event loop. So, add("visible") happens
      // some moment after remove("visible").
      // Learn more: mikechambers.com/blog/2011/07/20/timing-issues-when-animating-with-css3-transitions
      // Learn more: youtube.com/watch?v=cCOL7MC4Pl0
      setTimeout(() => {
        contextMenu.classList.add("visible");
      });
    }

    if (
      isLeftMouseDown &&
      !isSearchAndFindImage &&
      contextMenuIsActive &&
      !isContextMenu
    ) {
      contextMenu.classList.remove("visible");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    totalItems === 0 && console.log("All items found!");
  }, [totalItems]);

  return (
    <div className="App" onMouseDown={handleMouseDown}>
      <ItemSelectionFeedback
        itemFound={itemFound}
        clickedContextMenuItem={clickedContextMenuItem}
      />
      <LeaderboardModal />
      <CongratsModal />
      <OopsModal />
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
