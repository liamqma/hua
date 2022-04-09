import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import { Stage, Select, Input, Textarea, Button } from "./common.styles";
import "react-calendar/dist/Calendar.css";

const P = styled.p`
  margin-top: 45px;
`;

function Stage6(
  {
    stage,
    postcode,
    suburb,
    deliveryLocation,
    setDeliveryLocation,
    name,
    setName,
    address,
    setAddress,
    businessName,
    setBusinessName,
    phone,
    setPhone,
    email,
    setEmail,
    message,
    setMessage,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,
    specialInstructions,
    setSpecialInstructions,
    goToNextStage,
  },
  ref
) {
  return (
    <Stage hidden={stage < 6}>
      <p ref={ref}>Recipient</p>
      <Select
        value={deliveryLocation}
        onChange={(event) => setDeliveryLocation(event.target.value)}
      >
        <option>Delivery location...</option>
        <option>Residential</option>
        <option>Business</option>
        <option>Hospital</option>
        <option>University</option>
      </Select>
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Name"
      />
      <Input
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        type="text"
        placeholder="Address"
      />
      {deliveryLocation === "Business" && (
        <Input
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          type="text"
          placeholder="Business name"
        />
      )}
      <Input type="text" disabled value={`${suburb} ${postcode}`} />
      <Input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone Number"
      />
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <P>
        Personal message <br /> (150 characters remaining)
      </P>
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter here"
      />
      <P>Delivery date</P>
      <Calendar onChange={setDeliveryDate} value={deliveryDate} />
      <P>Delivery time</P>
      <Select
        value={deliveryTime}
        onChange={(event) => setDeliveryTime(event.target.value)}
      >
        <option>Please Choose...</option>
        <option>Anytime</option>
        <option>Before Midday</option>
        <option>Business Hours</option>
      </Select>
      <P>
        Special instructions
        <br />
        (150 characters remaining)
      </P>
      <Textarea
        value={specialInstructions}
        onChange={(event) => setSpecialInstructions(event.target.value)}
        placeholder="Delivery Instructions or Advice about the recipient"
      />
      <Button onClick={goToNextStage}>Continue</Button>
    </Stage>
  );
}

export default forwardRef(Stage6);
