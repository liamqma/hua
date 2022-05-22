/// <reference types="cypress" />

describe("Flower shop", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shop/luxe-fleur");
  });

  it("makes an order", () => {
    const brief = "Please make it beautiful";
    const budget = "300";
    const presentation = "35";
    const deliveryLocation = "Business";
    const name = "John Doe";
    const address = "6/341 George St";
    const businessName = "Flower Power";
    const phoneNumber = "(02) 9262 1443";
    const email = "john.doe@gmail.com";
    const personalMessage = "This is a personal message";
    const deliveryTime = "Before Midday";
    const deliveryInstructions = "Watch out for the dogs";

    // stage 1
    cy.contains("Accept").click();
    // stage 2
    cy.get('input[placeholder="suburb"]').type("2000");
    cy.get("#suggestions > li").first().click();
    cy.contains("Continue").click();
    // stage 3
    cy.get("#arrangement").select("One variety");
    // stage 4
    cy.get('[data-test="style-0"]').click();
    cy.get('textarea[placeholder="Tell us what you would like"]').type(brief);
    cy.get("#continue-stage-4").click();
    // stage 5
    cy.get("#budget").select(budget);
    cy.get("#presentation").select(presentation);
    cy.get("#continue-stage-5").click();
    // stage 6
    cy.get("#delivery-location").select(deliveryLocation);
    cy.get('input[placeholder="Name"]').type(name);
    cy.get('input[placeholder="Address"]').type(address);
    cy.get('input[placeholder="Business name"]').type(businessName);
    cy.get('input[placeholder="Phone Number"]').type(phoneNumber);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('textarea[placeholder="Enter here"]').type(personalMessage);
    cy.get('button.react-calendar__tile:not([disabled=""])').first().click();
    cy.get("#delivery-time").select(deliveryTime);
    cy.get(
      'textarea[placeholder="Delivery Instructions or Advice about the recipient"]'
    ).type(deliveryInstructions);
    cy.get("#continue-stage-6").click();
    // stage 7
    cy.get("#stage-7")
      .should("contain", brief)
      .should("contain", budget)
      .should("contain", presentation)
      .should("contain", deliveryLocation)
      .should("contain", name)
      .should("contain", address)
      .should("contain", businessName)
      .should("contain", phoneNumber)
      .should("contain", email)
      .should("contain", personalMessage)
      .should("contain", deliveryTime)
      .should("contain", deliveryInstructions);
  });
});
