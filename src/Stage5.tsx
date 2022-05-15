import { forwardRef, ForwardedRef } from "react";
import { Stage, Button, Select } from "./common.styles";

function Stage5(
  { stage, budget, setBudget, presentation, setPresentation, goToNextStage }: {
    stage: number,
    budget: string,
    setBudget: (b: string) => void,
    presentation: string,
    setPresentation: (p: string) => void,
    goToNextStage: () => void
  },
  ref: ForwardedRef<HTMLParagraphElement>
) {
  const onButtonClick = () => {
    if (!budget || budget === "Please choose...") {
      alert("Please select a budget point before continuing.");
    } else if (!presentation || presentation === "Please choose...") {
      alert("Please select a presentation option before continuing.");
    } else {
      goToNextStage();
    }
  };
  return (
    <Stage hidden={stage < 5}>
      <p ref={ref}>Budget</p>
      <Select
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
      >
        <option>Please choose...</option>
        <option>80</option>
        <option>100</option>
        <option>150</option>
        <option>200</option>
        <option>250</option>
        <option>300</option>
      </Select>
      <p>Presentation</p>
      <Select
        value={presentation}
        onChange={(event) => setPresentation(event.target.value)}
      >
        <option>Please choose...</option>
        <option value="0">
          Signature Grandiflora architectural tracing paper - No Charge
        </option>
        <option value="35">Vase - $35</option>
        <option value="15">
          Self contained water box wrapped in Signature Grandiflora
          architectural tracing paper - $15
        </option>
      </Select>
      <Button onClick={onButtonClick}>Continue</Button>
    </Stage>
  );
}

export default forwardRef(Stage5);
