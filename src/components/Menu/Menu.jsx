import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { path } from "@/constants/path";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "HÀNG MỚI", path: path.collections },
  { label: "Sản Phẩm", path: path.collections },
  { label: "Thương Hiệu", path: path.brands },
  { label: "Độc Quyền Online", path: path.exclusive },
  { label: "Khuyến Mãi", path: path.collections },
  { label: "Chương Trình Thành Viên", path: path.membership },
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
              className="cursor-pointer bg-red-600 p-2 text-base font-bold text-white hover:text-red-600"
            >
              <Link to={item.path}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
