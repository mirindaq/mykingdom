import { Link } from "react-router-dom";
import CarouselProduct from "../CarouselProduct/CarouselProduct";
import { Button } from "../ui/button";
import { path } from "@/constants/path";

export default function SectionHomepage(props) {
  const { products, isLoading } = props;

  return (
    <div className="container mt-5 mb-16">
      <div className="text-center text-4xl font-bold text-blue-950">
        Ưu đãi độc quyền online từ 01-08/03
      </div>
      <CarouselProduct products={products} isLoading={isLoading} />
      <div className="flex justify-center">
        <Link  to={path.exclusive}>
          <Button className="mt-4 px-8 py-6.5 text-2xl" variant="more">
            Xem thêm
          </Button>
        </Link>
      </div>
    </div>
  );
}
