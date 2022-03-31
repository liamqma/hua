import React, { useState } from "react";
import styled from "styled-components";
import StyleSelector from "./StyleSelector";

const Container = styled.div`
  color: #111111;
  font-size: 16px;
  font-weight: 100;
`;

const Term = styled.p`
  font-size: 30px;
  line-height: 50px;
`;

const Stage = styled.section`
  padding-top: 30px;
  margin-top: 46px;
  border-top: 1px solid black;
`;

const Button = styled.button`
  border: 2px solid black;
  padding: 10px 30px;
  color: #454545;
  font-weight: 700;
  background-color: white;
  cursor: pointer;
  width: 200px;
  margin: 0.5em auto;
  display: block;
`;

const Input = styled.input`
  border: 2px solid black;
  padding: 10px;
  color: #454545;
  font-weight: 700;
  background-color: white;
  margin: 0.5em auto;
  width: 200px;
  display: block;
`;

const Textarea = styled.textarea`
  border: 2px solid black;
  padding: 10px;
  color: #454545;
  font-weight: 700;
  background-color: white;
  margin: 0.5em auto;
  width: 80%;
  display: block;
`;

const Select = styled.select`
  border: 2px solid black;
  padding: 10px;
  color: #454545;
  font-weight: 700;
  background-color: white;
  margin: 0.5em auto;
  width: 200px;
  display: block;
`;

function Form() {
  const [stage, setStage] = useState(0);
  const goToNextStage = () => setStage(stage + 1);
  return (
    <Container>
      <Term>
        Flowers are subject to seasonal availability, please trust us to make
        selection on your behalf…
      </Term>
      <Button onClick={goToNextStage}>Accept</Button>
      <Stage hidden={stage < 1}>
        <p>
          Our delivery service includes a limited area of Sydney. please enter
          your recipient's suburb:
        </p>
        <Input type="text" placeholder="suburb" />
        <Button onClick={goToNextStage}>Continue</Button>
      </Stage>
      <Stage hidden={stage < 2}>
        <p>Select arrangement</p>
        <Select>
          <option>One variety</option>
          <option>Mixed Arrangements</option>
          <option>Potted Orchid Plant</option>
        </Select>
      </Stage>
      <Stage hidden={stage < 3}>
        <p>Please select up to four images to shape your arrangement:</p>
        <StyleSelector />
        <p>or brief the artist (100 characters limit)</p>
        <Textarea placeholder="Tell us what you would like" />
        <Button>Skip</Button>
        <Button>Continue</Button>
      </Stage>
      <Stage hidden={stage < 4}>
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
      <Stage hidden={stage < 5}>
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
