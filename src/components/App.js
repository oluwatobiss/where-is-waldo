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
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

let previousTimeout = null;
let clickedBodyItemName = null;
let clickedContextMenuItem = null;
let totalItems = itemsToFind.length;

const app = initializeApp(firebaseConfig);
const dummyRecord = [
  { rank: 1, name: "Tobi", time: "0:0:15", date: "2022-06-09" },
  { rank: 2, name: "Dav", time: "0:0:20", date: "2022-05-21" },
  { rank: 3, name: "Mary", time: "0:0:25", date: "2021-03-17" },
  { rank: 4, name: "Jerry", time: "0:0:30", date: "2022-01-01" },
  { rank: 5, name: "Abel", time: "0:0:35", date: "2020-10-10" },
  { rank: 6, name: "Sarah", time: "0:0:40", date: "2020-10-10" },
  { rank: 7, name: "Mary", time: "0:0:45", date: "2021-03-17" },
  { rank: 8, name: "Jerry", time: "0:0:50", date: "2022-01-01" },
  { rank: 9, name: "Abel", time: "0:0:55", date: "2020-10-10" },
  { rank: 10, name: "Sarah", time: "0:1:0", date: "2020-10-10" },
];

function App() {
  const [clickedMenuItemInfo, setClickedMenuItemInfo] = useState({
    itemFound: null,
    clickedContextMenuItem: null,
  });

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

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
          const stoppedTime = Number(`${hours}0${minutes}0${seconds}`);
          const lastLeaderboardTime = dummyRecord[dummyRecord.length - 1]
            ? Number(
                dummyRecord[dummyRecord.length - 1].time.replace(/:/g, "0")
              )
            : 0;

          console.log({
            stoppedTime: stoppedTime,
            lastLeaderboardTime: lastLeaderboardTime,
          });

          if (stoppedTime < lastLeaderboardTime || dummyRecord.length < 10) {
            document.getElementById("congrats-modal").style.display = "block";
            let editLearderboard = true;
            const newRecord = {
              name: "New Name",
              time: `${hours}:${minutes}:${seconds}`,
              date: new Date().toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            };

            if (dummyRecord.length === 0) {
              dummyRecord.push(newRecord);
              editLearderboard = false;
              console.log(dummyRecord);
            }

            for (let i = 0; i < dummyRecord.length; i++) {
              if (editLearderboard) {
                console.log({ endTime: `${hours}${minutes}${seconds}` });
                console.log({
                  [dummyRecord[i].name]: dummyRecord[i].time.replace(/:/g, "0"),
                });

                if (
                  stoppedTime < Number(dummyRecord[i].time.replace(/:/g, "0"))
                ) {
                  if (i === 0 && dummyRecord.length < 10) {
                    dummyRecord.unshift(newRecord);
                    console.log(dummyRecord);
                  } else if (i === 0 && dummyRecord.length === 10) {
                    dummyRecord.unshift(newRecord);
                    dummyRecord.pop();
                    console.log(dummyRecord);
                  } else if (i < 9 && dummyRecord.length < 10) {
                    dummyRecord.splice(i, 0, newRecord);
                    console.log(dummyRecord);
                  } else if (i < 9 && dummyRecord.length === 10) {
                    dummyRecord.splice(i, 0, newRecord);
                    dummyRecord.pop();
                    console.log(dummyRecord);
                  } else if (i === 9) {
                    dummyRecord.splice(i, 1, newRecord);
                    console.log(dummyRecord);
                  } else {
                    console.error({
                      currentLoop: i,
                      leaderBoardlength: dummyRecord.length,
                    });
                  }
                  editLearderboard = false;
                } else if (
                  i === dummyRecord.length - 1 &&
                  stoppedTime >= Number(dummyRecord[i].time.replace(/:/g, "0"))
                ) {
                  // If the loop is at the last record in the leaderboard and the user's time is equal
                  // to or greater than the record, add the user's time to the end of the leaderboard:
                  dummyRecord.push(newRecord);
                  editLearderboard = false;
                  console.log(dummyRecord);
                }
              }
            }
          }
          console.log(`All items found in ${hours}:${minutes}:${seconds}`);
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
    document.addEventListener("keydown", handleKeydown);

    return () => {
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
