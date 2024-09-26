import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import useWindhowWidth from "../../hooks/windowWidth";
export default function LoyaltyAccordion({ accordionBody, user }) {
  const { isDesktop } = useWindhowWidth();
  return (
    <Accordion defaultActiveKey="1" className="customAccordions">
      <Accordion.Item eventKey="1">
        <Accordion.Header>{user}</Accordion.Header>
        <Accordion.Body
          style={{ backgroundColor: isDesktop ? "#212529" : "black" }}
        >
          {accordionBody}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

LoyaltyAccordion.propTypes = {
  accordionBody: PropTypes.element || null,
  user: PropTypes.string.isRequired,
};
