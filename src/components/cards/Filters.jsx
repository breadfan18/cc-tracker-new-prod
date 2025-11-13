import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useWindhowWidth from "../../hooks/windowWidth";
import { APP_COLOR_BLACK_OPACITY, DELETE_COLOR_RED } from "../../constants";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";

function Filters({
  filters,
  setCardNameFilter,
  setCardTypeFilter,
  setStatusFilter,
  setAnnualFeeFilter,
  resetFilters,
  setShowFilter,
}) {
  const { windowWidth } = useWindhowWidth();
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <hr style={{ color: theme === "dark" ? "white" : null }} />

      <div
        className="filtersContainer"
        style={{
          display: windowWidth < 772 ? "grid" : null,
          backgroundColor: theme === "light" && APP_COLOR_BLACK_OPACITY,
        }}
      >
        <input
          type="text"
          value={filters.cardName || ""}
          placeholder="Filter by card name"
          onChange={(e) => setCardNameFilter(e.target.value)}
          className="inputFilters"
          style={{ padding: windowWidth < 772 ? "20px" : null }}
        />
        <div
          className="statusFilters"
          style={{ padding: windowWidth < 772 ? "20px" : null }}
        >
          <Form.Check
            id="cardType-all"
            label="All"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("")}
            className="radioFilters"
            checked={filters.cardType === ""}
          />
          <Form.Check
            id="cardType-personal"
            label="Personal"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("Personal")}
            className="radioFilters"
            checked={filters.cardType === "Personal"}
          />
          <Form.Check
            id="cardType-business"
            label="Business"
            type="radio"
            name="cardType"
            value={filters.cardType}
            onChange={() => setCardTypeFilter("Business")}
            checked={filters.cardType === "Business"}
            className="radioFilters"
          />
        </div>
        <div
          className="statusFilters"
          style={{ padding: windowWidth < 772 ? "20px" : null }}
        >
          <Form.Check
            id="status-all"
            label="All"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("")}
            className="radioFilters"
            checked={filters.status === ""}
          />
          <Form.Check
            id="status-open"
            label="Open"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("open")}
            checked={filters.status === "open"}
            className="radioFilters"
          />
          <Form.Check
            id="status-closed"
            label="Closed"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("closed")}
            checked={filters.status === "closed"}
            className="radioFilters"
          />
          <Form.Check
            id="status-downgraded"
            label="Downgraded"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("downgraded")}
            checked={filters.status === "downgraded"}
            className="radioFilters"
          />
        </div>
        <div
          className="statusFilters"
          style={{ padding: windowWidth < 772 ? "20px" : null }}
        >
          <Form.Check
            id="annual-fee-toggle"
            label="Cards with Annual Fee"
            type="checkbox"
            name="cardsWithAnnualFee"
            onChange={() =>
              setAnnualFeeFilter(filters.annualFee === "show" ? "" : "show")
            }
            className="radioFilters"
            checked={filters.annualFee === "show"}
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
        <TiDelete
          className="filters-close-icon"
          onClick={() => setShowFilter(false)}
        />
      </div>
      <hr style={{ color: theme === "dark" ? "white" : null }} />
    </>
  );
}

export default Filters;
