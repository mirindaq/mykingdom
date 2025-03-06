import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductBox from "../ProductBox/ProductBox";
import { Slider } from "@radix-ui/react-slider";

export default function CarouselProduct() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <ProductBox />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />

      </Carousel>
    </div>
  );
}
