import React from "react";
import "./TableInformationProduct.css";

export default function TableInformationProduct(props) {
  const { product } = props;
  return (
    <div className="tableInformationProduct_Le">
      <table className="w-full border">
        <tbody>
          <tr>
            <td className="border">Nguyên liệu</td>
            <td className="border">{product?.material}</td>
          </tr>
          <tr>
            <td className="border">Xuất xứ</td>
            <td className="border">{product?.origin}</td>
          </tr>
          <tr>
            <td className="border">Tuổi</td>
            <td className="border">{product?.recommended_age} tuổi</td>
          </tr>
          <tr>
            <td className="border">Thương hiệu</td>
            <td className="border">{product?.brand?.name}</td>
          </tr>
          <tr>
            <td className="border">Giới tính</td>
            <td className="border">
              {product?.gender === "boy" ? "Nam" : "Nữ"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
