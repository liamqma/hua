import React, { useState } from "react";
import styled from "@emotion/styled";
import img1 from "./images/1.jpeg";
import img2 from "./images/2.jpeg";
import img3 from "./images/3.jpeg";
import img4 from "./images/4.jpeg";
import img5 from "./images/5.jpeg";
import img6 from "./images/6.jpeg";
import img7 from "./images/7.jpeg";
import img8 from "./images/8.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

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

function StyleSelector() {
  const [selected, setSelected] = useState([]);
  return (
    <div>
      {images.map((image, index) => {
        return (
          <Cell key={index}>
            <CellImage
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              selected={selected.includes(index)}
              onClick={() => setSelected([...selected, index])}
            ></CellImage>
          </Cell>
        );
      })}
    </div>
  );
}

export default StyleSelector;
