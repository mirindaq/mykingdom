import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import BoxCategoryHomepage from "../BoxCategoryHomepage/BoxCategoryHomepage";
export default function CarouselCategory(props) {
  const { categories } = props;
  console.log(categories);
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {categories.slice(5).map((category) => (
            <CarouselItem key={category.slug} className="md:basis-1/2 lg:basis-1/4">
              <BoxCategoryHomepage
                categoryName={category.category_name}
                imageUrl={category.image_url}
                slug={category.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
