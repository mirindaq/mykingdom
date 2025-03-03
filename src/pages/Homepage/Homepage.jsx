import { CarouselBox } from "@/components/CarouselBox/CarouselBox";
import { data } from "@/database/data";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <CarouselBox data={data.thumbnail} />
      </div>
    </div>
  );
}
