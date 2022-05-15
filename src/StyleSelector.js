import styled from "@emotion/styled";
import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";

function importAll(r) {
  return r.keys().map((n) => ({
    name: trimEnd(trimStart(n, "./"), ".webp"),
    path: r(n),
  }));
}

const elegantFleurImgs = importAll(
  require.context("./images/elegant-fleur", true, /\.webp$/)
);

const luxeFleurImgs = importAll(
  require.context("./images/luxe-fleur", true, /\.webp$/)
);

const everlastingFlowersImgs = importAll(
  require.context("./images/everlasting-flowers", true, /\.webp$/)
);

const Cell = styled.div`
  width: 130px;
  height: 130px;
  display: inline-block;
  position: relative;
`;

const CellImage = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 200ms;
  cursor: pointer;

  :hover {
    ${(props) => !props.selected && "transform: scale(2, 2);"}
    border-radius: 50%;
    z-index: 1;
  }

  ${(props) => props.selected && "border-radius: 50%;"}
`;

function StyleSelector({ images, setImages, type }) {
  let imgs;
  switch (type) {
    case "elegant-fleur":
      imgs = elegantFleurImgs;
      break;
    case "luxe-fleur":
      imgs = luxeFleurImgs;
      break;
    case "everlasting-flowers":
      imgs = everlastingFlowersImgs;
      break;
    default:
      imgs = [];
  }

  const onImageClick = (img) => {
    if (images.includes(img)) {
      setImages(images.filter((i) => i !== img));
    } else {
      setImages([...images, img]);
    }
  };

  return (
    <div>
      {imgs.map((img) => {
        return (
          <Cell key={img.name}>
            <CellImage
              key={img.name}
              style={{ backgroundImage: `url(${img.path})` }}
              selected={images.includes(img)}
              onClick={() => onImageClick(img)}
            ></CellImage>
          </Cell>
        );
      })}
    </div>
  );
}

export default StyleSelector;
