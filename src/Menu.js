import { useState } from "react";
import styled from "@emotion/styled";

const MenuToggle = styled.div`
  display: block;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 2;
  cursor: pointer;
  width: 33px;
  height: 22px;

  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: absolute;
    background: black;
    border-radius: 3px;
    z-index: 1;
    transform: rotate(0deg);
    transition: 0.4s ease-in-out;
  }

  span:first-of-type {
    top: 0;
  }

  span:nth-of-type(2) {
    top: 9px;
  }

  span:nth-of-type(3) {
    top: 18px;
  }

  ${(props) =>
    props.isOpen
      ? `
      span {
        background: #232323;
      }
      span:first-of-type {
        transform: translateY(9px) rotate(135deg);
      }
    
      span:nth-of-type(2) {
        opacity: 0;
      }
    
      span:nth-of-type(3) {
        transform: translateY(-9px) rotate(-135deg);
      }
  `
      : ""}
`;

const UL = styled.ul`
  position: absolute;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 50px;
  padding-top: 125px;
  z-index: 1;
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  @media (min-width: 768px) {
    width: 33%;
  }

  li {
    padding: 10px 0;
    font-size: 22px;
  }

  ul {
    margin-top: 10px;
    list-style-type: none;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: undefin;
    }
  }

  ${(props) => props.isOpen && "transform: none"}
`;

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </MenuToggle>
      <UL isOpen={isOpen}>
        <li>
          Fresh Flowers
          <ul>
            <li>
              <a href="/luxe-fleur">Luxe Fleur</a>
            </li>
            <li>
              <a href="/elegant-fleur">Elegant Fleur</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/everlasting-flowers">Everlasting Flowers</a>
        </li>
        <li>
          <a href="/tutorials">Tutorials</a>
        </li>
        <li>
          <a href="/event-enquiry">Event Enquiry</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </UL>
    </>
  );
}

export default Menu;
