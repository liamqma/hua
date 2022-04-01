import React, { useState, createRef } from "react";
import styled from "@emotion/styled";
import StyleSelector from "./StyleSelector";
import { Stage, Button, Input, Textarea, Select } from "./common.styles";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";

const Container = styled.div`
  color: #111111;
  font-size: 16px;
  font-weight: 100;
`;

function Form() {
  const [postcode, setPostcode] = useState();
  const [suburb, setSuburb] = useState();
  const [arrangement, setArrangement] = useState("");

  const [stage, setStage] = useState(3);
  const stage2Ref = createRef();
  const stage3Ref = createRef();
  const stage4Ref = createRef();

  const goToNextStage = (nextStage, element) => {
    setStage(nextStage);
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  return (
    <Container>
      <Stage1
        stage={stage}
        goToNextStage={() => goToNextStage(2, stage2Ref.current)}
      />
      <Stage2
        setPostcode={setPostcode}
        setSuburb={setSuburb}
        ref={stage2Ref}
        stage={stage}
        goToNextStage={() => goToNextStage(3, stage3Ref.current)}
      />
      <Stage3
        arrangement={arrangement}
        setArrangement={setArrangement}
        ref={stage3Ref}
        stage={stage}
        goToNextStage={() => goToNextStage(4, stage4Ref.current)}
      />
      <Stage hidden={stage < 4}>
        <p>Please select up to four images to shape your arrangement:</p>
        <StyleSelector />
        <p>or brief the artist (100 characters limit)</p>
        <Textarea placeholder="Tell us what you would like" />
        <Button>Skip</Button>
        <Button>Continue</Button>
      </Stage>
      <Stage hidden={stage < 5}>
        <p>Budget</p>
        <Select>
          <option>80</option>
          <option>100</option>
          <option>150</option>
          <option>200</option>
          <option>250</option>
          <option>300</option>
        </Select>
        <p>Presentation</p>
        <Select>
          <option>
            Signature Grandiflora architectural tracing paper - No Charge
          </option>
          <option>Vase - $35</option>
          <option>
            Self contained water box wrapped in Signature Grandiflora
            architectural tracing paper - $15
          </option>
        </Select>
        <Button>Continue</Button>
      </Stage>
      <Stage hidden={stage < 6}>
        <p>Recipient</p>
        <Select>
          <option>Residential</option>
          <option>Business</option>
          <option>Hospital</option>
          <option>University</option>
        </Select>
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Address" />
        <Input type="text" disabled value="2000" placeholder="suburb" />
        <Input type="text" placeholder="Phone Number" />
      </Stage>
    </Container>
  );
}

export default Form;
