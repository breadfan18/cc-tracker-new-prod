import React from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Comments</Popover.Header>
    <Popover.Body>
      <table>
        <tr>
          <td>Card closed on 01-01-2023</td>
        </tr>
        <hr />
        <tr>
          <td>Eligible to reapply on 01/01/2027</td>
        </tr>
        <hr />
        <tr>
          <td>Eligible to reapply on 01/01/2027</td>
        </tr>
        <hr />
        <tr>
          <td>Eligible to reapply on 01/01/2027</td>
        </tr>
        <hr />
        <tr>
          <td>Eligible to reapply on 01/01/2027</td>
        </tr>
        <hr />
        <tr>
          <td>Eligible to reapply on 01/01/2027</td>
        </tr>
      </table>
    </Popover.Body>
  </Popover>
);

export const BonusTooltip = () => (
  <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
    <Button
      variant="success"
      className="rounded-circle"
      style={{
        height: "5px",
        width: "5px",
        borderRadius: "50%",
        color: "rgba(0,0,0,0.05",
      }}
    >
      ?
    </Button>
  </OverlayTrigger>
);
