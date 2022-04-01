import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import Form from "./Form";
import Footer from "./Footer";
import leftImage from "./images/left-image.jpeg";
import rightImage from "./images/right-image.jpeg";
import logoImage from "./images/logo.png";

const Container = styled.section`
  @media (min-width: 768px) {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const LeftImage = styled.div`
  min-height: 529px;
  background-image: url(${leftImage});
  background-position: 50% 50%;
  flex: 0 0 28.33333333%;
  background-size: cover;
`;

const RightImage = styled(LeftImage)`
  background-image: url(${rightImage});
`;

const Main = styled.main`
  flex: 0 0 43.33333333%;
  min-width: 43.33333333%;
  text-align: center;
  padding: 60px 30px;
  background-color: white;
`;

const LogoImg = styled.img`
  max-width: 300px;
`;

const Liner = styled.div`
  width: 157px;
  margin: 30px auto;
  border: 10px solid #db545a;
`;

function App() {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: "Open Sans", sans-serif;
            background-color: #333333;
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }
        `}
      />
      <Container>
        <LeftImage />
        <Main>
          <a href="/">
            <LogoImg src={logoImage} />
          </a>
          <Liner />
          <Form />
        </Main>
        <RightImage />
      </Container>
      <Footer />
    </>
  );
}

export default App;
