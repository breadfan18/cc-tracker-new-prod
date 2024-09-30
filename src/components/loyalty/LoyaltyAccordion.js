import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import useWindhowWidth from "../../hooks/windowWidth";
import { useSelector } from "react-redux";
export default function LoyaltyAccordion({ accordionBody, user }) {
  const { isDesktop } = useWindhowWidth();
  const theme = useSelector((state) => state.theme);
  return (
    <Accordion defaultActiveKey="1" className="customAccordions">
      <Accordion.Item eventKey="1">
        <Accordion.Header>{user}</Accordion.Header>
        <Accordion.Body
          style={{
            backgroundColor:
              isDesktop && theme === "dark"
                ? "#212529"
                : theme === "dark"
                ? "black"
                : null,
          }}
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
