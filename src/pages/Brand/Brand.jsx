import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function Brand() {
  const [selected, setSelected] = useState("ALL");
  const [brandsByAlphabet, setBrandsByAlphabet] = useState([]);

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.brands, label: "Thương hiệu" },
  ];
  
  useEffect(() => {
    fetch("http://localhost:5001/api/brands")
      .then((res) => res.json())
      .then((data) => {
        const groupedBrands = data.reduce((acc, brand) => {
          const firstChar = brand.name.charAt(0).toUpperCase();
          if (!acc[firstChar]) acc[firstChar] = { key: firstChar, brands: [] };
          acc[firstChar].brands.push(brand);
          return acc;
        }, {});

        console.log(groupedBrands);
        setBrandsByAlphabet(
          Object.values(groupedBrands).sort((a, b) =>
            a.key.localeCompare(b.key),
          ),
        );
      })
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  const filteredBrands = useMemo(() => {
    return selected === "ALL"
      ? brandsByAlphabet
      : brandsByAlphabet.filter((group) => group.key === selected);
  }, [selected, brandsByAlphabet]);

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>
      <div className="container mx-auto rounded-lg pb-14">
        <div className="mb-10 border-b-2 border-gray-200 py-10">
          {filteredBrands.length === 0 && (
            <p className="text-center">Không có thương hiệu</p>
          )}
          {filteredBrands.length > 0 && (
            <p className="text-base font-semibold">
              Có{" "}
              {filteredBrands.reduce(
                (acc, group) => acc + group.brands.length,
                0,
              )}{" "}
              thương hiệu
            </p>
          )}
        </div>

        {/* Filter Navigation */}
        <div className="mb-4 flex gap-3">
          <button
            className={`rounded-lg border px-5 py-3 text-lg font-bold hover:cursor-pointer ${
              selected === "ALL"
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelected("ALL")}
          >
            Tất cả
          </button>
          {brandsByAlphabet.map((group) => (
            <button
              key={group.key}
              className={`rounded-lg border px-5 py-3 text-lg font-bold hover:cursor-pointer ${
                selected === group.key
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelected(group.key)}
            >
              {group.key}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div>
          {filteredBrands.map((group, index) => (
            <div key={group.key}>
              <div className="my-14 flex items-center">
                <div className="mr-20 rounded-lg border-2 border-red-500 px-4 py-3 font-bold text-red-500">
                  {group.key}
                </div>
                <div className="grid w-full grid-cols-7 gap-y-7">
                  {group.brands.map((brand) => (
                    <Link
                      key={brand.id}
                      to={path.collections + `?brands=${brand.slug}`}
                      className="inline-block"
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="rounded"
                        width="110"
                        height="60"
                      />
                    </Link>
                  ))}
                </div>
              </div>
              {index < filteredBrands.length - 1 && (
                <hr className="mb-4 border-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
