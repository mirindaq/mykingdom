import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselBox(props) {
  const { data } = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState();

  const handlePageClick = (index) => {
    api?.scrollTo(index);
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} className="relative mb-10 w-full max-w-screen-xl">
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index} className="relative">
            <div className="h-full w-full p-5">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -left-72 h-12 w-12 -translate-y-1/2 transform rounded-full border-3 border-red-600 bg-white p-2 text-2xl text-red-600" />
      <CarouselNext className="absolute top-1/2 -right-72 h-12 w-12 -translate-y-1/2 transform rounded-full border-3 border-red-600 bg-white p-2 text-2xl text-red-600" />

      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index)}
            className={`h-3 w-3 rounded-full ${currentIndex === index ? "bg-red-600" : "bg-gray-200"} transition-colors`}
          />
        ))}
      </div>
    </Carousel>
  );
}
