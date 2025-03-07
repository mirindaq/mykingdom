import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import ListProductSearch from "@/components/ListProductSearch/ListProductSearch";
import { data } from "@/database/data";
import { Grid2X2, Grid3x3, LayoutGrid } from "lucide-react";
import React, { use, useEffect, useState } from "react";

export default function Collection() {
  const [viewType, setViewType] = useState("grid3x3");
  const [sortOption, setSortOption] = useState("Mặc định");
  const [products, setProducts] = useState([]);

  useEffect(() => setProducts(data.products), []);

  const handleViewChange = (type) => {
    console.log(type);
    setViewType(type);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <div className="container mx-auto my-10 grid grid-cols-10 gap-6">
      <div className="col-span-2">
        <FilterSidebar />
      </div>
      <div className="col-span-8">
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">Kiểu xem</span>
            <button
              onClick={() => handleViewChange("grid2x2")}
              className="hover:cursor-pointer"
            >
              <Grid2X2 />
            </button>
            <button
              onClick={() => handleViewChange("grid3x3")}
              className="hover:cursor-pointer"
            >
              <Grid3x3 />
            </button>
          </div>
          <div className="text-sm text-gray-700">10 products</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Sắp xếp theo:</span>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="rounded-md border px-2 py-1 text-sm"
            >
              <option value="Mặc định">Mặc định</option>
              <option value="Giá thấp đến cao">Giá thấp đến cao</option>
              <option value="Giá cao đến thấp">Giá cao đến thấp</option>
              <option value="Tên A-Z">Tên A-Z</option>
            </select>
          </div>
        </div>
        <div>
          <ListProductSearch viewType={viewType} products={products} />
        </div>
      </div>
    </div>
  );
}
