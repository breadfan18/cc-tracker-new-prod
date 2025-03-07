import { Accordion } from "react-bootstrap";
import useWindhowWidth from "../../hooks/windowWidth";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";

export default function LoyaltyAccordion({
  accordionBody,
  user,
}: {
  accordionBody: JSX.Element;
  user: string;
}) {
  const { isDesktop } = useWindhowWidth();
  const theme = useSelector((state: MainReduxState) => state.theme);

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
                : "",
          }}
        >
          {accordionBody}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
