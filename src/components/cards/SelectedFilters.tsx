import { Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

type FilterValues = {
  cardName: string;
  cardType: string;
  status: string;
  annualFee: string;
};

type SelectedFiltersProps = {
  filters: FilterValues;
  resetFilters: () => void;
  onRemoveFilter: (filterKey: keyof FilterValues) => void;
};

type ActiveFilter = {
  key: keyof FilterValues;
  label: string;
  value: string;
};

const getActiveFilters = (filters: FilterValues): ActiveFilter[] => {
  const activeFilters: ActiveFilter[] = [];

  if (filters.cardName) {
    activeFilters.push({
      key: "cardName",
      label: "Card Name",
      value: filters.cardName,
    });
  }

  if (filters.cardType) {
    activeFilters.push({
      key: "cardType",
      label: "Type",
      value: filters.cardType,
    });
  }

  if (filters.status) {
    activeFilters.push({
      key: "status",
      label: "Status",
      value: `${filters.status.charAt(0).toUpperCase()}${filters.status.slice(1)}`,
    });
  }

  if (filters.annualFee === "show") {
    activeFilters.push({
      key: "annualFee",
      label: "Annual Fee",
      value: "Only",
    });
  }

  return activeFilters;
};

function SelectedFilters({
  filters,
  resetFilters,
  onRemoveFilter,
}: SelectedFiltersProps) {
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
            <button
              type="button"
              className="selected-filter-remove-button"
              aria-label={`Remove ${filter.label} filter`}
              onClick={() => onRemoveFilter(filter.key)}
            >
              <IoClose />
            </button>
          </span>
        ))}
      </div>
      {activeFilters.length >= 2 ? (
        <Button
          className="selected-filters-clear-button"
          onClick={resetFilters}
        >
          Clear All
        </Button>
      ) : null}
    </div>
  );
}

export default SelectedFilters;
