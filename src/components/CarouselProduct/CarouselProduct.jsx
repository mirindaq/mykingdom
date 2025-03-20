import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductBox, { ProductBoxSkeleton } from "../ProductBox/ProductBox";

export default function CarouselProduct(props) {
  const { products, isLoading } = props;

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {isLoading && (
            <div className="grid grid-cols-4 gap-6 w-full mt-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductBoxSkeleton key={index} />
              ))}
            </div>
          )}

          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
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
