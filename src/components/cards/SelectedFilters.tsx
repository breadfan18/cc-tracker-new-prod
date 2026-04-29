import { Button } from "react-bootstrap";

type FilterValues = {
  cardName: string;
  cardType: string;
  status: string;
  annualFee: string;
};

type SelectedFiltersProps = {
  filters: FilterValues;
  resetFilters: () => void;
};

type ActiveFilter = {
  label: string;
  value: string;
};

const getActiveFilters = (filters: FilterValues): ActiveFilter[] => {
  const activeFilters: ActiveFilter[] = [];

  if (filters.cardName) {
    activeFilters.push({ label: "Card Name", value: filters.cardName });
  }

  if (filters.cardType) {
    activeFilters.push({ label: "Type", value: filters.cardType });
  }

  if (filters.status) {
    activeFilters.push({
      label: "Status",
      value: `${filters.status.charAt(0).toUpperCase()}${filters.status.slice(1)}`,
    });
  }

  if (filters.annualFee === "show") {
    activeFilters.push({ label: "Annual Fee", value: "Only" });
  }

  return activeFilters;
};

function SelectedFilters({ filters, resetFilters }: SelectedFiltersProps) {
  const activeFilters = getActiveFilters(filters);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="selected-filters-bar">
      <div className="selected-filters-list">
        {activeFilters.map((filter) => (
          <span
            key={`${filter.label}-${filter.value}`}
            className="selected-filter-chip"
          >
            <strong>{filter.label}:</strong> {filter.value}
          </span>
        ))}
      </div>
      <Button className="selected-filters-clear-button" onClick={resetFilters}>
        Clear All
      </Button>
    </div>
  );
}

export default SelectedFilters;
