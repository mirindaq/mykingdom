import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductBox from "../ProductBox/ProductBox";

export default function CarouselProduct(props) {
  const { products } = props;

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {products.map((product,index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4"
            >
              <ProductBox product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
