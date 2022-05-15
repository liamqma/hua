import styled from "@emotion/styled";

type InputProps = {
  invalid?: boolean
}

const common = `
  border: 2px solid black;
  padding: 10px;
  color: #454545;
  font-weight: 700;
  background-color: white;
  width: 200px;
  margin: 0.5em auto;
  display: block;
  -webkit-appearance: none;
`;

export const Stage = styled.section`
  padding-top: 30px;
  margin-top: 46px;
  border-top: 1px solid black;
`;

export const Button = styled.button`
  ${common}
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.disabled ? 0 : 1)};
`;

export const Input = styled.input<InputProps>`
  ${common}
  border-color: ${(props) => (props.invalid ? "red" : "black")};
`;

export const Textarea = styled.textarea`
  ${common}
  width: 80%;
`;

export const Select = styled.select`
  ${common}
`;

export const P = styled.p`
  font-size: 26px;
  line-height: 180%;
`;
