import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import PriceProduct from "@/components/PriceProduct/PriceProduct";
import { Button } from "@/components/ui/button";
import QuantityInput from "@/components/QuantityInput/QuantityInput";
import StoreInformation from "@/components/StoreInformation/StoreInformation";
import TableInforProduct from "@/components/TableInforProduct/TableInforProduct";
import DescriptionProcuct from "@/components/DescriptionProcuct/DescriptionProcuct";
import CarouselProduct from "@/components/CarouselProduct/CarouselProduct";
import { Heart } from "lucide-react";
import { data } from "@/database/data";
import { useCart } from "@/hooks/CartContext";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function Product() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const foundProduct = data.products.find((p) => p.slug === slug);
    setProducts(data.products);
    if (foundProduct) {
      setProduct(foundProduct);
      setImages(foundProduct.image_url);
      setMainImage(foundProduct.image_url[0]);
    }
  }, [slug]);

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


  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/collections/:id", label: "Con quay B-160 Booster King Helios.Zn 1B BEYBLADE 5 157199" },
  ];

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData}/>
      </div>

      <div className="mx-50 mb-5 grid grid-cols-3 border-b-1">
        <div className="col-span-2 items-center">
          <div className="flex items-center justify-around">
            <img src={mainImage} className="w-180" />
          </div>

          <div className="flex items-center justify-center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`m-3 h-auto w-50 ${mainImage === img ? "shadow-2xl" : "opacity-50"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex">
            <p className="mb-4 text-2xl font-medium">
              Con quay B-160 Booster King Helios.Zn 1B BEYBLADE 5 157199
            </p>
            <Heart className="h-9 w-9 text-red-600" />
          </div>
          <div className="mb-4 flex">
            <p className="pr-5">Thương hiệu</p>{" "}
            <a href="#" className="font-medium text-blue-900 underline">
              {product.brand}
            </a>{" "}
            <p className="pl-10">SKU {product.id}</p>{" "}
          </div>
          <PriceProduct
            priceType="Giá thành viên"
            currentPrice="175000"
            oldPrice="349000"
            discount="50"
          />
          <PriceProduct
            priceType="Giá bán"
            currentPrice="175000"
            oldPrice="349000"
            discount="50"
          />

          <div className="mt-12">
            <p className="py-2">&#10003; &nbsp;&nbsp; Hàng chính hãng</p>
            <p className="py-2">
              &#10003; &nbsp;&nbsp; Miễn phí giao hàng toàn quốc đơn trên 500k
            </p>
            <p className="py-2">
              &#10003; &nbsp;&nbsp; Giao hàng hỏa tốc 4 tiếng
            </p>
          </div>

          <div className="mt-7">
            <p className="mb-4 text-2xl font-bold">Số lượng</p>
            <div className="flex items-center justify-between">
              <QuantityInput />
              <Button
                variant="addToCart"
                className="px-15 py-6 text-lg"
                onClick={() => addToCart(product)}
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
            <TableInforProduct />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center px-50">
        <DescriptionProcuct description={product.description} />
      </div>

      <div className="mt-20 mb-40 grid grid-cols-1 items-center px-50">
        <p className="text-center text-5xl font-medium text-blue-900">
          Sản Phẩm Liên Quan
        </p>
        <CarouselProduct products={products} />
      </div>
    </div>
  );
}
