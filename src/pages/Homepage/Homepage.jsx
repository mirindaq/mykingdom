import { CarouselBox } from "@/components/CarouselBox/CarouselBox";
import { data } from "@/database/data";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <div className="flex w-full items-center justify-center rounded-3xl">
        <CarouselBox data={data.thumbnail} />
      </div>
    </div>
  );
}
