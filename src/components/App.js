import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import itemsToFind from "../itemsToFind";
import ItemSelectionFeedback from "./ItemSelectionFeedback";
import LeaderboardModal from "./LeaderboardModal";
import CongratsModal from "./CongratsModal";
import OopsModal from "./OopsModal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import "../styles/Apps.css";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

let previousTimeout = null;
let clickedBodyItemName = null;
let clickedContextMenuItem = null;
let totalItems = itemsToFind.length;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  async function handleMouseDown(e) {
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
      console.log(clickedContextMenuItem);
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
      clickedContextMenuItem = e.target
        .closest(".clickable-context")
        .getAttribute("data-menu-item-name");

      console.log(clickedContextMenuItem);

      if (clickedContextMenuItem === clickedBodyItemName) {
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

        switch (clickedContextMenuItem) {
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

        if (totalItems === 0) {
          pause();
          let topTenPlayers = [];
          let lastTopTenPlayer = null;
          let lastLeaderboardTime = null;

          const stoppedTime = Number(`${hours}0${minutes}0${seconds}`);
          const topTenPlayersCollectionRef = collection(db, "topTenPlayers");
          const topTenPlayersCollectionQuery = query(
            topTenPlayersCollectionRef,
            orderBy("time"),
            limit(10)
          );
          const topTenPlayersDocuments = await getDocs(
            topTenPlayersCollectionQuery
          );

          topTenPlayersDocuments.forEach((document) => {
            topTenPlayers.push(document.data());
          });

          lastTopTenPlayer = topTenPlayers[topTenPlayers.length - 1];

          lastLeaderboardTime = lastTopTenPlayer
            ? Number(lastTopTenPlayer.time.replace(/:/g, "0"))
            : 0;

          console.log(topTenPlayers);
          console.log({
            stoppedTime: stoppedTime,
            lastLeaderboardTime: lastLeaderboardTime,
          });

          if (stoppedTime < lastLeaderboardTime || topTenPlayers.length < 10) {
            document.getElementById("congrats-modal").style.display = "block";
          } else {
            document.getElementById("oops-modal").style.display = "block";
          }
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
