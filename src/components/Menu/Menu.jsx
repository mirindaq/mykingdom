import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { path } from "@/constants/path";
import { Link } from "react-router-dom";

const menuItems = [
  // { label: "HÀNG MỚI", path: path.collections },
  { label: "Sản Phẩm", path: path.collections },
  { label: "Thương Hiệu", path: path.brands },
  { label: "Độc Quyền Online", path: path.exclusive },
  { label: "Chương Trình Thành Viên", path: path.membership },
  { label: "Điều khoản - Điều kiện", path: path.termsAndConditions },
  { label: "Cẩm Nang", path: path.blogs },
];

export default function NavBar() {
  return (
    <NavigationMenu className="bg-red-600 pb-3">
      <NavigationMenuList className="flex list-none gap-10">
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index} className="relative">
            <NavigationMenuLink
              asChild
              className="cursor-pointer bg-red-600 p-2 text-lg font-bold text-white hover:text-red-600"
            >
              {index === 0 ? (
                <Link
                  to={item.path}
                  className="flex flex-row items-center text-center"
                >
                  {item.label}
                  <img
                    src="https://cdn.shopify.com/s/files/1/0731/6514/4343/files/icon-birthday-menu.gif?v=1741941506"
                    alt=""
                    className="h-8 w-8"
                  />
                </Link>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
