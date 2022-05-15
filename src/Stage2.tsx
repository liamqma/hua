import React, { forwardRef, useState, ForwardedRef } from "react";
import { Stage, Button, Input } from "./common.styles";
import styled from "@emotion/styled";
import data from "./suburb.json";

const Control = styled.div`
  position: relative;
`;

const UL = styled.ul`
  position: absolute;
  top: 39px;
  background-color: white;
  list-style-type: none;
  border: 2px solid black;
  border-top: none;
  margin: 0;
  padding: 10px 16px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  font-size: 14px;
  width: 200px;
  li {
    text-align: left;
    padding: 5px 0;
    cursor: pointer;
  }
`;

function Stage2({ stage, goToNextStage, setPostcode, setSuburb }: { stage: number, goToNextStage: () => void, setPostcode: (p: string) => void, setSuburb: (p: string) => void }, ref: ForwardedRef<HTMLParagraphElement>) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [suggestions, setSuggestions] = useState<Array<{ name: string, postcode: string }>>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (event.target.value) {
      setSuggestions(
        data.filter((item) => {
          return (
            item.postcode.includes(event.target.value) ||
            item.name.toLowerCase().includes(event.target.value.toLowerCase())
          );
        })
      );
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (name: string) => {
    setIsValid(true);
    setValue(name);
    setSuggestions([]);
  };

  const SuggestionComponent = suggestions.length ? (
    <UL>
      {suggestions.map((suggestion) => (
        <li
          onClick={() => onSuggestionClick(suggestion.name)}
          key={suggestion.name}
        >
          {suggestion.name} {suggestion.postcode}
        </li>
      ))}
    </UL>
  ) : null;

  const onContinueButtonClick = () => {
    const found = data.filter(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    if (found.length) {
      setIsValid(true);
      setPostcode(found[0].postcode);
      setSuburb(found[0].name);
      goToNextStage();
    } else {
      setIsValid(false);
    }
  };

  return (
    <Stage hidden={stage < 2}>
      <p ref={ref}>
        {isValid
          ? "Our delivery service includes a limited area of Sydney. please enter your recipient's suburb:"
          : "We're sorry, your recipient's suburb is not included in our delivery area."}
      </p>
      <Control>
        <Input
          invalid={!isValid}
          value={value}
          onChange={onChange}
          type="text"
          placeholder="suburb"
        />
        {SuggestionComponent}
      </Control>
      <Button onClick={onContinueButtonClick}>
        {isValid ? "Continue" : "Try again"}
      </Button>
    </Stage>
  );
}

export default forwardRef(Stage2);
