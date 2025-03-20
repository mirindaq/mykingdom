import React from "react";
import { Button } from "../ui/button";

export default function ButtonWithIcon(props) {
  const { title, icon } = props;
  return (
    <Button
      size="headerOption"
      className="bg-red-600 text-base font-semibold hover:bg-white hover:text-red-500"
    >
      {icon}
      <div className="hidden xl:block">{title}</div>{" "}
    </Button>
  );
}
