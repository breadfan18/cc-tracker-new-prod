import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
export default function LoyaltyAccordion({ accordionBody, user }) {
  return (
    <Accordion defaultActiveKey="1" className="customAccordions">
      <Accordion.Item eventKey="1">
        <Accordion.Header>{user}</Accordion.Header>
        <Accordion.Body>{accordionBody}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

LoyaltyAccordion.propTypes = {
  accordionBody: PropTypes.element || null,
  user: PropTypes.string.isRequired,
};
