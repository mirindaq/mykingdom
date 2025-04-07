import React, { useEffect, useState } from "react";
import { SearchInput } from "../ui/input";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ShoppingBasket, SquareUser, Truck } from "lucide-react";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import CardHoverHeader from "../CartHoverHeader/CartHoverHeader";
import { useAuth } from "@/hooks/AuthContext";
import { productApi } from "@/services/product.api";
import ProductSearchInputBox from "../ProductSearchInputBox/ProductSearchInputBox";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [productSearch, setProductSearch] = useState([]);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!searchTerm.trim()) {
      setDebouncedTerm("");
      setProductSearch([]);
      setShowProductSearch(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedTerm) return;

    fetchProducts(debouncedTerm);
  }, [debouncedTerm]);

  const fetchProducts = async (term) => {
    productApi
      .searchProductsByName({ name: term })
      .then((products) => {
        setProductSearch(products);
        setShowProductSearch(true);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setProductSearch([]);
      setShowProductSearch(false);
    }, 200);
  };

  const handleFocus = async () => {
    if (searchTerm.trim()) {
      fetchProducts(searchTerm);
    }
  };

  return (
    <>
      <header>
        <div className="flex justify-center bg-red-600">
          <div className="container flex items-center gap-6 py-6">
            <div className="pr-5">
              <Link to={path.homepage}>
                <img
                  src="https://www.mykingdom.com.vn/cdn/shop/files/logo-254x76_1.png?v=1697473116&width=200"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="relative">
              {" "}
              <SearchInput
                type="text"
                placeholder="Nhập từ khóa để tìm kiếm (ví dụ: lắp ráp, mô hình, ...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {showProductSearch && productSearch.length > 0 && (
                <div className="absolute top-10 left-0 z-10 mt-2 w-full border-2">
                  <div className="max-h-[380px] overflow-auto">
                    {productSearch.map((item) => (
                      <div className="" key={item._id}>
                        <ProductSearchInputBox product={item} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {showProductSearch && productSearch.length === 0 && (
                <div className="absolute top-10 left-0 z-10 mt-2 w-full border-2">
                  <div className="max-h-[400px] overflow-auto bg-white p-20 text-center text-lg">
                    Không có sản phẩm
                  </div>
                  <div className="bg-white py-2 text-center">
                    <Link to={path.collections}>
                      <span className="text-red-600">Xem tất cả sản phẩm</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <ul>
                <li className="flex">
                  <Link to={path.deliveryPolicy}>
                    <ButtonWithIcon
                      icon={<Truck />}
                      title={"Chính sách giao hàng"}
                    />
                  </Link>
                  {isAuthenticated ? (
                    <Link to={path.account}>
                      <ButtonWithIcon
                        icon={<SquareUser />}
                        title={"Tài khoản"}
                      />
                    </Link>
                  ) : (
                    <>
                      {" "}
                      <Link to={path.login}>
                        <ButtonWithIcon
                          icon={<SquareUser />}
                          title={"Đăng nhập"}
                        />
                      </Link>
                    </>
                  )}

                  <CardHoverHeader />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-red-600">
          <Menu />
        </div>
      </header>
    </>
  );
}
