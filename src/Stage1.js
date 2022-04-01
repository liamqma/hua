import React from "react";
import styled from "@emotion/styled";
import { Button } from "./common.styles";

const Term = styled.p`
  font-size: 30px;
  line-height: 50px;
`;

function Stage1({ stage, goToNextStage }) {
  const disabled = stage > 1;
  return (
    <>
      <Term>
        Flowers are subject to seasonal availability, please trust us to make
        selection on your behalf…
      </Term>
      <Button disabled={disabled} onClick={goToNextStage}>
        Accept
      </Button>
    </>
  );
}

export default Stage1;
