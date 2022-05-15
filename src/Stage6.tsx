import { forwardRef, ForwardedRef } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import differenceInDays from "date-fns/differenceInDays";
import isSunday from "date-fns/isSunday";
import formatISO from "date-fns/formatISO";

import "./firebase";
import { Stage, Select, Input, Textarea, Button } from "./common.styles";
import "react-calendar/dist/Calendar.css";

let disabledDates: Array<string>;
get(child(ref(getDatabase()), "items")).then((snapshot) => {
  if (snapshot.exists()) {
    const items = snapshot.val();
    if (items) {
      disabledDates = Object.keys(items);
    }
  }
});

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
  }: {
    stage: number,
    postcode: string,
    suburb: string,
    deliveryLocation: string,
    setDeliveryLocation: (s: string) => void,
    name: string,
    setName: (s: string) => void,
    address: string,
    setAddress: (s: string) => void,
    businessName: string,
    setBusinessName: (s: string) => void,
    phone: string,
    setPhone: (s: string) => void,
    email: string,
    setEmail: (s: string) => void,
    message: string,
    setMessage: (s: string) => void,
    deliveryDate: Date,
    setDeliveryDate: (s: Date) => void,
    deliveryTime: string,
    setDeliveryTime: (s: string) => void,
    specialInstructions: string,
    setSpecialInstructions: (s: string) => void,
    goToNextStage: () => void,
  },
  ref: ForwardedRef<HTMLParagraphElement>
) {
  const today = new Date();
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
      <Calendar
        calendarType="US"
        onChange={setDeliveryDate}
        tileDisabled={({ date }) => {
          if (isSunday(date)) return true;
          if (differenceInDays(date, today) < 3) return true;
          const dateString = formatISO(date, { representation: "date" });
          if (disabledDates && disabledDates.includes(dateString)) return true;
          return false;
        }}
        value={deliveryDate}
      />
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
