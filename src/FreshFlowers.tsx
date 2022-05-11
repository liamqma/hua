import styled from "@emotion/styled";
import leftImage from "./images/very-nice-young-woman-holding-600w-1311986834.webp";
import rightImage from "./images/wedding-bridal-bouquet-flowers-brown-600w-1925688029.webp";

const Container = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

const A = styled.a`
  flex: 1 1 auto;
  position: relative;
  display: block;

  img {
    width: 100%;
    padding-bottom: 20px;
    filter: brightness(90%);
  }

  span {
    position: absolute;
    top: calc(50% - 20px);
    left: 50%;
    color: white;
    display: block;
    font-size: 24px;
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 2px black;
  }
`

export function FreshFlowers() {
  return (
    <Container>
      <A href="/shop/luxe-fleur"><img alt="Luxe Fleur" src={leftImage} /><span>Luxe Fleur</span></A>
      <A href="/shop/elegant-fleur"><img alt="Elegant Fleur" src={rightImage} /><span>Elegant Fleur</span></A>
    </Container>
  );
}

export default FreshFlowers;