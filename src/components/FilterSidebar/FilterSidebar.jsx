import { useEffect, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import { brandApi } from "@/services/brand.api";
import { categoryApi } from "@/services/category.api";

const FilterSidebar = ({ onProductsUpdate, searchParams, setSearchParams }) => {
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(true);
  const [isAgeOpen, setAgeOpen] = useState(true);
  const [isGenderOpen, setGenderOpen] = useState(true);
  const [isBrandOpen, setBrandOpen] = useState(true);
  const [brandItems, setBrandItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

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
    { id: "boy", name: "Nam" },
    { id: "girl", name: "Nữ" },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    categories: searchParams.get("categories")?.split(",") || [],
    brands: searchParams.get("brands")?.split(",") || [],
    price_ranges: searchParams.get("price_ranges")?.split(",") || [],
    age_ranges: searchParams.get("age_ranges")?.split(",") || [],
    genders: searchParams.get("gender")?.split(",") || [],
  });

  useEffect(() => {
    brandApi.getAllBrands().then((data) => setBrandItems(data));
    categoryApi.getAllCategories().then((data) => setCategoryItems(data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedFilters]);

  const fetchProducts = async () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });

    const response = await fetch(
      `http://localhost:5001/api/products?${params.toString()}`,
    );

    const data = await response.json();
    onProductsUpdate(data);
  };

  const handleFilterChange = (sectionId, itemId, checked) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      const updateArray = (key, value) => {
        if (checked) {
          newFilters[key] = [...(prev[key] || [])];
          if (!newFilters[key].includes(value)) {
            newFilters[key].push(value);
          }
        } else {
          newFilters[key] = (prev[key] || []).filter((item) => item !== value);
        }
      };

      switch (sectionId) {
        case "price": {
          let range = "";
          switch (itemId) {
            case "price-under200k":
              range = "0-200000";
              break;
            case "price-200k-500k":
              range = "200000-500000";
              break;
            case "price-500k-1m":
              range = "500000-1000000";
              break;
            case "price-1m-2m":
              range = "1000000-2000000";
              break;
            case "price-2m-4m":
              range = "2000000-4000000";
              break;
            case "price-above4m":
              range = "4000000";
              break;
          }
          updateArray("price_ranges", range);
          break;
        }

        case "age": {
          let range = "";
          switch (itemId) {
            case "age-0to12months":
              range = "0-12 tháng";
              break;
            case "age-1to3":
              range = "1-3 tuổi";
              break;
            case "age-3to6":
              range = "3-6 tuổi";
              break;
            case "age-6to12":
              range = "6-12 tuổi";
              break;
            case "age-12plus":
              range = "12 tuổi trở lên";
              break;
          }
          updateArray("age_ranges", range);
          break;
        }

        case "category":
          updateArray("categories", itemId);
          break;

        case "brand":
          updateArray("brands", itemId);
          break;

        case "gender": {
          updateArray("gender", itemId);
          break;
        }
      }

      Object.keys(newFilters).forEach((key) => {
        if (Array.isArray(newFilters[key]) && newFilters[key].length === 0) {
          newFilters[key] = [];
        }
      });

      return newFilters;
    });
  };

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

  return (
    <div className="w-full bg-white px-7 py-4">
      <FilterSection
        title="Danh Mục"
        isOpen={isCategoryOpen}
        toggleSection={toggleSection}
        items={categoryItems}
        sectionId="category"
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Giá (₫)"
        isOpen={isPriceOpen}
        toggleSection={toggleSection}
        items={priceItems}
        sectionId="price"
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Tuổi"
        isOpen={isAgeOpen}
        toggleSection={toggleSection}
        items={ageItems}
        sectionId="age"
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Giới Tính"
        isOpen={isGenderOpen}
        toggleSection={toggleSection}
        items={genderItems}
        sectionId="gender"
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
      <FilterSection
        title="Thương Hiệu"
        isOpen={isBrandOpen}
        toggleSection={toggleSection}
        items={brandItems}
        sectionId="brand"
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />
    </div>
  );
};

export default FilterSidebar;
