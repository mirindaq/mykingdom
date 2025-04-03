import BoxCategoryHomepage from "@/components/BoxCategoryHomepage/BoxCategoryHomepage";
import { CarouselBox } from "@/components/CarouselBox/CarouselBox";
import CarouselCategory from "@/components/CarouselCategory/CarouselCategory";
import SectionHomepage from "@/components/SectionHomepage/SectionHomepage";
import { data } from "@/database/data";
import { categoryApi } from "@/services/category.api";
import { productApi } from "@/services/product.api";
import { useAuth } from "@/hooks/AuthContext";
import { wishlistApi } from "@/services/wishlist.api";
import React, { useEffect, useState } from "react";
import { articleApi } from "@/services/article.api";
import NewsBox from "@/components/NewsBox/NewsBox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import CarouselBlog from "@/components/CarouselBlog/CarouselBlog";

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      const [categoriesRes, productsRes, articlesRes] = await Promise.all([
        categoryApi.getAllCategories(),
        productApi.getAllProducts(),
        articleApi.getAllArticles(),
      ]);

      let wishlist = { products: [] };

      if (user?.user) {
        const wishlistResponse = await wishlistApi.getWishlist(user.user);
        wishlist = wishlistResponse || { products: [] };
      }

      const updatedProducts = productsRes.products.map((product) => ({
        ...product,
        isWishlist: wishlist.products.some((item) => item._id === product._id),
      }));

      setCategories(categoriesRes);
      setProducts(updatedProducts);
      setArticles(articlesRes);
      setIsLoading(false);
    };

    fetchCategoriesAndProducts();
  }, [user?.user]);

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center rounded-3xl">
        <CarouselBox data={data.thumbnail} />

        <SectionHomepage products={products} isLoading={isLoading} />

        <div className="container mt-5 mb-16">
          <div className="mb-9 text-center text-4xl font-bold text-blue-950">
            Danh Mục Nổi Bật
          </div>
          <div className="grid grid-cols-2 gap-7">
            {categories?.slice(0, 5).map((category, index) => (
              <div key={index} className={index == 2 ? "col-span-2" : ""}>
                <BoxCategoryHomepage
                  categoryName={category.category_name}
                  imageUrl={category.image_url}
                  slug={category.slug}
                />
              </div>
            ))}
          </div>
          <div className="w-full">
            <div className="my-9 text-center text-4xl font-bold text-blue-950">
              Danh mục Sản phẩm theo mùa
            </div>
            <CarouselCategory categories={categories} />
          </div>

          <div className="w-full">
            <div className="my-10 text-center text-4xl font-bold text-blue-950">
              Cẩm nang
            </div>
            {articles?.length > 0 && (
              <>
                <div className="">
                  <CarouselBlog blogs={articles} /> 
                </div>
                <div className="mt-9 flex justify-center">
                  <Link to={path.blogs}>
                    <Button className="p-5 text-xl" variant="more">
                      Xem thêm
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
