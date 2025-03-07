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
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {categories.slice(5).map((category) => (
            <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/4">
              <BoxCategoryHomepage
                categoryName={category.category_name}
                imageUrl={category.image_url}
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
