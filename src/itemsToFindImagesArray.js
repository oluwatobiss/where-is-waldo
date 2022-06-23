import uniqid from "uniqid";
import itemsToFind from "./itemsToFind";

const itemsToFindImagesArray = itemsToFind.map((i) => {
  const headerItemToFindId = i.name.toLowerCase().replace(/\s/g, "-");
  return (
    <img
      id={`header-${headerItemToFindId}`}
      key={uniqid()}
      alt={i.name}
      title={i.name}
      src={require(`./assets/images/${i.fileName}`)}
    />
  );
});

export default itemsToFindImagesArray;
