import { useEffect, useState } from "react";
import axios from "axios";

const brandApi = () => {
  const [brandsByAlphabet, setBrandsByAlphabet] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/brands")
      .then((response) => {
        const data = response.data;

        // Nhóm các thương hiệu theo chữ cái đầu tiên
        const groupedBrands = data.reduce((acc, brand) => {
          const firstChar = brand.name.charAt(0).toUpperCase();
          if (!acc[firstChar]) acc[firstChar] = { key: firstChar, brands: [] };
          acc[firstChar].brands.push(brand);
          return acc;
        }, {});

        console.log(groupedBrands);

        // Sắp xếp theo bảng chữ cái
        setBrandsByAlphabet(
          Object.values(groupedBrands).sort((a, b) => a.key.localeCompare(b.key))
        );
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  return (
    <ul>
      {brandsByAlphabet.map((group) => (
        <li key={group.key}>
          <strong>{group.key}</strong>
          <ul>
            {group.brands.map((brand) => (
              <li key={brand.id}>{brand.name}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default brandApi;
