import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { data } from "@/database/data";
import FilterSection from "../FilterSection/FilterSection";

const FilterSidebar = () => {
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(true);
  const [isAgeOpen, setAgeOpen] = useState(true);
  const [isGenderOpen, setGenderOpen] = useState(true);
  const [isBrandOpen, setBrandOpen] = useState(true);

  const toggleSection = (section) => {
    switch (section) {
      case "category":
        setCategoryOpen(!isCategoryOpen);
        break;
      case "price":
        setPriceOpen(!isPriceOpen);
        break;
      case "age":
        setAgeOpen(!isAgeOpen);
        break;
      case "gender":
        setGenderOpen(!isGenderOpen);
        break;
      case "brand":
        setBrandOpen(!isBrandOpen);
        break;
      default:
        break;
    }
  };

  const categoryItems = data.categories;

  const priceItems = [
    { id: "price-under200k", name: "Dưới 200.000 ₫" },
    { id: "price-200k-500k", name: "200.000 ₫ - 500.000 ₫" },
    { id: "price-500k-1m", name: "500.000 ₫ - 1.000.000 ₫" },
    { id: "price-1m-2m", name: "1.000.000 ₫ - 2.000.000 ₫" },
    { id: "price-2m-4m", name: "2.000.000 ₫ - 4.000.000 ₫" },
    { id: "price-above4m", name: "Trên 4.000.000 ₫" },
  ];

  const ageItems = [
    { id: "age-12plus", name: "12 tuổi trở lên" },
    { id: "age-6to12", name: "6-12 tuổi" },
    { id: "age-3to6", name: "3-6 tuổi" },
    { id: "age-1to3", name: "1-3 tuổi" },
    { id: "age-0to12months", name: "0-12 tháng" },
  ];

  const genderItems = [
    { id: "gender-boy", name: "Boy" },
    { id: "gender-girl", name: "Girl" },
    { id: "gender-preschool", name: "Preschool" },
    { id: "gender-unisex", name: "Unisex" },
  ];

  const brandItems = [
    { id: "brand-coolkids", name: "COOLKIDS" },
    { id: "brand-crayola", name: "CRAYOLA" },
    { id: "brand-curlimals", name: "CURLIMALS" },
    { id: "brand-cutiepops", name: "CUTIE POPS" },
    { id: "brand-dc", name: "DC" },
    { id: "brand-decora", name: "DECORA" },
    { id: "brand-dinosparty", name: "DINOS PARTY" },
    { id: "brand-dinoster", name: "DINOSTER" },
    { id: "brand-disney100", name: "DISNEY 100" },
    { id: "brand-disneydiecast", name: "DISNEY DIECAST" },
    { id: "brand-disneyplush", name: "DISNEY PLUSH" },
  ];

  return (
    <div className="w-full bg-white py-4 px-7">
      <FilterSection
        title="Danh Mục"
        isOpen={isCategoryOpen}
        toggleSection={toggleSection}
        items={categoryItems}
        sectionId="category"
      />
      <FilterSection
        title="Giá (₫)"
        isOpen={isPriceOpen}
        toggleSection={toggleSection}
        items={priceItems}
        sectionId="price"
      />
      <FilterSection
        title="Tuổi"
        isOpen={isAgeOpen}
        toggleSection={toggleSection}
        items={ageItems}
        sectionId="age"
      />
      <FilterSection
        title="Giới Tính"
        isOpen={isGenderOpen}
        toggleSection={toggleSection}
        items={genderItems}
        sectionId="gender"
      />
      <FilterSection
        title="Thương Hiệu"
        isOpen={isBrandOpen}
        toggleSection={toggleSection}
        items={brandItems}
        sectionId="brand"
      />
    </div>
  );
};

export default FilterSidebar;
