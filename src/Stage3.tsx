import React, { forwardRef, ForwardedRef } from "react";
import { Stage, Select } from "./common.styles";

function Stage3({ stage, goToNextStage, arrangement, setArrangement }: {
  stage: number,
  goToNextStage: () => void,
  arrangement: string,
  setArrangement: (a: string) => void
},
  ref: ForwardedRef<HTMLParagraphElement>
) {
  const defaultText = "Please choose...";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArrangement(event.target.value);
    goToNextStage();
  };

  return (
    <Stage hidden={stage < 3}>
      <p ref={ref}>Select arrangement</p>
      <Select value={arrangement} onChange={handleChange}>
        <option>{defaultText}</option>
        <option>One variety</option>
        <option>Mixed Arrangements</option>
        <option>Potted Orchid Plant</option>
      </Select>
    </Stage>
  );
}

export default forwardRef(Stage3);
