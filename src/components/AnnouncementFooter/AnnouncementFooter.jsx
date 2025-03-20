import React from "react";

export default function AnnouncementFooter(props) {
  const { icon, title } = props;
  return (
    <div className="flex items-center gap-2">
      {" "}
      <div className="text-yellow-500">{icon}</div>
      <div className="block text-sm font-semibold text-white">{title}</div>{" "}
    </div>
  );
}
