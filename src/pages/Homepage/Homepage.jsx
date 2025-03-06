import { CarouselBox } from "@/components/CarouselBox/CarouselBox";
import SectionHomepage from "@/components/SectionHomepage/SectionHomepage";
import { data } from "@/database/data";
import React from "react";

export default function Homepage() {
  return (
    <div>
      <div className="flex w-full items-center justify-center rounded-3xl flex-col">
        <CarouselBox data={data.thumbnail} />
        <SectionHomepage />
      </div>
    </div>
  );
}
