import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function FiveTwentyFourAccordion({
  five24Cards,
  user,
  fiveTwentyFourStatusElement,
}) {
  const [cardsShowing, setCardsShowing] = useState(false);
  return (
    <Accordion
      defaultActiveKey={["0"]}
      style={{
        borderRadius: "10px",
        boxShadow: user ? "0 0 10px gray" : "none",
      }}
      alwaysOpen
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>{user}</Accordion.Header>
        <Accordion.Body>{fiveTwentyFourStatusElement}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header
          id="five24AccordionHeader"
          onClick={() => setCardsShowing(!cardsShowing)}
        >
          {cardsShowing ? "Hide Cards" : "Show Cards"}
        </Accordion.Header>
        <Accordion.Body>{five24Cards}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

FiveTwentyFourAccordion.propTypes = {
  five24Cards: PropTypes.element || null,
  user: PropTypes.string.isRequired,
  fiveTwentyFourStatusElement: PropTypes.object || PropTypes.string,
};
