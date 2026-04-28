import { Button, Offcanvas } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { DELETE_COLOR_RED } from "../../constants";

function Filters({
  showFilter,
  closeOnSelect = false,
  filters,
  setCardNameFilter,
  setCardTypeFilter,
  setStatusFilter,
  setAnnualFeeFilter,
  resetFilters,
  setShowFilter,
}) {
  const sectionStyle = { borderBottom: "1px solid #e9ecef" };
  const optionStyle = { color: "#6c757d", fontSize: "0.9rem" };

  const applyFilterAndMaybeClose = (setFilter, value) => {
    setFilter(value);
    if (closeOnSelect) {
      setShowFilter(false);
    }
  };

  return (
    <Offcanvas
      show={showFilter}
      onHide={() => setShowFilter(false)}
      placement="end"
      style={{ width: "min(92vw, 420px)" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group
            className="mb-3 pb-3"
            style={sectionStyle}
            controlId="filter-card-name"
          >
            <Form.Label className="fw-semibold">Card Name Or Issuer</Form.Label>
            <Form.Control
              type="text"
              value={filters.cardName || ""}
              placeholder="Search cards"
              onChange={(e) => setCardNameFilter(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3" style={sectionStyle}>
            <Form.Label className="fw-semibold">Card Type</Form.Label>
            <Form.Check
              id="cardType-all"
              label="All"
              type="radio"
              name="cardType"
              value={filters.cardType}
              onChange={() => applyFilterAndMaybeClose(setCardTypeFilter, "")}
              checked={filters.cardType === ""}
              style={optionStyle}
            />
            <Form.Check
              id="cardType-personal"
              label="Personal"
              type="radio"
              name="cardType"
              value={filters.cardType}
              onChange={() =>
                applyFilterAndMaybeClose(setCardTypeFilter, "Personal")
              }
              checked={filters.cardType === "Personal"}
              style={optionStyle}
            />
            <Form.Check
              id="cardType-business"
              label="Business"
              type="radio"
              name="cardType"
              value={filters.cardType}
              onChange={() =>
                applyFilterAndMaybeClose(setCardTypeFilter, "Business")
              }
              checked={filters.cardType === "Business"}
              style={optionStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3" style={sectionStyle}>
            <Form.Label className="fw-semibold">Card Status</Form.Label>
            <Form.Check
              id="status-all"
              label="All"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() => applyFilterAndMaybeClose(setStatusFilter, "")}
              checked={filters.status === ""}
              style={optionStyle}
            />
            <Form.Check
              id="status-open"
              label="Open"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() => applyFilterAndMaybeClose(setStatusFilter, "open")}
              checked={filters.status === "open"}
              style={optionStyle}
            />
            <Form.Check
              id="status-closed"
              label="Closed"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() =>
                applyFilterAndMaybeClose(setStatusFilter, "closed")
              }
              checked={filters.status === "closed"}
              style={optionStyle}
            />
            <Form.Check
              id="status-downgraded"
              label="Downgraded"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() =>
                applyFilterAndMaybeClose(setStatusFilter, "downgraded")
              }
              checked={filters.status === "downgraded"}
              style={optionStyle}
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3" style={sectionStyle}>
            <Form.Label className="fw-semibold">Annual Fee</Form.Label>
            <Form.Check
              id="annual-fee-toggle"
              label="Cards with annual fee"
              type="checkbox"
              name="cardsWithAnnualFee"
              onChange={() =>
                applyFilterAndMaybeClose(
                  setAnnualFeeFilter,
                  filters.annualFee === "show" ? "" : "show",
                )
              }
              checked={filters.annualFee === "show"}
              style={optionStyle}
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-2">
            <Button
              onClick={resetFilters}
              style={{
                backgroundColor: DELETE_COLOR_RED,
                border: "none",
                fontSize: "14px",
              }}
            >
              Reset Filters
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setShowFilter(false)}
            >
              Close
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Filters;
