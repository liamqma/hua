import { forwardRef, ForwardedRef } from "react";
import styled from "@emotion/styled";
import { Stage, Button } from "./common.styles";
import { imgs } from "./types";

const Table = styled.table`
  width: 100%;

  th,
  td {
    padding: 15px;
    text-align: left;
  }
`;

const Image = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 5px;
  display: inline-block;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function Stage7(
  {
    stage,
    arrangement,
    images,
    brief,
    budget,
    presentation,
    deliveryLocation,
    name,
    address,
    businessName,
    phone,
    email,
    postcode,
    suburb,
    message,
    deliveryDate,
    deliveryTime,
    specialInstructions,
    goToNextStage,
  }: {
    stage: number,
    arrangement: string,
    images: imgs,
    brief: string,
    budget: string,
    presentation: string,
    deliveryLocation: string,
    name: string,
    address: string,
    businessName: string,
    phone: string,
    email: string,
    postcode: string,
    suburb: string,
    message: string,
    deliveryDate: Date | null,
    deliveryTime: string,
    specialInstructions: string,
    goToNextStage: () => void,
  },
  ref: ForwardedRef<HTMLParagraphElement>
) {
  return (
    <Stage id="stage-7" hidden={stage < 7}>
      <p ref={ref}>Please confirm:</p>
      <Table>
        <tbody>
          <tr>
            <td colSpan={2}>{arrangement}</td>
          </tr>
          {images.length ? (
            <tr>
              <td colSpan={2}>
                {images.map((i) => (
                  <Image
                    key={i.name}
                    style={{ backgroundImage: `url(${i.path})` }}
                  />
                ))}
              </td>
            </tr>
          ) : null}
          {brief ? (
            <tr>
              <td>Brief</td>
              <td>{brief}</td>
            </tr>
          ) : null}
          <tr>
            <td>Budget</td>
            <td>${budget}</td>
          </tr>
          <tr>
            <td>Presentation</td>
            <td>{presentation}</td>
          </tr>
          <tr>
            <td>Delivery Location</td>
            <td>{deliveryLocation}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
          {businessName ? (
            <tr>
              <td>Business Name</td>
              <td>{businessName}</td>
            </tr>
          ) : null}
          <tr>
            <td>Suburb</td>
            <td>{suburb}</td>
          </tr>
          <tr>
            <td>Postcode</td>
            <td>{postcode}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Message</td>
            <td>{message}</td>
          </tr>
          <tr>
            <td>Delivery Date</td>
            <td>{deliveryDate && `${deliveryDate.getDate()}-${deliveryDate.getMonth() + 1}-${deliveryDate.getFullYear()}`}
            </td>
          </tr>
          <tr>
            <td>Delivery Time</td>
            <td>{deliveryTime}</td>
          </tr>
          {specialInstructions ? (
            <tr>
              <td>Special Instructions</td>
              <td>{specialInstructions}</td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      <Button onClick={goToNextStage}>Checkout</Button>
    </Stage>
  );
}

export default forwardRef(Stage7);
