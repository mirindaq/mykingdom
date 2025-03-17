import { Link, NavLink } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  return (
    <div className="bg-gray-100 px-50 py-4">
      {links.map((link, index) => (
        <span key={index}>
          {index > 0 && <span className="text-sm text-gray-500"> &#62; </span>}
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive ? "px-2 text-sm text-gray-500 font-bold" : "px-2 text-sm text-gray-500"
            }
            end
          >
            {link.label}
          </NavLink>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
