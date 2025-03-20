import React from "react";
import "./DescriptionProduct.css";

export default function DescriptionProduct(props) {
  const { description } = props;
  return <div className="text-xl" dangerouslySetInnerHTML={{ __html: description }}></div>;
}
