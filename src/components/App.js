import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import itemsToFind from "../itemsToFind";
import markItemAsFound from "../markItemAsFound";
import checkIfPlayerMadeTopTen from "../checkIfPlayerMadeTopTen";
import showContextMenu from "../showContextMenu";
import ItemSelectionFeedback from "./ItemSelectionFeedback";
import LeaderboardModal from "./LeaderboardModal";
import CongratsModal from "./CongratsModal";
import OopsModal from "./OopsModal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../styles/Apps.css";

let previousTimeout = null;
let clickedBodyItemName = null;
let clickedContextMenuItem = null;
let totalItems = itemsToFind.length;

function App() {
  const [clickedMenuItemInfo, setClickedMenuItemInfo] = useState({
    itemFound: null,
    clickedContextMenuItem: null,
  });

  const { seconds, minutes, hours, pause } = useStopwatch({
    autoStart: true,
  });

  function closeModalBox(e) {
    const congratsModalBg = document.getElementById("congrats-modal");
    const closeCongratsFormBtn = document.getElementById("close-congrats-form");
    const oopsModalBg = document.getElementById("oops-modal");
    const closeoopsModalBtn = document.getElementById("close-oops-modal");
    const leaderboardModalBg = document.getElementById("leaderboard-modal");
    const closeLeaderboardBtn = document.getElementById(
      "close-leaderboard-modal"
    );

    if (
      e.target === congratsModalBg ||
      e.target === closeCongratsFormBtn ||
      e.target === leaderboardModalBg ||
      e.target === closeLeaderboardBtn ||
      e.target === oopsModalBg ||
      e.target === closeoopsModalBtn
    ) {
      window.location.reload();
    }
  }

  function handleKeydown(e) {
    const contextMenu = document.getElementById("context-menu");
    const contextMenuIsActive = [...contextMenu.classList].includes("visible");

    if (e.key === "Escape" && contextMenuIsActive) {
      contextMenu.classList.remove("visible");
    }
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
    const isClickableContextMenuItem = e.target.closest(".clickable-context");
    const isSearchAndFindImage = [...e.target.classList].includes(
      "search-and-find-image"
    );

    if (isSearchAndFindImage) {
      clickedBodyItemName = e.target.getAttribute("data-item-name");
    }

    if (isClickableContextMenuItem) {
      isContextMenuItem = [...isClickableContextMenuItem.classList].includes(
        "context-menu-item"
      );
    }

    if (isContextMenuItem) {
      clickedContextMenuItem = isClickableContextMenuItem.getAttribute(
        "data-menu-item-name"
      );

      if (clickedContextMenuItem === clickedBodyItemName) {
        markItemAsFound(clickedContextMenuItem);
        clearTimeout(previousTimeout);
        setClickedMenuItemInfo({
          itemFound: true,
          clickedContextMenuItem: clickedContextMenuItem,
        });

        totalItems -= 1;
        itemSelectionFeedback.classList.remove("item-not-found-feedback");
        itemSelectionFeedback.classList.add("visible", "item-found-feedback");
        previousTimeout = setTimeout(() => {
          itemSelectionFeedback.classList.remove("visible");
        }, 5000);

        if (totalItems === 0) {
          pause();
          const stoppedTime = Number(`${hours}0${minutes}0${seconds}`);
          checkIfPlayerMadeTopTen(stoppedTime);
        }
      } else {
        clearTimeout(previousTimeout);
        setClickedMenuItemInfo({
          itemFound: false,
          clickedContextMenuItem: clickedContextMenuItem,
        });

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
      showContextMenu(e, contextMenuIsActive);
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
    document.addEventListener("click", closeModalBox);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", closeModalBox);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="App" onMouseDown={handleMouseDown}>
      <ItemSelectionFeedback clickedMenuItemInfo={clickedMenuItemInfo} />
      <LeaderboardModal />
      <CongratsModal />
      <OopsModal />
      <Header hours={hours} minutes={minutes} seconds={seconds} />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
