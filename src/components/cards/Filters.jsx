import { Button, Offcanvas } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { TiDelete } from "react-icons/ti";

function Filters({
  showFilter,
  closeOnSelect = false,
  closeActionLabel = "Close",
  closeActionVariant = "outline-secondary",
  closeActionStyle = {},
  filters,
  setCardNameFilter,
  setCardTypeFilter,
  setStatusFilter,
  setAnnualFeeFilter,
  resetFilters,
  setShowFilter,
}) {
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
      className="filter-drawer"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group
            className="mb-3 pb-3 filter-section"
            controlId="filter-card-name"
          >
            <Form.Label className="fw-semibold">Card Name</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                value={filters.cardName || ""}
                placeholder="Search cards"
                onChange={(e) => setCardNameFilter(e.target.value)}
                className="filter-input"
              />
              {filters.cardName ? (
                <button
                  type="button"
                  onClick={() => setCardNameFilter("")}
                  aria-label="Clear card name filter"
                  className="filter-clear-button"
                >
                  <TiDelete size={20} />
                </button>
              ) : null}
            </div>
          </Form.Group>

          <Form.Group className="mb-3 pb-3 filter-section">
            <Form.Label className="fw-semibold">Card Type</Form.Label>
            <Form.Check
              id="cardType-all"
              label="All"
              type="radio"
              name="cardType"
              value={filters.cardType}
              onChange={() => applyFilterAndMaybeClose(setCardTypeFilter, "")}
              checked={filters.cardType === ""}
              className="filter-option-label"
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
              className="filter-option-label"
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
              className="filter-option-label"
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3 filter-section">
            <Form.Label className="fw-semibold">Card Status</Form.Label>
            <Form.Check
              id="status-all"
              label="All"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() => applyFilterAndMaybeClose(setStatusFilter, "")}
              checked={filters.status === ""}
              className="filter-option-label"
            />
            <Form.Check
              id="status-open"
              label="Open"
              type="radio"
              name="status"
              value={filters.status}
              onChange={() => applyFilterAndMaybeClose(setStatusFilter, "open")}
              checked={filters.status === "open"}
              className="filter-option-label"
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
              className="filter-option-label"
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
              className="filter-option-label"
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3 filter-section">
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
              className="filter-option-label"
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-2">
            <Button onClick={resetFilters} className="filter-reset-button">
              Reset Filters
            </Button>
            <Button
              variant={closeActionVariant}
              style={closeActionStyle}
              onClick={() => setShowFilter(false)}
            >
              {closeActionLabel}
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Filters;
