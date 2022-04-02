import React, { forwardRef } from "react";
import { Stage, Select } from "./common.styles";

function Stage3({ stage, goToNextStage, arrangement, setArrangement }, ref) {
  const defaultText = "Please choose...";

  const handleChange = (event) => {
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
