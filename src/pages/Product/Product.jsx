import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import PriceProduct from "@/components/PriceProduct/PriceProduct";
import { Button } from "@/components/ui/button";
import QuantityInput from "@/components/QuantityInput/QuantityInput";
import StoreInformation from "@/components/StoreInformation/StoreInformation";
import TableInformationProduct from "@/components/TableInformationProduct/TableInformationProduct";
import DescriptionProduct from "@/components/DescriptionProduct/DescriptionProduct";
import CarouselProduct from "@/components/CarouselProduct/CarouselProduct";
import { Heart } from "lucide-react";
import { data } from "@/database/data";
import { useCart } from "@/hooks/CartContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/hooks/AuthContext";
import { wishlistApi } from "@/services/wishlist.api";
import { productApi } from "@/services/product.api";
import SkeletonProductPage from "@/components/SkeletonProductPage/SkeletonProductPage";

export default function Product() {
  const { slug } = useParams();
  const { addToCartWithQuantity, quantityProductFromCart } = useCart();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [quantityFromCart, setQuantityFromCart] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const { user } = useAuth();

  const handleAddToCartWithQuantity = (product, quantity) => {
    addToCartWithQuantity(product, quantity);
    setQuantity(1);
    toast.success("Đã thêm vào giỏ hàng");
  };

  useEffect(() => {
    setIsLoadingProduct(true);
    productApi.getProductBySlug(slug).then((data) => {
      setProduct(data);
      setImages(data.image_url);
      setSelectedImageIndex(0);
      setIsLoadingProduct(false);
    });
  }, [slug]);

  useEffect(() => {
    if (user?.user) {
      wishlistApi.checkIsWishlist(user.user._id, product._id).then((data) => {
        setIsWishlist(data.isWishlist);
      });
    }
  }, [user?.user, product._id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productsRes = await productApi.getAllProducts();

        let wishlist = { products: [] };

        if (user?.user) {
          const wishlistResponse = await wishlistApi.getWishlist(user.user);
          wishlist = wishlistResponse || { products: [] };
        }

        const updatedProducts = productsRes.products.map((product) => ({
          ...product,
          isWishlist: wishlist.products.some(
            (item) => item._id === product._id,
          ),
        }));

        setProducts(updatedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products or wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const quantity = quantityProductFromCart(product.id);
    setQuantityFromCart(quantity);
  }, [product.id, quantityProductFromCart]);

  useEffect(() => {
    if (product?.isWishlist) {
      setIsWishlist(true);
    }
  }, [product?.isWishlist]);

  const stores = [
    {
      id: "CHA098",
      name: "MYKINGDOM QUẢNG NGÃI - 12 có sẵn",
      address:
        "Số 632 Quang Trung Phường Chánh Lộ, Thành phố Quảng Ngãi Tỉnh Quảng Ngãi,",
      phone: "+842553729222",
    },
    {
      id: "CHB089",
      name: "MYKINGDOM LÀO CAI - 9 có sẵn",
      address:
        "Số 192 Hoàng Liên, Phường Cốc Lếu, Thành phố Lào Cai, Tỉnh Lào Cai,",
      phone: "+842143855010",
    },
    {
      id: "CHA185",
      name: "MYKINGDOM LÊ HỒNG PHONG NHA TRANG - 8 có sẵn",
      address:
        "116 Lê Hồng Phong Phường Phước Hải, Thành phố Nha Trang Nha Trang, 650000",
      phone: "+842583811166",
    },
    {
      id: "CHA107",
      name: "MYKINGDOM NGUYỄN HỮU THỌ - ĐÀ NẴNG - 11 có sẵn",
      address:
        "Số 275 Nguyễn Hữu Thọ Phường Hòa Cường Bắc, Quận Hải Châu Thành phố Đà Nẵng,",
      phone: "+842363662219",
    },
    {
      id: "CHB087",
      name: "MYKINGDOM HÀ TĨNH - 5 có sẵn",
      address: "Số 129 Trần Phú Phường Trần Phú Hà Tĩnh,",
      phone: "+842393633363",
    },
  ];

  const handleAddToWishlist = async () => {
    if (!user?.user) {
      toast.error("Vui lòng đăng nhập để thêm vào danh sách yêu thích");
      return;
    }
    const result = await wishlistApi.addToWishlist(user.user, product._id);
    if (result) {
      setIsWishlist(true);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!user?.user) {
      toast.error("Vui lòng đăng nhập để xóa khỏi danh sách yêu thích");
      return;
    }
    const result = await wishlistApi.removeFromWishlist(user.user, product._id);
    if (result) {
      setIsWishlist(false);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    }
  };

  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    {
      path: `/collections/${product.slug}`,
      label: product.name,
    },
  ];

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>

      {isLoadingProduct ? (
        <SkeletonProductPage />
      ) : (
        <>
          <div className="mx-50 mb-5 grid grid-cols-3 border-b-1">
            <div className="col-span-2 items-center">
              <div className="flex items-center justify-around">
                <img src={images[selectedImageIndex]} className="w-180" />
              </div>

              <Carousel className="mx-auto w-200">
                <CarouselContent className="px-1 py-1">
                  {images.map((img, index) => (
                    <CarouselItem key={index} className="basis-1/4">
                      <img
                        src={img}
                        className={`w-30 hover:cursor-pointer ${
                          selectedImageIndex === index
                            ? "shadow-[0_0_30px_5px_rgba(255,0,0,0.1)]"
                            : "opacity-50"
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="mt-8">
              <div className="flex justify-between">
                <p className="mb-4 text-2xl font-medium">{product.name}</p>
                <div
                  onClick={
                    isWishlist ? handleRemoveFromWishlist : handleAddToWishlist
                  }
                  className="cursor-pointer"
                >
                  {isWishlist ? (
                    <Heart className="h-9 w-9 fill-red-600 text-red-600 transition-all duration-300" />
                  ) : (
                    <Heart className="h-9 w-9 text-red-600 transition-all duration-300" />
                  )}
                </div>
              </div>
              <div className="mb-4 flex">
                <p className="pr-5">Thương hiệu</p>{" "}
                <a href="#" className="font-medium text-blue-900 underline">
                  {product?.brand?.name}
                </a>{" "}
              </div>
              <PriceProduct
                priceType="Giá thành viên"
                price={product.price}
                discount={product.discount}
              />
              <PriceProduct
                priceType="Giá bán"
                price={product.price}
                discount={product.discount}
              />

              <div className="mt-12">
                <p className="py-2">&#10003; &nbsp;&nbsp; Hàng chính hãng</p>
                <p className="py-2">
                  &#10003; &nbsp;&nbsp; Miễn phí giao hàng toàn quốc đơn trên
                  500k
                </p>
                <p className="py-2">
                  &#10003; &nbsp;&nbsp; Giao hàng hỏa tốc 4 tiếng
                </p>
              </div>

              <div className="mt-7">
                <p className="mb-4 text-xl font-bold">
                  Số lượng{" "}
                  {quantityFromCart === 0
                    ? ""
                    : "(" + quantityFromCart + " trong giỏ hàng)"}
                </p>
                <div className="flex items-center justify-between">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button
                    variant="addToCart"
                    className="px-15 py-6 text-lg"
                    onClick={() =>
                      handleAddToCartWithQuantity(product, quantity)
                    }
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex">
                <img src="/images/store-icon.svg" alt="" />
                <p className="ml-4 text-lg font-medium">
                  Dự kiến các cửa hàng đang còn sản phẩm
                </p>
              </div>
              <div className="mt-4 max-h-[400px] overflow-y-auto rounded-lg border">
                {stores.map((store) => (
                  <StoreInformation key={store.id} s={store} />
                ))}
              </div>

              <div className="mt-5 w-full pb-10">
                <p className="mb-4 text-2xl font-bold">Thông tin sản phẩm</p>
                {product && <TableInformationProduct product={product} />}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center px-50">
            <DescriptionProduct description={product.description} />
          </div>
        </>
      )}

      {!isLoading && (
        <div className="mt-20 mb-40 grid grid-cols-1 items-center px-50">
          <p className="text-center text-5xl font-bold text-blue-900">
            Sản Phẩm Liên Quan
          </p>
          {products.length > 0 && (
            <CarouselProduct products={products} isLoading={isLoading} />
          )}
        </div>
      )}
    </div>
  );
}
