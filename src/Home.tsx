import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import bgImage from "./images/pink-peonies-red-hydrangea-beautiful.webp";

const Container = styled.p`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  line-height: 160%;
  font-size: 36px;
  padding: 0 40px;

  @media (min-width: 768px) {
    font-size: 45px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
  }
`;

function Home() {
  return (
    <>
      <Global
        styles={css`
          html {
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${bgImage});
            background-size: cover;
            height: 100vh;
          }
        `}
      />
      <Container>
        There is peaceful.
        <br />
        There is wild.
        <br />I am both at the same time.
        <br />- Sum
      </Container>
    </>
  );
}

export default Home;
