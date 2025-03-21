import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CartItemPay from "@/components/CartItemPay/CartItemPay";
import FormAddress from "@/components/FormAddress/FormAddress";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { useCart } from "@/hooks/CartContext";
import { useAuth } from "@/hooks/AuthContext";
import { orderApi } from "@/api/order.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { path } from "@/constants/path";
export default function Pay() {
  const [discountCode, setDiscountCode] = useState("");
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const breadcrumbsData = [
    { path: "/", label: "Trang chủ" },
    { path: "/pay", label: "Thanh toán" },
  ];

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.discount
        ? item.product.price -
          (item.product.discount * item.product.price) / 100
        : item.product.price) *
        item.quantity,
    0,
  );

  const handleSubmit = async (object) => {
    const totalDiscountCart = cart.reduce((sum, item) => {
      if (item.product.discount > 0) {
        const originalPrice = item.product.price * item.quantity;
        const discountedPrice =
          item.product.price *
          (1 - item.product.discount / 100) *
          item.quantity;
        return sum + (originalPrice - discountedPrice);
      }
      return sum;
    }, 0);

    const order = {
      user: user.user._id,
      recipient: {
        name: object.name,
        phone: object.phone,
        address: object.address,
        province: object.province,
        district: object.district,
        ward: object.ward,
      },
      items: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        discount: item.product.discount,
      })),
      totalDiscount: totalDiscountCart,
      totalAmount: totalPrice,
    };

    const orderNew = await orderApi.createOrder(order);
    if (orderNew) {
      toast.success("Đặt hàng thành công");
      navigate(path.homepage);
    }
  };

  const handleDefaultAddress = (e) => {
    const isDefault = e.target.checked;
    setUseDefaultAddress(isDefault);

    if (isDefault) {
      const defaultAddress = user.user.address.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setDefaultAddress(defaultAddress);
      }
    } else {
      setDefaultAddress(null);
    }
  };

  return (
    <div>
      <div className="grid grid-flow-col items-center">
        <Breadcrumbs links={breadcrumbsData} />
      </div>

      <div className="container mx-auto mt-10 mb-10 py-4">
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-5 pl-20">
            <p>Liên hệ</p>
            <p className="mt-5">
              <span className="font-semibold">{user.user.name} </span>(
              {user.user.email})
            </p>
            <div className="mt-5 flex items-center">
              <Checkbox
                id="default-address"
                checked={useDefaultAddress}
                onCheckedChange={(checked) => {
                  setUseDefaultAddress(checked);
                  handleDefaultAddress({ target: { checked } });
                }}
                className="mr-2"
              />
              <label htmlFor="">Sử dụng địa chỉ giao hàng mặc định</label>
            </div>
            <div className="mt-5">
              <p className="mb-2">Địa chỉ giao hàng</p>
              <FormAddress
                handleSubmit={handleSubmit}
                defaultAddress={defaultAddress}
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div>
                <Link className="text-green-600 underline">
                  Chính sách hoàn tiền
                </Link>
              </div>
              <div>
                <Link to={path.deliveryPolicy} className="text-green-600 underline">
                  Chính sách vận chuyển
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Chính sách quyền riêng tư
                </Link>
              </div>
              <div>
                <Link to={path.termsAndConditions} className="text-green-600 underline">
                  Điều khoản dịch vụ
                </Link>
              </div>
              <div>
                <Link className="text-green-600 underline">
                  Thông tin liên hệ
                </Link>
              </div>
            </div> */}
          </div>

          <div className="col-span-5 pr-20 pl-20">
            <ul className="max-h-96 space-y-4 overflow-y-auto">
              {cart.map((item, index) => (
                <CartItemPay item={item} key={index} />
              ))}
            </ul>
            <div className="mt-7 flex items-center justify-between">
              <input
                type="text"
                id="first_name"
                className="w-100 rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
                placeholder="Mã giảm giá hoặc thẻ quà tặng"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                className={`rounded-lg px-6 py-3 ${
                  discountCode
                    ? "bg-red-600 text-white hover:cursor-pointer"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
                disabled={!discountCode}
              >
                Áp dụng
              </button>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p>Tổng tiền hàng:</p>
              <p className="text-lg font-medium text-red-600">
                {totalPrice.toLocaleString()} Đ
              </p>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p>Phí vận chuyển:</p>
              <p className="text-lg font-medium text-red-600">MIỄN PHÍ</p>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p className="text-xl">Tổng tiền đơn hàng:</p>
              <p className="text-2xl font-medium text-red-600">
                {totalPrice.toLocaleString()} Đ
              </p>
            </div>
            {/* 
            <div className="mt-7 flex items-center">
              <Checkbox id="" className="mr-2" />
              <label htmlFor="">
                Yêu cầu xuất thông tin VAT
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
