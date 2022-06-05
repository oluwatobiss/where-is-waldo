import { ReactComponent as DonutPileImage } from "../assets/images/donut-pile-search-and-find-codesweetly.svg";
import ContextMenu from "./ContextMenu";
import "../styles/Body.css";

function Body() {
  return (
    <main>
      <ContextMenu />
      <DonutPileImage />
    </main>
  );
}

export default Body;
