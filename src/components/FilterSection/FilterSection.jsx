import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const FilterSection = ({
  title,
  isOpen,
  toggleSection,
  items,
  sectionId,
  onFilterChange,
  selectedFilters,
}) => {
  const handleCheckboxChange = (id, checked) => {
    onFilterChange(sectionId, id, checked);
  };

  const isItemChecked = (item) => {
    switch (sectionId) {
      case "price":
        const priceRanges = selectedFilters.price_ranges || [];
        const range =
          item.id === "price-under200k"
            ? "0-200000"
            : item.id === "price-200k-500k"
              ? "200000-500000"
              : item.id === "price-500k-1m"
                ? "500000-1000000"
                : item.id === "price-1m-2m"
                  ? "1000000-2000000"
                  : item.id === "price-2m-4m"
                    ? "2000000-4000000"
                    : "4000000";
        return priceRanges.includes(range);

      case "age":
        const ageRanges = selectedFilters.age_ranges || [];
        const ageRange =
          item.id === "age-0to12months"
            ? "0-12 tháng"
            : item.id === "age-1to3"
              ? "1-3 tuổi"
              : item.id === "age-3to6"
                ? "3-6 tuổi"
                : item.id === "age-6to12"
                  ? "6-12 tuổi"
                  : "12 tuổi trở lên";
        return ageRanges.includes(ageRange);

      case "category":
        return selectedFilters.categories?.includes(item.slug) || false;

      case "brand":
        return selectedFilters.brands?.includes(item.slug) || false;

      case "gender":
        return selectedFilters.genders?.includes(item.id) || false;

      default:
        return false;
    }
  };

  return (
    <div className="mb-4">
      <div className="my-3 flex items-center justify-between gap-5">
        <h2 className="text-xl font-semibold text-red-600">{title}</h2>
        <button
          className="text-red-600 hover:cursor-pointer"
          onClick={() => toggleSection(sectionId)}
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>
      <div className="max-h-[320px] overflow-y-auto my-2">
        {isOpen &&
          items.map((item, index) => (
            <FilterCheckbox
              key={index}
              id={item.slug || item.id}
              label={item.name}
              handleCheckboxChange={handleCheckboxChange}
              isChecked={isItemChecked(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default FilterSection;
