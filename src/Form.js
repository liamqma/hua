import React, { useState, createRef } from "react";
import styled from "@emotion/styled";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage6 from "./Stage6";
import Stage7 from "./Stage7";
import Payment from "./Payment";

const Container = styled.div`
  color: #111111;
  font-size: 16px;
  font-weight: 100;
`;

function Form() {
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [arrangement, setArrangement] = useState("");
  const [images, setImages] = useState([]);
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("");
  const [presentation, setPresentation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [email, setEmail] = useState("");

  const [stage, setStage] = useState(0);
  const stage2Ref = createRef();
  const stage3Ref = createRef();
  const stage4Ref = createRef();
  const stage5Ref = createRef();
  const stage6Ref = createRef();
  const stage7Ref = createRef();

  const goToNextStage = (nextStage, element) => {
    if (nextStage > stage) setStage(nextStage);
    if (element) {
      setTimeout(() => {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 40;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  };
  return (
    <Container>
      {stage === 8 ? (
        <Payment
          goBack={() => setStage(7)}
          arrangement={arrangement}
          images={images}
          brief={brief}
          budget={budget}
          presentation={presentation}
          deliveryLocation={deliveryLocation}
          name={name}
          email={email}
          address={address}
          businessName={businessName}
          phone={phone}
          postcode={postcode}
          suburb={suburb}
          message={message}
          deliveryDate={deliveryDate}
          deliveryTime={deliveryTime}
          specialInstructions={specialInstructions}
        />
      ) : (
        <>
          {" "}
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
          <Stage4
            images={images}
            setImages={setImages}
            brief={brief}
            setBrief={setBrief}
            ref={stage4Ref}
            stage={stage}
            goToNextStage={() => goToNextStage(5, stage5Ref.current)}
          />
          <Stage5
            budget={budget}
            setBudget={setBudget}
            presentation={presentation}
            setPresentation={setPresentation}
            ref={stage5Ref}
            stage={stage}
            goToNextStage={() => goToNextStage(6, stage6Ref.current)}
          />
          <Stage6
            stage={stage}
            ref={stage6Ref}
            postcode={postcode}
            suburb={suburb}
            deliveryLocation={deliveryLocation}
            setDeliveryLocation={setDeliveryLocation}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            businessName={businessName}
            setBusinessName={setBusinessName}
            email={email}
            phone={phone}
            setEmail={setEmail}
            setPhone={setPhone}
            message={message}
            setMessage={setMessage}
            deliveryDate={deliveryDate}
            setDeliveryDate={setDeliveryDate}
            deliveryTime={deliveryTime}
            setDeliveryTime={setDeliveryTime}
            specialInstructions={specialInstructions}
            setSpecialInstructions={setSpecialInstructions}
            goToNextStage={() => goToNextStage(7, stage7Ref.current)}
          />
          <Stage7
            stage={stage}
            ref={stage7Ref}
            arrangement={arrangement}
            images={images}
            brief={brief}
            budget={budget}
            presentation={presentation}
            deliveryLocation={deliveryLocation}
            name={name}
            address={address}
            businessName={businessName}
            phone={phone}
            email={email}
            postcode={postcode}
            suburb={suburb}
            message={message}
            deliveryDate={deliveryDate}
            deliveryTime={deliveryTime}
            specialInstructions={specialInstructions}
            goToNextStage={() => goToNextStage(8)}
          />
        </>
      )}
    </Container>
  );
}
export default Form;
