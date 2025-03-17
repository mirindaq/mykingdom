import React from 'react';

export default function AddressSelect({ options = [], onChange,  label}) {
  return (
    <select className="w-full p-2 border rounded text-black"
        onChange={(e) => onChange && onChange(e.target.value)}
    >
      <option value="">Chọn {label}</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
