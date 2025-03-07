import BoxCategoryHomepage from "@/components/BoxCategoryHomepage/BoxCategoryHomepage";
import { CarouselBox } from "@/components/CarouselBox/CarouselBox";
import CarouselCategory from "@/components/CarouselCategory/CarouselCategory";
import SectionHomepage from "@/components/SectionHomepage/SectionHomepage";
import { data } from "@/database/data";
import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategories(data.categories);
    setProducts(data.products);
  }, []);

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center rounded-3xl">
        <CarouselBox data={data.thumbnail} />

        <SectionHomepage products={products} />

        <div className="container mt-5 mb-16">
          <div className="mb-9 text-center text-4xl font-bold text-blue-950">
            Danh Mục Nổi Bật
          </div>
          <div className="grid grid-cols-2 gap-7">
            {categories.slice(0, 5).map((category, index) => (
              <div
                key={category.id}
                className={index == 2 ? "col-span-2" : ""}
              >
                <BoxCategoryHomepage
                  categoryName={category.category_name}
                  imageUrl={category.image_url}
                />
              </div>
            ))}
          </div>
          <div className="my-9 text-center text-4xl font-bold text-blue-950">
            Danh mục Sản phẩm theo mùa
          </div>
          <CarouselCategory categories={categories} />
        </div>
      </div>
    </div>
  );
}
