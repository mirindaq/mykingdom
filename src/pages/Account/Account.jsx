import BirthRegister from "@/components/BirthRegister/BirthRegister";
import { path } from "@/constants/path";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { name: "Tài khoản", path: path.account },
    { name: "Lịch sử mua hàng", path: path.orderHistory },
    { name: "Danh sách yêu thích", path: path.wishlist },
    { name: "Địa chỉ giao hàng", path: path.address },
  ];

  const handleLogout = () => {
    logout();
    navigate(path.homepage);
  };

  return (
    <div className="w-full py-20">
      <div className="grid grid-cols-11 gap-20">
        <div className="col-span-3 col-start-2 w-full overflow-hidden rounded-lg">
          <div className="bg-red-600 py-3 text-center text-lg font-semibold text-white">
            Tài Khoản Của Bạn
          </div>
          <div className="bg-gray-100 p-4">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-2 text-lg ${
                      isActive ? "bg-white font-semibold" : "hover:bg-gray-200"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-start text-lg text-red-600 hover:cursor-pointer hover:bg-gray-200"
              >
                Đăng xuất
              </button>
            </nav>
          </div>
        </div>
        <div className="col-span-6 col-start-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
