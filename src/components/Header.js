import { useEffect } from "react";
import itemsToFindImagesArray from "../itemsToFindImagesArray";
import "../styles/Header.css";

function Header(props) {
  useEffect(() => {
    const reloadPage = () => window.location.reload();
    const appLogo = document.getElementById("logo-span");
    appLogo.addEventListener("click", reloadPage);
    return () => appLogo.removeEventListener("click", reloadPage);
  }, []);
  return (
    <header>
      <span id="logo-span" title="Home">
        Find →
      </span>
      <span id="header-images-span">{itemsToFindImagesArray}</span>
      <span id="timer-span">
        <span id="timer-hours">{props.hours}</span>:
        <span id="timer-minutes">{props.minutes}</span>:
        <span id="timer-seconds">{props.seconds}</span>
      </span>
    </header>
  );
}

export default Header;
