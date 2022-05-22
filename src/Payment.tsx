import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { loadStripe, PaymentIntent, Appearance } from "@stripe/stripe-js";
import plantLoadingIcon from "./images/plant-loading-icon.gif";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { Button as SiteButton } from "./common.styles";
import { imgs } from "./types";

const PaymentMessage = styled.div`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`;

const Button = styled.button`
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
  margin-top: 24px;

  :hover {
    filter: contrast(115%);
  }

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const loading = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border-radius: 50%;
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  :before,
  :after {
    position: absolute;
    content: "";
  }

  :before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: ${loading} 2s infinite ease 1.5s;
    animation: ${loading} 2s infinite ease 1.5s;
  }

  :after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: ${loading} 2s infinite ease;
    animation: ${loading} 2s infinite ease;
  }
`;

const stripePromise = loadStripe("pk_test_Kf7AMqlAGeUrs9p2ARVXT6hp");

function CheckoutForm({ isReturnURL = false }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [pIntent, setPIntent] = useState<PaymentIntent | undefined>(undefined);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPIntent(paymentIntent);
      switch (paymentIntent?.status) {
        case "succeeded":
          setShowThankYouMessage(true);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-return`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  if (!pIntent && isReturnURL)
    return <img alt="loading..." src={plantLoadingIcon} />;

  if (showThankYouMessage && pIntent)
    return (
      <>
        <p>Thank you for your order.</p>
        <p>Order ID: {pIntent.id}</p>
      </>
    );

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <Spinner /> : "Pay now"}</span>
      </Button>
      {/* Show any error or success messages */}
      {message && <PaymentMessage>{message}</PaymentMessage>}
    </form>
  );
}

function Payment({
  goBack,
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
}: {
  goBack: () => void,
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
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/app/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: (parseInt(budget) + parseInt(presentation)) * 100,
        name,
        email,
        suburb,
        address,
        postcode,
        phone,
        arrangement,
        images: images.map((i) => i.name).join(","),
        brief,
        deliveryLocation,
        businessName,
        message,
        deliveryDate: deliveryDate ? `${deliveryDate.getDate()}-${deliveryDate.getMonth() + 1
          }-${deliveryDate.getFullYear()}` : 'unknown',
        deliveryTime,
        specialInstructions,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setClientSecret(data.clientSecret);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [
    address,
    arrangement,
    brief,
    budget,
    businessName,
    deliveryDate,
    deliveryLocation,
    deliveryTime,
    images,
    message,
    name,
    phone,
    postcode,
    presentation,
    specialInstructions,
    suburb,
    email,
  ]);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) return <img alt="loading..." src={plantLoadingIcon} />;

  if (isError || !clientSecret)
    return (
      <>
        <p>Sorry, something went wrong.</p>
        <SiteButton onClick={goBack}>Go back</SiteButton>
      </>
    );

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export function PaymentReturn() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) return null;

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm isReturnURL={true} />
    </Elements>
  );
}

export default Payment;
