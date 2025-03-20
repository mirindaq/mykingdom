import React from "react";

export default function SocialBox(props) {
  const { data, title } = props;
  return (
    <div>
      <h2 className="pb-1.5 py-3 text-lg font-bold text-pink-600">{title}</h2>
      <div className="flex gap-2">
        {data.map((item, index) => (
          <a href={item.link} key={index}>
            <img src={item.image} alt={item.name} />
          </a>
        ))}
      </div>
    </div>
  );
}
