import styled from "@emotion/styled";
import { Button } from "./common.styles";

const Term = styled.p`
  font-size: 30px;
  line-height: 50px;
`;

type Props = {
  stage: number,
  goToNextStage: () => void
}

function Stage1({ stage, goToNextStage }: Props) {
  const disabled = stage > 1;
  return (
    <>
      <Term>
        Each season comes with its signature flowers. Please trust us to select
        the most beautiful blooms in season, and help you to express your
        thoughts through a unique floral design.
      </Term>
      <Button disabled={disabled} onClick={goToNextStage}>
        Accept
      </Button>
    </>
  );
}

export default Stage1;
