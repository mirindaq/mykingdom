import { productApi } from "@/api/product.api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import ListProductSearch from "@/components/ListProductSearch/ListProductSearch";
import { PaginationBox } from "@/components/PaginationBox/PaginationBox";
import { ProductBoxSkeleton } from "@/components/ProductBox/ProductBox";
import { path } from "@/constants/path";
import { Grid2X2, Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { wishlistApi } from "@/api/wishlist.api";

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewType, setViewType] = useState(
    localStorage.getItem("viewType") || "grid3x3",
  );
  const [sortOption, setSortOption] = useState("Mặc định");
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const onProductsUpdate = (data) => {
    setProducts(data.products);
    setTotalProducts(data.pagination.total);
    setTotalPage(data.pagination.totalPages);
    setCurrentPage(data.pagination.page);
  };
  const handleViewChange = (type) => {
    setViewType(type);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams);

        if (sortOption !== "Mặc định") {
          let sortParam = "createdAt";
          switch (sortOption) {
            case "Giá thấp đến cao":
              sortParam = "price_asc";
              break;
            case "Giá cao đến thấp":
              sortParam = "price_desc";
              break;
            case "Tên A-Z":
              sortParam = "name_asc";
              break;
            case "Tên Z-A":
              sortParam = "name_desc"; // Fix lỗi trùng name_asc
              break;
            case "Khuyến mãi cao":
              sortParam = "discount";
              break;
          }
          params.set("sort", sortParam);
        }

        if (currentPage > totalPage) {
          setCurrentPage(1);
        }
        params.set("page", currentPage);
        params.set("limit", "6");

        console.log("Params:", params.toString()); // Debug để kiểm tra params

        setSearchParams(params, { replace: true });

        // Gọi API lấy sản phẩm
        const productResponse = await productApi.getAllProducts(
          params.toString(),
        );

        if (!productResponse || !productResponse.products) {
          throw new Error(
            "Server responded with an error or no products found",
          );
        }

        let wishlist = { products: [] };

        if (user?.user) {
          const wishlistResponse = await wishlistApi.getWishlist(user.user);
          wishlist = wishlistResponse || { products: [] };
        }

        const data = productResponse;

        const updatedProducts = data.products.map((product) => ({
          ...product,
          isWishlist: wishlist.products.some(
            (item) => item._id === product._id,
          ),
        }));

        setProducts(updatedProducts);
        setTotalProducts(data.pagination.total);
        setTotalPage(data.pagination.totalPages);
        setCurrentPage(data.pagination.page);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption, searchParams, user?.user]);

  useEffect(() => {
    localStorage.setItem("viewType", viewType);
  }, [viewType]);

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.collections, label: "Tất cả sản phẩm đồ chơi" },
  ];

  return (
    <div>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto my-10 grid grid-cols-10 gap-6">
        <div className="col-span-2">
          <FilterSidebar
            onProductsUpdate={onProductsUpdate}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="col-span-8">
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-600">Kiểu xem</span>
              <button
                onClick={() => handleViewChange("grid2x2")}
                className="hover:cursor-pointer"
              >
                <Grid2X2 />
              </button>
              <button
                onClick={() => handleViewChange("grid3x3")}
                className="hover:cursor-pointer"
              >
                <Grid3x3 />
              </button>
            </div>
            <div className="text-sm text-gray-700">
              {loading ? "Đang tải..." : `${totalProducts} sản phẩm`}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Sắp xếp theo:</span>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="rounded-md border px-2 py-1 text-sm"
              >
                <option value="Mặc định">Mặc định</option>
                <option value="Khuyến mãi cao">Khuyến mãi cao</option>
                <option value="Giá thấp đến cao">Giá thấp đến cao</option>
                <option value="Giá cao đến thấp">Giá cao đến thấp</option>
                <option value="Tên A-Z">Tên A-Z</option>
                <option value="Tên Z-A">Tên Z-A</option>
              </select>
            </div>
          </div>
          <div>
            {loading && viewType === "grid3x3" ? (
              <div className="mt-5 grid w-full grid-cols-3 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductBoxSkeleton key={index} />
                ))}
              </div>
            ) : loading && viewType === "grid2x2" ? (
              <div className="mt-5 grid w-full grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductBoxSkeleton key={index} />
                ))}
              </div>
            ) : (
              <ListProductSearch viewType={viewType} products={products} />
            )}
          </div>
          {totalProducts > 0 ? (
            <div className="mt-4">
              <PaginationBox
                totalPage={totalPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center">
              <img src="/images/emptyCart.png" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
