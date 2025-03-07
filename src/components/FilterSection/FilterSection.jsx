import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const FilterSection = ({ title, isOpen, toggleSection, items, sectionId }) => {
  return (
    <div className="mb-4">
      <div className="my-3 flex items-center justify-between gap-5">
        <h2 className="text-lg font-semibold text-red-600">{title}</h2>
        <button
          className="text-red-600 hover:cursor-pointer"
          onClick={() => toggleSection(sectionId)}
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>
      {isOpen &&
        items.map((item) => (
          <FilterCheckbox key={item.id} id={item.id} label={item.name} />
        ))}
    </div>
  );
};

export default FilterSection;
