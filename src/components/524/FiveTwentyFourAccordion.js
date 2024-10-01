import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import { APP_COLOR_BLUE } from "../../constants";
import useWindhowWidth from "../../hooks/windowWidth";
import { useSelector } from "react-redux";
export default function FiveTwentyFourAccordion({
  showCards,
  five24Cards,
  user,
  fiveTwentyFourStatusElement,
}) {
  const { isDesktop } = useWindhowWidth();
  const [cardsShowing, setCardsShowing] = useState(false);
  const theme = useSelector((state) => state.theme);

  return (
    <div className="five24Card">
      <div style={{ padding: "15px 25px" }}>
        <h4 style={{ color: APP_COLOR_BLUE }}>{user}</h4>
        <hr />
        <div>{fiveTwentyFourStatusElement}</div>
      </div>
      {showCards && (
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header
              id="five24AccordionHeader"
              onClick={() => setCardsShowing(!cardsShowing)}
            >
              {cardsShowing ? "Hide Cards" : "Show Cards"}
            </Accordion.Header>
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
              {five24Cards}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
}

FiveTwentyFourAccordion.propTypes = {
  five24Cards: PropTypes.element || null,
  user: PropTypes.string.isRequired,
  fiveTwentyFourStatusElement: PropTypes.object || PropTypes.string,
};
