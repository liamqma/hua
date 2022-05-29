import { forwardRef, ForwardedRef } from "react";
import StyleSelector from "./StyleSelector";
import { Stage, Button, Textarea } from "./common.styles";
import { imgs } from "./types";

function Stage4(
  { stage, goToNextStage, images, setImages, brief, setBrief, type }: {
    stage: number,
    goToNextStage: () => void,
    images: imgs,
    setImages: (imgs: imgs) => void,
    brief: string,
    setBrief: (b: string) => void,
    type: string
  },
  ref: ForwardedRef<HTMLParagraphElement>
) {
  const onButtonClick = () => {
    if (images.length !== 0 || brief !== "") {
      goToNextStage();
    } else {
      alert("Please select at least one image or brief the artist.");
    }
  };

  return (
    <Stage hidden={stage < 4}>
      <p ref={ref}>
        Please select up to four images to shape your arrangement:
      </p>
      <StyleSelector images={images} setImages={setImages} type={type} />
      <p>or brief the artist (100 characters limit)</p>
      <Textarea
        value={brief}
        onChange={(event) => setBrief(event.target.value)}
        placeholder="Tell us what you would like"
      />
      <Button id="continue-stage-4" onClick={onButtonClick}>Continue</Button>
    </Stage>
  );
}

export default forwardRef(Stage4);
