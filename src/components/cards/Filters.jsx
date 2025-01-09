import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useWindhowWidth from "../../hooks/windowWidth";
import { DELETE_COLOR_RED } from "../../constants";

function Filters({
  filters,
  setCardNameFilter,
  setCardTypeFilter,
  setStatusFilter,
  resetFilters,
}) {
  const { windowWidth } = useWindhowWidth();

  return (
    <>
      <hr />

      <div
        className="filtersContainer"
        style={windowWidth < 772 ? { display: "grid" } : null}
      >
        <input
          type="text"
          value={filters.cardName || ""}
          placeholder="Filter by card name"
          onChange={(e) => setCardNameFilter(e.target.value)}
          className="inputFilters"
        />
        <div className="statusFilters">
          <Form.Check
            label="All"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("")}
            className="radioFilters"
            checked={filters.cardType === ""}
          />
          <Form.Check
            label="Personal"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("Personal")}
            className="radioFilters"
            checked={filters.cardType === "Personal"}
          />
          <Form.Check
            label="Business"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("Business")}
            checked={filters.cardType === "Business"}
            className="radioFilters"
          />
        </div>
        <div className="statusFilters">
          <Form.Check
            label="All"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("")}
            className="radioFilters"
            checked={filters.status === ""}
          />
          <Form.Check
            label="Open"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("open")}
            checked={filters.status === "open"}
            className="radioFilters"
          />
          <Form.Check
            label="Closed"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("closed")}
            checked={filters.status === "closed"}
            className="radioFilters"
          />
          <Form.Check
            label="Downgraded"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("downgraded")}
            checked={filters.status === "downgraded"}
            className="radioFilters"
          />
        </div>

        <Button
          onClick={resetFilters}
          style={{
            backgroundColor: DELETE_COLOR_RED,
            border: "none",
            fontSize: "12px",
            width: windowWidth < 772 ? "98%" : null,
          }}
        >
          Reset
        </Button>
      </div>
      <hr />
    </>
  );
}

export default Filters;
