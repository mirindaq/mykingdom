import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewsBox from "../NewsBox/NewsBox";
export default function CarouselBlog(props) {
  const { blogs } = props;
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {blogs.slice(5).map((blog) => (
            <CarouselItem key={blog.slug} className="md:basis-1/2 lg:basis-1/3">
              <NewsBox
                key={blog._id}
                image={blog.image}
                title={blog.title}
                description={blog.content}
                link={`/articles/${blog.slug}`}
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
