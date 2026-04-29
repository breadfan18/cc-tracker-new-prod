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

const getActiveFilters = (filters: FilterValues): string[] => {
  const activeFilters: string[] = [];

  if (filters.cardName) {
    activeFilters.push(`Card Name: ${filters.cardName}`);
  }

  if (filters.cardType) {
    activeFilters.push(`Type: ${filters.cardType}`);
  }

  if (filters.status) {
    activeFilters.push(
      `Status: ${filters.status.charAt(0).toUpperCase()}${filters.status.slice(1)}`,
    );
  }

  if (filters.annualFee === "show") {
    activeFilters.push("Annual Fee Only");
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
          <span key={filter} className="selected-filter-chip">
            {filter}
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
