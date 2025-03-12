import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  return (
    <div className="bg-gray-200 px-50 py-4">
      {links.map((link, index) => (
        <span key={index}>
          {index > 0 && <span className="text-sm text-gray-500"> &#62; </span>}
          <Link to={link.path} className="text-sm text-gray-500 px-2">
            {link.label}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
