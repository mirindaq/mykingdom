import React from "react";
import "./DescriptionProcuct.css";

export default function DescriptionProcuct(props) {
  const { description } = props;
  return <div className="text-xl" dangerouslySetInnerHTML={{ __html: description }}></div>;
}
